"use client";

import { useGamification } from "@/components/GamificationContext";
import { PlusCircle, Flame, CheckCircle2, Activity, Zap, Shield, Target, Trash2 } from "lucide-react";
import { useState } from "react";
import { Difficulty, XP_VALUES, calculateStreakBonus } from "@/lib/gamification";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { habits, tasks, completeHabit, completeTask, addHabit, addTask, deleteHabit, deleteTask, xp, rank } = useGamification();
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitDifficulty, setNewHabitDifficulty] = useState<Difficulty>("Easy");
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDifficulty, setNewTaskDifficulty] = useState<Difficulty>("Easy");

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabitName.trim()) {
      addHabit(newHabitName, newHabitDifficulty);
      setNewHabitName("");
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskName.trim()) {
      addTask(newTaskName, newTaskDifficulty);
      setNewTaskName("");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  } as const;

  return (
    <div className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4 md:mb-2">
            <span className="text-[12px] font-black uppercase tracking-[0.2em] text-amber-500/80 bg-amber-500/10 px-2 py-0.5 rounded">Active Session</span>
            <span className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-400">/</span>
            <span className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-400">{rank.name} Rank</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-none">
            Dashboard
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-3 max-w-md font-medium">
            Forge your habits and conquer your daily objectives.
          </p>
        </div>
        
        <div className="w-full md:w-auto flex items-center gap-4 bg-white dark:bg-zinc-900 p-1.5 pr-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="size-12 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
            <Zap className="size-6 fill-current" />
          </div>
          <div>
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block leading-none mb-1">Total Experience</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-zinc-900 dark:text-zinc-50 font-mono leading-none tracking-tighter">{xp}</span>
              <span className="text-xs font-bold text-amber-500 uppercase">XP</span>
            </div>
          </div>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-10"
      >
        {/* Habits Section */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black flex items-center gap-3 tracking-tight">
              <div className="size-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <Activity className="size-5" />
              </div>
              Daily Habits
            </h3>
            <span className="text-xs font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 px-2 py-1 rounded-md">
              {habits.filter(h => h.completedToday).length}/{habits.length} Complete
            </span>
          </div>

          <form onSubmit={handleAddHabit} className="group relative bg-white dark:bg-zinc-900/50 p-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 focus-within:border-amber-500/50 transition-all duration-300">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                placeholder="Initialize new habit..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 px-4 font-medium"
              />
              <div className="flex items-center gap-2 pr-1">
                <select 
                  value={newHabitDifficulty}
                  onChange={(e) => setNewHabitDifficulty(e.target.value as Difficulty)}
                  className="bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-wider rounded-xl px-3 py-2 border-none focus:ring-0 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <button type="submit" className="p-2 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white transition-all duration-300">
                  <PlusCircle className="size-5" />
                </button>
              </div>
            </div>
          </form>

          <div className="space-y-4">
            <AnimatePresence initial={false} mode="popLayout">
              {habits.map((habit) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ 
                    opacity: 1, 
                    height: "auto", 
                    marginBottom: 16,
                    transition: { 
                      height: { duration: 0.3, ease: "easeOut" }, 
                      opacity: { duration: 0.2, delay: 0.1 } 
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    height: 0, 
                    marginBottom: 0,
                    transition: { 
                      height: { duration: 0.3, ease: "easeIn" }, 
                      opacity: { duration: 0.1 } 
                    }
                  }}
                  key={habit.id} 
                  className={cn(
                    "group relative bg-white dark:bg-zinc-900/40 p-5 rounded-[2rem] border overflow-hidden",
                    habit.completedToday 
                      ? "border-emerald-500/20 bg-emerald-50/5 dark:bg-emerald-500/5 shadow-inner" 
                      : "border-zinc-200 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-200/20 dark:hover:shadow-none"
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                      <button 
                        onClick={() => completeHabit(habit.id)}
                        className={cn(
                          "size-14 rounded-2xl flex items-center justify-center transition-all duration-500 relative overflow-hidden shrink-0",
                          habit.completedToday 
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 scale-95" 
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 hover:scale-105 hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-95"
                        )}
                      >
                        {habit.completedToday ? <CheckCircle2 className="size-7 relative z-10" /> : <Zap className="size-6 relative z-10" />}
                        {habit.completedToday && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1.5 }}
                            className="absolute inset-0 bg-white/20 blur-xl"
                          />
                        )}
                      </button>
                      <div className="min-w-0">
                        <p className={cn(
                          "text-lg font-bold tracking-tight transition-all duration-500 truncate",
                          habit.completedToday ? "text-zinc-400 dark:text-zinc-500 line-through" : "text-zinc-900 dark:text-zinc-50"
                        )}>{habit.name}</p>
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                           <span className={cn(
                              "text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border shrink-0",
                              habit.difficulty === "Easy" ? "bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800/50 dark:border-zinc-700" :
                              habit.difficulty === "Medium" ? "bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/50" :
                              "bg-rose-100 text-rose-600 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800/50"
                           )}>
                             {habit.difficulty}
                           </span>
                           {habit.streak > 0 && (
                             <span className="flex items-center gap-1.5 text-xs font-black text-orange-500 italic uppercase tracking-wider shrink-0">
                                <Flame className="size-3.5 fill-current" />
                                {habit.streak} DAY STREAK
                             </span>
                           )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right flex flex-col items-end pr-2 border-r border-zinc-100 dark:border-zinc-800">
                         <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block mb-0.5">Yield</span>
                         <div className="text-base font-black font-mono flex items-center tabular-nums">
                            {habit.completedToday ? (
                              <span className="text-emerald-500">
                                +{XP_VALUES[habit.difficulty] + calculateStreakBonus(habit.streak - 1, habit.difficulty)}
                              </span>
                            ) : (
                              <span className="text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
                                +{XP_VALUES[habit.difficulty]}
                              </span>
                            )}
                         </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteHabit(habit.id);
                        }}
                        className="size-10 rounded-xl flex items-center justify-center text-zinc-300 dark:text-zinc-600 hover:text-rose-500 dark:hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all duration-200"
                        title="Delete Habit"
                      >
                        <Trash2 className="size-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Tasks Section */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black flex items-center gap-3 tracking-tight">
              <div className="size-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
                <Target className="size-5" />
              </div>
              Active Tasks
            </h3>
            <span className="text-xs font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 px-2 py-1 rounded-md">
              {tasks.filter(t => !t.completed).length} Pending
            </span>
          </div>

          <form onSubmit={handleAddTask} className="group relative bg-white dark:bg-zinc-900/50 p-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 focus-within:border-amber-500/50 transition-all duration-300">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                placeholder="Initialize new task..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 px-4 font-medium"
              />
              <div className="flex items-center gap-2 pr-1">
                <select 
                  value={newTaskDifficulty}
                  onChange={(e) => setNewTaskDifficulty(e.target.value as Difficulty)}
                  className="bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-wider rounded-xl px-3 py-2 border-none focus:ring-0 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <button type="submit" className="p-2 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white transition-all duration-300">
                  <PlusCircle className="size-5" />
                </button>
              </div>
            </div>
          </form>

          <div className="space-y-4">
            <AnimatePresence initial={false} mode="popLayout">
              {tasks.map((task) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ 
                    opacity: 1, 
                    height: "auto", 
                    marginBottom: 16,
                    transition: { 
                      height: { duration: 0.3, ease: "easeOut" }, 
                      opacity: { duration: 0.2, delay: 0.1 } 
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    height: 0, 
                    marginBottom: 0,
                    transition: { 
                      height: { duration: 0.3, ease: "easeIn" }, 
                      opacity: { duration: 0.1 } 
                    }
                  }}
                  key={task.id} 
                  className={cn(
                    "group relative bg-white dark:bg-zinc-900/40 p-5 rounded-[2rem] border overflow-hidden",
                    task.completed 
                      ? "border-emerald-500/20 bg-emerald-50/5 dark:bg-emerald-500/5" 
                      : "border-zinc-200 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-200/20 dark:hover:shadow-none"
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                      <button 
                        onClick={() => !task.completed && completeTask(task.id)}
                        className={cn(
                          "size-14 rounded-2xl flex items-center justify-center transition-all duration-500 relative overflow-hidden shrink-0",
                          task.completed 
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 scale-95" 
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 hover:scale-105 hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-95"
                        )}
                      >
                        {task.completed ? <CheckCircle2 className="size-7 relative z-10" /> : <Shield className="size-6 relative z-10" />}
                      </button>
                      <div className="min-w-0">
                        <p className={cn(
                          "text-lg font-bold tracking-tight transition-all duration-500 truncate",
                          task.completed ? "text-zinc-400 dark:text-zinc-500 line-through" : "text-zinc-900 dark:text-zinc-50"
                        )}>{task.name}</p>
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                           <span className={cn(
                              "text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border shrink-0",
                              task.difficulty === "Easy" ? "bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800/50 dark:border-zinc-700" :
                              task.difficulty === "Medium" ? "bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/50" :
                              "bg-rose-100 text-rose-600 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800/50"
                           )}>
                             {task.difficulty}
                           </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right flex flex-col items-end pr-2 border-r border-zinc-100 dark:border-zinc-800">
                         <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block mb-0.5">Reward</span>
                         <span className="text-base font-black font-mono tabular-nums text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-50 transition-colors">
                           +{XP_VALUES[task.difficulty]}
                         </span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTask(task.id);
                        }}
                        className="size-10 rounded-xl flex items-center justify-center text-zinc-300 dark:text-zinc-600 hover:text-rose-500 dark:hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all duration-200"
                        title="Delete Task"
                      >
                        <Trash2 className="size-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
