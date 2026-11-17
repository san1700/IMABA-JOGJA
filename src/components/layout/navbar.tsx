'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Users,
  Award,
  Download,
  Calendar,
  Sparkles,
  FileText,
  HeartHandshake,
  Search,
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { SearchModal } from '@/components/search-modal'
import { cn } from '@/lib/utils'

interface SubMenuItem {
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

interface NavItem {
  title: string
  href: string
  items?: SubMenuItem[]
}

const NAV_ITEMS: NavItem[] = [
  {
    title: 'Beranda',
    href: '/',
  },
  {
    title: 'Profil',
    href: '/profil',
    items: [
      {
        title: 'Sejarah & Filosofi',
        description: 'Jejak langkah santri Bata-Bata di tanah perantauan Yogyakarta',
        href: '/profil#sejarah',
        icon: BookOpen,
      },
      {
        title: 'AD / ART Organisasi',
        description: 'Landasan konstitusi, asas, dan tata tertib IMABA',
        href: '/profil#ad-art',
        icon: FileText,
      },
      {
        title: 'Struktur Pengurus DPW',
        description: 'Susunan jajaran Badan Pengurus Harian & Divisi',
        href: '/profil#struktur',
        icon: Users,
      },
    ],
  },
  {
    title: 'Berita',
    href: '/berita',
    items: [
      {
        title: 'Kabar Terbaru',
        description: 'Rilis berita kegiatan, liputan acara, dan informasi publik',
        href: '/berita',
        icon: FileText,
      },
      {
        title: 'Agenda & Kegiatan DPW',
        description: 'Kalender agenda kerja, peringatan hari besar, & perkumpulan',
        href: '/berita?kategori=agenda',
        icon: Calendar,
        badge: 'Jadwal',
      },
    ],
  },
  {
    title: 'Informasi Kampus',
    href: '/informasi-kampus',
    items: [
      {
        title: 'Daftar Kampus & Prodi',
        description: 'Direktori PTN, PTKIN, dan PTS terkemuka di Yogyakarta',
        href: '/informasi-kampus',
        icon: GraduationCap,
      },
      {
        title: 'Jalur Masuk Kuliah',
        description: 'Informasi seleksi SNBP, SNBT, Ujian Mandiri, & SPAN-PTKIN',
        href: '/informasi-kampus#jalur-masuk',
        icon: Sparkles,
      },
      {
        title: 'Informasi Beasiswa',
        description: 'KIP Kuliah, Beasiswa Kemenag/Santri, Pemda, & BAZNAS',
        href: '/informasi-kampus#beasiswa',
        icon: Award,
        badge: 'Penting',
      },
      {
        title: 'Brosur & Panduan PMB',
        description: 'Unduh brosur resmi penerimaan mahasiswa baru',
        href: '/informasi-kampus#unduhan',
        icon: Download,
      },
      {
        title: 'Bimtren IMABA Jogja',
        description: 'Bimbingan intensif masuk kampus impian khusus santri',
        href: '/informasi-kampus#bimtren',
        icon: HeartHandshake,
        badge: 'Unggulan',
      },
    ],
  },
  {
    title: 'Karya Kader',
    href: '/karya-kader',
    items: [
      {
        title: 'Semua Karya',
        description: 'Eksplorasi seluruh karya literasi dan gagasan kader IMABA',
        href: '/karya-kader',
        icon: BookOpen,
      },
      {
        title: 'Opini & Esai',
        description: 'Tulisan analisis kritis, wacana sosial, politik, dan keislaman',
        href: '/karya-kader?kategori=opini',
        icon: FileText,
      },
      {
        title: 'Cerpen & Sastra',
        description: 'Karya sastra prosa, fiksi, dan cerita santri di perantauan',
        href: '/karya-kader?kategori=cerpen',
        icon: Sparkles,
      },
      {
        title: 'Puisi & Memoar',
        description: 'Rangkaian sajak estetis dan catatan kenangan kader',
        href: '/karya-kader?kategori=puisi',
        icon: BookOpen,
      },
    ],
  },
  {
    title: 'Puteri Imaba',
    href: '/puteri-imaba',
  },
]

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const navRef = React.useRef<HTMLElement>(null)

