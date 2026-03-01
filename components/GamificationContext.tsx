"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
  getHabits, 
  createHabit, 
  deleteHabitAction, 
  getTasks,
  createTask,
  deleteTaskAction,
  completeHabitAction,
  completeTaskAction,
  resetDailyHabits
} from "@/lib/actions";
import { 
  Rank, 
  Habit, 
  Task, 
  Difficulty, 
  XP_VALUES, 
  getRankByXp, 
  getNextRank,
  calculateStreakBonus 
} from "@/lib/gamification";

type GameState = {
  xp: number;
  habits: Habit[];
  tasks: Task[];
};

interface GamificationContextType {
  xp: number;
  habits: Habit[];
  tasks: Task[];
  rank: Rank;
  nextRank: Rank | null;
  addHabit: (name: string, difficulty: Difficulty) => void;
  addTask: (name: string, difficulty: Difficulty) => void;
  deleteHabit: (id: string) => void;
  deleteTask: (id: string) => void;
  completeHabit: (id: string) => void;
  completeTask: (id: string) => void;
  isLoaded: boolean;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [state, setState] = useState<GameState>({
    xp: 0,
    habits: [],
    tasks: [],
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setIsLoaded(false);
      if (session?.user?.id) {
        // Authenticated user: Load from DB and perform daily reset
        await resetDailyHabits();
        const [dbHabits, dbTasks] = await Promise.all([
          getHabits(),
          getTasks()
        ]);
        
        setState({
          xp: session.user.xp || 0,
          habits: dbHabits as Habit[],
          tasks: dbTasks.map(t => ({
            ...t,
            createdAt: t.createdAt.toISOString()
          })) as unknown as Task[],
        });
      } else {
        // Guest user: Load from localStorage
        const saved = localStorage.getItem("rhodium-v3-state");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            setState(parsed);
          } catch (e) {
            console.error("Failed to parse local storage", e);
          }
        }
      }
      setIsLoaded(true);
    };

    loadData();
  }, [session]);

  // Sync to localStorage for guests only
  useEffect(() => {
    if (isLoaded && !session?.user?.id) {
      localStorage.setItem("rhodium-v3-state", JSON.stringify(state));
    }
  }, [state, isLoaded, session]);

  // Guest-only Midnight reset check
  useEffect(() => {
    const checkReset = async () => {
      if (session?.user?.id) return; // Handled server-side for logged-in users

      const lastReset = localStorage.getItem("rhodium-v3-last-reset");
      const today = new Date().toDateString();

      if (lastReset !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        const updatedHabits = state.habits.map((h) => {
          const wasCompletedYesterday = h.lastCompleted === yesterdayStr;
          return {
            ...h,
            completedToday: false,
            streak: wasCompletedYesterday ? h.streak : 0,
          };
        });

        setState(prev => ({ ...prev, habits: updatedHabits }));
        localStorage.setItem("rhodium-v3-last-reset", today);
      }
    };

    if (isLoaded) checkReset();
    const interval = setInterval(checkReset, 60000);
    return () => clearInterval(interval);
  }, [isLoaded, state.habits, session]);

  const addHabit = async (name: string, difficulty: Difficulty) => {
    if (session?.user?.id) {
      const newHabit = await createHabit(name, difficulty);
      if (newHabit) {
        setState(prev => ({ ...prev, habits: [...prev.habits, newHabit as unknown as Habit] }));
      }
    } else {
      const newHabit: Habit = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        difficulty,
        streak: 0,
        lastCompleted: null,
        completedToday: false,
      };
      setState(prev => ({ ...prev, habits: [...prev.habits, newHabit] }));
    }
  };

  const addTask = async (name: string, difficulty: Difficulty) => {
    if (session?.user?.id) {
      const newTask = await createTask(name, difficulty);
      if (newTask) {
        setState(prev => ({ 
          ...prev, 
          tasks: [...prev.tasks, { ...newTask, createdAt: newTask.createdAt.toISOString() } as unknown as Task] 
        }));
      }
    } else {
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        difficulty,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setState(prev => ({ ...prev, tasks: [...prev.tasks, newTask] }));
    }
  };

  const deleteHabit = async (id: string) => {
    if (session?.user?.id) {
      await deleteHabitAction(id);
    }
    setState(prev => ({
      ...prev,
      habits: prev.habits.filter(h => h.id !== id)
    }));
  };

  const deleteTask = async (id: string) => {
    if (session?.user?.id) {
      await deleteTaskAction(id);
    }
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id)
    }));
  };

  const completeHabit = async (id: string) => {
    const habit = state.habits.find(h => h.id === id);
    if (!habit || habit.completedToday) return;

    const bonus = calculateStreakBonus(habit.streak, habit.difficulty);
    const totalXpGained = XP_VALUES[habit.difficulty] + bonus;
    const today = new Date().toDateString();

    const updatedHabit = { 
      ...habit, 
      completedToday: true, 
      streak: habit.streak + 1, 
      lastCompleted: today 
    };

    if (session?.user?.id) {
      // SECURE: Call specific completion action instead of generic update
      await completeHabitAction(id);
    }

    setState(prev => ({
      ...prev,
      xp: prev.xp + totalXpGained,
      habits: prev.habits.map(h => h.id === id ? updatedHabit : h)
    }));
  };

  const completeTask = async (id: string) => {
    const task = state.tasks.find(t => t.id === id);
    if (!task || task.completed) return;

    if (session?.user?.id) {
      // SECURE: Call specific completion action
      await completeTaskAction(id);
    }

    setState(prev => ({
      ...prev,
      xp: prev.xp + XP_VALUES[task.difficulty],
      tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: true } : t)
    }));
  };

  const rank = getRankByXp(state.xp);
  const nextRank = getNextRank(state.xp);

  return (
    <GamificationContext.Provider
      value={{
        ...state,
        rank,
        nextRank,
        addHabit,
        addTask,
        deleteHabit,
        deleteTask,
        completeHabit,
        completeTask,
        isLoaded,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider");
  }
  return context;
};
