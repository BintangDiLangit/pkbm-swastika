import BeritaClient from "./BeritaClient";

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

export default function BeritaPage() {
  return <BeritaClient />;
}
