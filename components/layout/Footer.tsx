import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "../ui/Logo";
import { SocialLinks } from "./SocialLinks";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import {
  formatWhatsapp,
  fullAddress,
  hoursSummary,
  primaryEmail,
  siteConfig,
  whatsappLink,
} from "@/lib/site";

// Tautan cepat = menu utama tanpa Beranda
const quickLinks = siteConfig.nav.filter((n) => n.path !== "/").map((n) => ({ label: n.name, href: n.path }));


export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="kontak" className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-premium relative pb-10 pt-20 md:pt-24">
        {/* pita ajakan daftar */}
        <Reveal className="mb-16 flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-14 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Pendaftaran dibuka</p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold text-white md:text-4xl">
              Mulai langkah belajarmu bersama kami hari ini.
            </h2>
          </div>
          <Button href="/pendaftaran" variant="primary">
            Daftar Sekarang
          </Button>
        </Reveal>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <Reveal>
            <div className="flex items-center gap-3">
              <Logo />
              <span className="font-heading text-lg font-bold leading-tight">PKBM Swastika</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Pendidikan kesetaraan Paket A, B, dan C plus pelatihan keterampilan untuk semua kalangan
              di Malang. Tanpa batas usia, tanpa batas latar belakang.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mb-5 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-gold">Kontak</h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                {fullAddress}
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex gap-3 transition-colors hover:text-gold">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  {formatWhatsapp()}
                </a>
              </li>
              <li>
                <a href={`mailto:${primaryEmail}`} className="flex gap-3 break-all transition-colors hover:text-gold">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  {primaryEmail}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                {hoursSummary}
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <h3 className="mb-5 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-gold">Tautan Cepat</h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <h3 className="mb-5 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-gold">Ikuti Kami</h3>
            <p className="mb-5 text-sm text-white/60">Kabar kegiatan dan info pendaftaran terbaru.</p>
            <SocialLinks />
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} PKBM Swastika. Seluruh hak cipta dilindungi.
          </p>
          <p>Pusat Kegiatan Belajar Masyarakat, Kabupaten Malang</p>
        </div>
      </div>
    </footer>
  );
}
