import type { Metadata } from 'next'
import Link from 'next/link'
import { Newspaper, Calendar } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/fetch'
import { POSTS_QUERY, CATEGORIES_QUERY, type Post, type Category } from '@/sanity/lib/queries'
import { PostCard } from '@/components/cards/post-card'

export const metadata: Metadata = {
  title: 'Berita & Agenda DPW',
  description:
    'Kumpulan berita terkini, liputan kegiatan pengkaderan, serta jadwal agenda resmi DPW IMABA Daerah Istimewa Yogyakarta.',
}

// Data cadangan jika Sanity belum diisi oleh pengurus
const FALLBACK_POSTS: Post[] = [
  {
    _id: 'sample-1',
    title: 'Pelantikan Pengurus DPW IMABA DIY Periode 2026/2027 Berlangsung Khidmat',
    slug: 'pelantikan-pengurus-dpw-imaba-diy-2026',
    section: 'berita',
    category: { _id: 'cat-1', title: 'Liputan Acara', slug: 'liputan' },
    author: { name: 'Humas & Infokom DPW', role: 'Pengurus DPW' },
    excerpt:
      'Pelantikan kepengurusan baru DPW IMABA Yogyakarta sukses diselenggarakan dengan dihadiri para sesepuh, alumni, dan ratusan santri perantauan di Yogyakarta.',
    publishedAt: new Date().toISOString(),
    featured: true,
  },
  {
    _id: 'sample-2',
    title: 'Agenda Rutin Bimtren 2026: Siapkan Ratusan Calon Mahasiswa Baru Masuk Kampus Impian',
    slug: 'agenda-rutin-bimtren-2026',
    section: 'berita',
    category: { _id: 'cat-2', title: 'Agenda DPW', slug: 'agenda' },
    author: { name: 'Divisi Pendidikan', role: 'Pengurus DPW' },
    excerpt:
      'Program tahunan Bimtren IMABA Jogja kembali dibuka untuk mendampingi calon mahasiswa dari pondok pesantren menembus seleksi SNBP, SNBT, dan Ujian Mandiri.',
    publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    featured: false,
  },
  {
    _id: 'sample-3',
    title: 'Kajian Ilmiah Bulanan: Menjaga Sanad Keilmuan Pesantren di Tengah Arus Modernitas',
    slug: 'kajian-ilmiah-bulanan-turats',
    section: 'berita',
    category: { _id: 'cat-3', title: 'Kajian & Dakwah', slug: 'kajian' },
    author: { name: 'Divisi Kaderisasi', role: 'Pengurus DPW' },
    excerpt:
      'Menelaah kitab-kitab turats karya ulama nusantara dan masyaikh Bata-Bata dalam forum intelektual santri mahasiswa di Yogyakarta.',
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    featured: false,
  },
]

interface BeritaPageProps {
  searchParams: Promise<{ kategori?: string }>
}

export default async function BeritaPage({ searchParams }: BeritaPageProps) {
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
    <div className="w-full min-h-screen bg-background">
      {/* Header Banner Kanal */}
      <section className="relative w-full bg-[#050A2E] text-white py-16 sm:py-24 border-b border-white/10 overflow-hidden">
        {/* Ambient Glow */}
        <div
          className="absolute top-0 right-1/4 w-96 h-96 bg-[#1E2FB8]/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-white/90 mb-4">
            <Newspaper className="w-3.5 h-3.5 text-[#F9C80E]" />
            <span>Kanal Informasi & Publikasi</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-white mb-4">
            Berita & Agenda DPW
          </h1>

          <p className="font-sans text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            Ikuti warta terbaru seputar pergerakan santri Bata-Bata di Yogyakarta, rilis pers kegiatan
            organisasi, serta jadwal agenda resmi pengurus.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <Link
            href="/berita"
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
              !categoryFilter
                ? 'bg-primary text-white shadow-md'
                : 'bg-card border border-border text-foreground hover:bg-muted'
            }`}
          >
            Semua Berita
          </Link>

          {categories.map((cat) => {
            const isSelected = categoryFilter === cat.slug
            return (
              <Link
                key={cat._id}
                href={`/berita?kategori=${cat.slug}`}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-card border border-border text-foreground hover:bg-muted'
                }`}
              >
                {cat.title}
              </Link>
            )
          })}
        </div>

        {/* Grid Artikel Berita */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <PostCard key={post._id} post={post} hrefPrefix="/berita" />
          ))}
        </div>

        {/* Empty State jika filter tidak menemukan artikel */}
        {displayPosts.length === 0 && (
          <div className="text-center py-20 bg-card rounded-3xl border border-border p-8 max-w-lg mx-auto">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading font-bold text-lg text-foreground mb-2">
              Belum Ada Berita di Kategori Ini
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Pengurus belum mempublikasikan artikel untuk kategori ini.
            </p>
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-white text-xs font-semibold"
            >
              Lihat Semua Berita
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
