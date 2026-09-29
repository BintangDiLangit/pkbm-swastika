"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Clock } from "lucide-react";
import { GradientHeading } from "../ui/GradientHeading";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { EASE, VIEWPORT } from "@/lib/motion";
import type { LandingProgram } from "@/lib/content/landing";

const FALLBACK_IMG = "/images/kelas.jpeg";

function ProgramCard({ program, index }: { program: LandingProgram; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.12 }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-500 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
        <Image
          src={program.image || FALLBACK_IMG}
          alt={program.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
        <span className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold font-heading text-lg font-bold text-navy shadow-lg">
          {program.code === "KETERAMPILAN" ? "K" : program.code}
        </span>
        {program.badge && (
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-navy backdrop-blur">
            {program.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-xl font-bold leading-snug text-navy transition-colors duration-300 group-hover:text-gold-dark">
          <Link href="/program" className="after:absolute after:inset-0">
            {program.title}
          </Link>
        </h3>
        {program.subtitle && (
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{program.subtitle}</p>
        )}
        <p className="mt-3 line-clamp-3 text-slate-500">{program.description}</p>

        {program.features.length > 0 && (
          <ul className="mt-5 space-y-2">
            {program.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between pt-6">
          {program.duration ? (
            <span className="flex items-center gap-2 text-sm text-slate-500">
              <Clock className="h-4 w-4 text-gold" aria-hidden />
              {program.duration}
            </span>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
            Selengkapnya
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function ProgramsSection({ programs }: { programs: LandingProgram[] }) {
  if (!programs.length) return null;

  return (
    <section id="program" className="section-padding bg-slate-50/60">
      <div className="container-premium">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Reveal>
            <SectionLabel>Program Kami</SectionLabel>
          </Reveal>
          <GradientHeading className="mt-5">Pilih Jalur Belajarmu</GradientHeading>
          <Reveal delay={0.15}>
            <p className="mt-5 text-lg leading-relaxed text-slate-500">
              Dari Paket A sampai pelatihan keterampilan, tersedia program untuk setiap tahap hidup,
              dengan ijazah resmi yang diakui negara.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
