'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

const emptySubscribe = () => () => {}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme()
  const isMounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  if (!isMounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full bg-white/10 border border-white/15 animate-pulse ${className}`}
        aria-hidden="true"
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
      title={isDark ? 'Mode Terang' : 'Mode Gelap'}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 border ${
        isDark
          ? 'bg-white/10 hover:bg-white/20 text-yellow-300 border-white/20 shadow-inner'
          : 'bg-white/80 hover:bg-white text-navy border-black/10 shadow-sm'
      } ${className}`}
    >
      <Sun
        className={`w-4 h-4 transition-all duration-300 transform ${
          isDark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
        }`}
      />
      <Moon
        className={`absolute w-4 h-4 transition-all duration-300 transform ${
          isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'
        }`}
      />
    </button>
  )
}
