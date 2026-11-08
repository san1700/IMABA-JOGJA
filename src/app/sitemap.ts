import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import { SITEMAP_POSTS_QUERY, type SitemapPost } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://imabayogyakarta.org'
  const defaultDate = '2026-03-01T00:00:00.000Z'

  // Rute-rute statis utama portal IMABA Jogja
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: defaultDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: defaultDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/informasi-kampus`,
      lastModified: defaultDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/karya-kader`,
      lastModified: defaultDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/profil`,
      lastModified: defaultDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/puteri-imaba`,
      lastModified: defaultDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Ambil data artikel dari Sanity untuk sitemap dinamis
  const posts = await sanityFetch<SitemapPost[]>({
    query: SITEMAP_POSTS_QUERY,
    fallback: [
      {
        slug: 'pelantikan-pengurus-dpw-imaba-diy-2026',
        section: 'berita',
        publishedAt: '2026-01-15T00:00:00.000Z',
      },
      {
        slug: 'agenda-rutin-bimtren-2026',
        section: 'berita',
        publishedAt: '2026-02-01T00:00:00.000Z',
      },
      {
        slug: 'relevansi-tradisi-pesantren-era-digital',
        section: 'karya',
        publishedAt: '2026-01-20T00:00:00.000Z',
      },
    ],
  })

  const postRoutes: MetadataRoute.Sitemap = (posts || []).map((post) => {
    let pathPrefix = '/berita'
    if (post.section === 'karya') pathPrefix = '/karya-kader'
    else if (post.section === 'info') pathPrefix = '/informasi-kampus'

    return {
      url: `${baseUrl}${pathPrefix}/${post.slug}`,
      lastModified: post._updatedAt || post.publishedAt || defaultDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  })

  return [...staticRoutes, ...postRoutes]
}

