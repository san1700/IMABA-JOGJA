import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  GraduationCap,
  Award,
  Sparkles,
  Users,
  Compass,
  Calendar,
  ChevronRight,
  Newspaper,
  Feather,
  Bell,
  FileText,
  MapPin,
  Clock,
  Quote,
  Megaphone,
} from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  POSTS_QUERY,
  CAMPUSES_QUERY,
  type Post,
  type Campus,
  FALLBACK_POSTS,
  FALLBACK_KARYA,
  FALLBACK_CAMPUSES,
  FALLBACK_AGENDA,
  FALLBACK_ANNOUNCEMENTS,
} from '@/sanity/lib/queries'
import { SectionHeader } from '@/components/ui/section-header'
import { PostCard } from '@/components/cards/post-card'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/motion/fade-in'

export const metadata: Metadata = {
  title: 'Beranda | Ikatan Mahasiswa Bata-Bata (IMABA) Yogyakarta',
  description:
    'Portal resmi informasi dan gerakan intelektual santri Mambaul Ulum Bata-Bata di Yogyakarta. Informasi bimbingan masuk kampus (Bimtren), beasiswa, liputan agenda, warta organisasi, dan ruang literasi ilmiah santri.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'IMABA Yogyakarta | Portal Resmi & Informasi Santri Mahasiswa',
    description:
      'Portal resmi informasi dan gerakan intelektual santri Mambaul Ulum Bata-Bata di Yogyakarta. Informasi bimtren, beasiswa, warta organisasi, dan ruang literasi santri.',
    url: '/',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'IMABA Yogyakarta',
      },
    ],
  },
}

