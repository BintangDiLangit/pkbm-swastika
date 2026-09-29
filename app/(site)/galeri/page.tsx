import GalleryClient from "./GalleryClient";

export const metadata = {
  title: "Galeri PKBM SWASTIKA - Dokumentasi Kegiatan & Acara di Malang",
  description: "Lihat galeri foto PKBM SWASTIKA: kegiatan belajar Paket A B C, pelatihan keterampilan, workshop kewirausahaan, wisuda, dan berbagai acara pendidikan di Malang.",
  keywords: "galeri PKBM SWASTIKA, foto kegiatan PKBM Malang, dokumentasi pendidikan, acara PKBM, workshop PKBM, wisuda PKBM",
  openGraph: {
    title: "Galeri Kegiatan PKBM SWASTIKA - Foto & Dokumentasi",
    description: "Koleksi foto kegiatan pembelajaran, pelatihan, dan acara di PKBM SWASTIKA Malang.",
    type: "website",
  },
};

export default function GaleriPage() {
  return <GalleryClient />;
}
