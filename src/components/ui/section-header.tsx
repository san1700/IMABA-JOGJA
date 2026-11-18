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
            'inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-eyebrow mb-4 shadow-sm',
            isDark
              ? 'glass-pill text-white/90 border-white/20'
              : 'bg-primary/10 text-primary dark:bg-[#C5A059]/15 dark:text-[#E6B75B] border border-primary/20 dark:border-[#C5A059]/30',
          )}
        >
          {badgeIcon}
          <span className="whitespace-nowrap">{badge}</span>
        </div>
      )}

      {/* Judul Utama */}
      <h2
        className={cn(
          'font-heading text-h2-fluid tracking-tight leading-snug mb-3',
          isDark ? 'text-white' : 'text-[#14120E] dark:text-white',
        )}
      >
        {title}
      </h2>

      {/* Paragraf Pengantar */}
      {description && (
        <p
          className={cn(
            'font-sans text-body-fluid leading-relaxed max-w-[65ch]',
            isDark ? 'text-white/80' : 'text-foreground/80 dark:text-white/75',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

