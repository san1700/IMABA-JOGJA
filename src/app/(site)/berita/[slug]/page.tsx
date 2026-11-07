import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, ArrowLeft, Tag } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  POST_BY_SLUG_QUERY,
  RELATED_POSTS_QUERY,
  type Post,
} from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@/components/portable-text'
import { PostCard } from '@/components/cards/post-card'
import { ReadingProgress } from '@/components/reading-progress'
import { JsonLd } from '@/components/json-ld'

interface PostDetailPageProps {
  params: Promise<{ slug: string }>
}

// Generate Metadata Dinamis untuk SEO
export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityFetch<Post | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    fallback: null,
  })

  if (!post) {
    return {
      title: 'Artikel Tidak Ditemukan',
    }
  }

  const ogImageUrl = post.cover?.asset
    ? urlFor(post.cover).width(1200).height(630).auto('format').url()
    : '/logo.png'

  return {
    title: post.title,
    description: post.excerpt || `Baca rilis berita resmi: ${post.title}`,
    alternates: {
      canonical: `/berita/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: 'article',
      url: `/berita/${post.slug}`,
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
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.title,
      images: [ogImageUrl],
    },
  }
}

export default async function BeritaDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params

  const post = await sanityFetch<Post | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    fallback: null,
  })

  // Jika artikel tidak ditemukan di Sanity
  if (!post) {
    notFound()
  }

  // Ambil artikel terkait
  const relatedPosts = await sanityFetch<Post[]>({
    query: RELATED_POSTS_QUERY,
    params: { currentSlug: slug, section: post.section || 'berita' },
    fallback: [],
  })

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  const coverUrl = post.cover?.asset
    ? urlFor(post.cover).width(1200).height(675).auto('format').url()
    : null

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://imabayogyakarta.org'
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt || post.title,
    image: coverUrl ? [coverUrl] : [`${siteUrl}/logo.png`],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: [
      {
        '@type': 'Person',
        name: post.author?.name || 'Humas & Infokom DPW IMABA Jogja',
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'IMABA Yogyakarta',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/berita/${post.slug}`,
    },
  }

  return (
    <article className="w-full min-h-screen bg-background py-10 sm:py-16 relative">
      <JsonLd data={articleJsonLd} />
      <ReadingProgress />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tombol Kembali & Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke Berita</span>
          </Link>

          {post.category?.title && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
              <Tag className="w-3 h-3" />
              {post.category.title}
            </span>
          )}
        </div>

        {/* Judul Utama Artikel */}
        <h1 className="font-heading font-extrabold text-2xl sm:text-4xl md:text-5xl text-foreground leading-[1.2] tracking-tight mb-6">
          {post.title}
        </h1>

        {/* Metadata Penulis & Waktu */}
        <div className="flex items-center gap-4 py-4 border-y border-border mb-8 text-xs sm:text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold">
              {post.author?.name ? post.author.name[0] : 'I'}
            </div>
            <div>
              <span className="font-semibold text-foreground block">
                {post.author?.name || 'Humas DPW IMABA'}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {post.author?.role || 'Pengurus Wilayah'}
              </span>
            </div>
          </div>

          <span className="text-border">&bull;</span>

          {formattedDate && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <time dateTime={post.publishedAt}>{formattedDate}</time>
            </div>
          )}
        </div>

        {/* Gambar Cover Utama */}
        {coverUrl && (
          <figure className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-muted mb-10 shadow-lg border border-border">
            <Image
              src={coverUrl}
              alt={post.cover?.alt || post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 800px) 100vw, 800px"
            />
            {post.cover?.caption && (
              <figcaption className="absolute bottom-0 inset-x-0 p-3 bg-black/60 backdrop-blur-md text-white text-xs text-center">
                {post.cover.caption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Ringkasan Pembuka (Excerpt) */}
        {post.excerpt && (
          <div className="p-6 rounded-2xl bg-muted/60 border-l-4 border-primary text-foreground/90 font-medium text-base sm:text-lg leading-relaxed mb-8">
            {post.excerpt}
          </div>
        )}

        {/* Isi Naskah Artikel (PortableText) */}
        <div className="text-foreground leading-relaxed">
          {post.body ? (
            <PortableText value={post.body} isLiterary={false} />
          ) : (
            <p className="italic text-muted-foreground">Konten naskah lengkap sedang disiapkan.</p>
          )}
        </div>

        {/* Kartu Profil Penulis di Akhir Artikel */}
        {post.author && (
          <div className="mt-12 p-6 rounded-3xl bg-card border border-border flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg flex-shrink-0">
              {post.author.name ? post.author.name[0] : 'A'}
            </div>
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Tentang Penulis
              </span>
              <h4 className="font-heading font-bold text-base text-foreground mb-1">
                {post.author.name}
              </h4>
              {post.author.bio && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {post.author.bio}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Artikel Terkait */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-border">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading font-extrabold text-2xl text-foreground">
              Berita Terkait Lainnya
            </h3>
            <Link
              href="/berita"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Lihat Semua Berita</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <PostCard key={rel._id} post={rel} hrefPrefix="/berita" />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
