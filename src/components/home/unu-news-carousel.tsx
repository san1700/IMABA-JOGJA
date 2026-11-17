'use client'

import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Post } from '@/sanity/lib/queries'
import { PostCard } from '@/components/cards/post-card'

interface UnuNewsCarouselProps {
  posts: Post[]
  hrefPrefix?: string
  className?: string
  slideDurationMs?: number // Durasi geser (default 1000ms = 1 detik geser pelan)
  pauseDurationMs?: number // Durasi jeda istirahat (default 1000ms = jeda 1 detik)
}

export function UnuNewsCarousel({
  posts,
  hrefPrefix = '/berita',
  className = '',
  slideDurationMs = 1000,
  pauseDurationMs = 1000,
}: UnuNewsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [isHovered, setIsHovered] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0) // 0 to 1
  const [isDragging, setIsDragging] = useState(false)
  const [hasDraggedFar, setHasDraggedFar] = useState(false)

  // Refs untuk tracking state real-time di dalam timer tanpa trigger re-mount
  const isHoveredRef = useRef(false)
  const isInteractingRef = useRef(false)
  const isDraggingRef = useRef(false)

  useEffect(() => {
    isHoveredRef.current = isHovered
  }, [isHovered])

  useEffect(() => {
    isInteractingRef.current = isInteracting
  }, [isInteracting])

  useEffect(() => {
    isDraggingRef.current = isDragging
  }, [isDragging])

  // Drag tracking refs
  const dragStartX = useRef(0)
  const dragStartScrollLeft = useRef(0)
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null)
  const activeAnimRef = useRef<(() => void) | null>(null)

  // =========================================================================
  // 1. SIAPKAN POSTINGAN DENGAN JUMLAH GENAP & MINIMAL 8
  // =========================================================================
  const basePosts = useMemo(() => {
    let list = posts && posts.length > 0 ? [...posts] : []
    if (list.length < 8) {
      list = [...list, ...list]
      if (list.length < 8) {
        list = [...list, ...list]
      }
    }
    // Pastikan genap agar setiap kolom berisi 2 baris penuh seimbang
    if (list.length % 2 !== 0 && list.length > 0) {
      list.push(list[0])
    }
    return list
  }, [posts])

  // Gandakan 3 siklus untuk pergeseran tak terhingga (infinite loop seamless)
  const displayPosts = useMemo(() => {
    return [...basePosts, ...basePosts, ...basePosts]
  }, [basePosts])

  // =========================================================================
  // 2. HITUNG LEBAR LANGKAH & SIKLUS
  // =========================================================================
  const getStepWidth = useCallback(() => {
    const el = containerRef.current
    if (el) {
      const card = el.querySelector<HTMLElement>('[data-carousel-card]')
      if (card) {
        const grid = el.querySelector<HTMLElement>('[data-carousel-grid]')
        const gridGap = grid ? parseFloat(window.getComputedStyle(grid).gap) || 20 : 20
        return card.offsetWidth + gridGap
      }
    }
    if (typeof window === 'undefined') return 370 + 20
    if (window.innerWidth < 640) return 280 + 16
    if (window.innerWidth < 768) return 330 + 20
    return 370 + 20
  }, [])

  const getCycleWidth = useCallback(() => {
    const columnsPerCycle = Math.ceil(basePosts.length / 2)
    return columnsPerCycle * getStepWidth()
  }, [basePosts.length, getStepWidth])

  // Jeda sementara saat user berinteraksi manual (klik panah, drag)
  const pauseTemporarily = useCallback((ms = 2200) => {
    setIsInteracting(true)
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false)
    }, ms)
  }, [])

  // Update progress bar saat container bergulir
  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el) return

    const cycleWidth = getCycleWidth()
    if (cycleWidth <= 0) return

    // Normalisasi posisi 0..1 dalam satu siklus
    const currentScroll = el.scrollLeft % cycleWidth
    const progress = Math.max(0, Math.min(1, currentScroll / cycleWidth))
    setScrollProgress(progress)
  }, [getCycleWidth])

  // =========================================================================
  // 3. ANIMASI GESER PELAN DENGAN KURVA EASE-IN-OUT LEMBUT
  // =========================================================================
  const animateScrollBy = useCallback(
    (distance: number, duration: number, onComplete?: () => void) => {
      const el = containerRef.current
      if (!el) {
        onComplete?.()
        return () => {}
      }

      const cycleWidth = getCycleWidth()
      if (cycleWidth > 0) {
        // Bungkus siklus secara instan sebelum animasi jika sudah di ujung
        if (distance > 0 && el.scrollLeft >= cycleWidth * 2) {
          el.scrollLeft -= cycleWidth
        } else if (distance < 0 && el.scrollLeft <= 10) {
          el.scrollLeft += cycleWidth
        }
      }

      const start = el.scrollLeft
      const startTime = performance.now()
      let animId: number
      let isCancelled = false

      const stepAnim = (currentTime: number) => {
        if (isCancelled) return

        const elapsed = currentTime - startTime
        const progress = Math.min(1, elapsed / duration)

        // Easing Sine Halus: Transisi pelan di awal, meluncur anggun, dan berhenti sangat lembut
        const ease = -(Math.cos(Math.PI * progress) - 1) / 2
        el.scrollLeft = start + distance * ease
        handleScroll()

        if (progress < 1) {
          animId = requestAnimationFrame(stepAnim)
        } else {
          // Animasi selesai
          if (cycleWidth > 0 && el.scrollLeft >= cycleWidth * 2) {
            el.scrollLeft -= cycleWidth
          }
          handleScroll()
          onComplete?.()
        }
      }

      animId = requestAnimationFrame(stepAnim)

      const cancelFn = () => {
        isCancelled = true
        cancelAnimationFrame(animId)
      }

      activeAnimRef.current = cancelFn
      return cancelFn
    },
    [getCycleWidth, handleScroll],
  )

  // =========================================================================
  // 4. RITME OTOMATIS: 1 DETIK GESER PELAN -> JEDA 1 DETIK -> GESER LAGI
  // =========================================================================
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let cancelCurrentAnim: (() => void) | null = null
    let isMounted = true

    const runCycle = () => {
      if (!isMounted) return

      // Jika user sedang hover kursor, drag, atau baru klik tombol, tunda pengecekan 400ms
      if (
        isHoveredRef.current ||
        isInteractingRef.current ||
        isDraggingRef.current
      ) {
        timeoutId = setTimeout(runCycle, 400)
        return
      }

      const step = getStepWidth()

      // TAHAP 1: Geser pelan selama 1 detik (slideDurationMs = 1000ms)
      cancelCurrentAnim = animateScrollBy(step, slideDurationMs, () => {
        if (!isMounted) return

        // TAHAP 2: Jeda istirahat selama 1 detik (pauseDurationMs = 1000ms)
        timeoutId = setTimeout(runCycle, pauseDurationMs)
      })
    }

    // Mulai siklus awal setelah jeda 1 detik pertama
    timeoutId = setTimeout(runCycle, pauseDurationMs)

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
      if (cancelCurrentAnim) cancelCurrentAnim()
      if (activeAnimRef.current) activeAnimRef.current()
    }
  }, [animateScrollBy, getStepWidth, slideDurationMs, pauseDurationMs])

  // =========================================================================
  // 5. TOMBOL NAVIGASI MANUAL (< dan >)
  // =========================================================================
  const handlePrev = () => {
    pauseTemporarily(2500)
    if (activeAnimRef.current) activeAnimRef.current()

    const step = getStepWidth()
    // Animasi geser mundur lembut selama 600ms
    animateScrollBy(-step, 600)
  }

  const handleNext = () => {
    pauseTemporarily(2500)
    if (activeAnimRef.current) activeAnimRef.current()

    const step = getStepWidth()
    // Animasi geser maju lembut selama 600ms
    animateScrollBy(step, 600)
  }

  // =========================================================================
  // 6. KLIK DI PROGRESS TRACK: Melompat ke posisi kartu
  // =========================================================================
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current
    const el = containerRef.current
    if (!track || !el) return

    pauseTemporarily(2500)
    if (activeAnimRef.current) activeAnimRef.current()

    const rect = track.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const ratio = Math.max(0, Math.min(1, clickX / rect.width))

    const cycleWidth = getCycleWidth()
    if (cycleWidth <= 0) return

    const currentCycle = Math.floor(el.scrollLeft / cycleWidth)
    const targetScroll = currentCycle * cycleWidth + ratio * cycleWidth
    const distance = targetScroll - el.scrollLeft

    animateScrollBy(distance, 700)
  }

  // =========================================================================
  // 7. MOUSE DRAG & TOUCH SWIPE
  // =========================================================================
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    if (activeAnimRef.current) activeAnimRef.current()

    setIsDragging(true)
    setHasDraggedFar(false)
    dragStartX.current = e.pageX
    dragStartScrollLeft.current = containerRef.current?.scrollLeft || 0
    pauseTemporarily(3000)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    const deltaX = e.pageX - dragStartX.current
    if (Math.abs(deltaX) > 6) {
      setHasDraggedFar(true)
    }
    containerRef.current.scrollLeft = dragStartScrollLeft.current - deltaX
    handleScroll()
  }

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      pauseTemporarily(2000)
    }
  }

  // Posisi dan lebar pill progress bar
  const pillWidthPercent = 20
  const pillLeftPercent = scrollProgress * (100 - pillWidthPercent)

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Container Carousel Geser 2 Baris */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          handleMouseUpOrLeave()
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onTouchStart={() => {
          if (activeAnimRef.current) activeAnimRef.current()
          pauseTemporarily(3500)
        }}
        onTouchEnd={() => pauseTemporarily(2000)}
        className="w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none px-4 sm:px-8 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Grid 2 Baris Ala UNU Yogyakarta */}
        <div
          data-carousel-grid
          className="grid grid-rows-2 grid-flow-col auto-cols-[280px] sm:auto-cols-[330px] md:auto-cols-[370px] gap-4 sm:gap-5 w-max"
        >
          {displayPosts.map((post, idx) => (
            <div
              key={`${post._id}-${idx}`}
              data-carousel-card
              className={`w-[280px] sm:w-[330px] md:w-[370px] h-[185px] sm:h-[220px] md:h-[235px] ${
                hasDraggedFar ? 'pointer-events-none' : ''
              }`}
            >
              <PostCard
                post={post}
                hrefPrefix={hrefPrefix}
                variant="unu"
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Kontrol Navigasi Bawah Khas UNU Yogyakarta */}
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto mt-6 sm:mt-8 px-4 gap-3 sm:gap-6">
        {/* Tombol Kiri (<) Bulat */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Geser ke kiri"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-400/50 dark:border-neutral-700 hover:border-foreground/80 hover:bg-black/5 dark:hover:bg-white/10 text-foreground flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer shadow-2xs active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
        </button>

        {/* Scroll Progress Bar Track Ala UNU Jogja */}
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className="relative flex-1 h-1 sm:h-1.5 bg-neutral-300/80 dark:bg-neutral-800 rounded-full overflow-hidden cursor-pointer"
          title="Klik untuk melompat ke posisi kartu"
        >
          {/* Active Moving Pill */}
          <div
            className="absolute top-0 bottom-0 bg-neutral-900 dark:bg-neutral-100 rounded-full transition-all duration-150"
            style={{
              left: `${pillLeftPercent}%`,
              width: `${pillWidthPercent}%`,
            }}
          />
        </div>

        {/* Tombol Kanan (>) Bulat */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Geser ke kanan"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-400/50 dark:border-neutral-700 hover:border-foreground/80 hover:bg-black/5 dark:hover:bg-white/10 text-foreground flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer shadow-2xs active:scale-95"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
        </button>
      </div>
    </div>
  )
}
