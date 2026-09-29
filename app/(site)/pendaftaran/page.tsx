import PendaftaranClient from "./PendaftaranClient";

export const metadata = {
  title: "Pendaftaran PKBM SWASTIKA - Daftar Online Program Pendidikan di Malang",
  description: "Daftar online di PKBM SWASTIKA Malang. Program Paket A, B, C dengan formulir pendaftaran mudah. Persyaratan, biaya, dan informasi lengkap pendaftaran pendidikan nonformal.",
  keywords: "pendaftaran PKBM SWASTIKA, daftar online PKBM Malang, pendaftaran Paket A B C, formulir pendaftaran PKBM, syarat daftar PKBM",
  openGraph: {
    title: "Pendaftaran Online PKBM SWASTIKA - Daftar Sekarang",
    description: "Proses pendaftaran mudah dan cepat di PKBM SWASTIKA Malang. Daftar program pendidikan nonformal Paket A, B, C secara online.",
    type: "website",
  },
};

export default function PendaftaranPage() {
  return <PendaftaranClient />;
}
