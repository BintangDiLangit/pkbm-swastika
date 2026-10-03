import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { siteConfig } from '@/lib/site'

// Dibuat ulang tiap jam supaya berita baru ikut masuk sitemap.
export const revalidate = 3600

async function beritaEntries(baseUrl: string): Promise<MetadataRoute.Sitemap> {
  try {
    const rows = await prisma.berita.findMany({
      select: { id: true, updatedAt: true },
      orderBy: { createdAt: 'desc' },
    })
    return rows.map((b) => ({
      url: `${baseUrl}/berita/${b.id}`,
      lastModified: b.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  } catch (e) {
    // DB tidak tersedia (mis. saat build): sitemap tetap berisi halaman statis.
    console.error('[sitemap] gagal ambil berita:', e instanceof Error ? e.message : e)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/program`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pendaftaran`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/galeri`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...(await beritaEntries(baseUrl)),
  ]
}
