import { CalendarDays, HandCoins, MessageCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { GradientHeading } from "../ui/GradientHeading";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { FEE_SUMMARY, WEEKLY_SESSIONS } from "@/lib/content/program";
import { whatsappLink } from "@/lib/site";

/** Ringkasan biaya & pola jadwal mingguan program kesetaraan. */
export function FeeScheduleSection({ whatsapp }: { whatsapp?: string }) {
  return (
    <section id="biaya-jadwal" className="section-padding bg-white">
      <div className="container-premium">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Reveal>
            <SectionLabel>Biaya &amp; Jadwal</SectionLabel>
          </Reveal>
          <GradientHeading className="mt-5">Belajar Tanpa Mengganggu Aktivitas</GradientHeading>
          <Reveal delay={0.15}>
            <p className="mt-5 text-lg leading-relaxed text-slate-500">
              Tiga pertemuan setiap minggu dengan biaya yang terjangkau, cocok untuk yang sambil bekerja atau
              mengurus keluarga.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Reveal className="flex flex-col justify-center rounded-[2rem] border border-slate-100 bg-slate-50/70 p-8 md:p-10">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-navy">
              <CalendarDays className="h-6 w-6 text-gold-dark" aria-hidden />
              3 Pertemuan per Minggu
            </h3>
            <ol className="mt-8 grid gap-4 sm:grid-cols-3">
              {WEEKLY_SESSIONS.map((s, i) => (
                <li key={s.title} className="rounded-2xl bg-white p-5 shadow-card">
                  <span className="font-heading text-sm font-bold text-gold-dark">Pertemuan {i + 1}</span>
                  <p className="mt-1 font-heading text-lg font-semibold text-navy">{s.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{s.description}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col justify-between gap-8 rounded-[2rem] bg-navy p-8 text-white md:p-10">
            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-navy">
                <HandCoins className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-6 text-2xl font-bold">{FEE_SUMMARY}</h3>
              <p className="mt-3 leading-relaxed text-white/70">
                Rincian biaya untuk setiap program disampaikan langsung oleh admin saat konsultasi.
              </p>
            </div>
            <Button
              href={whatsappLink("Halo, saya ingin menanyakan rincian biaya belajar di PKBM Swastika.", whatsapp)}
              variant="primary"
              external
              className="self-start"
            >
              <MessageCircle className="h-4 w-4" /> Tanya Rincian Biaya
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
