import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // Foto unggahan disajikan lewat /api/media/, jadi tetap boleh dirayapi.
      allow: ['/', '/api/media/'],
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
