'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import { Search, X, FileText, GraduationCap, Award, Compass, CornerDownLeft } from 'lucide-react'

export interface SearchItem {
  id: string
  title: string
  category: string
  type: 'berita' | 'karya' | 'kampus' | 'beasiswa' | 'profil'
  href: string
  description?: string
}

const DEFAULT_SEARCHABLE_ITEMS: SearchItem[] = [
  // Halaman & Profil
  {
    id: 'p-1',
    title: 'Sejarah & Filosofi IMABA Yogyakarta',
    category: 'Profil',
    type: 'profil',
    href: '/profil#sejarah',
    description: 'Jejak langkah santri Mambaul Ulum Bata-Bata di tanah perantauan Yogyakarta.',
  },
  {
    id: 'p-2',
    title: 'AD / ART Organisasi IMABA',
    category: 'Profil',
    type: 'profil',
    href: '/profil#ad-art',
    description: 'Landasan hukum, asas keislaman, dan tata kelola DPW IMABA DIY.',
  },
  {
    id: 'p-3',
    title: 'Struktur Pengurus DPW Periode 2025/2026',
    category: 'Profil',
    type: 'profil',
    href: '/profil#struktur',
    description: 'Jajaran BPH dan koordinator divisi kepengurusan IMABA Jogja.',
  },
  {
    id: 'p-4',
    title: 'Divisi Puteri Imaba',
    category: 'Profil',
    type: 'profil',
    href: '/puteri-imaba',
    description: 'Wadah pemberdayaan, kepemimpinan, dan karya intelektual mahasiswi.',
  },

  // Info Kampus & Beasiswa
  {
    id: 'k-1',
    title: 'Program Bimtren IMABA Jogja 2026',
    category: 'Informasi Kampus',
    type: 'kampus',
    href: '/informasi-kampus#bimtren',
    description: 'Bimbingan intensif masuk PTN/PTKIN dan pendampingan asrama untuk santri baru.',
  },
  {
    id: 'k-2',
    title: 'Direktori Kampus & Prodi di Yogyakarta',
    category: 'Informasi Kampus',
    type: 'kampus',
    href: '/informasi-kampus#kampus',
    description: 'Informasi UGM, UIN Sunan Kalijaga, UNY, UPN, UII, UMY.',
  },
  {
    id: 'k-3',
    title: 'Informasi Beasiswa (KIP Kuliah & PBSB Kemenag)',
    category: 'Beasiswa',
    type: 'beasiswa',
    href: '/informasi-kampus#beasiswa',
    description: 'Peluang beasiswa kuliah gratis dan biaya hidup untuk santri & mahasiswa.',
  },
  {
    id: 'k-4',
    title: 'Unduhan Brosur PMB & Modul Ujian',
    category: 'Informasi Kampus',
    type: 'kampus',
    href: '/informasi-kampus#unduhan',
    description: 'Buku saku maba dan modul bank soal latihan UTBK-SNBT.',
  },

  // Berita & Karya Kader
  {
    id: 'b-1',
    title: 'Kabar Berita & Liputan Kegiatan DPW',
    category: 'Berita',
    type: 'berita',
    href: '/berita',
    description: 'Rilis berita resmi seputar pengkaderan dan kegiatan santri di Jogja.',
  },
  {
    id: 'b-2',
    title: 'Agenda & Kalender Kegiatan DPW',
    category: 'Berita',
    type: 'berita',
    href: '/berita?kategori=agenda',
    description: 'Jadwal pertemuan, kajian, dan peringatan hari besar organisasi.',
  },
  {
    id: 'w-1',
    title: 'Karya Kader: Opini & Esai Kritis',
    category: 'Karya Kader',
    type: 'karya',
    href: '/karya-kader?kategori=opini',
    description: 'Gagasan pemikiran sosial, politik, dan keislaman santri mahasiswa.',
  },
  {
    id: 'w-2',
    title: 'Karya Kader: Cerpen & Sastra Santri',
    category: 'Karya Kader',
    type: 'karya',
    href: '/karya-kader?kategori=cerpen',
    description: 'Karya prosa dan cerpen kehidupan santri di tanah perantauan.',
  },
  {
    id: 'w-3',
    title: 'Karya Kader: Puisi & Sajak Reflektif',
    category: 'Karya Kader',
    type: 'karya',
    href: '/karya-kader?kategori=puisi',
    description: 'Bait sajak renungan dan ekspresi sastrawi kader IMABA.',
  },
]

