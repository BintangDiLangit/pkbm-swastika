import { prisma } from "@/lib/prisma";

// Data beranda diambil dari database (dikelola via /admin). Tiap query dibungkus
// `safe` supaya beranda tetap tampil (dengan konten cadangan) saat DB bermasalah.

const safe = async <T,>(fn: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await fn();
  } catch (e) {
    console.error("[content/landing] DB fetch failed, using fallback:", e instanceof Error ? e.message : e);
    return fallback;
  }
};

const activeOrdered = { where: { active: true }, orderBy: { order: "asc" as const } };

const programSelect = {
  id: true, code: true, title: true, subtitle: true, description: true,
  features: true, image: true, duration: true, badge: true,
} as const;
const statSelect = { id: true, label: true, value: true, caption: true, icon: true } as const;
const testimonialSelect = { id: true, name: true, role: true, quote: true, avatar: true, rating: true } as const;
const faqSelect = { id: true, question: true, answer: true, category: true } as const;
const destinationSelect = { id: true, name: true, type: true, logo: true } as const;
const galleryTake = 24; // beranda hanya cuplikan; galeri lengkap di /galeri

export type LandingProgram = {
  id: string; code: string; title: string; subtitle: string | null; description: string;
  features: string[]; image: string | null; duration: string | null; badge: string | null;
};
export type LandingStat = { id: string; label: string; value: string; caption: string | null; icon: string | null };
export type LandingTestimonial = {
  id: string; name: string; role: string | null; quote: string; avatar: string | null; rating: number;
};
export type LandingFaq = { id: string; question: string; answer: string; category: string | null };
export type LandingActivity = {
  id: string; title: string; excerpt: string | null; category: string | null; image: string | null; date: string | null;
};
export type LandingDestination = { id: string; name: string; type: string; logo: string | null };
export type LandingGalleryItem = { id: string; title: string; image: string };
export type SiteSettings = Record<string, string>;

export type LandingData = {
  programs: LandingProgram[];
  stats: LandingStat[];
  testimonials: LandingTestimonial[];
  faqs: LandingFaq[];
  activities: LandingActivity[];
  destinations: LandingDestination[];
  gallery: LandingGalleryItem[];
  settings: SiteSettings;
};

const formatDate = (d: Date) =>
  new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

export async function getLandingData(): Promise<LandingData> {
  const [programs, stats, testimonials, faqs, berita, destinations, gallery, settingsRaw] = await Promise.all([
    safe(() => prisma.program.findMany({ ...activeOrdered, select: programSelect }), []),
    safe(() => prisma.stat.findMany({ ...activeOrdered, select: statSelect }), []),
    safe(() => prisma.testimonial.findMany({ ...activeOrdered, select: testimonialSelect }), []),
    safe(() => prisma.faq.findMany({ ...activeOrdered, select: faqSelect }), []),
    safe(
      () =>
        prisma.berita.findMany({
          take: 3,
          orderBy: { createdAt: "desc" },
          select: { id: true, title: true, excerpt: true, category: true, image: true, date: true, createdAt: true },
        }),
      []
    ),
    safe(() => prisma.alumniDestination.findMany({ ...activeOrdered, select: destinationSelect }), []),
    safe(
      () =>
        prisma.galeri.findMany({
          take: galleryTake,
          orderBy: { createdAt: "desc" },
          select: { id: true, title: true, image: true },
        }),
      []
    ),
    safe(() => prisma.siteSetting.findMany({ select: { key: true, value: true } }), []),
  ]);

  return {
    programs: programs.map((p) => ({ ...p, features: p.features ?? [] })),
    stats,
    testimonials,
    faqs,
    activities: berita.map(({ createdAt, ...b }) => ({ ...b, date: b.date ?? formatDate(createdAt) })),
    destinations,
    gallery,
    settings: Object.fromEntries(settingsRaw.map((s) => [s.key, s.value])),
  };
}
