"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { SectionHeader } from "../ui/SectionHeader";
import type { LandingTestimonial } from "@/lib/data";

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: LandingTestimonial[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (reduceMotion || paused || testimonials.length < 2) return;
    timerRef.current = setInterval(next, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, reduceMotion, testimonials.length]);

  if (!testimonials.length) return null;
  const current = testimonials[index];

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-primary-200/30 blur-3xl" />
      <div className="container relative">
        <SectionHeader
          eyebrow="Cerita Alumni"
          title="Suara mereka,"
          highlight="bukti nyata"
          description="Kisah dari peserta didik & alumni yang sudah membuktikan: tidak ada kata terlambat untuk belajar."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4 }}
              className="card-soft relative p-8 sm:p-12"
            >
              <FaQuoteLeft className="absolute right-8 top-8 text-5xl text-primary-100" />
              <div className="flex gap-1 text-accent-400">
                {Array.from({ length: current.rating || 5 }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="mt-5 text-lg leading-relaxed text-ink sm:text-xl">
                &ldquo;{current.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary-100 bg-soft-100">
                  {current.avatar && (
                    <Image src={current.avatar} alt={current.name} fill className="object-cover" sizes="56px" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-ink">{current.name}</div>
                  {current.role && <div className="text-sm text-ink-soft">{current.role}</div>}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Sebelumnya"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-soft-200 bg-white text-ink transition-colors hover:border-primary-200 hover:text-primary-700"
            >
              <FaArrowLeft />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Testimoni ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-primary-700" : "w-2 bg-soft-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Berikutnya"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-soft-200 bg-white text-ink transition-colors hover:border-primary-200 hover:text-primary-700"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
