'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'

export function HeroParallax({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollY } = useScroll()
  // Efek parallax saat digulir: latar belakang foto bergerak lembut ke bawah
  const y = useTransform(scrollY, [0, 800], [0, 100])

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        style={shouldReduceMotion ? undefined : { y }}
        initial={shouldReduceMotion ? undefined : { scale: 1.05 }}
        animate={shouldReduceMotion ? undefined : { scale: 1.0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover object-[center_50%] sm:object-[center_45%]"
          sizes="100vw"
          quality={95}
        />
      </motion.div>

      {/* Gradien Gelap Area Teks (0% - 55%) Diturunkan Melingkupi Subtitle Agar Teks Jelas Terbaca */}
      <div
        className="absolute top-0 inset-x-0 h-[52%] sm:h-[55%] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(20, 18, 14, 0.96) 0%, rgba(20, 18, 14, 0.88) 45%, rgba(20, 18, 14, 0.5) 75%, rgba(20, 18, 14, 0) 100%)',
        }}
      />

      {/* Transisi Halus di Dasar Hero Tanpa Mengenai Muka/Badan Pengurus */}
      <div className="absolute bottom-0 inset-x-0 h-16 sm:h-20 bg-gradient-to-t from-[#14120E] via-[#14120E]/60 to-transparent pointer-events-none" />
    </div>
  )
}

