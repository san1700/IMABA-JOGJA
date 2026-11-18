import Link from 'next/link'
import Image from 'next/image'
import { User } from 'lucide-react'
import type { Post } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

interface PostCardProps {
  post: Post
  hrefPrefix?: string // '/berita' atau '/karya-kader'
  className?: string
  aspectRatio?: 'video' | 'square' | 'wide'
  variant?: 'sekeco' | 'unu' | 'overlap'
}

export function PostCard({
  post,
  hrefPrefix = '/berita',
  className = '',
  aspectRatio = 'video',
}: PostCardProps) {
  const targetHref = `${hrefPrefix}/${post.slug}`

  // Format tanggal Indonesia
  const dateObj = post.publishedAt ? new Date(post.publishedAt) : null
  const formattedDate = dateObj
    ? dateObj.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : ''

  // URL Cover Sanity
  let coverUrl = ''
  if (post.cover?.asset) {
    coverUrl = urlFor(post.cover).width(800).height(500).auto('format').url()
  }

  // URL Avatar Penulis
  let authorAvatarUrl = ''
  if (post.author?.avatar) {
    if (typeof post.author.avatar === 'string') {
      authorAvatarUrl = post.author.avatar
    } else if (post.author.avatar.asset) {
      authorAvatarUrl = urlFor(post.author.avatar).width(64).height(64).auto('format').url()
    }
  }

  const authorName = post.author?.name || 'Redaksi DPW IMABA'

  // Aspek rasio gambar cover
  const ratioClasses = {
    video: 'aspect-[16/10]',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
  }[aspectRatio]

  return (
    <article
      className={cn(
        'group relative flex flex-col h-full rounded-2xl bg-white dark:bg-[#161618] border border-border/80 dark:border-white/[0.08] hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 p-4 sm:p-5 shadow-sm hover:shadow-xl',
        className,
      )}
    >
      {/* 1. Thumbnail Foto di Dalam Padding Kartu (Sesuai Gaya Sekeco) */}
      <Link
        href={targetHref}
        className={cn(
          'relative w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 block shrink-0',
          ratioClasses,
        )}
        tabIndex={-1}
        aria-hidden="true"
      >
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={post.cover?.alt || post.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-[#14120E] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
              <Image
                src="/logo.png"
                alt="Logo IMABA"
                width={24}
                height={24}
                className="opacity-70 group-hover:opacity-100 transition-opacity object-contain"
              />
            </div>
            <span className="font-heading font-medium text-white/50 text-[11px] tracking-wider uppercase">
              {post.category?.title || 'IMABA DIY'}
            </span>
          </div>
        )}
      </Link>

      {/* 2. Baris Meta: Kategori Pill + Tanggal (Sesuai Sekeco) */}
      <div className="flex items-center gap-3 mt-4 mb-2.5">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 border border-neutral-200/50 dark:border-white/5 whitespace-nowrap">
          {post.category?.title || 'Umum'}
        </span>

        {formattedDate && (
          <time
            dateTime={post.publishedAt}
            className="text-xs text-muted-foreground dark:text-neutral-400 font-normal whitespace-nowrap"
          >
            {formattedDate}
          </time>
        )}
      </div>

      {/* 3. Judul Kartu */}
      <h3 className="font-heading font-semibold text-base sm:text-lg text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-[#E6B75B] transition-colors leading-snug line-clamp-2 mb-2">
        <Link href={targetHref} className="focus:outline-none focus-visible:underline">
          {post.title}
        </Link>
      </h3>

      {/* 4. Ringkasan Deskripsi / Excerpt */}
      {post.excerpt && (
        <p className="font-sans text-xs sm:text-sm text-muted-foreground dark:text-neutral-400 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-5">
          {post.excerpt}
        </p>
      )}

      {/* 5. Baris Penulis di Dasar Kartu (Avatar / Icon + Nama) */}
      <div className="mt-auto pt-3 border-t border-border/40 dark:border-white/[0.06] flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 flex items-center justify-center shrink-0 overflow-hidden border border-border/50 dark:border-white/10">
          {authorAvatarUrl ? (
            <Image
              src={authorAvatarUrl}
              alt={authorName}
              width={24}
              height={24}
              className="object-cover w-full h-full"
            />
          ) : (
            <User className="w-3.5 h-3.5" />
          )}
        </div>
        <span className="text-xs font-medium text-foreground/80 dark:text-neutral-300 truncate">
          {authorName}
        </span>
      </div>
    </article>
  )
}
