"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { EASE } from "@/lib/motion";

/**
 * Hero untuk halaman dalam (Tentang, Program, dst.) dengan gaya hero beranda:
 * foto gelap, label emas bergaris, judul putih dengan kata terakhir emas.
 */
export function PageHero({
  label,
  title,
  highlight,
  description,
  image = "/images/gedung.jpg",
}: {
  label: string;
  title: string;
  highlight?: string;
  description?: string;
  image?: string;
}) {
  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section className="relative overflow-hidden bg-navy-950">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/30" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-premium relative py-24 md:py-32">
        <motion.nav {...fadeIn(0.1)} aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-white/60">
          <Link href="/" className="transition-colors hover:text-gold">
            Beranda
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden />
          <span className="text-white">{label}</span>
        </motion.nav>

        <motion.span
          {...fadeIn(0.2)}
          className="mb-6 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-gold"
        >
          <span className="h-px w-10 bg-gold" aria-hidden />
          {label}
        </motion.span>

        <motion.h1 {...fadeIn(0.35)} className="max-w-4xl font-heading text-4xl font-bold leading-[1.05] text-white md:text-6xl">
          {title} {highlight && <span className="text-gold">{highlight}</span>}
        </motion.h1>

        {description && (
          <motion.p {...fadeIn(0.5)} className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
