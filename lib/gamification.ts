
export type Rank = {
  name: string;
  minXp: number;
  color: string;
  icon: string;
};

export const RANKS: Rank[] = [
  { name: "Iron", minXp: 0, color: "text-zinc-400", icon: "🛡️" },
  { name: "Bronze", minXp: 250, color: "text-amber-600", icon: "🥉" },
  { name: "Silver", minXp: 750, color: "text-slate-300", icon: "🥈" },
  { name: "Gold", minXp: 1500, color: "text-yellow-400", icon: "🥇" },
  { name: "Platinum", minXp: 3000, color: "text-cyan-400", icon: "💎" },
  { name: "Diamond", minXp: 6000, color: "text-indigo-400", icon: "💠" },
  { name: "Emerald", minXp: 12000, color: "text-emerald-400", icon: "🌿" },
  { name: "Ruby", minXp: 25000, color: "text-rose-400", icon: "🩸" },
  { name: "Iridium", minXp: 50000, color: "text-violet-400", icon: "👑" },
  { name: "Rhodium", minXp: 100000, color: "text-red-500", icon: "🔥" },
];

export type Difficulty = "Easy" | "Medium" | "Hard";

export const XP_VALUES: Record<Difficulty, number> = {
  Easy: 10,
  Medium: 25,
  Hard: 50,
};

export const STREAK_CONFIG: Record<Difficulty, { increment: number; maxBonus: number }> = {
  Easy: { increment: 5, maxBonus: 20 },
  Medium: { increment: 5, maxBonus: 30 },
  Hard: { increment: 10, maxBonus: 50 },
};

export type Habit = {
  id: string;
  name: string;
  difficulty: Difficulty;
  streak: number;
  lastCompleted: string | null; // ISO Date
  completedToday: boolean;
};

export type Task = {
  id: string;
  name: string;
  difficulty: Difficulty;
  completed: boolean;
  createdAt: string;
};

export const getRankByXp = (xp: number): Rank => {
  return [...RANKS].reverse().find((rank) => xp >= rank.minXp) || RANKS[0];
};

export const getNextRank = (xp: number): Rank | null => {
  const currentRankIndex = RANKS.findIndex((rank) => rank.name === getRankByXp(xp).name);
  return RANKS[currentRankIndex + 1] || null;
};

export const calculateStreakBonus = (streak: number, difficulty: Difficulty): number => {
  if (streak === 0) return 0;
  const { increment, maxBonus } = STREAK_CONFIG[difficulty];
  return Math.min(streak * increment, maxBonus);
};
