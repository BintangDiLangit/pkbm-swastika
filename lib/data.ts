import { prisma } from "./prisma";

export type LandingProgram = {
  id: string;
  code: string;
  title: string;
  subtitle: string | null;
  description: string;
  features: string[];
  image: string | null;
  duration: string | null;
  badge: string | null;
};

export type LandingStat = {
  id: string;
  label: string;
  value: string;
  caption: string | null;
  icon: string | null;
};

export type LandingTestimonial = {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  avatar: string | null;
  rating: number;
};

export type LandingFaq = {
  id: string;
  question: string;
  answer: string;
  category: string | null;
};

export type LandingActivity = {
  id: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  image: string | null;
  date: string | null;
};

export type LandingDestination = {
  id: string;
  name: string;
  type: string;
  logo: string | null;
};

export type LandingRecognition = {
  id: string;
  title: string;
  issuer: string | null;
  description: string | null;
  logo: string | null;
};

export type LandingQuickLink = {
  id: string;
  label: string;
  href: string;
  icon: string | null;
  external: boolean;
};

export type SiteSettings = Record<string, string>;

export type LandingData = {
  programs: LandingProgram[];
  stats: LandingStat[];
  testimonials: LandingTestimonial[];
  faqs: LandingFaq[];
  activities: LandingActivity[];
  destinations: LandingDestination[];
  recognitions: LandingRecognition[];
  quickLinks: LandingQuickLink[];
  settings: SiteSettings;
};

const safe = async <T,>(fn: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await fn();
  } catch (e) {
    console.error("[lib/data] DB fetch failed, using fallback:", e instanceof Error ? e.message : e);
    return fallback;
  }
};

export async function getLandingData(): Promise<LandingData> {
  const [
    programs,
    stats,
    testimonials,
    faqs,
    activities,
    destinations,
    recognitions,
    quickLinks,
    settingsRaw,
  ] = await Promise.all([
    safe(
      () =>
        prisma.program.findMany({
          where: { active: true },
          orderBy: { order: "asc" },
        }),
      [] as Awaited<ReturnType<typeof prisma.program.findMany>>
    ),
    safe(
      () =>
        prisma.stat.findMany({
          where: { active: true },
          orderBy: { order: "asc" },
        }),
      [] as Awaited<ReturnType<typeof prisma.stat.findMany>>
    ),
    safe(
      () =>
        prisma.testimonial.findMany({
          where: { active: true },
          orderBy: { order: "asc" },
        }),
      [] as Awaited<ReturnType<typeof prisma.testimonial.findMany>>
    ),
    safe(
      () =>
        prisma.faq.findMany({
          where: { active: true },
          orderBy: { order: "asc" },
        }),
      [] as Awaited<ReturnType<typeof prisma.faq.findMany>>
    ),
    safe(
      () =>
        prisma.berita.findMany({
          take: 3,
          orderBy: { createdAt: "desc" },
        }),
      [] as Awaited<ReturnType<typeof prisma.berita.findMany>>
    ),
    safe(
      () =>
        prisma.alumniDestination.findMany({
          where: { active: true },
          orderBy: { order: "asc" },
        }),
      [] as Awaited<ReturnType<typeof prisma.alumniDestination.findMany>>
    ),
    safe(
      () =>
        prisma.recognition.findMany({
          where: { active: true },
          orderBy: { order: "asc" },
        }),
      [] as Awaited<ReturnType<typeof prisma.recognition.findMany>>
    ),
    safe(
      () =>
        prisma.quickLink.findMany({
          where: { active: true },
          orderBy: { order: "asc" },
        }),
      [] as Awaited<ReturnType<typeof prisma.quickLink.findMany>>
    ),
    safe(
      () => prisma.siteSetting.findMany(),
      [] as Awaited<ReturnType<typeof prisma.siteSetting.findMany>>
    ),
  ]);

  const settings: SiteSettings = {};
  for (const s of settingsRaw) settings[s.key] = s.value;

  return {
    programs: programs.map((p) => ({
      id: p.id,
      code: p.code,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      features: p.features ?? [],
      image: p.image,
      duration: p.duration,
      badge: p.badge,
    })),
    stats: stats.map((s) => ({
      id: s.id,
      label: s.label,
      value: s.value,
      caption: s.caption,
      icon: s.icon,
    })),
    testimonials: testimonials.map((t) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      quote: t.quote,
      avatar: t.avatar,
      rating: t.rating,
    })),
    faqs: faqs.map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: f.category,
    })),
    activities: activities.map((b) => ({
      id: b.id,
      title: b.title,
      excerpt: b.excerpt,
      category: b.category,
      image: b.image,
      date:
        b.date ??
        new Date(b.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
    })),
    destinations: destinations.map((d) => ({
      id: d.id,
      name: d.name,
      type: d.type,
      logo: d.logo,
    })),
    recognitions: recognitions.map((r) => ({
      id: r.id,
      title: r.title,
      issuer: r.issuer,
      description: r.description,
      logo: r.logo,
    })),
    quickLinks: quickLinks.map((q) => ({
      id: q.id,
      label: q.label,
      href: q.href,
      icon: q.icon,
      external: q.external,
    })),
    settings,
  };
}

export const FALLBACK_HERO = {
  title: "PKBM Swastika - Pendidikan untuk Semua",
  subtitle: "Kesempatan belajar tanpa batas usia dan latar belakang",
  image: "/images/gedung.jpg",
};

export const FALLBACK_CONTACT = {
  address:
    "Perum Argo Griyatama Regency B5, Boro, Tawangargo, Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152",
  phone: "(0341) 123-4567",
  whatsapp: "6285104755189",
  email: "info@pkbmswastika.com",
};
