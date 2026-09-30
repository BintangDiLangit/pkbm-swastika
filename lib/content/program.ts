// Pola belajar & jadwal program kesetaraan. Dipakai bersama oleh /program dan
// section "Biaya & Jadwal" di beranda supaya informasinya selalu sama.

export const WEEKLY_SESSIONS = [
  { title: "Tatap Muka", description: "Belajar di kelas bersama tutor" },
  { title: "Tugas / Praktik", description: "Mengerjakan tugas atau praktik materi" },
  { title: "Belajar Mandiri", description: "Tugas atau belajar mandiri di rumah" },
] as const;

export const WEEKLY_SUMMARY = "3x seminggu: 1x tatap muka, 1x tugas/praktik, 1x belajar mandiri";

export const CLASS_TIMES = [
  { program: "Paket A", time: "Sore hari (16.00–19.00)" },
  { program: "Paket B", time: "Sore/Malam hari" },
  { program: "Paket C", time: "Sore/Malam hari" },
] as const;

export const FEE_SUMMARY = "Biaya terjangkau";
