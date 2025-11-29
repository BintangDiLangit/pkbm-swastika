import Link from "next/link";
import Image from "next/image";
import { FaCalendar, FaUser, FaClock } from "react-icons/fa";

export const metadata = {
  title: "Berita & Pengumuman PKBM SWASTIKA - Informasi Terbaru di Malang",
  description: "Berita terbaru, pengumuman, dan informasi penting dari PKBM SWASTIKA Malang. Update pendaftaran, kegiatan, dan program pendidikan nonformal.",
  keywords: "berita PKBM SWASTIKA, pengumuman PKBM Malang, informasi PKBM, update pendidikan nonformal, berita pendidikan Malang",
  openGraph: {
    title: "Berita & Pengumuman PKBM SWASTIKA - Update Terbaru",
    description: "Informasi terbaru dari PKBM SWASTIKA: pendaftaran, kegiatan, program pendidikan, dan pengumuman penting.",
    type: "website",
  },
};

// Sample news data
const newsData = [
  {
    id: 1,
    title: "Pendaftaran Peserta Didik Baru Tahun Ajaran 2025/2026 Dibuka",
    excerpt: "PKBM SWASTIKA membuka pendaftaran peserta didik baru untuk tahun ajaran 2025/2026. Tersedia program Paket A, B, dan C dengan berbagai kemudahan.",
    date: "15 Januari 2025",
    author: "Admin PKBM",
    category: "Pengumuman",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
  },
  {
    id: 2,
    title: "Jadwal Ujian Tengah Semester Genap 2024/2025",
    excerpt: "Ujian Tengah Semester Genap akan dilaksanakan pada tanggal 3-10 Februari 2025. Seluruh peserta didik diharapkan mempersiapkan diri dengan baik.",
    date: "20 Januari 2025",
    author: "Tim Akademik",
    category: "Akademik",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
  },
  {
    id: 3,
    title: "PKBM SWASTIKA Raih Akreditasi B dari BAN PAUD dan PNF",
    excerpt: "Alhamdulillah, PKBM SWASTIKA berhasil meraih akreditasi B dari Badan Akreditasi Nasional PAUD dan Pendidikan Nonformal. Pencapaian ini membuktikan komitmen kami dalam memberikan pendidikan berkualitas.",
    date: "10 Januari 2025",
    author: "Ketua PKBM",
    category: "Prestasi",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  },
  {
    id: 4,
    title: "Workshop Kewirausahaan Digital Untuk Peserta Didik",
    excerpt: "PKBM SWASTIKA mengadakan workshop kewirausahaan digital yang diikuti oleh 50 peserta didik. Workshop ini bertujuan untuk meningkatkan keterampilan wirausaha di era digital.",
    date: "5 Januari 2025",
    author: "Koordinator Pelatihan",
    category: "Kegiatan",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    id: 5,
    title: "Libur Semester Genap 2024/2025",
    excerpt: "Libur semester genap tahun ajaran 2024/2025 akan dilaksanakan mulai tanggal 20-30 Juni 2025. Kegiatan pembelajaran akan dimulai kembali pada 1 Juli 2025.",
    date: "2 Januari 2025",
    author: "Admin PKBM",
    category: "Pengumuman",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
  },
  {
    id: 6,
    title: "Pelatihan Komputer Microsoft Office Gratis",
    excerpt: "PKBM SWASTIKA membuka pelatihan komputer Microsoft Office gratis untuk seluruh peserta didik. Pelatihan akan dimulai pada Februari 2025.",
    date: "28 Desember 2024",
    author: "Koordinator TIK",
    category: "Kegiatan",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  },
];

export default function BeritaPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Berita & Pengumuman</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Informasi terkini seputar kegiatan, pengumuman, dan prestasi PKBM SWASTIKA
          </p>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-white rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-100 hover:shadow-3xl transition-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={newsData[0].image}
                    alt={newsData[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Terbaru
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <FaCalendar className="mr-2" />
                      {newsData[0].date}
                    </span>
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs">
                      {newsData[0].category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {newsData[0].title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {newsData[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm text-gray-600">
                      <FaUser className="mr-2" />
                      {newsData[0].author}
                    </span>
                    <Link
                      href={`/berita/${newsData[0].id}`}
                      className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
                    >
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All News */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Berita Lainnya</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {newsData.slice(1).map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-[1.02] border border-gray-100"
              >
                <div className="relative h-48">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-white text-primary px-3 py-1 rounded-full text-xs font-semibold">
                      {news.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 text-xs text-gray-600 mb-3">
                    <span className="flex items-center">
                      <FaCalendar className="mr-1" />
                      {news.date}
                    </span>
                    <span className="flex items-center">
                      <FaUser className="mr-1" />
                      {news.author}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {news.excerpt}
                  </p>
                  <Link
                    href={`/berita/${news.id}`}
                    className="text-primary hover:text-blue-600 font-semibold text-sm inline-flex items-center"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcement Banner */}
      <section className="py-12 bg-gradient-to-r from-secondary to-orange-600">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              📢 Pendaftaran Peserta Didik Baru Dibuka!
            </h2>
            <p className="text-lg mb-6">
              Daftar sekarang dan raih kesempatan mendapatkan pendidikan berkualitas
            </p>
            <Link
              href="/pendaftaran"
              className="inline-block bg-white hover:bg-gray-100 text-secondary font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
