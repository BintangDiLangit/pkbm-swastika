import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientHeading } from "@/components/ui/GradientHeading";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { formatWhatsapp, siteConfig, telLink, whatsappLink } from "@/lib/site";

export const metadata = {
  title: "Kontak PKBM SWASTIKA - Alamat, Telepon & WhatsApp di Malang",
  description: "Hubungi PKBM SWASTIKA di Malang. Alamat: Perum Argo Griyatama Regency B5. Telepon: (0341) 123-4567. WhatsApp: +62 851-0475-5189. Informasi lengkap kontak dan lokasi.",
  keywords: "kontak PKBM SWASTIKA, alamat PKBM Malang, telepon PKBM SWASTIKA, WhatsApp PKBM, lokasi PKBM Malang, hubungi PKBM",
  openGraph: {
    title: "Kontak PKBM SWASTIKA - Alamat & Telepon di Malang",
    description: "Informasi lengkap kontak PKBM SWASTIKA: alamat, telepon, WhatsApp, email, dan lokasi di Malang.",
    type: "website",
  },
};

type ContactCard = {
  icon: LucideIcon;
  title: string;
  lines: { text: string; href?: string; external?: boolean }[];
  note?: string;
};

const { contact } = siteConfig;

const contacts: ContactCard[] = [
  {
    icon: MapPin,
    title: "Alamat",
    lines: [
      { text: contact.address.street },
      { text: contact.address.district },
      { text: `${contact.address.city}, ${contact.address.region} ${contact.address.postalCode}` },
    ],
  },
  {
    icon: Phone,
    title: "Telepon",
    lines: contact.phones.map((p) => ({ text: p, href: telLink(p) })),
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: [{ text: formatWhatsapp(), href: whatsappLink(), external: true }],
    note: "Chat langsung dengan admin",
  },
  {
    icon: Mail,
    title: "Email",
    lines: contact.emails.map((e) => ({ text: e, href: `mailto:${e}` })),
  },
];

export default function KontakPage() {
  return (
    <>
      <PageHero
        label="Kontak"
        title="Hubungi"
        highlight="Kami"
        description="Kami siap membantu menjawab pertanyaan dan memberikan informasi yang Anda butuhkan."
        image="/images/rapat.jpg"
      />

      {/* kartu kontak */}
      <section className="section-padding bg-white">
        <div className="container-premium">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contacts.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 0.1}
                className="group h-full rounded-3xl border border-slate-100 bg-slate-50/70 p-7 transition-[border-color,background-color,box-shadow] duration-300 hover:border-gold/40 hover:bg-white hover:shadow-card-hover"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                  <c.icon className="h-6 w-6" aria-hidden />
                </span>
                <h2 className="mt-6 text-xl font-bold text-navy">{c.title}</h2>
                <div className="mt-3 space-y-1 text-sm leading-relaxed text-slate-500">
                  {c.lines.map((l) =>
                    l.href ? (
                      <a
                        key={l.text}
                        href={l.href}
                        {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="block break-all transition-colors hover:text-gold-dark"
                      >
                        {l.text}
                      </a>
                    ) : (
                      <p key={l.text}>{l.text}</p>
                    )
                  )}
                </div>
                {c.note && <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">{c.note}</p>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* peta + jam operasional */}
      <section className="section-padding bg-slate-50/60">
        <div className="container-premium">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Reveal>
              <SectionLabel>Lokasi Kami</SectionLabel>
            </Reveal>
            <GradientHeading className="mt-5">Kunjungi PKBM Swastika</GradientHeading>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <Reveal className="overflow-hidden rounded-[2rem] bg-white shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126214.69311867457!2d112.57311!3d-7.9666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629862c8c7e53%3A0x5030bfbca830490!2sMalang%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1234567890"
                width="100%"
                height="460"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi PKBM SWASTIKA"
                className="block"
              />
            </Reveal>

            <Reveal delay={0.15} className="relative flex flex-col overflow-hidden rounded-[2rem] bg-navy p-8 text-white shadow-card-hover md:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-navy">
                <Clock className="h-6 w-6" aria-hidden />
              </span>
              <h2 className="mt-6 text-2xl font-bold text-white">Jam Operasional</h2>
              <ul className="mt-6 space-y-4 text-sm">
                {contact.hours.map((j) => (
                  <li key={j.days} className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 last:border-0">
                    <span className="text-white/70">{j.days}</span>
                    <span className={`font-heading font-semibold ${j.time === "Tutup" ? "text-gold" : "text-white"}`}>{j.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-white/60">* Untuk pendaftaran dan konsultasi, silakan hubungi terlebih dahulu.</p>
              <div className="mt-auto pt-8">
                <Button
                  href={contact.mapsUrl}
                  external
                  variant="primary"
                >
                  <Navigation className="h-4 w-4" /> Buka di Google Maps
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* media sosial */}
      <section className="relative overflow-hidden bg-navy py-20 md:py-24">
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
        <div className="container-premium relative flex flex-col items-center gap-8 text-center">
          <Reveal>
            <SectionLabel tone="gold">Media Sosial</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="max-w-2xl text-3xl font-bold text-white md:text-4xl">
              Ikuti kabar terbaru kegiatan, pengumuman, dan informasi pendidikan kami.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <SocialLinks />
          </Reveal>
        </div>
      </section>
    </>
  );
}
