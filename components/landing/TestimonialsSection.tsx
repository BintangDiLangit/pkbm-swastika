"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { GradientHeading } from "../ui/GradientHeading";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { EASE } from "@/lib/motion";
import type { LandingTestimonial } from "@/lib/content/landing";

const SWIPE_THRESHOLD = 80;

export function TestimonialsSection({
  testimonials,
  autoplayMs = 6000,
}: {
  testimonials: LandingTestimonial[];
  autoplayMs?: number;
}) {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const paginate = useCallback(
    (dir: number) => setSlide(([i]) => [(i + dir + total) % total, dir]),
    [total]
  );

  const goTo = (i: number) => setSlide(([current]) => [i, i > current ? 1 : -1]);

  useEffect(() => {
    if (paused || total < 2) return;
    const id = setInterval(() => paginate(1), autoplayMs);
    return () => clearInterval(id);
  }, [paused, paginate, autoplayMs, total, index]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) paginate(1);
    else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1);
  };

  if (!total) return null;
  const t = testimonials[index];

  return (
    <section id="testimoni" className="section-padding overflow-hidden bg-slate-50/60">
      <div className="container-premium">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <Reveal>
            <SectionLabel>Testimoni</SectionLabel>
          </Reveal>
          <GradientHeading className="mt-5">Suara Keluarga Besar Kami</GradientHeading>
        </div>

        <Reveal delay={0.1} className="relative mx-auto max-w-4xl">
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="relative min-h-[420px] sm:min-h-[360px]">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.figure
                  key={t.id}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: d >= 0 ? 80 : -80 }),
                    center: { opacity: 1, x: 0 },
                    exit: (d: number) => ({ opacity: 0, x: d >= 0 ? -80 : 80 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: EASE }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.35}
                  onDragEnd={handleDragEnd}
                  className="relative cursor-grab overflow-hidden rounded-[2rem] bg-white p-8 shadow-card active:cursor-grabbing sm:p-12 md:p-14"
                >
                  <Quote className="pointer-events-none absolute -right-4 -top-4 h-40 w-40 text-gold/15" aria-hidden />
                  <blockquote className="relative text-lg font-medium leading-relaxed text-navy sm:text-xl md:text-2xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="relative mt-10 flex items-center gap-4">
                    <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-navy font-heading text-lg font-bold text-gold ring-4 ring-gold/30">
                      {t.avatar ? (
                        <Image src={t.avatar} alt={t.name} fill sizes="56px" className="object-cover" draggable={false} />
                      ) : (
                        t.name.replace(/[^A-Za-z]/g, "").charAt(0) || "S"
                      )}
                    </span>
                    <span>
                      <span className="block font-heading text-lg font-bold text-navy">{t.name}</span>
                      {t.role && <span className="block italic text-slate-500">{t.role}</span>}
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center justify-center gap-6">
              <motion.button
                type="button"
                onClick={() => paginate(-1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Testimoni sebelumnya"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:border-gold hover:bg-gold"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>

              <div className="flex items-center gap-3" role="tablist" aria-label="Pilih testimoni">
                {testimonials.map((item, i) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Tampilkan testimoni dari ${item.name}`}
                    onClick={() => goTo(i)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ width: i === index ? 32 : 10 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={`h-2.5 rounded-full transition-colors duration-300 ${
                      i === index ? "bg-gold" : "bg-navy/20 hover:bg-navy/40"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                type="button"
                onClick={() => paginate(1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Testimoni berikutnya"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:border-gold hover:bg-gold"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
