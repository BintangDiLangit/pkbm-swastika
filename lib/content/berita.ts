import { cache } from "react";
import { prisma } from "@/lib/prisma";

export type BeritaDetail = {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  author: string | null;
  category: string | null;
  image: string | null;
  date: string;
};

export type BeritaSummary = Pick<BeritaDetail, "id" | "title" | "excerpt" | "category" | "image" | "date">;

/** Tanggal tampilan: kolom `date` bila diisi admin, selain itu tanggal dibuat. */
export function formatBeritaDate(date: string | null, createdAt: Date) {
  return date ?? createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Satu berita berdasarkan id. Dibungkus `cache` supaya generateMetadata dan halaman
 * memakai satu query yang sama. Mengembalikan null bila tidak ada / DB bermasalah.
 */
export const getBeritaById = cache(async (id: string): Promise<BeritaDetail | null> => {
  try {
    const b = await prisma.berita.findUnique({ where: { id } });
    if (!b) return null;
    return {
      id: b.id,
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      author: b.author,
      category: b.category,
      image: b.image,
      date: formatBeritaDate(b.date, b.createdAt),
    };
  } catch (e) {
    console.error("[content/berita] getBeritaById failed:", e instanceof Error ? e.message : e);
    return null;
  }
});

/** Berita terbaru selain `excludeId`, untuk bagian "Berita Lainnya". */
export async function getOtherBerita(excludeId: string, take = 3): Promise<BeritaSummary[]> {
  try {
    const rows = await prisma.berita.findMany({
      where: { id: { not: excludeId } },
      orderBy: { createdAt: "desc" },
      take,
      select: { id: true, title: true, excerpt: true, category: true, image: true, date: true, createdAt: true },
    });
    return rows.map(({ createdAt, ...b }) => ({ ...b, date: formatBeritaDate(b.date, createdAt) }));
  } catch (e) {
    console.error("[content/berita] getOtherBerita failed:", e instanceof Error ? e.message : e);
    return [];
  }
}
