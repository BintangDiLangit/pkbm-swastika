"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import { SectionHeader } from "../ui/SectionHeader";
import { Stagger, StaggerItem } from "../ui/Reveal";
import type { LandingProgram } from "@/lib/data";

const FALLBACK_IMG = "/images/kelas.jpeg";

export function ProgramsSection({ programs }: { programs: LandingProgram[] }) {
  if (!programs.length) return null;

  return (
    <section id="program" className="bg-white py-20 sm:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Program Kami"
          title="Pilih jalur belajar"
          highlight="yang sesuai"
          description="Dari Paket A sampai pelatihan keterampilan — tersedia program untuk setiap tahap hidup Anda."
        />

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p) => (
            <StaggerItem key={p.id}>
              <article className="card-soft group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[5/3] overflow-hidden bg-soft-100">
                  <Image
                    src={p.image || FALLBACK_IMG}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute left-3 top-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-bold text-primary-700 shadow-soft">
                    {p.code === "KETERAMPILAN" ? "K" : p.code}
                  </div>
                  {p.badge && (
                    <span className="absolute right-3 top-3 rounded-full bg-accent-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink shadow-soft">
                      {p.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-ink">{p.title}</h3>
                  {p.subtitle && (
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
                      {p.subtitle}
                    </p>
                  )}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                    {p.description}
                  </p>

                  {p.features.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {p.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-ink">
                          <FaCheck className="mt-0.5 flex-shrink-0 text-primary-600" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href="/pendaftaran"
                    className="mt-6 inline-flex items-center justify-between gap-2 rounded-xl border border-soft-200 bg-soft-50 px-4 py-3 text-sm font-semibold text-ink transition-all group-hover:border-primary-200 group-hover:bg-primary-50 group-hover:text-primary-700"
                  >
                    Daftar program ini
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
