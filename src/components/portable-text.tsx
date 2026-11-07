import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText as PortableTextComponent, type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

interface PortableTextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[] | any
  className?: string
  isLiterary?: boolean // Menggunakan font Newsreader untuk karya sastra/puisi/cerpen
}

export function PortableText({ value, className = '', isLiterary = false }: PortableTextProps) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return null
  }

  const components: PortableTextComponents = {
    block: {
      h1: ({ children }) => (
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground mt-8 mb-4 tracking-tight">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-foreground mt-7 mb-3 tracking-tight">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground mt-6 mb-2 tracking-tight">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="font-heading font-semibold text-base sm:text-lg text-foreground mt-5 mb-2">
          {children}
        </h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-6 border-l-4 border-[#1E2FB8] dark:border-[#4F5CF2] pl-5 py-1 italic font-article text-lg text-foreground/85 bg-primary/5 rounded-r-xl">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => (
        <p
          className={cn(
            'mb-4 leading-relaxed text-foreground/80',
            isLiterary
              ? 'font-article text-lg sm:text-xl leading-relaxed sm:leading-loose text-foreground/90'
              : 'font-sans text-base sm:text-lg',
          )}
        >
          {children}
        </p>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc list-outside pl-6 mb-5 space-y-2 text-foreground/80">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 text-foreground/80">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
      number: ({ children }) => <li className="leading-relaxed">{children}</li>,
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-bold text-foreground">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => (
        <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-sm font-mono border border-border">
          {children}
        </code>
      ),
      link: ({ value, children }) => {
        const href = value?.href || ''
        const isExternal = href.startsWith('http')
        if (isExternal) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1E2FB8] dark:text-[#4F5CF2] underline underline-offset-4 font-medium hover:text-[#050A2E] dark:hover:text-white transition-colors"
            >
              {children}
            </a>
          )
        }
        return (
          <Link
            href={href}
            className="text-[#1E2FB8] dark:text-[#4F5CF2] underline underline-offset-4 font-medium hover:text-[#050A2E] dark:hover:text-white transition-colors"
          >
            {children}
          </Link>
        )
      },
    },
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null
        }
        const imageUrl = urlFor(value).width(1200).auto('format').url()
        return (
          <figure className="my-8 rounded-2xl overflow-hidden bg-muted border border-border">
            <div className="relative w-full aspect-video sm:aspect-[16/9]">
              <Image
                src={imageUrl}
                alt={value.alt || 'Gambar artikel IMABA Yogyakarta'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            {value.caption && (
              <figcaption className="p-3 text-center text-xs text-muted-foreground italic border-t border-border">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
    },
  }

  return (
    <div className={cn('prose max-w-none text-foreground', className)}>
      <PortableTextComponent value={value} components={components} />
    </div>
  )
}
