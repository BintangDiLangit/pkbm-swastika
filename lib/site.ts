// Satu-satunya sumber info situs (nama, kontak, jam buka, media sosial, menu).
// Ubah di sini dan header, footer, halaman kontak, pendaftaran, serta SEO ikut berubah.
// Nilai di Admin > Pengaturan (tabel site_settings) tetap diprioritaskan di beranda.

export const siteConfig = {
  name: "PKBM Swastika",
  legalName: "PKBM SWASTIKA",
  tagline: "Pendidikan untuk Semua",
  description:
    "PKBM SWASTIKA adalah Pusat Kegiatan Belajar Masyarakat yang menyelenggarakan pendidikan nonformal setara SD (Paket A), SMP (Paket B), dan SMA (Paket C) di Malang",
  url: "https://pkbmswastika.com",
  logo: "/images/logo.png",

  contact: {
    address: {
      street: "Perum Argo Griyatama Regency B5, Boro, Tawangargo",
      district: "Kec. Karang Ploso",
      locality: "Karang Ploso",
      city: "Kabupaten Malang",
      region: "Jawa Timur",
      postalCode: "65152",
      country: "ID",
    },
    // TODO: nomor telepon kantor masih placeholder — ganti dengan nomor asli
    phones: ["(0341) 123-4567", "(0341) 123-4568"],
    whatsapp: "6285104755189",
    emails: ["info@pkbmswastika.com", "pendaftaran@pkbmswastika.com"],
    mapsUrl: "https://maps.google.com/?q=Perum+Argo+Griyayama+Regency+B5+Boro+Tawangargo+Karang+Ploso+Malang",
    hours: [
      { days: "Senin - Jumat", time: "08:00 - 16:00 WIB" },
      { days: "Sabtu", time: "08:00 - 13:00 WIB" },
      { days: "Minggu & Libur Nasional", time: "Tutup" },
    ],
  },

  social: [
    { platform: "facebook", label: "Facebook", href: "https://facebook.com/pkbmswastika" },
    { platform: "instagram", label: "Instagram", href: "https://instagram.com/pkbmswastika" },
    { platform: "youtube", label: "YouTube", href: "https://youtube.com/@pkbmswastika" },
  ],

  nav: [
    { name: "Beranda", path: "/" },
    { name: "Tentang", path: "/tentang" },
    { name: "Program", path: "/program" },
    { name: "Galeri", path: "/galeri" },
    { name: "Berita", path: "/berita" },
    { name: "Kontak", path: "/kontak" },
    { name: "Pendaftaran", path: "/pendaftaran" },
  ],
} as const;

export type SocialPlatform = (typeof siteConfig.social)[number]["platform"];

const c = siteConfig.contact;

/** Alamat lengkap satu baris. */
export const fullAddress = `${c.address.street}, ${c.address.district}, ${c.address.city}, ${c.address.region} ${c.address.postalCode}`;

/** Nomor telepon utama & email utama. */
export const primaryPhone = c.phones[0];
export const primaryEmail = c.emails[0];

/** "6285104755189" → "+62 851-0475-5189" */
export function formatWhatsapp(number: string = c.whatsapp) {
  const digits = number.replace(/\D/g, "");
  return `+${digits.replace(/^(\d{2})(\d{3})(\d{4})(\d+)/, "$1 $2-$3-$4")}`;
}

/** Link wa.me, opsional dengan pesan pembuka. */
export function whatsappLink(message?: string, number: string = c.whatsapp) {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Link tel: dari nomor berformat bebas. */
export function telLink(phone: string) {
  return `tel:${phone.replace(/\D/g, "")}`;
}

/** Ringkasan jam buka satu baris untuk footer. */
export const hoursSummary = c.hours
  .filter((h) => h.time !== "Tutup")
  .map((h) => `${h.days} ${h.time}`)
  .join(", ");

/** Data terstruktur schema.org untuk <head>. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.address.street,
      addressLocality: c.address.locality,
      addressRegion: c.address.region,
      postalCode: c.address.postalCode,
      addressCountry: c.address.country,
    },
    telephone: formatWhatsapp().replace(/ /g, "-"),
    email: primaryEmail,
    sameAs: siteConfig.social.map((s) => s.href),
    educationalCredentialAwarded: ["Paket A (Setara SD)", "Paket B (Setara SMP)", "Paket C (Setara SMA)"],
  };
}
