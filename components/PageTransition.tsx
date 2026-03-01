"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 3.5, scale: 0.993 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -3.5, scale: 0.993 }}
        transition={{ 
          type: "spring",
          stiffness: 90,
          damping: 20,
          mass: 1
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