export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const [query, setQuery] = React.useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Inisialisasi Fuse.js
  const fuse = React.useMemo(() => {
    return new Fuse(DEFAULT_SEARCHABLE_ITEMS, {
      keys: ['title', 'category', 'description'],
      threshold: 0.35,
      ignoreLocation: true,
    })
  }, [])

  // Hasil pencarian
  const results = React.useMemo(() => {
    if (!query.trim()) {
      return DEFAULT_SEARCHABLE_ITEMS.slice(0, 6)
    }
    return fuse.search(query).map((res) => res.item)
  }, [fuse, query])

  // Reset selectedIndex saat query berubah menggunakan pola render-time React 19
  const [prevQuery, setPrevQuery] = React.useState(query)
  if (prevQuery !== query) {
    setPrevQuery(query)
    setSelectedIndex(0)
  }

  // Autofocus saat modal dibuka
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
      return () => {
        clearTimeout(timer)
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

  const handleClose = () => {
    setQuery('')
    onClose()
  }

  // Keyboard navigation (Arrow Up/Down, Enter, Esc)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = results[selectedIndex]
      if (item) {
        handleClose()
        router.push(item.href)
      }
    } else if (e.key === 'Escape') {
      handleClose()
    }
  }

  if (!isOpen) return null

  const getIcon = (type: SearchItem['type']) => {
    switch (type) {
      case 'kampus':
        return <GraduationCap className="w-4 h-4 text-[#4F5CF2]" />
      case 'beasiswa':
        return <Award className="w-4 h-4 text-[#F9C80E]" />
      case 'berita':
        return <FileText className="w-4 h-4 text-[#1E2FB8]" />
      case 'karya':
        return <FileText className="w-4 h-4 text-[#1FA83C]" />
      case 'profil':
      default:
        return <Compass className="w-4 h-4 text-[#E3262A]" />
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl rounded-3xl bg-[#050A2E] text-white border border-white/20 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.04]">
          <Search className="w-5 h-5 text-white/50 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="search-modal-title"
            placeholder="Cari berita, karya, kampus, beasiswa, bimtren..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-white/40 text-base focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold text-white/40 bg-white/10 rounded-md border border-white/15">
              ESC
            </kbd>
          )}
        </div>

        {/* Hasil Pencarian */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
          {results.length > 0 ? (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    handleClose()
                    router.push(item.href)
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-start justify-between gap-3 p-3.5 rounded-2xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#1E2FB8] to-[#4F5CF2] text-white shadow-md'
                      : 'hover:bg-white/[0.06] text-white/90'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {getIcon(item.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-semibold text-sm truncate">
                          {item.title}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-white/10 text-white/70'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      {item.description && (
                        <p
                          className={`text-xs line-clamp-1 mt-0.5 ${
                            isSelected ? 'text-white/80' : 'text-white/50'
                          }`}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <CornerDownLeft className="w-4 h-4 text-white/70 flex-shrink-0 mt-1 hidden sm:block" />
                  )}
                </div>
              )
            })
          ) : (
            <div className="text-center py-12 text-white/50">
              <Compass className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Tidak ada hasil untuk &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-white/40 mt-1">
                Coba kata kunci lain seperti: UGM, Bimtren, Beasiswa, atau Opini.
              </p>
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-5 py-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[11px] text-white/50">
          <span>Tekan navigasi panah &uarr; &darr; untuk memilih</span>
          <span>Tekan [Enter] untuk membuka tautan</span>
        </div>
      </div>
    </div>
  )
}
