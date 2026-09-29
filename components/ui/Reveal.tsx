"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, VIEWPORT } from "@/lib/motion";

/** Pembungkus fade-up saat di-scroll, dipakai di semua section halaman utama. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT} custom={delay}>
      {children}
    </motion.div>
  );
}
