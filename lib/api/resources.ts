import { prisma } from "@/lib/prisma";
import { activeValue, optionalText, orderValue, type CrudResource } from "./crud";

// Konfigurasi konten CMS standar. Menambah konten baru cukup: model di
// prisma/schema.prisma + satu entri di sini + dua file route 3 baris.

export const programResource: CrudResource = {
  label: "Program",
  delegate: () => prisma.program as never,
  required: { fields: ["code", "title", "description"], message: "Code, title, dan description wajib diisi" },
  toData: (b) => ({
    code: b.code,
    title: b.title,
    subtitle: optionalText(b.subtitle),
    description: b.description,
    features: Array.isArray(b.features) ? b.features : [],
    image: optionalText(b.image),
    duration: optionalText(b.duration),
    badge: optionalText(b.badge),
    order: orderValue(b.order),
    active: activeValue(b.active),
  }),
};

export const statResource: CrudResource = {
  label: "Statistik",
  delegate: () => prisma.stat as never,
  required: { fields: ["label", "value"], message: "Label dan value wajib diisi" },
  toData: (b) => ({
    label: b.label,
    value: b.value,
    caption: optionalText(b.caption),
    icon: optionalText(b.icon),
    order: orderValue(b.order),
    active: activeValue(b.active),
  }),
};

export const testimonialResource: CrudResource = {
  label: "Testimoni",
  delegate: () => prisma.testimonial as never,
  required: { fields: ["name", "quote"], message: "Nama dan kutipan wajib diisi" },
  toData: (b) => ({
    name: b.name,
    role: optionalText(b.role),
    quote: b.quote,
    avatar: optionalText(b.avatar),
    rating: typeof b.rating === "number" ? b.rating : 5,
    order: orderValue(b.order),
    active: activeValue(b.active),
  }),
};

export const faqResource: CrudResource = {
  label: "FAQ",
  delegate: () => prisma.faq as never,
  required: { fields: ["question", "answer"], message: "Pertanyaan dan jawaban wajib diisi" },
  toData: (b) => ({
    question: b.question,
    answer: b.answer,
    category: optionalText(b.category),
    order: orderValue(b.order),
    active: activeValue(b.active),
  }),
};

export const destinationResource: CrudResource = {
  label: "Destinasi",
  delegate: () => prisma.alumniDestination as never,
  required: { fields: ["name"], message: "Nama wajib diisi" },
  toData: (b) => ({
    name: b.name,
    type: optionalText(b.type) ?? "kampus",
    logo: optionalText(b.logo),
    order: orderValue(b.order),
    active: activeValue(b.active),
  }),
};

export const recognitionResource: CrudResource = {
  label: "Akreditasi",
  delegate: () => prisma.recognition as never,
  required: { fields: ["title"], message: "Title wajib diisi" },
  toData: (b) => ({
    title: b.title,
    issuer: optionalText(b.issuer),
    description: optionalText(b.description),
    logo: optionalText(b.logo),
    order: orderValue(b.order),
    active: activeValue(b.active),
  }),
};

export const quickLinkResource: CrudResource = {
  label: "Quick link",
  delegate: () => prisma.quickLink as never,
  required: { fields: ["label", "href"], message: "Label dan href wajib diisi" },
  toData: (b) => ({
    label: b.label,
    href: b.href,
    icon: optionalText(b.icon),
    external: !!b.external,
    order: orderValue(b.order),
    active: activeValue(b.active),
  }),
};
