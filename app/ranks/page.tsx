"use client";

import { useGamification } from "@/components/GamificationContext";
import { Lock, CheckCircle2, Trophy, ChevronRight } from "lucide-react";
import { RANKS } from "@/lib/gamification";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Ranks() {
  const { xp, rank: currentRank, nextRank } = useGamification();

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
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  } as const;

  const progressBarVariants = {
    hidden: { scaleX: 0 },
    show: (progressValue: number) => ({
      scaleX: progressValue / 100,
      transition: { 
        duration: 1.2, 
        ease: "circOut",
        delay: 0.2 // Start filling shortly after the card starts sliding in
      }
    } as const)
  };

  return (
    <div className="p-6 md:p-10 lg:p-12 max-w-5xl mx-auto">
      <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <Trophy className="size-4 text-amber-500" />
            <span className="text-[12px] font-black uppercase tracking-[0.2em] text-amber-500/80 bg-amber-500/10 px-2 py-0.5 rounded">Prestige System</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-none">
            Ranks
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-3 max-w-md font-medium">
            Ascend through the hierarchy by mastering your daily disciplines.
          </p>
        </div>
        
        <div className="w-full md:w-auto flex items-center gap-4 bg-white dark:bg-zinc-900 p-1.5 pr-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="size-12 rounded-xl bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center text-white dark:text-zinc-900 shadow-lg shadow-zinc-900/20 dark:shadow-zinc-50/10">
            <Trophy className="size-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block leading-none mb-1">Current Standing</span>
            <div className="flex items-baseline gap-1">
              <span className={cn("text-2xl font-black font-mono leading-none tracking-tighter", currentRank.color)}>
                {currentRank.name}
              </span>
            </div>
          </div>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {RANKS.map((rank) => {
          const isCurrent = rank.name === currentRank.name;
          const isUnlocked = xp >= rank.minXp;
          const progress = isCurrent && nextRank 
            ? Math.min(((xp - rank.minXp) / (nextRank.minXp - rank.minXp)) * 100, 100)
            : isUnlocked ? 100 : 0;
          
          return (
            <motion.div
              variants={itemVariants}
              key={rank.name}
              className={cn(
                "relative group overflow-hidden bg-white dark:bg-zinc-900/40 rounded-[2.5rem] border transition-all duration-500",
                isCurrent 
                  ? "border-amber-500/50 dark:border-amber-500/30 ring-4 ring-amber-500/5 shadow-2xl shadow-amber-500/10" 
                  : isUnlocked 
                    ? "border-zinc-200 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700" 
                    : "border-zinc-100 dark:border-zinc-800/20 opacity-40 grayscale"
              )}
            >
              <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                  <div className={cn(
                    "size-24 rounded-[2rem] flex items-center justify-center text-5xl shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                    isUnlocked ? "bg-zinc-100 dark:bg-zinc-800/80" : "bg-zinc-50 dark:bg-zinc-900/50"
                  )}>
                    {rank.icon}
                  </div>
                  <div>
                    <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                       <h3 className={cn("text-3xl font-black uppercase tracking-tighter", rank.color)}>
                         {rank.name}
                       </h3>
                       {isCurrent && (
                         <span className="bg-amber-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-amber-500/20">
                           Current
                         </span>
                       )}
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm font-bold text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        {isUnlocked ? <CheckCircle2 className="size-4 text-emerald-500" /> : <Lock className="size-4 text-zinc-400" />}
                        {isUnlocked ? "Unlocked" : `Requires ${rank.minXp} XP`}
                      </span>
                      {isUnlocked && (
                         <>
                           <span className="text-zinc-200 dark:text-zinc-800">|</span>
                           <span>At {rank.minXp} XP</span>
                         </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-64 flex flex-col items-center md:items-end gap-3">
                  {isCurrent && nextRank ? (
                    <div className="w-full">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 px-1">
                        <span className="text-zinc-400">Progress</span>
                        <span className="text-amber-500">{Math.round(progress)}%</span>
                      </div>
                      <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
                        <motion.div 
                          variants={progressBarVariants}
                          custom={progress}
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full origin-left"
                        />
                      </div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-2 text-right">
                        {nextRank.minXp - xp} XP to {nextRank.name}
                      </p>
                    </div>
                  ) : !isUnlocked ? (
                    <div className="flex items-center gap-2 text-zinc-300 dark:text-zinc-700 font-black text-4xl italic tracking-tighter">
                      LOCKED <ChevronRight className="size-8" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-emerald-500/50 font-black text-2xl uppercase tracking-tighter">
                      ASCENDED
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
