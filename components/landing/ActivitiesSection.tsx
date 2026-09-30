"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { GradientHeading } from "../ui/GradientHeading";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { EASE, VIEWPORT } from "@/lib/motion";
import type { LandingActivity } from "@/lib/content/landing";

const FALLBACK_IMG = "/images/diskusi.jpg";

function NewsCard({ item, index }: { item: LandingActivity; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-500 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
        <Image
          src={item.image || FALLBACK_IMG}
          alt={item.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
        />
        {item.category && (
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-navy backdrop-blur">
            {item.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        {item.date && (
          <p className="mb-3 flex items-center gap-2 text-sm text-slate-500">
            <Clock className="h-4 w-4 text-gold" aria-hidden />
            <time>{item.date}</time>
          </p>
        )}
        <h3 className="mb-3 text-xl font-bold leading-snug text-navy transition-colors duration-300 group-hover:text-gold-dark">
          <Link href={`/berita/${item.id}`} className="after:absolute after:inset-0">
            {item.title}
          </Link>
        </h3>
        {item.excerpt && <p className="line-clamp-2 text-slate-500">{item.excerpt}</p>}
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy">
          Baca selengkapnya
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.article>
  );
}

export function ActivitiesSection({ activities }: { activities: LandingActivity[] }) {
  if (!activities.length) return null;

  return (
    <section id="berita" className="section-padding bg-white">
      <div className="container-premium">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Reveal>
            <SectionLabel>Berita Terbaru</SectionLabel>
          </Reveal>
          <GradientHeading className="mt-5">Kabar &amp; Kegiatan</GradientHeading>
          <Reveal delay={0.15}>
            <p className="mt-5 text-lg leading-relaxed text-slate-500">
              Kegiatan belajar, pelatihan, prestasi, dan momen sehari-hari yang membuat PKBM Swastika
              menjadi rumah belajar bersama.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {activities.map((item, index) => (
            <NewsCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
