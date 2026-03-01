"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGamification } from "./GamificationContext";
import { motion } from "framer-motion";

export function Sidebar() {
  const pathname = usePathname();
  const { rank, nextRank, xp } = useGamification();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Ranks", href: "/ranks", icon: Trophy },
  ];

  const progress = nextRank 
    ? Math.min(((xp - rank.minXp) / (nextRank.minXp - rank.minXp)) * 100, 100)
    : 100;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex-col z-50">
        <div className="p-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="size-10 rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 flex items-center justify-center font-black text-xl shadow-lg shadow-zinc-900/20 dark:shadow-zinc-50/10 group-hover:scale-110 transition-transform duration-300">R</div>
            <h1 className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none">
              RHODIUM
            </h1>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-4">
          <p className="px-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300",
                pathname === item.href
                  ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 shadow-lg shadow-zinc-900/20 dark:shadow-zinc-50/10"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
              )}
            >
              <item.icon className={cn(
                "size-5 transition-transform duration-300 group-hover:scale-110",
                pathname === item.href ? "text-amber-500" : ""
              )} />
              {item.name}
              {pathname === item.href && (
                <motion.div 
                  layoutId="active-pill"
                  className="ml-auto size-1.5 rounded-full bg-amber-500"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="relative group overflow-hidden bg-zinc-50 dark:bg-zinc-900/50 rounded-[2rem] p-5 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 hover:border-amber-500/30">
            {/* Background Accent */}
            <div className="absolute -right-4 -top-4 size-20 bg-amber-500/5 blur-2xl rounded-full" />
            
            <div className="flex items-center gap-4 mb-4">
              <div className="size-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center text-2xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                {rank.icon}
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em] leading-none mb-1">Rank Status</p>
                <p className={cn("text-sm font-black uppercase tracking-tight", rank.color)}>{rank.name}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest px-0.5">
                <span className="text-zinc-500">{xp} XP</span>
                {nextRank && <span className="text-zinc-400">{nextRank.minXp} XP</span>}
              </div>
              <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 1, ease: "circOut" }}
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full origin-left" 
                />
              </div>
            </div>
            
            <Link 
              href="/ranks" 
              className="mt-4 w-full py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-white transition-all duration-300"
            >
              Details
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-around z-50 px-6 pb-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1.5 transition-all duration-300",
              pathname === item.href
                ? "text-amber-500 scale-110"
                : "text-zinc-400"
            )}
          >
            <item.icon className="size-6" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">{item.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
