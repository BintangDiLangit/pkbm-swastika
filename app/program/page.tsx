import { FaBook, FaLaptop, FaTools, FaUtensils, FaPaintBrush, FaClock, FaCheckCircle } from "react-icons/fa";

export const metadata = {
  title: "Program Pendidikan PKBM SWASTIKA - Paket A, B, C & Kursus Keterampilan",
  description: "Jelajahi program pendidikan nonformal PKBM SWASTIKA: Paket A (setara SD), Paket B (setara SMP), Paket C (setara SMA), plus kursus keterampilan seperti TIK dan kewirausahaan di Malang.",
  keywords: "program PKBM SWASTIKA, Paket A SD, Paket B SMP, Paket C SMA, kursus keterampilan, pendidikan nonformal Malang, kursus komputer, kewirausahaan",
  openGraph: {
    title: "Program Pendidikan PKBM SWASTIKA - Paket A, B, C & Kursus",
    description: "Program lengkap pendidikan nonformal di PKBM SWASTIKA Malang: Paket A, B, C dan berbagai kursus keterampilan untuk semua usia.",
    type: "website",
  },
};

export default function ProgramPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Program Pendidikan</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Berbagai program pendidikan berkualitas untuk masa depan yang lebih baik
          </p>
        </div>
      </section>

      {/* Main Programs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {/* Paket A */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 md:p-12 rounded-2xl shadow-xl border-2 border-blue-100 hover:shadow-2xl transition-shadow">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="bg-primary text-white w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold flex-shrink-0">
                  A
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">Program Paket A</h2>
                  <p className="text-xl text-primary font-semibold mb-4">Setara SD/MI (Kelas 1-6)</p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Program pendidikan dasar yang setara dengan Sekolah Dasar (SD/MI) untuk usia produktif 
                    yang putus sekolah atau tidak pernah sekolah. Program ini memberikan kesempatan untuk 
                    mendapatkan ijazah setara SD yang diakui secara nasional.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                        <FaCheckCircle className="text-primary mr-2" />
                        Materi Pembelajaran
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Bahasa Indonesia</li>
                        <li>• Matematika</li>
                        <li>• IPA (Ilmu Pengetahuan Alam)</li>
                        <li>• IPS (Ilmu Pengetahuan Sosial)</li>
                        <li>• Pendidikan Kewarganegaraan</li>
                        <li>• Bahasa Inggris</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                        <FaClock className="text-primary mr-2" />
                        Jadwal & Durasi
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Durasi: 2-3 tahun</li>
                        <li>• Pertemuan: 3x seminggu</li>
                        <li>• Waktu: Sore hari (16.00-19.00)</li>
                        <li>• Fleksibel menyesuaikan peserta</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Paket B */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 md:p-12 rounded-2xl shadow-xl border-2 border-orange-100 hover:shadow-2xl transition-shadow">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="bg-secondary text-white w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold flex-shrink-0">
                  B
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">Program Paket B</h2>
                  <p className="text-xl text-secondary font-semibold mb-4">Setara SMP/MTs (Kelas 7-9)</p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Program pendidikan menengah pertama yang setara dengan SMP/MTs. Dirancang untuk memberikan 
                    kesempatan melanjutkan pendidikan ke jenjang yang lebih tinggi dengan ijazah yang diakui 
                    secara nasional dan dapat digunakan untuk melanjutkan ke SMA/SMK.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                        <FaCheckCircle className="text-secondary mr-2" />
                        Materi Pembelajaran
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Bahasa Indonesia</li>
                        <li>• Matematika</li>
                        <li>• IPA (Biologi, Fisika, Kimia)</li>
                        <li>• IPS (Geografi, Sejarah, Ekonomi)</li>
                        <li>• Bahasa Inggris</li>
                        <li>• Pendidikan Agama & PKn</li>
                        <li>• Seni Budaya & TIK</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                        <FaClock className="text-secondary mr-2" />
                        Jadwal & Durasi
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Durasi: 2-3 tahun</li>
                        <li>• Pertemuan: 3-4x seminggu</li>
                        <li>• Waktu: Sore/Malam hari</li>
                        <li>• Ujian Nasional: Setiap tahun</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Paket C */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 md:p-12 rounded-2xl shadow-xl border-2 border-purple-100 hover:shadow-2xl transition-shadow">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="bg-primary text-white w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold flex-shrink-0">
                  C
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">Program Paket C</h2>
                  <p className="text-xl text-primary font-semibold mb-4">Setara SMA/MA (Kelas 10-12)</p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Program pendidikan menengah atas yang setara dengan SMA/MA. Tersedia jurusan IPA dan IPS. 
                    Ijazah dapat digunakan untuk melanjutkan ke perguruan tinggi atau memasuki dunia kerja.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                        <FaCheckCircle className="text-primary mr-2" />
                        Jurusan & Mata Pelajaran
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold text-primary">Jurusan IPA:</p>
                          <p className="text-gray-700 text-sm">Matematika, Fisika, Kimia, Biologi</p>
                        </div>
                        <div>
                          <p className="font-semibold text-primary">Jurusan IPS:</p>
                          <p className="text-gray-700 text-sm">Ekonomi, Geografi, Sosiologi, Sejarah</p>
                        </div>
                        <div>
                          <p className="font-semibold text-primary">Mata Pelajaran Umum:</p>
                          <p className="text-gray-700 text-sm">Bahasa Indonesia, Bahasa Inggris, PKn, Agama</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                        <FaClock className="text-primary mr-2" />
                        Jadwal & Durasi
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Durasi: 2-3 tahun</li>
                        <li>• Pertemuan: 4x seminggu</li>
                        <li>• Waktu: Sore/Malam hari</li>
                        <li>• Persiapan UTBK-SNBT</li>
                        <li>• Ujian Nasional: Setiap tahun</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Skills Programs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Program Keterampilan Tambahan</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Selain program pendidikan formal, kami juga menyediakan berbagai pelatihan keterampilan untuk meningkatkan kompetensi peserta didik
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* TIK */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <FaLaptop className="text-primary text-3xl" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-3">Teknologi Informasi</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Microsoft Office</li>
                <li>• Desain Grafis</li>
                <li>• Internet & Media Sosial</li>
                <li>• Coding Dasar</li>
              </ul>
            </div>

            {/* Entrepreneurship */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100">
              <div className="bg-gradient-to-br from-orange-100 to-orange-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <FaBook className="text-secondary text-3xl" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-3">Kewirausahaan</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Manajemen Usaha</li>
                <li>• Pemasaran Digital</li>
                <li>• Keuangan Usaha</li>
                <li>• Pengembangan Produk</li>
              </ul>
            </div>

            {/* Crafts */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100">
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <FaPaintBrush className="text-purple-600 text-3xl" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-3">Kerajinan Tangan</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Handycraft</li>
                <li>• Seni Lukis</li>
                <li>• Kerajinan Daur Ulang</li>
                <li>• Aksesoris</li>
              </ul>
            </div>

            {/* Culinary */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100">
              <div className="bg-gradient-to-br from-green-100 to-green-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <FaUtensils className="text-green-600 text-3xl" />
              </div>
              <h3 className="font-bold text-xl text-gray-800 mb-3">Tata Boga</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Masakan Nusantara</li>
                <li>• Kue & Pastry</li>
                <li>• Food Packaging</li>
                <li>• Food Photography</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tertarik dengan Program Kami?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Daftarkan diri Anda sekarang dan mulai perjalanan pendidikan menuju masa depan yang lebih cerah!
          </p>
          <a
            href="/pendaftaran"
            className="inline-block bg-secondary hover:bg-orange-600 text-white font-semibold py-4 px-10 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Daftar Sekarang
          </a>
        </div>
      </section>
    </div>
  );
}
