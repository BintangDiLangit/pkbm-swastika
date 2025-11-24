import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://pkbmswastika.com"),
  title: "PKBM SWASTIKA - Pusat Kegiatan Belajar Masyarakat Malang",
  description: "PKBM SWASTIKA menyelenggarakan pendidikan nonformal setara SD (Paket A), SMP (Paket B), dan SMA (Paket C) di Malang. Daftar sekarang dan wujudkan kesempatan belajar untuk semua.",
  keywords: "PKBM, Paket A, Paket B, Paket C, Pendidikan Nonformal, Malang, SWASTIKA, Sekolah Dewasa, Pendidikan Kesetaraan",
  authors: [{ name: "PKBM SWASTIKA" }],
  creator: "PKBM SWASTIKA",
  publisher: "PKBM SWASTIKA",
  openGraph: {
    title: "PKBM SWASTIKA - Pendidikan Nonformal Terpercaya di Malang",
    description: "Bergabunglah dengan PKBM SWASTIKA untuk pendidikan kesetaraan SD, SMP, dan SMA. Program berkualitas dengan fasilitas modern.",
    url: "https://pkbmswastika.com",
    siteName: "PKBM SWASTIKA",
    images: [
      {
        url: "/images/gedung.jpg",
        width: 1200,
        height: 630,
        alt: "Gedung PKBM SWASTIKA di Malang",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PKBM SWASTIKA - Pendidikan Nonformal Terpercaya di Malang",
    description: "Bergabunglah dengan PKBM SWASTIKA untuk pendidikan kesetaraan SD, SMP, dan SMA. Program berkualitas dengan fasilitas modern.",
    images: ["/images/gedung.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "PKBM SWASTIKA",
              "description": "PKBM SWASTIKA adalah Pusat Kegiatan Belajar Masyarakat yang menyelenggarakan pendidikan nonformal setara SD (Paket A), SMP (Paket B), dan SMA (Paket C) di Malang",
              "url": "https://pkbmswastika.com",
              "logo": "https://pkbmswastika.com/images/logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Perum Argo Griyatama Regency B5, Boro, Tawangargo",
                "addressLocality": "Karang Ploso",
                "addressRegion": "Jawa Timur",
                "postalCode": "65152",
                "addressCountry": "ID"
              },
              "telephone": "+62-851-0475-5189",
              "email": "info@pkbmswastika.com",
              "sameAs": [
                "https://facebook.com/pkbmswastika",
                "https://instagram.com/pkbmswastika",
                "https://youtube.com/@pkbmswastika"
              ],
              "educationalCredentialAwarded": [
                "Paket A (Setara SD)",
                "Paket B (Setara SMP)",
                "Paket C (Setara SMA)"
              ]
            }),
          }}
        />
      </head>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
