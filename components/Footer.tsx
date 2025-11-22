import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">PKBM SWASTIKA</h3>
            <p className="text-sm leading-relaxed mb-4">
              Pusat Kegiatan Belajar Masyarakat yang menyelenggarakan pendidikan nonformal Paket A, B, dan C di Malang.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Link Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tentang" className="hover:text-primary transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:text-primary transition-colors">
                  Program Pendidikan
                </Link>
              </li>
              <li>
                <Link href="/pendaftaran" className="hover:text-primary transition-colors">
                  Pendaftaran
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-primary transition-colors">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-primary transition-colors">
                  Berita
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Program Kami</h3>
            <ul className="space-y-2">
              <li className="text-sm">📚 Paket A (Setara SD)</li>
              <li className="text-sm">📖 Paket B (Setara SMP)</li>
              <li className="text-sm">🎓 Paket C (Setara SMA)</li>
              <li className="text-sm">💼 Pelatihan Keterampilan</li>
              <li className="text-sm">💻 Pelatihan TIK</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Kontak Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                <span className="text-sm">Perum Argo Griyatama Regency B5, Boro, Tawangargo, Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="flex-shrink-0" />
                <span className="text-sm">(0341) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaWhatsapp className="flex-shrink-0" />
                <a href="https://wa.me/6285104755189" className="text-sm hover:text-primary transition-colors">
                  +62 851-0475-5189
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="flex-shrink-0" />
                <a href="mailto:info@pkbmswastika.com" className="text-sm hover:text-primary transition-colors">
                  info@pkbmswastika.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} PKBM SWASTIKA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
