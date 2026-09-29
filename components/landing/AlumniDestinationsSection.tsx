"use client";

import { useEffect, useRef } from "react";
import { useAnimate, type AnimationPlaybackControls } from "framer-motion";
import { Briefcase, Landmark, Store } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import type { LandingDestination } from "@/lib/content/landing";

function iconForType(type: string) {
  if (type === "karier") return Briefcase;
  if (type === "wirausaha") return Store;
  return Landmark;
}

export function AlumniDestinationsSection({
  destinations,
  duration = 30,
}: {
  destinations: LandingDestination[];
  duration?: number;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const controls = useRef<AnimationPlaybackControls | null>(null);

  // daftar digandakan supaya geser -50% berulang tanpa sambungan
  const items = [...destinations, ...destinations];

  useEffect(() => {
    if (!scope.current) return;
    controls.current = animate(scope.current, { x: ["0%", "-50%"] }, { duration, repeat: Infinity, ease: "linear" });
    return () => controls.current?.stop();
  }, [animate, scope, duration]);

  // pause/play (bukan ganti animasi) supaya lanjut dari posisi yang sama
  const pause = () => controls.current?.pause();
  const play = () => controls.current?.play();

  if (!destinations.length) return null;

  return (
    <section id="alumni" className="overflow-hidden border-y border-slate-100 bg-white py-16 md:py-20">
      <div className="container-premium mb-10 text-center">
        <Reveal>
          <SectionLabel>Ke Mana Alumni Kami</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 font-heading text-2xl font-semibold text-navy md:text-3xl">
            Kuliah, bekerja, hingga membangun usaha sendiri
          </p>
        </Reveal>
      </div>

      <div
        className="relative"
        onMouseEnter={pause}
        onMouseLeave={play}
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div ref={scope} className="flex w-max will-change-transform">
          {items.map((d, i) => {
            const Icon = iconForType(d.type);
            return (
              <div
                key={`${d.id}-${i}`}
                aria-hidden={i >= destinations.length}
                className="group mx-3 flex shrink-0 items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 px-7 py-5 grayscale transition-all duration-500 hover:border-gold/40 hover:bg-white hover:shadow-card hover:grayscale-0"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 text-slate-500 transition-colors duration-500 group-hover:bg-navy group-hover:text-gold">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block whitespace-nowrap font-heading font-semibold text-slate-600 transition-colors duration-500 group-hover:text-navy">
                    {d.name}
                  </span>
                  <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">{d.type}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
