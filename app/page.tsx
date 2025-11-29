import Link from "next/link";
import Image from "next/image";
import { FaGraduationCap, FaUsers, FaAward, FaChartLine } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-32 md:py-40 overflow-hidden">
        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gedung.jpg"
            alt="PKBM SWASTIKA"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/80 to-blue-600/90"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold mb-6 border border-white/30">
            🎓 Pendidikan Berkualitas untuk Semua
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in leading-tight">
            Ayo Sekolah di<br />
            <span className="text-yellow-300">PKBM SWASTIKA!</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Mewujudkan Kesempatan Belajar untuk Semua dengan Program Pendidikan Nonformal Berkualitas
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              href="/pendaftaran"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-5 px-10 rounded-2xl text-lg transition-all transform hover:scale-105 shadow-2xl"
            >
              Daftar Sekarang →
            </Link>
            <Link
              href="/tentang"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-5 px-10 rounded-2xl text-lg transition-all transform hover:scale-105 shadow-xl border-2 border-white/30"
            >
              Tentang Kami
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-bold mb-4">
              TENTANG KAMI
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sekilas Tentang<br />
              <span className="text-blue-600">PKBM SWASTIKA</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image with Decorative Frame */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl"></div>
              <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80"
                  alt="Gedung PKBM SWASTIKA"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-3xl shadow-2xl">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">300+</div>
                  <div className="text-sm font-semibold">Peserta Didik</div>
                </div>
              </div>
            </div>
            
            {/* Text Content */}
            <div>
              <p className="text-lg text-gray-700 mb-5 leading-relaxed">
                PKBM SWASTIKA adalah Pusat Kegiatan Belajar Masyarakat yang berlokasi di Kabupaten Malang, 
                menyelenggarakan pendidikan nonformal setara SD, SMP, dan SMA dengan program Paket A, B, dan C.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Kami berkomitmen memberikan kesempatan pendidikan berkualitas bagi semua kalangan 
                masyarakat yang ingin melanjutkan atau menyelesaikan pendidikan.
              </p>
              
              {/* Features List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-600 text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Terakreditasi Resmi</h4>
                    <p className="text-gray-600 text-sm">Lembaga pendidikan terakreditasi BAN PAUD dan PNF</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-purple-600 text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Jadwal Fleksibel</h4>
                    <p className="text-gray-600 text-sm">Waktu belajar yang disesuaikan dengan kesibukan Anda</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-orange-600 text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Biaya Terjangkau</h4>
                    <p className="text-gray-600 text-sm">Investasi pendidikan dengan harga yang ramah di kantong</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-100">
                <p className="text-sm font-bold text-blue-600 mb-2 flex items-center">
                  <span className="text-2xl mr-2">📍</span> LOKASI KAMI
                </p>
                <p className="text-gray-700 font-medium text-sm">Perum Argo Griyatama Regency B5, Boro, Tawangargo, Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-bold mb-4">
              STATISTIK KAMI
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Dipercaya Oleh<br />
              <span className="text-orange-500">Ratusan Peserta Didik</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <FaGraduationCap size={36} />
              </div>
              <h3 className="text-5xl font-bold text-gray-800 mb-2">3</h3>
              <p className="text-gray-600 font-semibold">Program Pendidikan</p>
              <p className="text-gray-500 text-sm mt-1">Paket A, B & C</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <FaUsers size={36} />
              </div>
              <h3 className="text-5xl font-bold text-gray-800 mb-2">300+</h3>
              <p className="text-gray-600 font-semibold">Peserta Didik</p>
              <p className="text-gray-500 text-sm mt-1">Aktif Belajar</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <FaAward size={36} />
              </div>
              <h3 className="text-5xl font-bold text-gray-800 mb-2">B</h3>
              <p className="text-gray-600 font-semibold">Terakreditasi</p>
              <p className="text-gray-500 text-sm mt-1">BAN PAUD & PNF</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-400 to-green-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <FaChartLine size={36} />
              </div>
              <h3 className="text-5xl font-bold text-gray-800 mb-2">80%</h3>
              <p className="text-gray-600 font-semibold">Tingkat Kelulusan</p>
              <p className="text-gray-500 text-sm mt-1">Lulus Ujian</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-bold mb-4">
              PROGRAM KAMI
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pilih Program<br />
              <span className="text-purple-600">Sesuai Kebutuhan Anda</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tersedia tiga jenjang pendidikan dengan kurikulum berkualitas dan fleksibel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Paket A */}
            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80"
                  alt="Paket A"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg">
                    A
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Paket A</h3>
                <p className="text-orange-500 font-bold text-sm mb-4 uppercase tracking-wide">Setara SD/MI</p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Program pendidikan dasar untuk usia produktif yang ingin menyelesaikan pendidikan setara Sekolah Dasar.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start text-sm text-gray-700">
                    <span className="text-blue-500 mr-2 mt-1">✓</span>
                    <span>Durasi 2 tahun pembelajaran</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-700">
                    <span className="text-blue-500 mr-2 mt-1">✓</span>
                    <span>Ijazah setara SD/MI</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-700">
                    <span className="text-blue-500 mr-2 mt-1">✓</span>
                    <span>Jadwal fleksibel</span>
                  </li>
                </ul>
                <Link
                  href="/program"
                  className="block text-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>

            {/* Paket B */}
            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg z-10 rotate-12">
                POPULER
              </div>
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80"
                  alt="Paket B"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg">
                    B
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Paket B</h3>
                <p className="text-orange-500 font-bold text-sm mb-4 uppercase tracking-wide">Setara SMP/MTs</p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Program pendidikan menengah pertama untuk melanjutkan ke jenjang yang lebih tinggi.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start text-sm text-gray-700">
                    <span className="text-orange-500 mr-2 mt-1">✓</span>
                    <span>Durasi 2 tahun pembelajaran</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-700">
                    <span className="text-orange-500 mr-2 mt-1">✓</span>
                    <span>Ijazah setara SMP/MTs</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-700">
                    <span className="text-orange-500 mr-2 mt-1">✓</span>
                    <span>Bisa lanjut ke SMA/SMK</span>
                  </li>
                </ul>
                <Link
                  href="/program"
                  className="block text-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>

            {/* Paket C */}
            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80"
                  alt="Paket C"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg">
                    C
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Paket C</h3>
                <p className="text-orange-500 font-bold text-sm mb-4 uppercase tracking-wide">Setara SMA/MA</p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Program pendidikan menengah atas untuk persiapan kuliah atau dunia kerja.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start text-sm text-gray-700">
                    <span className="text-purple-500 mr-2 mt-1">✓</span>
                    <span>Durasi 2 tahun pembelajaran</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-700">
                    <span className="text-purple-500 mr-2 mt-1">✓</span>
                    <span>Ijazah setara SMA/MA</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-700">
                    <span className="text-purple-500 mr-2 mt-1">✓</span>
                    <span>Bisa lanjut kuliah</span>
                  </li>
                </ul>
                <Link
                  href="/program"
                  className="block text-center bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/program"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-xl"
            >
              Lihat Semua Program →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <span className="text-6xl">🎓</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Siap Melanjutkan<br />Pendidikan Anda?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed opacity-90">
              Bergabunglah dengan ratusan peserta didik lainnya dan raih kesempatan untuk masa depan yang lebih baik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pendaftaran"
                className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-5 px-10 rounded-2xl text-lg transition-all transform hover:scale-105 shadow-2xl"
              >
                Daftar Sekarang →
              </Link>
              <Link
                href="/tentang"
                className="inline-block bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-5 px-10 rounded-2xl text-lg transition-all transform hover:scale-105 shadow-xl border-2 border-white/30"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-50 rounded-full opacity-50 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-bold mb-4">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pertanyaan yang<br />
              <span className="text-blue-600">Sering Diajukan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan umum tentang PKBM SWASTIKA
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border-2 border-blue-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center mr-3 mt-1 text-sm">Q</span>
                <span>Apa itu PKBM SWASTIKA?</span>
              </h3>
              <p className="text-gray-600 leading-relaxed ml-11">
                PKBM SWASTIKA adalah Pusat Kegiatan Belajar Masyarakat yang berlokasi di Kabupaten Malang, 
                menyediakan pendidikan nonformal setara SD (Paket A), SMP (Paket B), dan SMA (Paket C) untuk semua kalangan masyarakat.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border-2 border-purple-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center mr-3 mt-1 text-sm">Q</span>
                <span>Apa saja program pendidikan yang ditawarkan?</span>
              </h3>
              <p className="text-gray-600 leading-relaxed ml-11">
                Kami menawarkan tiga program utama: Paket A (setara SD/MI), Paket B (setara SMP/MTs), dan Paket C (setara SMA/MA). 
                Setiap program dirancang untuk memberikan pendidikan berkualitas dan fleksibel.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border-2 border-orange-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center mr-3 mt-1 text-sm">Q</span>
                <span>Bagaimana cara mendaftar di PKBM SWASTIKA?</span>
              </h3>
              <p className="text-gray-600 leading-relaxed ml-11">
                Pendaftaran dapat dilakukan secara online melalui halaman pendaftaran di situs web kami atau datang langsung ke lokasi. 
                Persyaratan umum meliputi fotokopi KTP, ijazah terakhir, dan formulir pendaftaran yang telah diisi.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border-2 border-green-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center mr-3 mt-1 text-sm">Q</span>
                <span>Berapa biaya pendidikan di PKBM SWASTIKA?</span>
              </h3>
              <p className="text-gray-600 leading-relaxed ml-11">
                Biaya pendidikan bervariasi tergantung program dan kebutuhan individu. Kami menawarkan opsi pembayaran yang terjangkau 
                dan fleksibel. Untuk informasi detail, silakan hubungi kami atau kunjungi halaman pendaftaran.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border-2 border-blue-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center mr-3 mt-1 text-sm">Q</span>
                <span>Di mana lokasi PKBM SWASTIKA?</span>
              </h3>
              <p className="text-gray-600 leading-relaxed ml-11">
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
  );
}
