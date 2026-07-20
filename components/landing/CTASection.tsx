"use client";

import Link from "next/link";
import { FaUserPlus, FaWhatsapp } from "react-icons/fa";
import { Reveal } from "../ui/Reveal";
import { ShootingStarsGrid } from "../ui/shooting-stars-grid";

export function CTASection({ whatsapp }: { whatsapp: string }) {
  const waLink = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Halo PKBM Swastika, saya ingin bertanya tentang pendaftaran."
  )}`;

  return (
    <ShootingStarsGrid interactive contentClassName="py-20 sm:py-24">
      <div className="container relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent-400" />
            Pendaftaran tahun ajaran dibuka
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Mulai langkah pertama menuju{" "}
            <span className="text-accent-300">masa depan baru</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
            Tanpa biaya pendaftaran selangit. Tanpa batas usia. Tanpa diskriminasi. Hanya kemauan untuk belajar.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/pendaftaran" className="btn-accent">
              <FaUserPlus />
              Daftar Sekarang
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
            >
              <FaWhatsapp className="text-base" />
              Tanya via WhatsApp
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
            <span>✓ Gratis konsultasi</span>
            <span>✓ Cicilan biaya tersedia</span>
            <span>✓ Beasiswa untuk yang membutuhkan</span>
          </div>
        </Reveal>
      </div>
    </ShootingStarsGrid>
  );
}
