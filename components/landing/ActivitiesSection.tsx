"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { SectionHeader } from "../ui/SectionHeader";
import { Stagger, StaggerItem } from "../ui/Reveal";
import type { LandingActivity } from "@/lib/data";

const FALLBACK_IMG = "/images/diskusi.jpg";

export function ActivitiesSection({ activities }: { activities: LandingActivity[] }) {
  if (!activities.length) return null;

  return (
    <section id="kegiatan" className="bg-white py-20 sm:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Kegiatan & Informasi"
          title="Yang sedang terjadi di"
          highlight="PKBM Swastika"
          description="Update kegiatan komunitas, pelatihan, prestasi, dan pengumuman terbaru."
        />

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((a) => (
            <StaggerItem key={a.id}>
              <Link
                href="/berita"
                className="card-soft group block h-full overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-soft-100">
                  <Image
                    src={a.image || FALLBACK_IMG}
                    alt={a.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  {a.category && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-primary-700 shadow-soft backdrop-blur">
                      {a.category}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <FaCalendarAlt className="text-primary-500" />
                    {a.date}
                  </div>
                  <h3 className="mt-3 text-lg font-bold leading-snug text-ink line-clamp-2">
                    {a.title}
                  </h3>
                  {a.excerpt && (
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-3">
                      {a.excerpt}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
                    Baca selengkapnya
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 text-center">
          <Link href="/berita" className="btn-ghost">
            Lihat Semua Kegiatan
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
}
