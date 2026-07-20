"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const done = () => setLoading(false);
    if (document.readyState === "complete") {
      const t = setTimeout(done, 400);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", done);
    const fallback = setTimeout(done, 2500);
    return () => {
      window.removeEventListener("load", done);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-900"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-white/20 border-t-accent-400"
            />
            <span className="text-sm font-bold uppercase tracking-widest text-white/80">
              PKBM Swastika
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
