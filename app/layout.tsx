import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { organizationJsonLd, siteConfig } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "PKBM SWASTIKA - Pusat Kegiatan Belajar Masyarakat Malang",
  description: "PKBM SWASTIKA menyelenggarakan pendidikan nonformal setara SD (Paket A), SMP (Paket B), dan SMA (Paket C) di Malang. Daftar sekarang dan wujudkan kesempatan belajar untuk semua.",
  keywords: "PKBM, Paket A, Paket B, Paket C, Pendidikan Nonformal, Malang, SWASTIKA, Sekolah Dewasa, Pendidikan Kesetaraan",
  authors: [{ name: "PKBM SWASTIKA" }],
  creator: "PKBM SWASTIKA",
  publisher: "PKBM SWASTIKA",
  openGraph: {
    title: "PKBM SWASTIKA - Pendidikan Nonformal Terpercaya di Malang",
    description: "Bergabunglah dengan PKBM SWASTIKA untuk pendidikan kesetaraan SD, SMP, dan SMA. Program berkualitas dengan fasilitas modern.",
    url: siteConfig.url,
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
  // Verifikasi Google Search Console (properti https://pkbmswastika.sch.id/). Jangan dihapus.
  verification: {
    google: "fjrQVTXN289dXQeJtOMwJto5cIFfF-J8L01Z9XqzA4I",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
