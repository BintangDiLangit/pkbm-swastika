"use client";

import * as Icons from "react-icons/fa";
import { SectionHeader } from "../ui/SectionHeader";
import { Stagger, StaggerItem } from "../ui/Reveal";
import { Counter } from "../ui/Counter";
import type { LandingStat } from "@/lib/data";

type IconKey = keyof typeof Icons;

function getIcon(name?: string | null) {
  if (!name) return Icons.FaUsers;
  const Cmp = (Icons as Record<string, unknown>)[name as IconKey];
  return (Cmp as typeof Icons.FaUsers) ?? Icons.FaUsers;
}

export function StatsSection({ stats }: { stats: LandingStat[] }) {
  if (!stats.length) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 via-white to-primary-50/40 py-20 sm:py-28">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="container relative">
        <SectionHeader
          eyebrow="Dampak Alumni"
          title="Lulusan kami"
          highlight="berdaya & berkarya"
          description="Bukan hanya lulus — alumni PKBM Swastika melanjutkan pendidikan, bekerja, dan membuka usaha sendiri."
        />

        {/* Thursina-style giant bare numbers */}
        <Stagger className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = getIcon(s.icon);
            return (
              <StaggerItem key={s.id} className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                  <Icon size={20} />
                </div>
                <div className="mt-4 text-6xl font-bold leading-none text-primary-800 sm:text-7xl md:text-8xl">
                  <Counter value={s.value} />
                </div>
                <div className="mt-3 text-base font-bold text-ink sm:text-lg">{s.label}</div>
                {s.caption && <div className="mt-1 text-sm text-ink-soft">{s.caption}</div>}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
