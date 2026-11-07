import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight } from 'lucide-react'
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
        month: 'long',
        year: 'numeric',
      })
    : ''

  // URL Cover Sanity
  let coverUrl = ''
  if (post.cover?.asset) {
    coverUrl = urlFor(post.cover).width(800).height(450).auto('format').url()
  }

  // Aspek rasio kelas
  const ratioClasses = {
    video: 'aspect-[16/10]',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
  }[aspectRatio]

  return (
    <article
      className={cn(
        'group flex flex-col bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 card-radius-large',
        className,
      )}
    >
      {/* Gambar Cover */}
      <Link href={targetHref} className="relative w-full overflow-hidden bg-muted block">
        <div className={cn('relative w-full overflow-hidden', ratioClasses)}>
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={post.cover?.alt || post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#050A2E] to-[#1E2FB8] flex items-center justify-center p-6 text-center">
              <span className="font-heading font-bold text-white/60 text-sm tracking-wide uppercase">
                {post.category?.title || 'IMABA Yogyakarta'}
              </span>
            </div>
          )}

          {/* Badge Kategori Melayang */}
          {post.category?.title && (
            <div className="absolute top-3.5 left-3.5 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#050A2E]/80 backdrop-blur-md text-white border border-white/20 shadow-sm">
                {post.category.title}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Konten Kartu */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Tanggal & Penulis */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 flex-wrap">
            {formattedDate && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <time dateTime={post.publishedAt}>{formattedDate}</time>
              </span>
            )}
            {post.author?.name && (
              <span className="inline-flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                <span>{post.author.name}</span>
              </span>
            )}
          </div>

          {/* Judul Artikel */}
          <h3 className="font-heading font-extrabold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors leading-snug mb-3 line-clamp-2">
            <Link href={targetHref}>{post.title}</Link>
          </h3>

          {/* Ringkasan Singkat (Excerpt) */}
          {post.excerpt && (
            <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-6">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Footer Kartu & Link Baca */}
        <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
          <span className="text-xs font-semibold text-primary group-hover:underline inline-flex items-center gap-1.5">
            Baca Selengkapnya
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </span>

          {post.section && (
            <span className="text-[11px] text-muted-foreground uppercase font-medium tracking-wider">
              {post.section === 'karya' ? 'Karya Kader' : 'Berita DPW'}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

