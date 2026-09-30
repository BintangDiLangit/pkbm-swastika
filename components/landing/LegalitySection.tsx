import Link from "next/link";
import { ArrowUpRight, Award, BadgeCheck, Landmark, type LucideIcon } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { npsnVerifyUrl, siteConfig } from "@/lib/site";

const { legal } = siteConfig;

const items: { icon: LucideIcon; label: string; value: string; note: string; href?: string }[] = [
  { icon: Award, label: "Akreditasi", value: `Terakreditasi ${legal.accreditation}`, note: legal.accreditor },
  {
    icon: BadgeCheck,
    label: "NPSN",
    value: legal.npsn,
    note: "Cek di Data Referensi Kemendikbud",
    href: npsnVerifyUrl,
  },
  { icon: Landmark, label: "Izin Operasional", value: "Dinas Pendidikan", note: "Kabupaten Malang" },
];

/** Bukti legalitas lembaga: akreditasi, NPSN (bisa dicek publik), izin operasional. */
export function LegalitySection() {
  return (
    <section id="legalitas" className="bg-white py-16 md:py-20">
      <div className="container-premium">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionLabel>Bukti Legalitas</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">Resmi &amp; Terdaftar</h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Link href="/tentang" className="text-sm font-semibold text-navy underline-offset-4 hover:text-gold-dark hover:underline">
              Profil lengkap lembaga
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.1} className="h-full">
              <div className="flex h-full items-start gap-5 rounded-3xl border border-slate-100 bg-slate-50/70 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-gold">
                  <it.icon className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{it.label}</p>
                  <p className="mt-1 font-heading text-xl font-bold text-navy">{it.value}</p>
                  {it.href ? (
                    <a
                      href={it.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-sm text-gold-dark hover:underline"
                    >
                      {it.note} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-slate-500">{it.note}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
