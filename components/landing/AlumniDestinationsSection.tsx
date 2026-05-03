"use client";

import { FaUniversity, FaBriefcase, FaStore } from "react-icons/fa";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";
import type { LandingDestination } from "@/lib/data";

function iconForType(type: string) {
  if (type === "karier") return FaBriefcase;
  if (type === "wirausaha") return FaStore;
  return FaUniversity;
}

function colorForType(type: string) {
  if (type === "karier") return "bg-accent-100 text-accent-600";
  if (type === "wirausaha") return "bg-primary-100 text-primary-700";
  return "bg-primary-50 text-primary-700";
}

export function AlumniDestinationsSection({
  destinations,
}: {
  destinations: LandingDestination[];
}) {
  if (!destinations.length) return null;

  // duplicate list to create seamless marquee
  const doubled = [...destinations, ...destinations];

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Karier Alumni"
          title="Lulusan kami"
          highlight="melanjutkan ke"
          description="Kuliah, bekerja, hingga membangun usaha sendiri — alumni PKBM Swastika tersebar di berbagai bidang."
        />

        <Reveal className="mt-12 overflow-hidden mask-fade-x">
          <div className="flex w-max animate-marquee gap-4">
            {doubled.map((d, i) => {
              const Icon = iconForType(d.type);
              return (
                <div
                  key={`${d.id}-${i}`}
                  className="flex min-w-[220px] items-center gap-3 rounded-2xl border border-soft-200 bg-white px-5 py-4 shadow-soft"
                >
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${colorForType(
                      d.type
                    )}`}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink">{d.name}</div>
                    <div className="text-xs capitalize text-ink-soft">{d.type}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10 text-center text-sm text-ink-soft">
          Bersama mereka — karena tidak ada satu jalur pun yang &ldquo;benar&rdquo; untuk semua orang.
        </div>
      </div>
    </section>
  );
}
