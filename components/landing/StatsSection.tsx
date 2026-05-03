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
    <section className="bg-white py-20 sm:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Dampak Alumni"
          title="Lulusan kami"
          highlight="berdaya & berkarya"
          description="Bukan hanya lulus — alumni PKBM Swastika melanjutkan pendidikan, bekerja, dan membuka usaha sendiri."
        />

        <Stagger className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((s, idx) => {
            const Icon = getIcon(s.icon);
            const isHighlight = idx === 0;
            return (
              <StaggerItem key={s.id}>
                <div
                  className={`relative h-full overflow-hidden rounded-3xl border p-6 transition-all hover:-translate-y-1 ${
                    isHighlight
                      ? "border-primary-700 bg-primary-700 text-white shadow-glow"
                      : "border-soft-200 bg-white text-ink shadow-soft hover:shadow-card"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      isHighlight ? "bg-white/15 text-accent-300" : "bg-primary-50 text-primary-700"
                    }`}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="mt-5">
                    <div className={`text-4xl font-bold leading-none ${isHighlight ? "text-white" : "text-ink"}`}>
                      <Counter value={s.value} />
                    </div>
                    <div className={`mt-2 text-sm font-bold ${isHighlight ? "text-white" : "text-ink"}`}>
                      {s.label}
                    </div>
                    {s.caption && (
                      <div className={`mt-1 text-xs ${isHighlight ? "text-white/70" : "text-ink-soft"}`}>
                        {s.caption}
                      </div>
                    )}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
