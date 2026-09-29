"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE, VIEWPORT } from "@/lib/motion";

/**
 * Judul dengan gradasi navy yang "menyapu" masuk saat di-scroll.
 * Background 200% lebar: posisi 100% menampilkan ujung terang,
 * posisi 0% mengisi teks dengan navy penuh.
 */
export function GradientHeading({
  children,
  as = "h2",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={`bg-gradient-to-r from-navy via-navy to-slate-200 bg-clip-text font-heading text-4xl font-bold leading-tight text-transparent md:text-5xl lg:text-[3.5rem] ${className}`}
      style={{ backgroundSize: "200% 100%", WebkitBackgroundClip: "text" }}
      initial={{ backgroundPosition: "100% 0%", opacity: 0, y: 20 }}
      whileInView={{ backgroundPosition: "0% 0%", opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        backgroundPosition: { duration: 1.6, ease: EASE, delay: 0.2 },
        default: { duration: 0.7, ease: EASE },
      }}
    >
      {children}
    </Tag>
  );
}
