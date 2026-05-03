"use client";

import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaClock } from "react-icons/fa";
import { SectionHeader } from "../ui/SectionHeader";
import { Reveal } from "../ui/Reveal";

type Props = {
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  maps?: string;
};

export function ContactSection({ address, phone, whatsapp, email, maps }: Props) {
  const waNum = whatsapp.replace(/\D/g, "");
  const waLink = `https://wa.me/${waNum}`;
  const mapsLink =
    maps ||
    `https://maps.google.com/?q=${encodeURIComponent(address)}`;

  return (
    <section id="kontak" className="bg-white py-20 sm:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Hubungi Kami"
          title="Punya pertanyaan?"
          highlight="Kami siap bantu"
          description="Datang langsung ke kantor, hubungi via WhatsApp, atau kirim pesan. Respon cepat di jam kerja."
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-5">
          {/* contact cards */}
          <Reveal className="lg:col-span-3 grid gap-4 sm:grid-cols-2">
            <ContactCard
              icon={FaMapMarkerAlt}
              title="Alamat Kantor"
              body={address}
              action={{ label: "Buka di Maps", href: mapsLink, external: true }}
            />
            <ContactCard
              icon={FaWhatsapp}
              title="WhatsApp"
              body={`+${waNum.replace(/^(\d{2})(\d{3})(\d{4})(\d+)/, "$1 $2-$3-$4")}`}
              action={{ label: "Chat Sekarang", href: waLink, external: true }}
              accent
            />
            <ContactCard
              icon={FaPhone}
              title="Telepon"
              body={phone}
              action={{ label: "Hubungi", href: `tel:${phone.replace(/\D/g, "")}` }}
            />
            <ContactCard
              icon={FaEnvelope}
              title="Email"
              body={email}
              action={{ label: "Kirim Email", href: `mailto:${email}` }}
            />
          </Reveal>

          {/* hours */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="card-soft h-full bg-gradient-to-br from-primary-700 to-primary-800 p-8 text-white shadow-glow">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-accent-300">
                <FaClock size={20} />
              </div>
              <h3 className="mt-5 text-xl font-bold">Jam Operasional</h3>
              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/80">Senin - Jumat</span>
                  <span className="font-bold">08.00 - 17.00</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/80">Sabtu</span>
                  <span className="font-bold">08.00 - 14.00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-white/80">Minggu</span>
                  <span className="font-bold text-accent-300">Tutup</span>
                </li>
              </ul>
              <p className="mt-6 text-xs text-white/70">
                Konsultasi pendaftaran bisa via WhatsApp 24 jam, dijawab di jam kerja berikutnya.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  title,
  body,
  action,
  accent,
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  body: string;
  action: { label: string; href: string; external?: boolean };
  accent?: boolean;
}) {
  const linkProps = action.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <div className="card-soft flex h-full flex-col p-6">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
          accent ? "bg-accent-100 text-accent-600" : "bg-primary-50 text-primary-700"
        }`}
      >
        <Icon size={20} />
      </div>
      <h4 className="mt-4 font-bold text-ink">{title}</h4>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{body}</p>
      <a
        href={action.href}
        {...linkProps}
        className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-800"
      >
        {action.label} →
      </a>
    </div>
  );
}
