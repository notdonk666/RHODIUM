"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useGamification } from "./GamificationContext";
import { LoadingScreen } from "./LoadingScreen";
import { useSession } from "next-auth/react";

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoaded } = useGamification();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  
  const isAuthPage = pathname.startsWith("/auth/");
  const isLandingPage = pathname === "/";
  const isRanksPage = pathname === "/ranks";
  
  // Hide navigation on landing page, auth pages, or ranks page if not logged in
  const hideNavigation = isLandingPage || isAuthPage || (isRanksPage && !isLoggedIn);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <AnimatePresence mode="wait">
        {!isLoaded && !isLandingPage && !isAuthPage && (
          <LoadingScreen key="loading" />
        )}
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        {!hideNavigation && (
          <motion.div
            key="navigation-elements"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ 
              type: "spring",
              stiffness: 90,
              damping: 20,
              mass: 1
            }}
          >
            <Sidebar />
            {/* Subtle Grid Background */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0 overflow-hidden">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-dashboard" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-dashboard)" />
              </svg>
            </div>
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.02)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(255,255,255,0.01)_100%)] z-0" />
          </motion.div>
        )}
      </AnimatePresence>
      <main className={cn(
        "relative z-10 w-full transition-[padding] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        !hideNavigation ? "pb-20 md:pb-0 md:pl-64" : "pb-0 md:pl-0"
      )}>
        {children}
      </main>
    </div>
  );
}
