import type { Metadata } from 'next'
import { Feather, PenTool } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/fetch'
import { POSTS_QUERY, CATEGORIES_QUERY, type Post, type Category } from '@/sanity/lib/queries'
import { PostFilterTabs } from '@/components/post-filter-tabs'

export const metadata: Metadata = {
  title: 'Karya Kader | Opini, Esai, Cerpen & Puisi',
  description:
    'Ruang literasi dan dialektika santri Bata-Bata di Yogyakarta. Wadah publikasi opini kritis, esai pemikiran, cerpen santri, dan sajak puisi.',
  alternates: {
    canonical: '/karya-kader',
  },
  openGraph: {
    title: 'Karya Kader IMABA Jogja | Opini, Cerpen & Puisi',
    description:
      'Ruang literasi dan dialektika santri Bata-Bata di Yogyakarta. Wadah publikasi opini kritis, esai pemikiran, cerpen santri, dan sajak puisi.',
    url: '/karya-kader',
  },
}

// Data cadangan karya kader jika Sanity belum diisi
const FALLBACK_KARYA: Post[] = [
  {
    _id: 'karya-1',
    title: 'Menimbang Relevansi Tradisi Pesantren di Era Disrupsi Digital',
    slug: 'relevansi-tradisi-pesantren-era-digital',
    section: 'karya',
    category: { _id: 'cat-opini', title: 'Opini', slug: 'opini' },
    author: { name: 'Ahmad Faiz', role: 'Kader IMABA UIN Sunan Kalijaga' },
    excerpt:
      'Refleksi atas nilai-nilai kesopanan dan ketawaduan pesantren Mambaul Ulum Bata-Bata dalam menghadapi percepatan teknologi kecerdasan buatan.',
    publishedAt: new Date().toISOString(),
    featured: true,
  },
  {
    _id: 'karya-2',
    title: 'Surat dari Sudut Malioboro: Catatan Santri Perantau di Kota Pelajar',
    slug: 'catatan-santri-perantau-malioboro',
    section: 'karya',
    category: { _id: 'cat-cerpen', title: 'Cerpen Santri', slug: 'cerpen' },
    author: { name: 'Nurul Hidayah', role: 'Kader IMABA UNY' },
    excerpt:
      'Sebuah kisah fiksi tentang kerinduan seorang santri pada gemuruh lalaran nadhom Imrithi di tengah gemerlap lampu malam Malioboro.',
    publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    featured: false,
  },
  {
    _id: 'karya-3',
    title: 'Bait-Bait Doa di Bawah Langit Mataram',
    slug: 'bait-bait-doa-langit-mataram',
    section: 'karya',
    category: { _id: 'cat-puisi', title: 'Puisi', slug: 'puisi' },
    author: { name: 'M. Rizqi Pratama', role: 'Kader IMABA UGM' },
    excerpt:
      'Kumpulan sajak tentang perjalanan menuntut ilmu, aroma kitab kuning yang lapuk, dan ikhtiar merajut masa depan di Yogyakarta.',
    publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    featured: false,
  },
]

interface KaryaKaderPageProps {
  searchParams: Promise<{ kategori?: string }>
}

export default async function KaryaKaderPage({ searchParams }: KaryaKaderPageProps) {
  const resolvedParams = await searchParams
  const categoryFilter = resolvedParams.kategori || null

  const posts = await sanityFetch<Post[]>({
    query: POSTS_QUERY,
    params: { section: 'karya', category: categoryFilter },
    fallback: FALLBACK_KARYA,
  })

  const categories = await sanityFetch<Category[]>({
    query: CATEGORIES_QUERY,
    params: { section: 'karya' },
    fallback: [
      { _id: 'all', title: 'Semua Karya', slug: '' },
      { _id: 'opini', title: 'Opini & Esai', slug: 'opini' },
      { _id: 'cerpen', title: 'Cerpen', slug: 'cerpen' },
      { _id: 'puisi', title: 'Puisi', slug: 'puisi' },
    ],
  })

  const displayPosts = posts && posts.length > 0 ? posts : FALLBACK_KARYA

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header Banner Kanal Karya Kader */}
      <section className="relative w-full bg-[#050A2E] text-white py-16 sm:py-24 border-b border-white/10 overflow-hidden">
        <div
          className="absolute top-0 right-1/4 w-96 h-96 bg-[#4F5CF2]/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-white/90 mb-4">
            <Feather className="w-3.5 h-3.5 text-[#F9C80E]" />
            <span>Mimbar Literasi & Pemikiran Santri</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-white mb-4">
            Karya Kader IMABA
          </h1>

          <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            Menghidupkan tradisi literasi pesantren di tengah dinamika akademis Yogyakarta.
            Wadah ekspresi gagasan kritis, renungan sastra, dan karya tulis kader.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <PostFilterTabs
          posts={displayPosts}
          categories={categories}
          hrefPrefix="/karya-kader"
          initialCategory={categoryFilter}
        />

        {/* CTA Kirim Tulisan */}
        <div className="mt-20 p-8 sm:p-12 rounded-[32px] bg-card border border-border flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
              <PenTool className="w-3.5 h-3.5" />
              <span>Kirimkan Karya Tulismu</span>
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-foreground mb-2">
              Punya Opini, Esai, Cerpen, atau Puisi?
            </h3>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              Seluruh kader santri IMABA Yogyakarta dipersilakan mengirimkan naskah karya tulis untuk
              dipublikasikan di portal resmi IMABA Jogja.
            </p>
          </div>

          <a
            href="mailto:redaksi@imabayogyakarta.com?subject=Pengiriman%20Karya%20Kader%20IMABA"
            className="btn-pill-arrow bg-[#1E2FB8] hover:bg-[#162494] text-white flex-shrink-0"
          >
            <span>Kirim Naskah Tulisan</span>
            <span className="arrow-disc bg-white text-[#1E2FB8]">
              &rarr;
            </span>
          </a>
        </div>
      </section>
    </div>
  )
}
