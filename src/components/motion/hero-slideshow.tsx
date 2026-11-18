'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SlideItem {
  id: string
  src: string
  alt: string
  caption: string
  position?: string
}

const DEFAULT_SLIDES: SlideItem[] = [
  {
    id: 'pengurus-dpw',
    src: '/images/foto-pengurus-imaba-dpw.jpg',
    alt: 'Foto Bersama Pengurus dan Anggota DPW IMABA Daerah Istimewa Yogyakarta',
    caption: 'Jajaran Pengurus & Mahasiswa DPW IMABA DIY',
    position: 'object-[center_50%] sm:object-[center_45%]',
  },
  {
    id: 'milad-17',
    src: '/images/foto-pengurus-milad-17.jpg',
    alt: 'Silaturahmi Akbar dan Peringatan Milad Ke-17 IMABA DIY',
    caption: 'Silaturahmi Akbar & Milad Ke-17 IMABA DIY',
    position: 'object-[center_60%] sm:object-[center_55%]',
  },
  {
    id: 'khidmah-santri',
    src: '/images/foto-pengurus-imaba-old.jpg',
    alt: 'Dokumentasi Pengkaderan & Khidmah Santri Bata-Bata di Jogja',
    caption: 'Dokumentasi Khidmah & Pengkaderan Santri',
    position: 'object-[center_45%]',
  },
]

export function HeroSlideshow({
  slides = DEFAULT_SLIDES,
  interval = 6000,
}: {
  slides?: SlideItem[]
  interval?: number
}) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const shouldReduceMotion = useReducedMotion()

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 100])

  // Rotasi slide otomatis bergantian
  React.useEffect(() => {
    if (isPaused || shouldReduceMotion || slides.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, interval)

    return () => clearInterval(timer)
  }, [isPaused, shouldReduceMotion, slides.length, interval])

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx)
  }

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Container Parallax Bergerak Halus Saat Digulir */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y }}
        className="relative w-full h-full"
      >
        {slides.map((slide, index) => {
          const isActive = index === currentIndex
          return (
            <motion.div
              key={slide.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.0 : 1.04,
              }}
              transition={{
                opacity: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] },
                scale: { duration: shouldReduceMotion ? 0 : 7, ease: 'linear' },
              }}
              className="absolute inset-0 w-full h-full"
              style={{ pointerEvents: isActive ? 'auto' : 'none' }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                className={cn('object-cover', slide.position || 'object-center')}
                sizes="100vw"
                quality={92}
              />
            </motion.div>
          )
        })}
      </motion.div>

      {/* Gradien Gelap Area Teks (0% - 55%) Melindungi Keterbacaan H1, Subtitle, & CTA */}
      <div
        className="absolute top-0 inset-x-0 h-[52%] sm:h-[55%] pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(20, 18, 14, 0.96) 0%, rgba(20, 18, 14, 0.88) 45%, rgba(20, 18, 14, 0.5) 75%, rgba(20, 18, 14, 0) 100%)',
        }}
      />

      {/* Transisi Halus di Dasar Hero */}
      <div className="absolute bottom-0 inset-x-0 h-16 sm:h-20 bg-gradient-to-t from-[#14120E] via-[#14120E]/60 to-transparent pointer-events-none z-10" />

      {/* Indikator Slide Halus di Kiri Bawah (Di Atas Konten Latar) */}
      <div className="absolute bottom-6 left-4 sm:left-8 z-20 hidden md:flex items-center gap-3 bg-[#14120E]/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-lg">
        {/* Indikator Bar */}
        <div className="flex items-center gap-1.5">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Lihat foto ${idx + 1}: ${s.caption}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C5A059]',
                idx === currentIndex
                  ? 'w-6 bg-[#E6B75B] shadow-sm shadow-[#E6B75B]/50'
                  : 'w-2 bg-white/35 hover:bg-white/70',
              )}
            />
          ))}
        </div>

        {/* Caption Tipis */}
        <span className="text-[11px] font-medium text-[#E5D7B7] tracking-wide select-none">
          {currentIndex + 1}/{slides.length} &bull; {slides[currentIndex].caption}
        </span>
      </div>
    </div>
  )
}