  // Shortcut Cmd+K / Ctrl+K untuk pencarian cepat
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Pantau scroll untuk efek glassmorphism
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Tutup dropdown saat klik di luar
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const [prevPathname, setPrevPathname] = React.useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setMobileMenuOpen(false)
    setActiveDropdown(null)
  }

  const toggleDropdown = (title: string) => {
    setActiveDropdown((prev) => (prev === title ? null : title))
  }

  return (
    <header
      ref={navRef}
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-[#14120E]/90 backdrop-blur-xl border-b border-[#C5A059]/20 shadow-lg shadow-black/30 py-3'
          : 'bg-[#14120E] text-white py-4 border-b border-[#2D2822]',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 xl:gap-4">
          {/* Logo & Identitas Organisasi */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl p-1 shrink-0"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#C5A059] via-[#E6B75B] to-[#C5A059] shadow-md shadow-black/50 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-[#14120E] flex items-center justify-center overflow-hidden p-1">
                <Image
                  src="/logo.png"
                  alt="Logo IMABA Yogyakarta"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-semibold text-nav-brand tracking-tight text-[#E5D7B7] leading-tight flex items-center gap-1.5 whitespace-nowrap">
                IMABA JOGJA
                <span className="inline-block w-2 h-2 rounded-full bg-[#C5A059] animate-pulse shrink-0" />
              </span>
              <span className="text-nav-subbrand text-[#C5A059]/80 leading-none hidden xl:block whitespace-nowrap">
                Ikatan Mahasiswa Bata-Bata
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
            {NAV_ITEMS.map((item) => {
              const hasDropdown = Boolean(item.items && item.items.length > 0)
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)
              const isOpen = activeDropdown === item.title

              if (!hasDropdown) {
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      'px-2.5 xl:px-3.5 py-1.5 xl:py-2 rounded-full text-nav-link whitespace-nowrap shrink-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                      isActive
                        ? 'bg-[#C5A059]/20 text-[#E6B75B] shadow-sm font-semibold'
                        : 'text-[#D5CEBF] hover:text-white hover:bg-[#C5A059]/10',
                    )}
                  >
                    <span className="whitespace-nowrap">{item.title}</span>
                  </Link>
                )
              }

              return (
                <div key={item.title} className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleDropdown(item.title)}
                    onMouseEnter={() => setActiveDropdown(item.title)}
                    aria-expanded={isOpen}
                    className={cn(
                      'inline-flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3.5 py-1.5 xl:py-2 rounded-full text-nav-link whitespace-nowrap shrink-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                      isOpen || isActive
                        ? 'bg-[#C5A059]/20 text-[#E6B75B] shadow-sm font-semibold'
                        : 'text-[#D5CEBF] hover:text-white hover:bg-[#C5A059]/10',
                    )}
                  >
                    <span className="whitespace-nowrap">{item.title}</span>
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200 text-white/70 shrink-0',
                        isOpen && 'transform rotate-180 text-white',
                      )}
                    />
                  </button>

                  {/* Dropdown Menu Glass Panel */}
                  {isOpen && (
                    <div
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute top-full left-0 mt-2 w-80 sm:w-96 rounded-2xl p-2.5 bg-[#14120E]/95 backdrop-blur-2xl border border-[#C5A059]/20 shadow-2xl shadow-black/60 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                      <div className="flex flex-col gap-1">
                        {item.items?.map((sub) => {
                          const Icon = sub.icon
                          return (
                            <Link
                              key={sub.title}
                              href={sub.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group flex items-start gap-3.5 p-3 rounded-xl transition-all duration-200 hover:bg-white/10 focus:outline-none focus:bg-white/10"
                            >
                              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C5A059]/30 to-[#E6B75B]/20 border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059] group-hover:scale-105 group-hover:bg-[#C5A059] group-hover:text-[#14120E] transition-all flex-shrink-0 mt-0.5">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-white group-hover:text-[#C5A059] transition-colors truncate">
                                    {sub.title}
                                  </span>
                                  {sub.badge && (
                                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#1FA83C]/30 text-[#4ADE80] border border-[#1FA83C]/50">
                                      {sub.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-white/60 line-clamp-2 mt-0.5 group-hover:text-white/80 transition-colors">
                                  {sub.description}
                                </p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 xl:gap-2.5 shrink-0">
            {/* Quick Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Pencarian Cepat (Cmd+K)"
              title="Pencarian Cepat (Cmd+K)"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/90 border border-white/15 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <ThemeToggle className="text-white shrink-0" />

            {/* Pill CTA Button dengan Lingkaran Panah */}
            <Link
              href="/informasi-kampus#bimtren"
              className="hidden sm:inline-flex items-center gap-2 xl:gap-2.5 rounded-full pl-3.5 xl:pl-5 pr-1.5 xl:pr-2 py-1 xl:py-1.5 bg-[#C5A059] hover:bg-[#D4B36D] text-[#14120E] font-bold text-xs tracking-wide shadow-md shadow-black/30 border border-[#E6B75B]/30 transition-all duration-300 group whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">Bimtren 2026</span>
              <span className="w-6 h-6 xl:w-7 xl:h-7 rounded-full bg-[#14120E] text-[#C5A059] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 shadow-sm shrink-0">
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className="lg:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer / Sheet */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[69px] bottom-0 bg-[#14120E]/97 backdrop-blur-2xl z-40 border-t border-[#2D2822] overflow-y-auto p-4 sm:p-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2 max-w-lg mx-auto pb-12">
            {NAV_ITEMS.map((item) => {
              const hasDropdown = Boolean(item.items && item.items.length > 0)
              const isOpen = activeDropdown === item.title

              if (!hasDropdown) {
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {item.title}
                  </Link>
                )
              }

              return (
                <div key={item.title} className="rounded-xl overflow-hidden bg-white/[0.04] border border-white/10">
                  <button
                    type="button"
                    onClick={() => toggleDropdown(item.title)}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-base font-semibold text-white/90 hover:text-white transition-colors"
                  >
                    <span>{item.title}</span>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 transition-transform duration-200 text-white/70',
                        isOpen && 'transform rotate-180 text-white',
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-3 pb-3 pt-1 flex flex-col gap-1 border-t border-white/5 bg-black/20">
                      {item.items?.map((sub) => {
                        const Icon = sub.icon
                        return (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 p-2.5 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <div className="w-7 h-7 rounded-md bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center text-white/90 flex-shrink-0">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-medium text-white">{sub.title}</span>
                              {sub.badge && (
                                <span className="ml-2 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#1FA83C]/30 text-[#4ADE80]">
                                  {sub.badge}
                                </span>
                              )}
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}

            {/* Mobile Action CTA */}
            <div className="pt-4 border-t border-white/10 mt-2">
              <Link
                href="/informasi-kampus#bimtren"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-3 rounded-full py-3 px-6 bg-[#C5A059] hover:bg-[#D4B36D] text-[#14120E] font-bold text-sm shadow-lg shadow-black/30"
              >
                <span>Bimbingan Masuk Kampus (Bimtren 2026)</span>
                <span className="w-6 h-6 rounded-full bg-[#14120E] text-[#C5A059] flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* Modal Pencarian Cepat */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  )
}
