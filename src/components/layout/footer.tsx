import Link from 'next/link'
import Image from 'next/image'
import {
  Mail,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function YoutubeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" fill="currentColor" />
    </svg>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#050A2E] text-white border-t border-white/10 relative overflow-hidden">
      {/* Subtle background glow accents */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#1E2FB8]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4F5CF2]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Info & Pesantren Motto */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#1E2FB8] via-[#4F5CF2] to-[#F9C80E] flex-shrink-0 shadow-lg shadow-indigo-950/60">
                <div className="w-full h-full rounded-full bg-[#050A2E] flex items-center justify-center p-1.5 overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Logo IMABA Yogyakarta"
                    width={44}
                    height={44}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white leading-tight">
                  IMABA JOGJA
                </span>
                <span className="text-xs text-white/60 tracking-wider uppercase font-medium">
                  Dewan Pengurus Wilayah Yogyakarta
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Ikatan Mahasiswa Bata-Bata (IMABA) Daerah Istimewa Yogyakarta adalah wadah silaturahmi,
              pengkaderan intelektual, dan pengabdian santri serta alumni Pondok Pesantren Mambaul
              Ulum Bata-Bata di Kota Pelajar.
            </p>

            {/* Slogan Pesantren Pill Badge */}
            <div className="glass-pill rounded-2xl p-4 max-w-md border border-white/15 bg-white/[0.04]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F9C80E] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Motto Pondok Pesantren</span>
              </div>
              <p className="text-xs italic text-white/90 font-serif">
                &ldquo;Kesopanan Lebih Tinggi Nilainya daripada Kebudayaan&rdquo;
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com/imabayogyakarta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram IMABA Yogyakarta"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1E2FB8] text-white/80 hover:text-white border border-white/15 flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@imabayogyakarta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube IMABA Yogyakarta"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E3262A] text-white/80 hover:text-white border border-white/15 flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:dpw@imabayogyakarta.com"
                aria-label="Email Resmi IMABA Yogyakarta"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#4F5CF2] text-white/80 hover:text-white border border-white/15 flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Kolom 1: Profil Organisasi */}
          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-sm font-bold tracking-wider uppercase text-white/90 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E2FB8]" />
              Profil & Struktur
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-white/70">
              <li>
                <Link
                  href="/profil#sejarah"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Sejarah & Filosofi
                </Link>
              </li>
              <li>
                <Link
                  href="/profil#ad-art"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  AD / ART Organisasi
                </Link>
              </li>
              <li>
                <Link
                  href="/profil#struktur"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Struktur Pengurus DPW
                </Link>
              </li>
              <li>
                <Link
                  href="/puteri-imaba"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Divisi Puteri Imaba
                </Link>
              </li>
              <li>
                <Link
                  href="/profil#alumni"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Jaringan Alumni & Komda
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 2: Informasi Kampus & Bimtren */}
          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-sm font-bold tracking-wider uppercase text-white/90 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F9C80E]" />
              Informasi Kampus
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-white/70">
              <li>
                <Link
                  href="/informasi-kampus"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Daftar Kampus & Prodi
                </Link>
              </li>
              <li>
                <Link
                  href="/informasi-kampus#jalur-masuk"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Jalur Masuk Kuliah
                </Link>
              </li>
              <li>
                <Link
                  href="/informasi-kampus#beasiswa"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Informasi Beasiswa
                </Link>
              </li>
              <li>
                <Link
                  href="/informasi-kampus#unduhan"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Brosur & Dokumen PMB
                </Link>
              </li>
              <li>
                <Link
                  href="/informasi-kampus#bimtren"
                  className="text-[#F9C80E] font-semibold hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Program Bimtren 2026
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Publikasi & Literasi */}
          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-sm font-bold tracking-wider uppercase text-white/90 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FA83C]" />
              Karya & Berita
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-white/70">
              <li>
                <Link
                  href="/berita"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Kabar Berita Terkini
                </Link>
              </li>
              <li>
                <Link
                  href="/berita?kategori=agenda"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Agenda & Kegiatan DPW
                </Link>
              </li>
              <li>
                <Link
                  href="/karya-kader?kategori=opini"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Opini & Esai Kritis
                </Link>
              </li>
              <li>
                <Link
                  href="/karya-kader?kategori=cerpen"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Cerpen & Sastra Santri
                </Link>
              </li>
              <li>
                <Link
                  href="/karya-kader?kategori=puisi"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  Puisi & Catatan Kader
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Sanad */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>
              &copy; {currentYear} DPW IMABA Daerah Istimewa Yogyakarta. Seluruh hak cipta dilindungi.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link href="/profil#ad-art" className="hover:text-white/80 transition-colors">
              Konstitusi Organisasi
            </Link>
            <span>&bull;</span>
            <Link href="/studio" className="hover:text-[#F9C80E] transition-colors">
              Sanity Studio
            </Link>
            <span>&bull;</span>
            <span className="text-white/40">Yogyakarta, Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
