import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Newspaper } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  POSTS_QUERY,
  CATEGORIES_QUERY,
  FALLBACK_POSTS,
  type Post,
  type Category,
} from '@/sanity/lib/queries'
import { PostFilterTabs } from '@/components/post-filter-tabs'

export const metadata: Metadata = {
  title: 'Berita & Agenda DPW',
  description:
    'Kumpulan berita terkini, liputan kegiatan pengkaderan, serta jadwal agenda resmi DPW IMABA Daerah Istimewa Yogyakarta.',
  alternates: {
    canonical: '/berita',
  },
  openGraph: {
    title: 'Berita & Agenda DPW IMABA Yogyakarta',
    description:
      'Kumpulan berita terkini, liputan kegiatan pengkaderan, serta jadwal agenda resmi DPW IMABA Daerah Istimewa Yogyakarta.',
    url: '/berita',
  },
}

interface BeritaPageProps {
  searchParams: Promise<{ kategori?: string }>
}

async function BeritaContent({ searchParams }: BeritaPageProps) {
  const resolvedParams = await searchParams
  const categoryFilter = resolvedParams.kategori || null

  // Fetch dari Sanity dengan fallback
  const posts = await sanityFetch<Post[]>({
    query: POSTS_QUERY,
    params: { section: 'berita', category: categoryFilter },
    fallback: FALLBACK_POSTS,
  })

  const categories = await sanityFetch<Category[]>({
    query: CATEGORIES_QUERY,
    params: { section: 'berita' },
    fallback: [
      { _id: 'all', title: 'Semua Berita', slug: '' },
      { _id: 'agenda', title: 'Agenda DPW', slug: 'agenda' },
      { _id: 'liputan', title: 'Liputan Acara', slug: 'liputan' },
      { _id: 'kajian', title: 'Kajian & Dakwah', slug: 'kajian' },
    ],
  })

  const displayPosts = posts && posts.length > 0 ? posts : FALLBACK_POSTS

  return (
    <PostFilterTabs
      posts={displayPosts}
      categories={categories}
      hrefPrefix="/berita"
      initialCategory={categoryFilter}
    />
  )
}

export default function BeritaPage({ searchParams }: BeritaPageProps) {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header Banner Kanal */}
      <section className="relative w-full bg-[#14120E] text-white py-16 sm:py-24 border-b border-white/10 overflow-hidden">
        {/* Ambient Glow */}
        <div
          className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-eyebrow text-white/90 mb-4">
            <Newspaper className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Kanal Informasi & Publikasi</span>
          </div>

          <h1 className="font-heading font-extrabold text-[clamp(32px,1.8rem+2vw,52px)] tracking-tight text-white leading-tight mb-3">
            Berita & Agenda DPW
          </h1>

          <p className="font-sans text-lead text-white/85 max-w-[60ch] leading-relaxed">
            Ikuti warta terbaru seputar pergerakan santri Bata-Bata di Yogyakarta, rilis pers kegiatan
            organisasi, serta jadwal agenda resmi pengurus.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Suspense
          fallback={
            <div className="w-full py-16 text-center text-muted-foreground animate-pulse">
              Memuat arsip berita...
            </div>
          }
        >
          <BeritaContent searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  )
}
