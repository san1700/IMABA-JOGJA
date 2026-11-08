import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SectionHeaderProps {
  badge?: string
  badgeIcon?: React.ReactNode
  title: string | React.ReactNode
  description?: string | React.ReactNode
  variant?: 'light' | 'dark'
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeader({
  badge,
  badgeIcon,
  title,
  description,
  variant = 'light',
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const isDark = variant === 'dark'
  const isCenter = align === 'center'

  return (
    <div
      className={cn(
        'w-full mb-12 sm:mb-16',
        isCenter ? 'flex flex-col items-center text-center max-w-3xl mx-auto' : 'text-left max-w-3xl',
        className,
      )}
    >
      {/* Badge Pil Kecil di Atas Judul */}
      {badge && (
        <div
          className={cn(
            'inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm',
            isDark
              ? 'glass-pill text-white/90 border-white/20'
              : 'bg-[#1E2FB8]/10 text-[#1E2FB8] dark:bg-white/10 dark:text-[#D8E0FF] border border-[#1E2FB8]/15 dark:border-white/15',
          )}
        >
          {badgeIcon}
          <span>{badge}</span>
        </div>
      )}

      {/* Judul Utama Tebal */}
      <h2
        className={cn(
          'font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.2] mb-4',
          isDark ? 'text-white' : 'text-[#050A2E] dark:text-white',
        )}
      >
        {title}
      </h2>

      {/* Paragraf Pengantar */}
      {description && (
        <p
          className={cn(
            'font-sans text-base sm:text-lg leading-relaxed max-w-2xl',
            isDark ? 'text-white/75' : 'text-foreground/75 dark:text-white/70',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

