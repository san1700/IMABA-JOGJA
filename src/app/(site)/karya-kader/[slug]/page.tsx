import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Feather } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  POST_BY_SLUG_QUERY,
  RELATED_POSTS_QUERY,
  type Post,
} from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@/components/portable-text'
import { PostCard } from '@/components/cards/post-card'

interface KaryaDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: KaryaDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityFetch<Post | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    fallback: null,
  })

  if (!post) {
    return {
      title: 'Karya Tidak Ditemukan',
    }
  }

  const ogImageUrl = post.cover?.asset
    ? urlFor(post.cover).width(1200).height(630).auto('format').url()
    : '/logo.png'

  return {
    title: `${post.title} — Karya Kader IMABA`,
    description: post.excerpt || `Naskah karya kader santri IMABA Yogyakarta: ${post.title}`,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.cover?.alt || post.title,
        },
      ],
    },
  }
}

export default async function KaryaDetailPage({ params }: KaryaDetailPageProps) {
  const { slug } = await params

  const post = await sanityFetch<Post | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    fallback: null,
  })

  if (!post) {
    notFound()
  }

  const relatedPosts = await sanityFetch<Post[]>({
    query: RELATED_POSTS_QUERY,
    params: { currentSlug: slug, section: 'karya' },
    fallback: [],
  })

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  const coverUrl = post.cover?.asset
    ? urlFor(post.cover).width(1200).height(675).auto('format').url()
    : null

  return (
    <article className="w-full min-h-screen bg-background py-10 sm:py-16">
      {/* Container Membaca dengan Lebar Baris Ideal (65-75ch) */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tombol Kembali & Kategori */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <Link
            href="/karya-kader"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Koleksi Karya Kader</span>
          </Link>

          {post.category?.title && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1E2FB8]/10 text-[#1E2FB8] dark:text-[#4F5CF2] border border-[#1E2FB8]/20">
              <Feather className="w-3 h-3" />
              {post.category.title}
            </span>
          )}
        </div>

        {/* Header Judul & Penulis */}
        <header className="mb-10 text-center">
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.25] tracking-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              Oleh: {post.author?.name || 'Kader IMABA'}
            </span>
            <span>&bull;</span>
            <time dateTime={post.publishedAt}>{formattedDate}</time>
          </div>
        </header>

        {/* Gambar Ilustrasi / Cover jika ada */}
        {coverUrl && (
          <figure className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-muted mb-12 shadow-md border border-border">
            <Image
              src={coverUrl}
              alt={post.cover?.alt || post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            {post.cover?.caption && (
              <figcaption className="p-3 text-center text-xs text-muted-foreground italic border-t border-border">
                {post.cover.caption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Isi Tulisan Sastra / Opini dengan Font Newsreader */}
        <div className="font-article text-lg sm:text-xl leading-relaxed sm:leading-loose text-foreground/90">
          {post.body ? (
            <PortableText value={post.body} isLiterary={true} />
          ) : (
            <p className="italic text-muted-foreground font-sans">
              Naskah lengkap sedang dalam proses digitalisasi.
            </p>
          )}
        </div>

        {/* Kartu Profil Penulis */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1E2FB8] to-[#4F5CF2] text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-md">
              {post.author?.name ? post.author.name[0] : 'K'}
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Kader Penulis
              </span>
              <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                {post.author?.name || 'Kader Santri IMABA'}
              </h3>
              {post.author?.campus && (
                <p className="text-xs text-primary font-medium mb-2">
                  {post.author.campus}
                </p>
              )}
              {post.author?.bio && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {post.author.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rekomendasi Karya Lainnya */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-border">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading font-extrabold text-2xl text-foreground">
              Karya Kader Lainnya
            </h3>
            <Link
              href="/karya-kader"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Jelajahi Semua Karya &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <PostCard key={rel._id} post={rel} hrefPrefix="/karya-kader" />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
