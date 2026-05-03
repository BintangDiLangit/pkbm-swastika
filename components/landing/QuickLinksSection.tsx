"use client";

import Link from "next/link";
import * as Icons from "react-icons/fa";
import { SectionHeader } from "../ui/SectionHeader";
import { Stagger, StaggerItem } from "../ui/Reveal";
import type { LandingQuickLink } from "@/lib/data";

function getIcon(name?: string | null) {
  if (!name) return Icons.FaLink;
  const Cmp = (Icons as Record<string, unknown>)[name];
  return (Cmp as typeof Icons.FaLink) ?? Icons.FaLink;
}

export function QuickLinksSection({ links }: { links: LandingQuickLink[] }) {
  if (!links.length) return null;

  return (
    <section className="bg-soft-50 py-20 sm:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Quick Launch"
          title="Akses cepat,"
          highlight="tanpa repot"
          description="Tombol pintas untuk hal yang paling sering Anda butuhkan."
        />

        <Stagger className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {links.map((l) => {
            const Icon = getIcon(l.icon);
            const linkProps = l.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <StaggerItem key={l.id}>
                <Link
                  href={l.href}
                  {...linkProps}
                  className="group flex h-full flex-col items-center justify-center rounded-3xl border border-soft-200 bg-white p-6 text-center shadow-soft transition-all hover:-translate-y-1 hover:border-primary-200 hover:shadow-card"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-700 group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <span className="mt-3 text-sm font-bold text-ink">{l.label}</span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
