'use client'

import * as React from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="h-full w-full bg-gradient-to-r from-[#1E2FB8] via-[#4F5CF2] to-[#F9C80E] shadow-sm shadow-[#4F5CF2]/50"
      />
    </div>
  )
}

