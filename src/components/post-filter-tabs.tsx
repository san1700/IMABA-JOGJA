'use client'

import * as React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Calendar } from 'lucide-react'
import type { Post, Category } from '@/sanity/lib/queries'
import { PostCard } from '@/components/cards/post-card'

interface PostFilterTabsProps {
  posts: Post[]
  categories: Category[]
  hrefPrefix: '/berita' | '/karya-kader'
  initialCategory?: string | null
}

export function PostFilterTabs({
  posts,
  categories,
  hrefPrefix,
  initialCategory = null,
}: PostFilterTabsProps) {
  const [activeCategory, setActiveCategory] = React.useState<string>(initialCategory || 'all')
  const shouldReduceMotion = useReducedMotion()

  const handleSelectCategory = (slug: string) => {
    setActiveCategory(slug)
    const newUrl = slug === 'all' || !slug ? hrefPrefix : `${hrefPrefix}?kategori=${slug}`
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', newUrl)
    }
  }

  // Filter posts client-side secara instan tanpa reload
  const filteredPosts = React.useMemo(() => {
    if (activeCategory === 'all' || !activeCategory) {
      return posts
    }
    return posts.filter((post) => post.category?.slug === activeCategory)
  }, [activeCategory, posts])

  return (
    <div className="w-full flex flex-col">
      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        <button
          type="button"
          onClick={() => handleSelectCategory('all')}
          className={`relative px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            activeCategory === 'all'
              ? 'text-white'
              : 'bg-card border border-border text-foreground hover:bg-muted'
          }`}
        >
          {activeCategory === 'all' && (
            <motion.div
              layoutId={`activeCatTab-${hrefPrefix}`}
              className="absolute inset-0 rounded-full bg-primary shadow-md -z-10"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span>{hrefPrefix === '/berita' ? 'Semua Berita' : 'Semua Karya'}</span>
        </button>

        {categories.map((cat) => {
          if (!cat.slug) return null
          const isSelected = activeCategory === cat.slug

          return (
            <button
              key={cat._id}
              type="button"
              onClick={() => handleSelectCategory(cat.slug)}
              className={`relative px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isSelected
                  ? 'text-white'
                  : 'bg-card border border-border text-foreground hover:bg-muted'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId={`activeCatTab-${hrefPrefix}`}
                  className="absolute inset-0 rounded-full bg-primary shadow-md -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span>{cat.title}</span>
            </button>
          )
        })}
      </div>

      {/* Grid Post Terfilter dengan Transisi Halus */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div
              key={post._id}
              layout
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <PostCard post={post} hrefPrefix={hrefPrefix} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* State jika Kategori Kosong */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16 bg-card rounded-3xl border border-border p-8 max-w-lg mx-auto mt-6">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-bold text-lg text-foreground mb-2">
            Belum Ada Artikel di Kategori Ini
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Pengurus belum mempublikasikan konten untuk kategori yang dipilih.
          </p>
          <button
            type="button"
            onClick={() => handleSelectCategory('all')}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors"
          >
            Lihat Semua Konten
          </button>
        </div>
      )}
    </div>
  )
}
