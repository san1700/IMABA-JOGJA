import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Post } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

interface PostCardProps {
  post: Post
  hrefPrefix?: string // '/berita' atau '/karya-kader'
  className?: string
  aspectRatio?: 'video' | 'square' | 'wide'
  variant?: 'unu' | 'overlap'
}

export function PostCard({
  post,
  hrefPrefix = '/berita',
  className = '',
  aspectRatio = 'video',
  variant = 'unu',
}: PostCardProps) {
  const targetHref = `${hrefPrefix}/${post.slug}`

  // Format tahun & tanggal
  const dateObj = post.publishedAt ? new Date(post.publishedAt) : null
  const displayYear = dateObj ? dateObj.getFullYear() : '2026'
  const formattedDate = dateObj
    ? dateObj.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : ''

  // Format meta ala UNU Jogja: "Yogyakarta, 2024" atau "Kategori, Tahun"
  const metaSubtitle = post.author?.name
    ? `Oleh: ${post.author.name}`
    : `${post.category?.title || 'Yogyakarta'}, ${displayYear}`

  // URL Cover Sanity
  let coverUrl = ''
  if (post.cover?.asset) {
    coverUrl = urlFor(post.cover).width(800).height(500).auto('format').url()
  }

  // Aspek rasio gambar
  const ratioClasses = {
    video: 'aspect-[16/10]',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
  }[aspectRatio]

  // =========================================================================
  // VARIAN 1: GAYA UNU YOGYAKARTA (Default) — Full Card Image & Bottom Gradient
  // =========================================================================
  if (variant === 'unu') {
    return (
      <article
        className={cn(
          'group relative overflow-hidden rounded-2xl bg-[#14120E] border border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 block select-none',
          ratioClasses,
          className,
        )}
      >
        <Link
          href={targetHref}
          className="absolute inset-0 z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E6B75B] rounded-2xl"
        >
          <span className="sr-only">{post.title}</span>
        </Link>

        {/* 1. Gambar Full Bleed */}
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={post.cover?.alt || post.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1F1A14] via-[#2A2218] to-[#14120E] flex items-center justify-center p-6">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />
            <span className="font-heading font-bold text-white/30 text-xs tracking-widest uppercase text-center">
              {post.category?.title || 'IMABA DIY'}
            </span>
          </div>
        )}

        {/* 2. Gradien Gelap Khas UNU Jogja: Kontras teks tinggi & nyaman dibaca */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10 pointer-events-none group-hover:via-black/65 transition-colors duration-500"
          aria-hidden="true"
        />

        {/* 3. Badge Kategori Halus di Atas Foto */}
        {post.category?.title && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md text-white/90 border border-white/15 shadow-sm">
              {post.category.title}
            </span>
          </div>
        )}

        {/* 4. Konten Teks di Bagian Bawah Khas UNU Jogja */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col justify-end text-left z-10 pointer-events-none">
          <h3 className="font-heading font-semibold text-sm sm:text-base text-white leading-snug line-clamp-2 drop-shadow-sm group-hover:text-[#E6B75B] transition-colors mb-1.5">
            {post.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-white/75 font-normal">
            <span>{metaSubtitle}</span>
            {formattedDate && (
              <>
                <span>•</span>
                <time dateTime={post.publishedAt}>{formattedDate}</time>
              </>
            )}
          </div>
        </div>
      </article>
    )
  }

  // =========================================================================
  // VARIAN 2: GAYA OVERLAP LAMA (Floating White Body)
  // =========================================================================
  return (
    <article
      className={cn(
        'group relative flex flex-col transition-all duration-300',
        className,
      )}
    >
      {/* Gambar Cover di Atas */}
      <Link
        href={targetHref}
        className={cn(
          'relative w-full overflow-hidden rounded-3xl bg-muted block shadow-sm group-hover:shadow-md transition-shadow',
          ratioClasses,
        )}
      >
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={post.cover?.alt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#14120E] via-[#1F1A14] to-[#2A241D] flex items-center justify-center p-6 text-center">
            <span className="font-heading font-bold text-white/70 text-xs tracking-wider uppercase">
              {post.category?.title || 'IMABA Yogyakarta'}
            </span>
          </div>
        )}

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {post.section && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-sm">
              {post.section === 'karya' ? 'Karya Kader' : 'Warta DPW'}
            </span>
          </div>
        )}
      </Link>

      {/* Floating Body */}
      <div className="relative -mt-10 sm:-mt-12 mx-3 sm:mx-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1F1A14] border border-border/80 shadow-lg shadow-black/10 dark:shadow-black/40 flex flex-col justify-between z-10 transition-transform duration-300 group-hover:-translate-y-1">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            {post.category?.title ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-caption-label bg-primary/10 text-primary dark:text-[#C5A059] border border-primary/20 whitespace-nowrap">
                {post.category.title}
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-caption-label bg-muted text-muted-foreground whitespace-nowrap">
                Umum
              </span>
            )}

            {formattedDate && (
              <time
                dateTime={post.publishedAt}
                className="text-[12px] font-medium text-muted-foreground whitespace-nowrap"
              >
                {formattedDate}
              </time>
            )}
          </div>

          <h3 className="font-heading text-h3-card text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2.5">
            <Link href={targetHref} className="focus:outline-none focus-visible:underline">
              {post.title}
            </Link>
          </h3>

          {post.excerpt && (
            <p className="font-sans text-body-fluid text-muted-foreground line-clamp-2 sm:line-clamp-3 leading-relaxed mb-5">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-border/60 flex items-center justify-between mt-auto">
          <Link
            href={targetHref}
            className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors whitespace-nowrap"
          >
            Baca Selengkapnya
          </Link>

          <Link
            href={targetHref}
            aria-label={`Baca selengkapnya tentang ${post.title}`}
            className="w-8 h-8 rounded-full bg-[#C5A059]/10 text-primary group-hover:bg-[#C5A059] group-hover:text-[#14120E] flex items-center justify-center transition-all duration-300 shadow-sm shrink-0"
          >
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
