"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { EASE } from "@/lib/motion";
import type { LandingStat } from "@/lib/content/landing";

function StatItem({ stat, index, inView }: { stat: LandingStat; index: number; inView: boolean }) {
  // nilai dari admin berupa teks, mis. "530+" → angka 530 + akhiran "+"
  const match = stat.value.match(/^([\d.]+)(.*)$/);
  const target = match ? Number(match[1].replace(/\./g, "")) : 0;
  const count = useCountUp(target, 2200, inView);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.12 }}
      className="relative text-center"
    >
      <p className="font-heading text-5xl font-bold tabular-nums text-gold md:text-6xl">
        {match ? (
          <>
            {count.toLocaleString("id-ID")}
            {match[2]}
          </>
        ) : (
          stat.value
        )}
      </p>
      <p className="mt-3 text-sm font-medium uppercase tracking-[0.25em] text-white">{stat.label}</p>
    </motion.div>
  );
}

export function StatsSection({ stats }: { stats: LandingStat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  if (!stats.length) return null;

  return (
    <section id="stats" className="relative overflow-hidden bg-navy py-20 md:py-24">
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div
        ref={ref}
        className="container-premium relative grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:divide-x lg:divide-white/10"
      >
        {stats.map((stat, index) => (
          <StatItem key={stat.id} stat={stat} index={index} inView={inView} />
        ))}
      </div>
    </section>
  );
}
