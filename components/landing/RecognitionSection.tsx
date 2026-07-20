"use client";

import Image from "next/image";
import { FaShieldAlt, FaAward } from "react-icons/fa";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import type { LandingRecognition } from "@/lib/data";

export function RecognitionSection({ recognitions }: { recognitions: LandingRecognition[] }) {
  if (!recognitions.length) return null;

  // duplicate list for seamless infinite marquee
  const doubled = [...recognitions, ...recognitions];

  return (
    <section className="bg-soft-50 py-20 sm:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Legalitas & Akreditasi"
          title="Lembaga resmi,"
          highlight="terpercaya & terdaftar"
          description="Semua program kami berlisensi resmi pemerintah. Ijazah Anda diakui untuk pendidikan lanjutan dan dunia kerja."
        />
      </div>

      <Reveal className="mt-12 overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee gap-5 [animation-duration:36s] hover:[animation-play-state:paused]">
          {doubled.map((r, idx) => (
            <div
              key={`${r.id}-${idx}`}
              className="card-soft group flex h-full w-56 flex-shrink-0 flex-col items-center p-6 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 text-primary-700 transition-transform group-hover:scale-110">
                {r.logo ? (
                  <Image src={r.logo} alt={r.title} width={48} height={48} className="object-contain" />
                ) : idx % 2 === 0 ? (
                  <FaShieldAlt size={26} />
                ) : (
                  <FaAward size={26} />
                )}
              </div>
              <h3 className="mt-4 text-sm font-bold leading-snug text-ink">{r.title}</h3>
              {r.issuer && <p className="mt-1 text-xs text-ink-soft">{r.issuer}</p>}
              {r.description && (
                <p className="mt-3 text-xs leading-relaxed text-ink-muted">{r.description}</p>
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
