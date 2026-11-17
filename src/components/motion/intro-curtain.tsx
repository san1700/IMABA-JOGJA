'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

export function IntroCurtain() {
  const [show, setShow] = React.useState(false)
  const shouldReduceMotion = useReducedMotion()

  React.useEffect(() => {
    if (shouldReduceMotion) return

    // Cek apakah parameter ?intro=1 ada di URL untuk kemudahan testing
    const forceIntro =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).has('intro')

    const hasSeen =
      typeof window !== 'undefined' &&
      sessionStorage.getItem('imaba_intro_seen_v1')

    if (!hasSeen || forceIntro) {
      sessionStorage.setItem('imaba_intro_seen_v1', 'true')

      // Jadwalkan kemunculan tirai agar terhindar dari cascading render
      const showTimer = setTimeout(() => {
        setShow(true)
      }, 10)

      // Selesai dalam 1.4 detik, lalu tirai terangkat ke atas
      const dismissTimer = setTimeout(() => {
        setShow(false)
      }, 1450)

      return () => {
        clearTimeout(showTimer)
        clearTimeout(dismissTimer)
      }
    }
  }, [shouldReduceMotion])

  const handleDismiss = () => {
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-curtain"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1], // Exponential ease-out
            },
          }}
          className="fixed inset-0 z-[9999] bg-[#14120E] flex flex-col items-center justify-center text-white overflow-hidden select-none pointer-events-auto"
          onClick={handleDismiss}
          role="dialog"
          aria-label="Animasi Pembuka IMABA Yogyakarta"
        >
          {/* Pendaran Cahaya Emas di Tengah */}
          <div
            className="absolute w-[450px] h-[450px] rounded-full bg-[#C5A059]/15 blur-[90px] pointer-events-none -z-10"
            aria-hidden="true"
          />

          {/* Logo & Bingkai Emas Royal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-5"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1 bg-gradient-to-tr from-[#C5A059] via-[#E6B75B] to-[#C5A059] shadow-2xl shadow-black/70 flex items-center justify-center">
              <div className="w-full h-full rounded-[22px] bg-[#14120E] flex items-center justify-center p-3 relative overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Logo IMABA Yogyakarta"
                  width={72}
                  height={72}
                  priority
                  className="object-contain drop-shadow"
                />
              </div>
            </div>
          </motion.div>

          {/* Teks Identitas Organisasi */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] sm:text-xs font-semibold tracking-[0.26em] text-[#C5A059] uppercase text-center mb-1.5"
          >
            Dewan Pengurus Wilayah
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-semibold text-xl sm:text-2xl md:text-3xl text-white tracking-tight text-center px-4"
          >
            IMABA DAERAH ISTIMEWA YOGYAKARTA
          </motion.h1>

          {/* Garis Pembatas Emas Tipis */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.42, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-36 sm:w-52 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent my-3"
          />

          {/* Motto Organisasi */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.52, duration: 0.45 }}
            className="font-sans italic text-xs sm:text-sm text-[#EDE8DD]/85 text-center max-w-md px-6"
          >
            Berakar pada Nilai Pesantren. Berdaya di Kota Pendidikan.
          </motion.p>

          {/* Tombol Lewati / Skip Cepat */}
          <button
            onClick={handleDismiss}
            aria-label="Lewati intro"
            className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full text-[11px] text-[#A69B8A] hover:text-[#C5A059] border border-[#3E3428] hover:border-[#C5A059]/40 bg-[#14120E]/80 transition-colors shadow-sm"
          >
            Lewati &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
