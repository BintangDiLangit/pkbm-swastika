import {
  FaEye,
  FaBullseye,
  FaAward,
  FaCertificate,
  FaUsers,
  FaChalkboardTeacher,
} from "react-icons/fa";

export const metadata = {
  title: "Tentang PKBM SWASTIKA - Profil, Visi, Misi & Struktur Organisasi",
  description: "Pelajari profil lengkap PKBM SWASTIKA, lembaga pendidikan nonformal terpercaya di Malang. Visi menciptakan masyarakat belajar yang kompetitif dan mandiri, dengan akreditasi B dan layanan pendidikan setara SD/SMP/SMA.",
  keywords: "tentang PKBM SWASTIKA, profil lembaga, visi misi PKBM Malang, struktur organisasi, akreditasi pendidikan nonformal, pendidikan alternatif Malang",
  openGraph: {
    title: "Tentang PKBM SWASTIKA - Profil & Visi Misi",
    description: "PKBM SWASTIKA: Pusat Kegiatan Belajar Masyarakat di Malang dengan pendidikan nonformal berkualitas, akreditasi B, dan komitmen untuk pendidikan merata.",
    type: "website",
  },
};

export default function TentangPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tentang PKBM SWASTIKA
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Lembaga pendidikan nonformal terpercaya di Malang
          </p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Profil Lembaga
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                PKBM SWASTIKA adalah Pusat Kegiatan Belajar Masyarakat yang
                berlokasi di Kota Malang, Jawa Timur. Kami menyelenggarakan
                pendidikan nonformal yang setara dengan pendidikan formal pada
                jenjang pendidikan dasar dan menengah.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Sejak didirikan, PKBM SWASTIKA telah melayani ribuan peserta
                didik dari berbagai kalangan masyarakat yang membutuhkan layanan
                pendidikan alternatif dengan pendekatan yang lebih fleksibel
                namun tetap berkualitas.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Kami berkomitmen untuk memberikan kesempatan pendidikan yang
                merata bagi seluruh masyarakat, tanpa memandang usia, latar
                belakang, atau kondisi ekonomi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Vision */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-primary text-white p-4 rounded-lg mr-4">
                  <FaEye size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Visi</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                “Menciptakan Warga Belajar / Masyarakat Belajar yang Berbudi
                Pekerti Luhur, Kompetitif, Mandiri, dan Berwawasan Global.”
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-secondary text-white p-4 rounded-lg mr-4">
                  <FaBullseye size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Misi</h2>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-secondary mr-2 font-bold">•</span>
                  <span>
                    Membekali pengetahuan dan pembiasaan budi pekerti luhur untuk warga belajar.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 font-bold">•</span>
                  <span>
                    Menyelenggarakan pendidikan dan pendampingan yang prima, berdaya saing, dan terupdate.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 font-bold">•</span>
                  <span>
                    Memberikan layanan pendidikan yang mengembangkan kemampuan inovasi, kreatif, dan berbasis IT.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 font-bold">•</span>
                  <span>
                    Mengembangkan strategi pendidikan yang berkelanjutan, mandiri, dan berdaya saing.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 font-bold">•</span>
                  <span>
                    Mengembangkan, memfasilitasi, dan memobilisasi kegiatan yang bersifat pengembangan diri, pemberdayaan, dan kewirausahaan secara dinamis.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 font-bold">•</span>
                  <span>
                    Menjalin hubungan lintas sektoral untuk kemajuan warga belajar.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 font-bold">•</span>
                  <span>
                    Menerapkan manajemen partisipatif dengan melibatkan seluruh peserta didik dalam setiap kegiatan yang dilakukan.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Struktur Organisasi
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* Ketua */}
              <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6 rounded-xl text-center">
                <div className="flex justify-center mb-3">
                  <FaUsers size={40} />
                </div>
                <h3 className="font-bold text-xl">Ketua PKBM</h3>
                <p className="text-blue-100">Ridwan, S.Pd, M.Pd</p>
              </div>

              {/* Management */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-6 rounded-xl text-center border-2 border-primary">
                  <div className="flex justify-center mb-3">
                    <FaChalkboardTeacher size={32} className="text-primary" />
                  </div>
                  <h4 className="font-bold text-gray-800">Sekretaris</h4>
                  <p className="text-gray-600 text-sm mt-2">
                    Dra. Endang Sri Agustin 
                  </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl text-center border-2 border-secondary">
                  <div className="flex justify-center mb-3">
                    <FaUsers size={32} className="text-secondary" />
                  </div>
                  <h4 className="font-bold text-gray-800">Bendahara</h4>
                  <p className="text-gray-600 text-sm mt-2">
                    Rulliyanti, S.Pd
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl text-center border-2 border-primary">
                  <div className="flex justify-center mb-3">
                    <FaChalkboardTeacher size={32} className="text-primary" />
                  </div>
                  <h4 className="font-bold text-gray-800">
                    Koordinator Program
                  </h4>
                  <p className="text-gray-600 text-sm mt-2">
                    Mochammad Andik, S.Pd
                  </p>
                </div>
              </div>

              {/* Programs */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white border-2 border-gray-200 p-5 rounded-xl text-center">
                  <h4 className="font-bold text-gray-800 mb-2">
                    Tutor Paket A
                  </h4>
                  <p className="text-gray-600 text-sm">5 Pendidik</p>
                </div>
                <div className="bg-white border-2 border-gray-200 p-5 rounded-xl text-center">
                  <h4 className="font-bold text-gray-800 mb-2">
                    Tutor Paket B
                  </h4>
                  <p className="text-gray-600 text-sm">7 Pendidik</p>
                </div>
                <div className="bg-white border-2 border-gray-200 p-5 rounded-xl text-center">
                  <h4 className="font-bold text-gray-800 mb-2">
                    Tutor Paket C
                  </h4>
                  <p className="text-gray-600 text-sm">10 Pendidik</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Akreditasi & Legalitas
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <FaAward className="text-secondary text-4xl mr-4" />
                <div>
                  <h3 className="font-bold text-xl text-gray-800">
                    Akreditasi
                  </h3>
                  <p className="text-gray-600">Terakreditasi B</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                PKBM SWASTIKA telah terakreditasi oleh Badan Akreditasi Nasional
                Pendidikan Anak Usia Dini dan Pendidikan Nonformal (BAN PAUD dan
                PNF)
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <FaCertificate className="text-primary text-4xl mr-4" />
                <div>
                  <h3 className="font-bold text-xl text-gray-800">Legalitas</h3>
                  <p className="text-gray-600">Terdaftar & Resmi</p>
                </div>
              </div>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>✓ SK Pendirian: 421.9/XXX/2018</li>
                <li>✓ NPSN: P2967637 </li>
                <li>✓ Izin Operasional Dinas Pendidikan Kabupaten Malang</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
