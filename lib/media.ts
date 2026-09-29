import { prisma } from "./prisma";

const MEDIA_URL_PREFIX = "/api/media/";

/** URL publik untuk file di tabel media. */
export function mediaUrl(id: string) {
  return `${MEDIA_URL_PREFIX}${id}`;
}

/**
 * Hapus file media yang dirujuk sebuah URL gambar (mis. saat foto galeri dihapus
 * atau gambarnya diganti). URL selain /api/media/... (path statis, URL luar) diabaikan.
 */
export async function deleteMediaByUrl(url: string | null | undefined) {
  if (!url?.startsWith(MEDIA_URL_PREFIX)) return;
  const id = url.slice(MEDIA_URL_PREFIX.length);
  await prisma.media.deleteMany({ where: { id } });
}
