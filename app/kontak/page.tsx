import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaFacebook, FaInstagram, FaYoutube, FaClock } from "react-icons/fa";

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

export default function KontakPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Kami siap membantu menjawab pertanyaan dan memberikan informasi yang Anda butuhkan
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Address */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">Alamat</h3>
              <p className="text-gray-700 text-sm">
                Perum Argo Griyatama Regency B5<br />
                Boro, Tawangargo, Kec. Karang Ploso<br />
                Kabupaten Malang, Jawa Timur<br />
                65152
              </p>
            </div>

            {/* Phone */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl shadow-lg text-center">
              <div className="bg-secondary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">Telepon</h3>
              <a href="tel:+62341123456" className="text-gray-700 hover:text-primary transition-colors">
                (0341) 123-4567
              </a>
              <br />
              <a href="tel:+62341123457" className="text-gray-700 hover:text-primary transition-colors">
                (0341) 123-4568
              </a>
            </div>

            {/* WhatsApp */}
            <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-lg text-center">
              <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaWhatsapp size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
              <a
                href="https://wa.me/6285104755189"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                +62 851-0475-5189
              </a>
              <p className="text-xs text-gray-500 mt-2">Chat langsung dengan admin</p>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-lg text-center">
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <a href="mailto:info@pkbmswastika.com" className="text-gray-700 hover:text-purple-600 transition-colors text-sm">
                info@pkbmswastika.com
              </a>
              <br />
              <a href="mailto:pendaftaran@pkbmswastika.com" className="text-gray-700 hover:text-purple-600 transition-colors text-sm">
                pendaftaran@pkbmswastika.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <FaClock className="text-primary text-4xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">Jam Operasional</h2>
            </div>
            <div className="space-y-3 text-center">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-semibold text-gray-700">Senin - Jumat</span>
                <span className="text-gray-600">08:00 - 16:00 WIB</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-semibold text-gray-700">Sabtu</span>
                <span className="text-gray-600">08:00 - 13:00 WIB</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-gray-700">Minggu & Libur Nasional</span>
                <span className="text-red-600 font-semibold">Tutup</span>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-6">
              * Untuk pendaftaran dan konsultasi, silakan hubungi terlebih dahulu
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Lokasi Kami</h2>
          <div className="max-w-5xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126214.69311867457!2d112.57311!3d-7.9666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629862c8c7e53%3A0x5030bfbca830490!2sMalang%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi PKBM SWASTIKA"
              ></iframe>
            </div>
            <div className="mt-6 text-center">
              <a
                href="https://maps.google.com/?q=Perum+Argo+Griyayama+Regency+B5+Boro+Tawangargo+Karang+Ploso+Malang"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
              >
                Buka di Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Ikuti Kami di Media Sosial</h2>
          <div className="flex justify-center space-x-6">
            <a
              href="https://facebook.com/pkbmswastika"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
            >
              <FaFacebook size={32} />
            </a>
            <a
              href="https://instagram.com/pkbmswastika"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-16 h-16 rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
            >
              <FaInstagram size={32} />
            </a>
            <a
              href="https://youtube.com/@pkbmswastika"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
            >
              <FaYoutube size={32} />
            </a>
          </div>
          <p className="text-center text-gray-600 mt-6">
            Dapatkan update terbaru tentang kegiatan, pengumuman, dan informasi pendidikan
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Bergabung dengan PKBM SWASTIKA?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Hubungi kami sekarang untuk informasi lebih lanjut atau langsung daftar!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/pendaftaran"
              className="bg-secondary hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg inline-block"
            >
              Daftar Sekarang
            </a>
            <a
              href="https://wa.me/6285104755189"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              <FaWhatsapp className="mr-2" size={24} />
              Chat WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
