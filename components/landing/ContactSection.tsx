import { Clock, Mail, MapPin, MessageCircle, Navigation } from "lucide-react";
import { Button } from "../ui/Button";
import { GradientHeading } from "../ui/GradientHeading";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { formatWhatsapp, fullAddress, primaryEmail, siteConfig, whatsappLink } from "@/lib/site";

/** Ringkasan kontak di akhir beranda: alamat, WhatsApp, email, jam layanan. */
export function ContactSection({ whatsapp }: { whatsapp?: string }) {
  const { contact } = siteConfig;

  return (
    <section id="kontak" className="section-padding bg-white">
      <div className="container-premium grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <SectionLabel>Kontak</SectionLabel>
          </Reveal>
          <GradientHeading className="mt-5">Datang atau Hubungi Kami</GradientHeading>
          <Reveal delay={0.15}>
            <p className="mt-5 text-lg leading-relaxed text-slate-500">
              Punya pertanyaan soal program, jadwal, atau pendaftaran? Admin kami siap membantu.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={whatsappLink(undefined, whatsapp)} variant="secondary" external>
              <MessageCircle className="h-4 w-4" /> Chat WhatsApp
            </Button>
            <Button
              href={contact.mapsUrl}
              external
              variant="outline"
              className="!border-navy/20 !text-navy hover:!border-gold hover:!text-gold-dark"
            >
              <Navigation className="h-4 w-4" /> Petunjuk Arah
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ul className="space-y-5 rounded-[2rem] border border-slate-100 bg-slate-50/70 p-8 md:p-10">
            <li className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-dark" aria-hidden />
              <span className="text-slate-600">{fullAddress}</span>
            </li>
            <li>
              <a
                href={whatsappLink(undefined, whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 text-slate-600 hover:text-gold-dark"
              >
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" aria-hidden />
                {formatWhatsapp(whatsapp)}
              </a>
            </li>
            <li>
              <a href={`mailto:${primaryEmail}`} className="flex gap-4 break-all text-slate-600 hover:text-gold-dark">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" aria-hidden />
                {primaryEmail}
              </a>
            </li>
            <li className="flex gap-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" aria-hidden />
              <dl className="grid gap-1 text-sm text-slate-600">
                {contact.hours.map((h) => (
                  <div key={h.days} className="flex gap-2">
                    <dt className="font-medium text-navy">{h.days}:</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
