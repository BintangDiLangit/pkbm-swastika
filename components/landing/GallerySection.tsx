"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { Button } from "../ui/Button";
import { GradientHeading } from "../ui/GradientHeading";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { EASE } from "@/lib/motion";
import type { LandingGalleryItem } from "@/lib/content/landing";

// Jumlah foto yang tampil di awal & tiap klik "Muat Lebih Banyak"
const PAGE_SIZE = 6;

export function GallerySection({ items }: { items: LandingGalleryItem[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  if (!items.length) return null;

  const shown = items.slice(0, visible);
  const hasMore = visible < items.length;

  return (
    <section id="galeri" className="section-padding bg-slate-50/60">
      <div className="container-premium">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Reveal>
            <SectionLabel>Galeri</SectionLabel>
          </Reveal>
          <GradientHeading className="mt-5">Momen di PKBM Swastika</GradientHeading>
          <Reveal delay={0.15}>
            <p className="mt-5 text-lg leading-relaxed text-slate-500">
              Dokumentasi kegiatan belajar, pelatihan, dan acara bersama warga belajar.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
          {shown.map((item, i) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % PAGE_SIZE) * 0.06 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 shadow-card md:rounded-3xl"
            >
              {/* URL dari admin bisa domain luar: hanya path lokal yang dioptimasi next/image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                unoptimized={!item.image.startsWith("/")}
                className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 font-heading text-sm font-semibold text-white md:p-5 md:text-base">
                {item.title}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          {hasMore ? (
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white px-8 py-4 font-heading text-sm font-bold text-navy transition-colors hover:border-gold hover:text-gold-dark"
            >
              <Plus className="h-4 w-4" aria-hidden /> Muat Lebih Banyak
            </button>
          ) : (
            <Button href="/galeri" variant="secondary">
              Lihat Semua Galeri <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
