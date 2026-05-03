import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-soft-200 bg-soft-50">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-700 to-primary-800 text-white">
                <FaGraduationCap size={22} />
              </div>
              <div>
                <div className="text-base font-bold text-ink">PKBM Swastika</div>
                <div className="text-xs text-ink-soft">Pusat Kegiatan Belajar Masyarakat</div>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              Pendidikan kesetaraan Paket A, B, dan C plus pelatihan keterampilan untuk semua kalangan di Malang. Tanpa batas usia, tanpa batas latar belakang.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: FaFacebook, href: "https://facebook.com" },
                { icon: FaInstagram, href: "https://instagram.com" },
                { icon: FaYoutube, href: "https://youtube.com" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-soft-200 bg-white text-ink-muted transition-colors hover:border-primary-200 hover:text-primary-700"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold text-ink">Navigasi</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/tentang" className="text-ink-muted hover:text-primary-700">Tentang</Link></li>
              <li><Link href="/program" className="text-ink-muted hover:text-primary-700">Program</Link></li>
              <li><Link href="/pendaftaran" className="text-ink-muted hover:text-primary-700">Pendaftaran</Link></li>
              <li><Link href="/galeri" className="text-ink-muted hover:text-primary-700">Galeri</Link></li>
              <li><Link href="/berita" className="text-ink-muted hover:text-primary-700">Berita</Link></li>
              <li><Link href="/kontak" className="text-ink-muted hover:text-primary-700">Kontak</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-bold text-ink">Program</h4>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              <li>Paket A (SD)</li>
              <li>Paket B (SMP)</li>
              <li>Paket C (SMA)</li>
              <li>Pelatihan Keterampilan</li>
              <li>Pelatihan TIK</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-bold text-ink">Hubungi Kami</h4>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-primary-600" />
                <span>Perum Argo Griyatama Regency B5, Boro, Tawangargo, Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="flex-shrink-0 text-primary-600" />
                <a href="tel:03411234567" className="hover:text-primary-700">(0341) 123-4567</a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="flex-shrink-0 text-primary-600" />
                <a href="https://wa.me/6285104755189" className="hover:text-primary-700">+62 851-0475-5189</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="flex-shrink-0 text-primary-600" />
                <a href="mailto:info@pkbmswastika.com" className="hover:text-primary-700">info@pkbmswastika.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-soft-200 pt-8 text-xs text-ink-soft sm:flex-row">
          <span>© {new Date().getFullYear()} PKBM Swastika. Semua hak dilindungi.</span>
          <span>Pendidikan untuk semua, kesempatan untuk semua.</span>
        </div>
      </div>
    </footer>
  );
}
