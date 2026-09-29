import type { LandingFaq, LandingTestimonial } from "./landing";

export const FALLBACK_HERO = {
  title: "PKBM Swastika - Pendidikan untuk Semua",
  subtitle: "Kesempatan belajar tanpa batas usia dan latar belakang",
  image: "/images/gedung.jpg",
};


// ---------------------------------------------------------------------------
// Konten statis / placeholder untuk homepage.
// Data dari database (dikelola via /admin) selalu diprioritaskan; daftar di
// bawah hanya dipakai sebagai fallback agar section tidak hilang saat DB kosong.
// ---------------------------------------------------------------------------

// TODO: ganti dengan testimoni asli dari alumni/orang tua/mitra
export const FALLBACK_TESTIMONIALS: LandingTestimonial[] = [
  {
    id: "placeholder-1",
    name: "[Nama Alumni]",
    role: "Alumni Paket C",
    quote:
      "Jadwal belajarnya fleksibel sehingga saya bisa tetap bekerja. Dengan ijazah Paket C, saya akhirnya bisa melanjutkan kuliah.",
    avatar: null,
    rating: 5,
  },
  {
    id: "placeholder-2",
    name: "[Nama Orang Tua]",
    role: "Orang Tua Peserta Didik",
    quote:
      "Anak saya jadi lebih percaya diri. Para tutor sabar dan selalu mengabari perkembangan belajarnya.",
    avatar: null,
    rating: 5,
  },
  {
    id: "placeholder-3",
    name: "[Nama Mitra]",
    role: "Mitra/Instansi",
    quote:
      "Lulusan PKBM Swastika yang bergabung dengan kami punya etos kerja yang baik dan semangat belajar yang tinggi.",
    avatar: null,
    rating: 5,
  },
  {
    id: "placeholder-4",
    name: "[Nama Alumni]",
    role: "Alumni Paket B",
    quote:
      "Tidak ada kata terlambat untuk belajar. Di sini saya diterima tanpa dihakimi dan dibimbing sampai lulus.",
    avatar: null,
    rating: 5,
  },
];

// Jawaban disusun dari info di halaman /tentang dan /program.
export const FALLBACK_FAQS: LandingFaq[] = [
  {
    id: "faq-1",
    question: "Apa itu PKBM dan apakah ijazahnya diakui?",
    answer:
      "PKBM (Pusat Kegiatan Belajar Masyarakat) adalah lembaga pendidikan nonformal yang menyelenggarakan pendidikan kesetaraan: Paket A (setara SD/MI), Paket B (setara SMP/MTs), dan Paket C (setara SMA/MA). PKBM Swastika terakreditasi B oleh BAN PAUD & PNF, dan ijazahnya resmi serta diakui secara nasional, setara dengan ijazah sekolah formal.",
    category: "Umum",
  },
  {
    id: "faq-2",
    question: "Siapa saja yang bisa mendaftar? Apakah ada batasan usia?",
    answer:
      "Siapa pun yang ingin menyelesaikan pendidikan dasar atau menengah bisa mendaftar — anak putus sekolah, remaja, orang dewasa, hingga lansia. Tidak ada batas usia maksimal.",
    category: "Pendaftaran",
  },
  {
    id: "faq-3",
    question: "Berapa biayanya? Apakah bisa dicicil atau ada beasiswa?",
    answer:
      "Biaya belajar terjangkau dan bisa dicicil. Kami juga menyediakan subsidi dan beasiswa bagi peserta dari keluarga yang membutuhkan. Hubungi kami untuk konsultasi gratis tentang rincian biaya.",
    category: "Biaya",
  },
  {
    id: "faq-4",
    question: "Berapa lama waktu belajarnya?",
    answer:
      "Program Paket A, B, dan C umumnya ditempuh dalam 2–3 tahun, tergantung jenjang dan riwayat pendidikan terakhir. Kursus keterampilan berlangsung sekitar 3–6 bulan.",
    category: "Program",
  },
  {
    id: "faq-5",
    question: "Apakah bisa belajar sambil bekerja?",
    answer:
      "Bisa. Jadwal kami fleksibel — tersedia kelas pagi, sore, dan akhir pekan — sehingga cocok untuk kamu yang bekerja atau mengurus keluarga.",
    category: "Jadwal",
  },
  {
    id: "faq-6",
    question: "Setelah lulus Paket C, bisa lanjut kuliah atau kerja?",
    answer:
      "Tentu. Ijazah Paket C setara SMA/MA, sehingga bisa dipakai untuk mendaftar ke perguruan tinggi negeri maupun swasta, mengikuti seleksi CPNS, atau melamar pekerjaan di sektor formal.",
    category: "Program",
  },
];
