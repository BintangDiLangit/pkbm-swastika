import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "PKBM SWASTIKA - Pusat Kegiatan Belajar Masyarakat Malang",
  description: "PKBM SWASTIKA menyelenggarakan pendidikan nonformal setara SD (Paket A), SMP (Paket B), dan SMA (Paket C) di Malang",
  keywords: "PKBM, Paket A, Paket B, Paket C, Pendidikan Nonformal, Malang, SWASTIKA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
