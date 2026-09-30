// Info pendaftaran yang dipakai bersama oleh formulir (/pendaftaran) dan
// section "Alur Pendaftaran" (beranda & /pendaftaran), supaya daftar dokumen
// yang ditampilkan selalu sama dengan berkas yang diminta formulir.

export const REGISTRATION_PERIOD = "Pendaftaran dibuka sepanjang tahun";

// Daftar berkas yang wajib diunggah
export const BERKAS_FIELDS = [
  { key: "fotoKk", label: "Fotocopy Kartu Keluarga (KK)" },
  { key: "fotoKtp", label: "Fotocopy KTP" },
  { key: "pasFoto", label: "Pasfoto 3x4" },
  { key: "fotoIjazah", label: "Fotocopy Ijazah / Raport" },
] as const;

export type BerkasKey = (typeof BERKAS_FIELDS)[number]["key"];

export const REGISTRATION_STEPS = [
  {
    title: "Pilih Program",
    description: "Tentukan jenjang yang ingin ditempuh: Paket A (setara SD), Paket B (setara SMP), atau Paket C (setara SMA).",
  },
  {
    title: "Konsultasi",
    description: "Tanyakan jenjang, jadwal, dan biaya lewat WhatsApp. Konsultasi gratis tanpa kewajiban mendaftar.",
  },
  {
    title: "Lengkapi Berkas",
    description: "Isi formulir pendaftaran online dan unggah dokumen persyaratan dalam format JPG, PNG, atau PDF.",
  },
  {
    title: "Verifikasi",
    description: "Admin memeriksa berkas, memastikan jenjang serta kelas awal sesuai ijazah/rapor terakhir, lalu menghubungi Anda.",
  },
  {
    title: "Mulai Belajar",
    description: "Ikuti kelas bersama tutor sesuai jadwal program yang dipilih.",
  },
] as const;
