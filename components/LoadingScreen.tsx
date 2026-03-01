"use client";

import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950"
    >
      <div className="relative">
        {/* Animated Rings */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -inset-8 rounded-full border border-amber-500/30"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.2, 0, 0.2],
          }}
          transition={{ 
            duration: 2,
            delay: 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -inset-16 rounded-full border border-amber-500/10"
        />
        
        {/* Logo */}
        <motion.div
          animate={{ 
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="size-20 rounded-2xl bg-zinc-50 text-zinc-950 flex items-center justify-center font-black text-4xl shadow-2xl shadow-amber-500/20"
        >
          R
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-400 mb-2">
          Initializing Protocol
        </h2>
        <div className="flex gap-1 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.3, 1, 0.3],
              }}
              transition={{ 
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="size-1 rounded-full bg-amber-500"
            />
          ))}
        </div>
      </motion.div>

      {/* Background Grid (Matching the app aesthetic) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-loading" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-loading)" />
        </svg>
      </div>
    </motion.div>
  );
}
