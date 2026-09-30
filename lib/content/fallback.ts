import type { LandingFaq, LandingGalleryItem } from "./landing";

export const FALLBACK_HERO = {
  title: "PKBM Swastika - Pendidikan untuk Semua",
  subtitle: "Kejar Paket A, B, dan C di Kabupaten Malang dengan jadwal belajar fleksibel",
  image: "/images/gedung.jpg",
};


// Foto dokumentasi asli di public/images, dipakai selama galeri di /admin masih kosong.
export const FALLBACK_GALLERY: LandingGalleryItem[] = [
  { id: "kelas", title: "Kegiatan belajar di kelas", image: "/images/kelas.jpeg" },
  { id: "jamu", title: "Praktik membuat jamu", image: "/images/jamu.jpeg" },
  { id: "juara", title: "Raihan medali tingkat nasional", image: "/images/juara.jpg" },
  { id: "diskusi", title: "Diskusi kelompok bersama tutor", image: "/images/diskusi.jpg" },
  { id: "pondok", title: "Pondok Ramadhan", image: "/images/pondok.jpg" },
  { id: "salad", title: "Praktik membuat salad buah", image: "/images/salad2.jpg" },
  { id: "upk", title: "Pelaksanaan ujian", image: "/images/upk.jpg" },
  { id: "senam", title: "Senam bersama", image: "/images/senam.JPG" },
  { id: "ujian", title: "Foto bersama warga belajar", image: "/images/ujian.jpg" },
  { id: "workshop", title: "Workshop perangkat pembelajaran", image: "/images/workshop.jpg" },
  { id: "visit", title: "Kunjungan tamu", image: "/images/visit.jpg" },
  { id: "coba", title: "Kegiatan bersama tutor", image: "/images/coba.jpg" },
  { id: "rapat", title: "Rapat koordinasi", image: "/images/rapat.jpg" },
  { id: "upk2", title: "Suasana ujian", image: "/images/upk2.jpg" },
];

// ---------------------------------------------------------------------------
// Konten statis untuk homepage.
// Data dari database (dikelola via /admin) selalu diprioritaskan; daftar di
// bawah hanya dipakai sebagai fallback agar section tidak hilang saat DB kosong.
// ---------------------------------------------------------------------------

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
    question: "Berapa biaya belajarnya?",
    answer:
      "Biaya belajar di PKBM Swastika terjangkau. Rincian biaya untuk setiap program disampaikan langsung oleh admin saat konsultasi lewat WhatsApp.",
    category: "Biaya",
  },
  {
    id: "faq-4",
    question: "Berapa lama waktu belajarnya?",
    answer:
      "Tergantung kelas terakhir yang pernah diselesaikan. Paket A mencakup kelas 1–6, Paket B kelas 7–9, dan Paket C kelas 10–12. Peserta yang pernah sekolah melanjutkan dari kelas berikutnya sesuai ijazah/rapor terakhir, jadi cukup menempuh kelas yang tersisa. Kelas awal dipastikan saat verifikasi berkas. Kursus keterampilan berlangsung sekitar 3–6 bulan.",
    category: "Program",
  },
  {
    id: "faq-5",
    question: "Apakah bisa belajar sambil bekerja?",
    answer:
      "Bisa. Belajar 3x seminggu: 1x tatap muka bersama tutor, 1x tugas/praktik, dan 1x tugas atau belajar mandiri. Kelas diadakan sore dan malam hari (Paket A pukul 16.00–19.00), sehingga cocok untuk kamu yang bekerja atau mengurus keluarga.",
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
