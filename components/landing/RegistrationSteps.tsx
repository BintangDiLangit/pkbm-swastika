import { ArrowRight, CalendarCheck, FileText, MessageCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { GradientHeading } from "../ui/GradientHeading";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { BERKAS_FIELDS, REGISTRATION_PERIOD, REGISTRATION_STEPS } from "@/lib/content/pendaftaran";
import { whatsappLink } from "@/lib/site";

/** Alur pendaftaran 5 langkah + dokumen & periode. Dipakai di beranda dan /pendaftaran. */
export function RegistrationSteps({
  cta,
  whatsapp,
}: {
  cta: { href: string; label: string };
  whatsapp?: string;
}) {
  return (
    <section id="alur-pendaftaran" className="section-padding bg-white">
      <div className="container-premium">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Reveal>
            <SectionLabel>Cara Mendaftar</SectionLabel>
          </Reveal>
          <GradientHeading className="mt-5">Alur Pendaftaran</GradientHeading>
          <Reveal delay={0.15}>
            <p className="mt-5 text-lg leading-relaxed text-slate-500">
              Lima langkah sederhana dari memilih program sampai mulai belajar.
            </p>
          </Reveal>
        </div>

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {REGISTRATION_STEPS.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.08} className="h-full rounded-3xl border border-slate-100 bg-slate-50/70 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy font-heading text-lg font-bold text-gold">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.2} className="mt-10">
          <div className="grid gap-8 rounded-[2rem] bg-navy p-8 text-white md:grid-cols-[1.4fr_1fr] md:p-10">
            <div>
              <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-gold">
                <FileText className="h-5 w-5" aria-hidden />
                Dokumen yang Disiapkan
              </h3>
              <ul className="mt-4 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                {BERKAS_FIELDS.map((b) => (
                  <li key={b.key} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    {b.label}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-white/50">
                Ijazah/rapor terakhir dipakai untuk menentukan jenjang dan kelas awal.
              </p>
            </div>

            <div className="flex flex-col justify-between gap-6 border-t border-white/10 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="flex items-center gap-2 font-heading text-lg font-semibold">
                <CalendarCheck className="h-5 w-5 shrink-0 text-gold" aria-hidden />
                {REGISTRATION_PERIOD}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <Button href={cta.href} variant="primary">
                  {cta.label} <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href={whatsappLink("Halo, saya ingin konsultasi pendaftaran di PKBM Swastika.", whatsapp)}
                  variant="outline"
                  external
                >
                  <MessageCircle className="h-4 w-4" /> Konsultasi
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
