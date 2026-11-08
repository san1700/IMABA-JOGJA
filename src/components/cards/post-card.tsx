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
}

export function PostCard({
  post,
  hrefPrefix = '/berita',
  className = '',
  aspectRatio = 'video',
}: PostCardProps) {
  const targetHref = `${hrefPrefix}/${post.slug}`

  // Format tanggal Indonesia
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : ''

  // URL Cover Sanity
  let coverUrl = ''
  if (post.cover?.asset) {
    coverUrl = urlFor(post.cover).width(800).height(450).auto('format').url()
  }

  // Aspek rasio gambar
  const ratioClasses = {
    video: 'aspect-[16/10]',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
  }[aspectRatio]

  return (
    <article
      className={cn(
        'group relative flex flex-col transition-all duration-300',
        className,
      )}
    >
      {/* 1. Gambar Cover di Atas */}
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
          <div className="w-full h-full bg-gradient-to-br from-[#050A2E] via-[#0D1654] to-[#1E2FB8] flex items-center justify-center p-6 text-center">
            <span className="font-heading font-bold text-white/70 text-xs tracking-wider uppercase">
              {post.category?.title || 'IMABA Yogyakarta'}
            </span>
          </div>
        )}

        {/* Gradien Gelap di Atas Foto agar Kontras Teks Memenuhi Standar WCAG AA */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Badge Kanal di Atas Foto dengan Kontras Aman */}
        {post.section && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-sm">
              {post.section === 'karya' ? 'Karya Kader' : 'Warta DPW'}
            </span>
          </div>
        )}
      </Link>

      {/* 2. Badan Putih Sedikit Menimpa Gambar (Floating Overlap ala UNU Jogja) */}
      <div className="relative -mt-10 sm:-mt-12 mx-3 sm:mx-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c1445] border border-border/80 shadow-lg shadow-black/10 dark:shadow-black/40 flex flex-col justify-between z-10 transition-transform duration-300 group-hover:-translate-y-1">
        <div>
          {/* Baris Meta: Label Kategori di Kiri, Tanggal di Kanan */}
          <div className="flex items-center justify-between gap-2 mb-3">
            {post.category?.title ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary dark:text-[#8B98FF] border border-primary/20">
                {post.category.title}
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-muted text-muted-foreground">
                Umum
              </span>
            )}

            {formattedDate && (
              <time
                dateTime={post.publishedAt}
                className="text-[11px] font-medium text-muted-foreground whitespace-nowrap"
              >
                {formattedDate}
              </time>
            )}
          </div>

          {/* Judul Tebal */}
          <h3 className="font-heading font-extrabold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2.5">
            <Link href={targetHref} className="focus:outline-none focus-visible:underline">
              {post.title}
            </Link>
          </h3>

          {/* Ringkasan Singkat (Excerpt) */}
          {post.excerpt && (
            <p className="font-sans text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 leading-relaxed mb-5">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Footer: Tautan & Tombol Bulat Berpanah (Signature Round Arrow Button) */}
        <div className="pt-3 border-t border-border/60 flex items-center justify-between mt-auto">
          <Link
            href={targetHref}
            className="text-xs font-bold text-foreground group-hover:text-primary transition-colors"
          >
            Baca Selengkapnya
          </Link>

          {/* Tombol Bulat Berpanah */}
          <Link
            href={targetHref}
            aria-label={`Baca selengkapnya tentang ${post.title}`}
            className="w-8 h-8 rounded-full bg-[#1E2FB8]/10 text-primary group-hover:bg-[#1E2FB8] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
          >
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
