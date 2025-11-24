import Link from "next/link";
import Image from "next/image";
import { FaGraduationCap, FaUsers, FaAward, FaChartLine } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-24 md:py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gedung.jpg"
            alt="PKBM SWASTIKA"
            fill
            className="object-cover blur-sm"
            priority
          />
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in drop-shadow-lg">
            Ayo Sekolah di PKBM SWASTIKA!
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">
            Mewujudkan Kesempatan Belajar untuk Semua
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pendaftaran"
              className="bg-secondary hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/tentang"
              className="bg-white hover:bg-gray-100 text-primary font-semibold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Tentang Kami
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80"
                alt="Gedung PKBM SWASTIKA"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Sekilas Tentang PKBM SWASTIKA
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                PKBM SWASTIKA adalah Pusat Kegiatan Belajar Masyarakat yang berlokasi di Kabupaten Malang, 
                menyelenggarakan pendidikan nonformal setara SD, SMP, dan SMA dengan program Paket A, B, dan C.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Kami berkomitmen memberikan kesempatan pendidikan berkualitas bagi semua kalangan 
                masyarakat yang ingin melanjutkan atau menyelesaikan pendidikan.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-xl border-l-4 border-primary">
                <p className="text-xl font-semibold text-primary mb-2 flex items-center">
                  📍 Lokasi
                </p>
                <p className="text-gray-700 font-medium">Perum Argo Griyatama Regency B5, Boro, Tawangargo, Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">3</h3>
              <p className="text-gray-600">Program Pendidikan</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">300+</h3>
              <p className="text-gray-600">Peserta Didik</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Terakreditasi</h3>
              <p className="text-gray-600">Lembaga Resmi</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">80%</h3>
              <p className="text-gray-600">Tingkat Kelulusan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Program Pendidikan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Paket A */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80"
                  alt="Paket A"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-primary text-white w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg">
                  A
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Paket A</h3>
                <p className="text-gray-600 mb-4 font-semibold">Setara SD/MI</p>
                <p className="text-gray-700 leading-relaxed">
                  Program pendidikan dasar untuk usia produktif yang ingin menyelesaikan pendidikan setara Sekolah Dasar.
                </p>
              </div>
            </div>

            {/* Paket B */}
            <div className="group bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80"
                  alt="Paket B"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-secondary text-white w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg">
                  B
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Paket B</h3>
                <p className="text-gray-600 mb-4 font-semibold">Setara SMP/MTs</p>
                <p className="text-gray-700 leading-relaxed">
                  Program pendidikan menengah pertama untuk melanjutkan ke jenjang yang lebih tinggi.
                </p>
              </div>
            </div>

            {/* Paket C */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80"
                  alt="Paket C"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-primary text-white w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg">
                  C
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Paket C</h3>
                <p className="text-gray-600 mb-4 font-semibold">Setara SMA/MA</p>
                <p className="text-gray-700 leading-relaxed">
                  Program pendidikan menengah atas untuk persiapan kuliah atau dunia kerja.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/program"
              className="inline-block bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              Lihat Detail Program
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Melanjutkan Pendidikan Anda?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ratusan peserta didik lainnya dan raih kesempatan untuk masa depan yang lebih baik.
          </p>
          <Link
            href="/pendaftaran"
            className="inline-block bg-white hover:bg-gray-100 text-secondary font-semibold py-4 px-10 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Daftar Sekarang
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Apa itu PKBM SWASTIKA?</h3>
              <p className="text-gray-600 leading-relaxed">
                PKBM SWASTIKA adalah Pusat Kegiatan Belajar Masyarakat yang berlokasi di Kabupaten Malang, 
                menyediakan pendidikan nonformal setara SD (Paket A), SMP (Paket B), dan SMA (Paket C) untuk semua kalangan masyarakat.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Apa saja program pendidikan yang ditawarkan?</h3>
              <p className="text-gray-600 leading-relaxed">
                Kami menawarkan tiga program utama: Paket A (setara SD/MI), Paket B (setara SMP/MTs), dan Paket C (setara SMA/MA). 
                Setiap program dirancang untuk memberikan pendidikan berkualitas dan fleksibel.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Bagaimana cara mendaftar di PKBM SWASTIKA?</h3>
              <p className="text-gray-600 leading-relaxed">
                Pendaftaran dapat dilakukan secara online melalui halaman pendaftaran di situs web kami atau datang langsung ke lokasi. 
                Persyaratan umum meliputi fotokopi KTP, ijazah terakhir, dan formulir pendaftaran yang telah diisi.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Berapa biaya pendidikan di PKBM SWASTIKA?</h3>
              <p className="text-gray-600 leading-relaxed">
                Biaya pendidikan bervariasi tergantung program dan kebutuhan individu. Kami menawarkan opsi pembayaran yang terjangkau 
                dan fleksibel. Untuk informasi detail, silakan hubungi kami atau kunjungi halaman pendaftaran.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Di mana lokasi PKBM SWASTIKA?</h3>
              <p className="text-gray-600 leading-relaxed">
                Lokasi kami berada di Perum Argo Griyatama Regency B5, Boro, Tawangargo, Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152. 
                Kami mudah diakses dan menyediakan fasilitas yang nyaman untuk belajar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Apa itu PKBM SWASTIKA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "PKBM SWASTIKA adalah Pusat Kegiatan Belajar Masyarakat yang berlokasi di Kabupaten Malang, menyediakan pendidikan nonformal setara SD (Paket A), SMP (Paket B), dan SMA (Paket C) untuk semua kalangan masyarakat."
                }
              },
              {
                "@type": "Question",
                "name": "Apa saja program pendidikan yang ditawarkan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Kami menawarkan tiga program utama: Paket A (setara SD/MI), Paket B (setara SMP/MTs), dan Paket C (setara SMA/MA). Setiap program dirancang untuk memberikan pendidikan berkualitas dan fleksibel."
                }
              },
              {
                "@type": "Question",
                "name": "Bagaimana cara mendaftar di PKBM SWASTIKA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pendaftaran dapat dilakukan secara online melalui halaman pendaftaran di situs web kami atau datang langsung ke lokasi. Persyaratan umum meliputi fotokopi KTP, ijazah terakhir, dan formulir pendaftaran yang telah diisi."
                }
              },
              {
                "@type": "Question",
                "name": "Berapa biaya pendidikan di PKBM SWASTIKA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Biaya pendidikan bervariasi tergantung program dan kebutuhan individu. Kami menawarkan opsi pembayaran yang terjangkau dan fleksibel. Untuk informasi detail, silakan hubungi kami atau kunjungi halaman pendaftaran."
                }
              },
              {
                "@type": "Question",
                "name": "Di mana lokasi PKBM SWASTIKA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Lokasi kami berada di Perum Argo Griyatama Regency B5, Boro, Tawangargo, Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152. Kami mudah diakses dan menyediakan fasilitas yang nyaman untuk belajar."
                }
              }
            ]
          })
        }}
      />
    </div>
