import Link from 'next/link'
import { Compass, Home, Newspaper, GraduationCap } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-20">
      <div className="max-w-md w-full text-center flex flex-col items-center">
        {/* Badge 404 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-6">
          <Compass className="w-3.5 h-3.5 animate-spin" />
          <span>Error 404 &bull; Halaman Tidak Ditemukan</span>
        </div>

        <h1 className="font-heading font-semibold text-6xl sm:text-7xl text-foreground tracking-tight mb-4">
          404
        </h1>

        <h2 className="font-heading font-normal text-[22px] text-foreground mb-3">
          Tersesat di Kota Pendidikan?
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          Halaman yang kamu tuju tidak ditemukan atau mungkin sudah dipindahkan. Jangan khawatir,
          kamu bisa kembali ke halaman beranda atau menjelajahi menu lainnya.
        </p>

        {/* Tombol Utama */}
        <Link
          href="/"
          className="btn-pill-arrow bg-[#C5A059] hover:bg-[#D4B36D] text-[#14120E] shadow-xl shadow-black/20 mb-8 inline-flex"
        >
          <span>Kembali ke Beranda</span>
          <span className="arrow-disc bg-[#14120E] text-[#C5A059]">
            <Home className="w-4 h-4" />
          </span>
        </Link>

        {/* Tautan Cepat */}
        <div className="pt-6 border-t border-border w-full flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <Link href="/berita" className="hover:text-primary transition-colors flex items-center gap-1">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Kabar Berita</span>
          </Link>
          <span>&bull;</span>
          <Link href="/informasi-kampus" className="hover:text-primary transition-colors flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Info Kampus</span>
          </Link>
          <span>&bull;</span>
          <Link href="/profil" className="hover:text-primary transition-colors">
            <span>Profil IMABA</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
