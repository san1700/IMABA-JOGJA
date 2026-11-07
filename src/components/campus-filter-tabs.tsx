'use client'

import * as React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ExternalLink, ArrowRight } from 'lucide-react'
import type { Campus } from '@/sanity/lib/queries'

interface CampusFilterTabsProps {
  campuses: Campus[]
}

const TABS = [
  { id: 'all', label: 'Semua Kampus' },
  { id: 'ptn', label: 'PTN (Negeri)' },
  { id: 'ptkin', label: 'PTKIN (Keagamaan)' },
  { id: 'pts', label: 'PTS (Swasta)' },
]

export function CampusFilterTabs({ campuses }: CampusFilterTabsProps) {
  const [activeTab, setActiveTab] = React.useState('all')
  const shouldReduceMotion = useReducedMotion()

  const filteredCampuses = React.useMemo(() => {
    if (activeTab === 'all') return campuses
    return campuses.filter((c) => c.type === activeTab)
  }, [activeTab, campuses])

  const typeLabels: Record<string, string> = {
    ptn: 'PTN (Negeri)',
    ptkin: 'PTKIN (Keagamaan)',
    pts: 'PTS (Swasta)',
    kedinasan: 'Kedinasan',
  }

  return (
    <div className="w-full flex flex-col">
      {/* Tab Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? 'text-white'
                  : 'bg-card border border-border text-foreground/80 hover:bg-muted'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCampusTab"
                  className="absolute inset-0 rounded-full bg-primary shadow-md -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Grid Kampus Terfilter dengan Animasi */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCampuses.map((campus) => (
            <motion.div
              key={campus._id}
              layout
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="card-radius-large p-7 bg-card border border-border flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-heading font-black text-2xl text-primary tracking-tight">
                    {campus.shortName}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-muted text-foreground/80 border border-border">
                    {typeLabels[campus.type] || 'Kampus'}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                  {campus.name}
                </h3>

                {campus.address && (
                  <p className="text-xs text-muted-foreground mb-3">{campus.address}</p>
                )}

                {campus.description && (
                  <p className="text-xs text-foreground/75 leading-relaxed line-clamp-3 mb-6">
                    {campus.description}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
                {campus.websiteUrl && (
                  <a
                    href={campus.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>Web Resmi</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {campus.admissionUrl && (
                  <a
                    href={campus.admissionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-white bg-primary hover:bg-primary/90 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1"
                  >
                    <span>Portal PMB</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