export default async function HomePage() {
  // Ambil data Berita Terbaru dari Sanity
  const beritaList = await sanityFetch<Post[]>({
    query: POSTS_QUERY,
    params: { section: 'berita', category: null },
    fallback: FALLBACK_POSTS,
  })

  // Ambil data Karya Kader dari Sanity
  const karyaList = await sanityFetch<Post[]>({
    query: POSTS_QUERY,
    params: { section: 'karya', category: null },
    fallback: FALLBACK_KARYA,
  })

  // Ambil data Kampus Populer dari Sanity
  const campusesList = await sanityFetch<Campus[]>({
    query: CAMPUSES_QUERY,
    fallback: FALLBACK_CAMPUSES,
  })

  const latestBerita = (beritaList || FALLBACK_POSTS).slice(0, 3)
  const latestKarya = (karyaList || FALLBACK_KARYA).slice(0, 3)
  const popularCampuses = (campusesList || FALLBACK_CAMPUSES).slice(0, 4)

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* ============================================================ */}
      {/* 1. HERO BANNER INSTITUSIONAL + RUNNING INFO TICKER */}
      {/* ============================================================ */}
      <section className="relative w-full bg-[#050A2E] text-white pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden border-b border-white/10">
        {/* Subtle Ambient Radial Glows */}
        <div
          className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#1E2FB8]/25 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-10 w-[500px] h-[350px] bg-[#4F5CF2]/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Running Info Ticker Bar (Khas Portal Institusi) */}
          <FadeUp className="mb-8">
            <div className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 max-w-full">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F9C80E] text-[#050A2E] text-xs font-bold uppercase tracking-wider shrink-0 shadow-sm">
                <Megaphone className="w-3.5 h-3.5" />
                <span>Info Terkini</span>
              </span>
              <Link
                href="/informasi-kampus#bimtren"
                className="text-xs sm:text-sm text-white/90 hover:text-white truncate transition-colors flex items-center gap-1.5"
              >
                <span className="truncate">
                  Pendaftaran Bimtren IMABA Jogja 2026 Gelombang I Resmi Dibuka untuk Santri Baru
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#F9C80E] shrink-0" />
              </Link>
            </div>
          </FadeUp>

          {/* Main Hero Header */}
          <div className="max-w-4xl text-left">
            <FadeUp delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-white/90 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#F9C80E] animate-pulse" />
                <span>Dewan Pengurus Wilayah IMABA Daerah Istimewa Yogyakarta</span>
              </div>

              <h1 className="font-heading font-normal text-[28px] tracking-tight text-white leading-snug mb-5">
                Pusat Informasi & Gerakan Intelektual Santri di Kota Pendidikan
              </h1>

              <p className="font-sans text-base sm:text-lg text-white/80 max-w-3xl leading-relaxed mb-10">
                Wadah silaturahmi, advokasi pendidikan tinggi, pendampingan beasiswa, serta mimbar
                literasi ilmiah bagi santri dan alumni Pondok Pesantren Mambaul Ulum Bata-Bata di
                kampus-kampus Daerah Istimewa Yogyakarta.
              </p>

              {/* Primary Dual Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/informasi-kampus#bimtren"
                  className="btn-pill-arrow bg-[#1E2FB8] hover:bg-[#162494] text-white shadow-xl shadow-blue-950/60 border border-white/20 group"
                >
                  <span>Pendaftaran Bimtren 2026</span>
                  <span className="arrow-disc bg-white text-[#1E2FB8] shadow-sm">
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </span>
                </Link>

                <Link
                  href="/informasi-kampus"
                  className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 glass-pill text-white/90 hover:text-white hover:bg-white/15 text-sm font-semibold transition-all duration-200 border border-white/20"
                >
                  <GraduationCap className="w-4 h-4 text-[#F9C80E]" />
                  <span>Direktori Kampus & Beasiswa</span>
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. BARIS AKSES CEPAT (QUICK ACCESS STRIP ALA UNU JOGJA) */}
      {/* ============================================================ */}
      <section className="relative z-20 -mt-8 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Quick Item 1 */}
          <Link
            href="/informasi-kampus#bimtren"
            className="group flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c1445] border border-border shadow-lg shadow-black/5 hover:border-[#1E2FB8] hover:shadow-xl transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1E2FB8]/10 text-[#1E2FB8] dark:text-[#4F5CF2] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#1E2FB8] group-hover:text-white transition-all">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="font-heading font-bold text-sm text-foreground block group-hover:text-primary transition-colors truncate">
                Bimtren 2026
              </span>
              <span className="text-xs text-muted-foreground block truncate">
                Bimbingan PTN & PTKIN
              </span>
            </div>
          </Link>

          {/* Quick Item 2 */}
          <Link
            href="/informasi-kampus#beasiswa"
            className="group flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c1445] border border-border shadow-lg shadow-black/5 hover:border-[#1FA83C] hover:shadow-xl transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1FA83C]/10 text-[#1FA83C] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#1FA83C] group-hover:text-white transition-all">
              <Award className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="font-heading font-bold text-sm text-foreground block group-hover:text-[#1FA83C] transition-colors truncate">
                Info Beasiswa
              </span>
              <span className="text-xs text-muted-foreground block truncate">
                KIP-K, PBSB & Pemda
              </span>
            </div>
          </Link>

          {/* Quick Item 3 */}
          <Link
            href="/informasi-kampus#kampus"
            className="group flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c1445] border border-border shadow-lg shadow-black/5 hover:border-[#4F5CF2] hover:shadow-xl transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-[#4F5CF2]/10 text-[#4F5CF2] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#4F5CF2] group-hover:text-white transition-all">
              <Compass className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="font-heading font-bold text-sm text-foreground block group-hover:text-[#4F5CF2] transition-colors truncate">
                Daftar Kampus
              </span>
              <span className="text-xs text-muted-foreground block truncate">
                UGM, UNY, UIN Suka, dll
              </span>
            </div>
          </Link>

          {/* Quick Item 4 */}
          <Link
            href="/karya-kader"
            className="group flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0c1445] border border-border shadow-lg shadow-black/5 hover:border-[#F9C80E] hover:shadow-xl transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F9C80E]/15 text-[#b48a04] dark:text-[#F9C80E] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#F9C80E] group-hover:text-[#050A2E] transition-all">
              <Feather className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="font-heading font-bold text-sm text-foreground block group-hover:text-primary transition-colors truncate">
                Karya & Literasi
              </span>
              <span className="text-xs text-muted-foreground block truncate">
                Opini, Esai, Cerpen & Puisi
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SAMBUTAN KETUA UMUM DPW IMABA DIY (PIMPINAN CORNER) */}
      {/* ============================================================ */}
      <section className="w-full bg-white dark:bg-[#080E38] text-foreground py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-border/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Visual Profil Pimpinan */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
              <FadeUp>
                <div className="relative">
                  {/* Decorative Gradient Ring */}
                  <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl p-1 bg-gradient-to-tr from-[#1E2FB8] via-[#4F5CF2] to-[#F9C80E] shadow-2xl shadow-indigo-950/20">
                    <div className="w-full h-full rounded-[22px] bg-[#050A2E] flex flex-col items-center justify-center p-6 text-white text-center relative overflow-hidden">
                      <div className="w-20 h-20 rounded-full bg-white/10 p-2 mb-4 border border-white/20 flex items-center justify-center">
                        <Image
                          src="/logo.png"
                          alt="Logo IMABA Yogyakarta"
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#F9C80E] mb-1">
                        Pimpinan Organisasi
                      </span>
                      <h3 className="font-heading font-normal text-[18px] text-white">
                        Moh. Hosen
                      </h3>
                      <p className="text-xs text-white/70 mt-1">
                        Ketua Umum DPW IMABA DIY
                      </p>
                      <p className="text-[11px] text-white/50">
                        Kader UIN Sunan Kalijaga Yogyakarta
                      </p>
                    </div>
                  </div>

                  {/* Badge Masa Khidmah */}
                  <div className="absolute -bottom-4 right-2 sm:-right-4 px-4 py-2 rounded-xl bg-white dark:bg-[#0c1445] text-foreground border border-border shadow-lg flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1FA83C]" />
                    <span className="text-xs font-bold">Masa Khidmah 2025/2026</span>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Konten Sambutan & Visi */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <FadeUp delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                  <Quote className="w-3.5 h-3.5" />
                  <span>Pesan Khidmah Pimpinan</span>
                </div>

                <h2 className="font-heading font-normal text-[22px] text-foreground tracking-tight leading-snug mb-5">
                  Menjaga Integritas Kesantrian di Tengah Arus Modernitas Intelektual Jogja
                </h2>

                <p className="font-article italic text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6 border-l-4 border-primary pl-4">
                  &ldquo;Di kota pelajar ini, kita tidak hanya menuntut gelar akademis. Kita mengemban
                  amanah membawa keluhuran akhlak, ketawaduan, dan kedalaman sanad keilmuan pesantren
                  Mambaul Ulum Bata-Bata untuk mengabdi bagi masyarakat dan kemajuan bangsa.&rdquo;
                </p>

                <p className="font-sans text-sm sm:text-base text-foreground/80 leading-relaxed mb-8">
                  IMABA Daerah Istimewa Yogyakarta berkomitmen menjadi rumah yang ramah dan suportif
                  bagi seluruh santri perantauan. Mulai dari bimbingan masuk perguruan tinggi, pendampingan
                  asrama, advokasi beasiswa, hingga ruang diskusi keilmuan yang progresif dan terbuka.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/profil"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs transition-colors shadow-sm"
                  >
                    <span>Mengenal Profil & AD/ART</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/profil#struktur"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted hover:bg-muted/80 text-foreground font-semibold text-xs transition-colors border border-border"
                  >
                    <Users className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Struktur Pengurus Wilayah</span>
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. WARTA & KABAR TERKINI DPW (NEWSROOM UNU JOGJA STYLE) */}
      {/* ============================================================ */}
      <section className="w-full bg-[#EEF1F9] dark:bg-[#050A2E] text-foreground py-20 sm:py-28 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <FadeUp className="w-full">
            <SectionHeader
              variant="light"
              badge="Warta & Publikasi Resmi"
              badgeIcon={<Newspaper className="w-3.5 h-3.5 text-[#1E2FB8] dark:text-[#F9C80E]" />}
              title="Kabar Terkini Kegiatan & Pengkaderan DPW"
              description="Dokumentasi peliputan kegiatan organisasi, rilis pers keumatan, dan warta silaturahmi kader santri Bata-Bata se-Daerah Istimewa Yogyakarta."
            />
          </FadeUp>

          {/* Grid Kartu Berita Bergaya UNU Jogja */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-12">
            {latestBerita.map((post) => (
              <StaggerItem key={post._id} className="h-full">
                <PostCard post={post} hrefPrefix="/berita" className="h-full" />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Action Link ke Kanal Berita */}
          <FadeUp delay={0.15}>
            <Link
              href="/berita"
              className="btn-pill-arrow bg-[#1E2FB8] hover:bg-[#162494] text-white shadow-xl shadow-blue-950/40 border border-white/20 group"
            >
              <span>Buka Seluruh Arsip Berita</span>
              <span className="arrow-disc bg-white text-[#1E2FB8] shadow-sm">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. AGENDA KEGIATAN & PENGUMUMAN RESMI (KOLOM GANDA ALA UNU) */}
      {/* ============================================================ */}
      <section className="w-full bg-white dark:bg-[#080E38] text-foreground py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-y border-border/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="mb-12 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Kalender Informasi</span>
            </div>
            <h2 className="font-heading font-normal text-[22px] text-foreground tracking-tight">
              Agenda Mendatang & Pengumuman Resmi
            </h2>
            <p className="font-sans text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl">
              Ikuti jadwal kegiatan rutin, silaturahmi, serta instruksi edaran resmi dari jajaran
              pengurus DPW IMABA Daerah Istimewa Yogyakarta.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Kolom Kiri: Agenda Kegiatan (Kotak Tanggal Kalender Besar) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="font-heading font-bold text-base text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Agenda Kegiatan Terdekat
                </span>
                <Link
                  href="/berita?kategori=agenda"
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  <span>Lihat Semua</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                {FALLBACK_AGENDA.map((item) => (
                  <div
                    key={item.id}
                    className="group p-4 sm:p-5 rounded-2xl bg-[#EEF1F9] dark:bg-[#0c1445] border border-border/80 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-primary hover:shadow-md transition-all duration-200"
                  >
                    {/* Kotak Tanggal Kalender (Khas UNU) */}
                    <div className="w-16 h-16 rounded-xl bg-[#050A2E] text-white flex flex-col items-center justify-center shrink-0 border border-white/10 shadow-sm">
                      <span className="font-heading font-black text-xl leading-none text-[#F9C80E]">
                        {item.date}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest mt-0.5 text-white/80">
                        {item.month}
                      </span>
                    </div>

                    {/* Informasi Acara */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-primary/70" />
                          {item.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-primary/70" />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    {/* Tombol Detail */}
                    <Link
                      href={item.link || '/berita'}
                      aria-label={`Detail agenda: ${item.title}`}
                      className="w-8 h-8 rounded-full bg-white dark:bg-white/10 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center shrink-0 transition-all self-end sm:self-center shadow-sm"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Kolom Kanan: Pengumuman Resmi & Surat Edaran */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="font-heading font-bold text-base text-foreground flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#E3262A]" />
                  Pengumuman Resmi
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  Update Berkala
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {FALLBACK_ANNOUNCEMENTS.map((ann) => (
                  <Link
                    key={ann.id}
                    href={ann.href}
                    className="group block p-4 rounded-2xl bg-[#EEF1F9] dark:bg-[#0c1445] border border-border/80 hover:border-[#1E2FB8] hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          ann.badge === 'Penting'
                            ? 'bg-[#E3262A]/10 text-[#E3262A] border border-[#E3262A]/20'
                            : ann.badge === 'Terbaru'
                              ? 'bg-[#1FA83C]/10 text-[#1FA83C] border border-[#1FA83C]/20'
                              : 'bg-primary/10 text-primary border border-primary/20'
                        }`}
                      >
                        {ann.badge}
                      </span>
                      <span className="text-[11px] text-muted-foreground">{ann.date}</span>
                    </div>

                    <h4 className="font-heading font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-snug mb-1 line-clamp-2">
                      {ann.title}
                    </h4>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {ann.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. PUSAT INFORMASI KAMPUS & BEASISWA (EDUCATION HUB) */}
      {/* ============================================================ */}
      <section className="w-full bg-[#EEF1F9] dark:bg-[#050A2E] text-foreground py-20 sm:py-28 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <FadeUp className="w-full">
            <SectionHeader
              variant="light"
              badge="Pusat Informasi Kampus Jogja"
              badgeIcon={<GraduationCap className="w-3.5 h-3.5 text-[#1E2FB8] dark:text-[#F9C80E]" />}
              title="Gerbang Informasi Perguruan Tinggi & Beasiswa"
              description="Panduan lengkap direktori kampus negeri dan swasta di Yogyakarta tempat kader santri belajar, disertai direktori beasiswa pendidikan aktif."
            />
          </FadeUp>

          {/* Grid 4 Kampus Populer Santri */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-12">
            {popularCampuses.map((campus) => (
              <div
                key={campus._id}
                className="p-6 rounded-2xl bg-white dark:bg-[#0c1445] border border-border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                      {campus.shortName.slice(0, 3)}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground border border-border">
                      {campus.type.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-heading font-normal text-[18px] text-foreground mb-1 leading-snug">
                    {campus.shortName}
                  </h3>
                  <p className="text-xs text-primary font-semibold mb-3">
                    {campus.name}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-6">
                    {campus.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                  <Link
                    href={`/informasi-kampus#${campus.slug}`}
                    className="hover:underline flex items-center gap-1"
                  >
                    <span>Info Prodi & Jalur</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  {campus.websiteUrl && (
                    <a
                      href={campus.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground text-[11px]"
                    >
                      Web Resmi &rarr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Callout Strip Info Beasiswa */}
          <FadeUp delay={0.1} className="w-full">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1E2FB8] to-[#4F5CF2] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-950/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-[#F9C80E]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-white mb-1">
                    Butuh Informasi Beasiswa KIP Kuliah & PBSB Kemenag 2026?
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 max-w-xl">
                    Tim advokasi pendidikan IMABA Jogja siap membantu pendampingan berkas pendaftaran
                    beasiswa bagi santri prasejahtera dan berprestasi.
                  </p>
                </div>
              </div>

              <Link
                href="/informasi-kampus#beasiswa"
                className="btn-pill-arrow bg-white text-[#050A2E] hover:bg-gray-100 font-bold shrink-0 text-xs shadow-md"
              >
                <span>Cek Panduan Beasiswa</span>
                <span className="arrow-disc bg-[#050A2E] text-white">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. MIMBAR LITERASI & KARYA KADER SANTRI */}
      {/* ============================================================ */}
      <section className="w-full bg-white dark:bg-[#080E38] text-foreground py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-border/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <FadeUp className="w-full">
            <SectionHeader
              variant="light"
              badge="Mimbar Literasi & Karya Santri"
              badgeIcon={<Feather className="w-3.5 h-3.5 text-[#1E2FB8] dark:text-[#F9C80E]" />}
              title="Gagasan Intelektual, Esai, & Kreativitas Sastra"
              description="Ruang ekspresi dialektika ilmiah dan sastra santri Bata-Bata di Yogyakarta. Wadah publikasi opini kritis, cerpen, esai reflektif, dan bait-bait puisi."
            />
          </FadeUp>

          {/* Grid Kartu Karya Kader */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-12">
            {latestKarya.map((post) => (
              <StaggerItem key={post._id} className="h-full">
                <PostCard post={post} hrefPrefix="/karya-kader" className="h-full" />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Action Link ke Kanal Karya Kader */}
          <FadeUp delay={0.15}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/karya-kader"
                className="btn-pill-arrow bg-[#1E2FB8] hover:bg-[#162494] text-white shadow-xl shadow-blue-900/20 group"
              >
                <span>Jelajahi Ruang Literasi Santri</span>
                <span className="arrow-disc bg-white text-[#1E2FB8] shadow-sm">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </Link>

              <a
                href="mailto:redaksi@imabayogyakarta.com?subject=Pengiriman%20Karya%20Kader%20IMABA"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-muted hover:bg-muted/80 text-foreground font-semibold text-xs border border-border transition-colors"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span>Kirim Naskah Tulisan</span>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. IMABA DALAM ANGKA (JEJAK PENGABDIAN) */}
      {/* ============================================================ */}
      <section className="w-full bg-[#050A2E] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F9C80E] block mb-2">
              Jejak Khidmah & Dedikasi
            </span>
            <h3 className="font-heading font-normal text-[18px] text-white">
              IMABA Yogyakarta dalam Angka
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white/[0.05] border border-white/10">
              <span className="font-heading font-black text-3xl sm:text-4xl text-[#F9C80E] block mb-1">
                500+
              </span>
              <span className="text-xs sm:text-sm text-white/80 font-medium">
                Kader Mahasiswa Aktif
              </span>
              <span className="text-[11px] text-white/50 block mt-1">
                Di kampus se-DIY
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.05] border border-white/10">
              <span className="font-heading font-black text-3xl sm:text-4xl text-[#4ADE80] block mb-1">
                15+
              </span>
              <span className="text-xs sm:text-sm text-white/80 font-medium">
                Perguruan Tinggi
              </span>
              <span className="text-[11px] text-white/50 block mt-1">
                PTN, PTKIN & PTS di Jogja
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.05] border border-white/10">
              <span className="font-heading font-black text-3xl sm:text-4xl text-[#8B98FF] block mb-1">
                4
              </span>
              <span className="text-xs sm:text-sm text-white/80 font-medium">
                Komisariat & Asrama
              </span>
              <span className="text-[11px] text-white/50 block mt-1">
                Pusat binaan santri perantau
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.05] border border-white/10">
              <span className="font-heading font-black text-3xl sm:text-4xl text-[#F9C80E] block mb-1">
                100%
              </span>
              <span className="text-xs sm:text-sm text-white/80 font-medium">
                Bimtren Gratis
              </span>
              <span className="text-[11px] text-white/50 block mt-1">
                Pengabdian untuk calon maba
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. BANNER CALL TO ACTION: BIMTREN 2026 */}
      {/* ============================================================ */}
      <section className="relative w-full bg-gradient-to-br from-[#050A2E] via-[#0B1552] to-[#1E2FB8] text-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#4F5CF2]/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-white/90 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#F9C80E]" />
              <span>Penerimaan Mahasiswa Baru 2026</span>
            </div>

            <h2 className="font-heading font-normal text-[22px] text-white tracking-tight mb-5">
              Siap Melangkah Menembus Kampus Impian di Yogyakarta?
            </h2>

            <p className="font-sans text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed mb-10">
              Program Bimtren IMABA Jogja 2026 membuka pendampingan intensif tryout SNBT, bimbingan
              ujian mandiri, rekomendasi beasiswa, hingga fasilitas asrama singgah gratis khusus bagi
              santri alumni Bata-Bata.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/informasi-kampus#bimtren"
                className="btn-pill-arrow bg-[#F9C80E] hover:bg-[#eab308] text-[#050A2E] font-bold shadow-2xl group border border-amber-300"
              >
                <span>Daftar Bimbingan Bimtren 2026</span>
                <span className="arrow-disc bg-[#050A2E] text-white shadow-sm">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </Link>

              <Link
                href="/informasi-kampus#beasiswa"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 glass-pill text-white hover:bg-white/15 text-sm font-semibold transition-all duration-200 border border-white/20"
              >
                <Award className="w-4 h-4 text-[#F9C80E]" />
                <span>Panduan Beasiswa Kuliah</span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
