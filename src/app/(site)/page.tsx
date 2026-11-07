import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  GraduationCap,
  Award,
  BookOpen,
  Sparkles,
  HeartHandshake,
  Users,
  Compass,
  Calendar,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/motion/fade-in'

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* ============================================================ */}
      {/* HERO SECTION: DEEP NAVY (#050A2E) WITH VERTICAL FLUTED PILLARS */}
      {/* ============================================================ */}
      <section className="relative w-full bg-[#050A2E] text-white pt-12 pb-24 md:pt-20 md:pb-36 overflow-hidden">
        {/* Background Vertical Fluted Gradient Pillars (Inspired by the Reference UI) */}
        <div
          className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-70"
          aria-hidden="true"
        >
          <div className="w-full max-w-7xl h-full mx-auto px-4 grid grid-cols-6 sm:grid-cols-12 gap-3 sm:gap-4 md:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="hero-fluted-pillar h-full w-full opacity-40 hover:opacity-70 transition-opacity duration-700"
                style={{
                  animationDelay: `${i * 120}ms`,
                  opacity: i % 2 === 0 ? 0.35 : 0.55,
                }}
              />
            ))}
          </div>
        </div>

        {/* Ambient Radial Glow Overlays */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#4F5CF2]/25 to-transparent rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-10 left-10 w-96 h-96 bg-[#1E2FB8]/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <FadeUp>
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold tracking-wide text-white/90 shadow-md mb-6">
              <span className="w-2 h-2 rounded-full bg-[#F9C80E] animate-pulse" />
              <span>Ikatan Mahasiswa Bata-Bata (IMABA) Daerah Istimewa Yogyakarta</span>
            </div>

            {/* Main Display Headline */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl leading-[1.12] mb-6">
              Santri Berintelektual, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EEF1F9] to-[#D8E0FF]">
                Mengabdi di Kota Pelajar
              </span>
            </h1>

            {/* Subheadline in Inter */}
            <p className="font-sans text-base sm:text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed mb-9">
              Wadah silaturahmi, pengkaderan intelektual, dan pengabdian santri serta alumni Pondok
              Pesantren Mambaul Ulum Bata-Bata di kampus-kampus Yogyakarta.
            </p>

            {/* Primary & Secondary Pill Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              {/* Pill Button with White Circular Arrow Disc (Matches Reference Image) */}
              <Link
                href="/informasi-kampus"
                className="btn-pill-arrow bg-[#1E2FB8] hover:bg-[#162494] text-white shadow-xl shadow-blue-950/60 border border-white/20 group"
              >
                <span>Jelajahi Informasi Kampus</span>
                <span className="arrow-disc bg-white text-[#1E2FB8] shadow-sm">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </span>
              </Link>

              {/* Secondary Glass Pill Button */}
              <Link
                href="/profil"
                className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 glass-pill text-white/90 hover:text-white hover:bg-white/15 text-sm font-semibold transition-all duration-200 border border-white/20"
              >
                <Compass className="w-4 h-4 text-[#F9C80E]" />
                <span>Profil Organisasi</span>
              </Link>
            </div>
          </FadeUp>

          {/* ============================================================ */}
          {/* FLOATING GLASS MOCKUP & CARDS (Exact match to reference style) */}
          {/* ============================================================ */}
          <FadeUp delay={0.15} className="relative w-full max-w-5xl mt-2">
            {/* Left Floating Glass Card: Statistik Kader */}
            <div className="hidden lg:flex absolute -left-6 top-12 z-20 w-64 flex-col p-5 rounded-3xl glass-card text-left text-white shadow-2xl animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                  Kader Aktif
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1FA83C]/30 text-[#4ADE80] border border-[#1FA83C]/50">
                  Aktif 2026
                </span>
              </div>
              <div className="text-3xl font-extrabold font-heading text-white mb-1">
                500+
              </div>
              <p className="text-xs text-white/60 mb-4">
                Santri & alumni di 15+ Perguruan Tinggi Negeri & Swasta di DIY
              </p>
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#4F5CF2] h-full w-4/5 rounded-full" />
              </div>
            </div>

            {/* Floating Pill Tag: Profil Instagram */}
            <div className="hidden md:flex absolute -right-2 top-0 z-30 items-center gap-3 px-4 py-2 rounded-full bg-white/95 text-[#050A2E] shadow-2xl border border-white">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#1E2FB8] to-[#4F5CF2] p-0.5 flex-shrink-0">
                <div className="w-full h-full rounded-full bg-[#050A2E] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold leading-tight">@imabayogyakarta</span>
                <span className="text-[10px] text-gray-500 font-medium">DPW IMABA DIY</span>
              </div>
            </div>

            {/* Center Main Card: Bimtren & Informasi Kampus Preview */}
            <div className="relative mx-auto max-w-xl rounded-[32px] p-6 sm:p-8 bg-white/10 dark:bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/40 text-left">
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-white/90 border border-white/15">
                  <Sparkles className="w-3.5 h-3.5 text-[#F9C80E]" />
                  <span>Program Unggulan Tahunan</span>
                </div>
                <span className="text-xs text-white/60 font-medium">Bimtren IMABA Jogja</span>
              </div>

              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-3">
                Bimbingan Masuk Kampus & Pesantren 2026
              </h2>

              <p className="text-sm text-white/70 leading-relaxed mb-6">
                Pendampingan intensif bagi calon mahasiswa baru dari Madura: tryout SNBT, bimbingan
                jalur mandiri, pengenalan kampus (UGM, UNY, UIN Sunan Kalijaga), hingga pendampingan
                tempat tinggal di Yogyakarta.
              </p>

              {/* Highlight Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="rounded-2xl p-3.5 bg-white/[0.06] border border-white/10">
                  <span className="text-[11px] text-white/60 block mb-1">Target Kampus</span>
                  <span className="font-bold text-sm text-white flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#4F5CF2]" /> 20+ PTN/PTS
                  </span>
                </div>
                <div className="rounded-2xl p-3.5 bg-white/[0.06] border border-white/10">
                  <span className="text-[11px] text-white/60 block mb-1">Tingkat Kelulusan</span>
                  <span className="font-bold text-sm text-[#4ADE80] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1FA83C]" /> 94% Lolos
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1 rounded-2xl p-3.5 bg-white/[0.06] border border-white/10">
                  <span className="text-[11px] text-white/60 block mb-1">Biaya Bimbingan</span>
                  <span className="font-bold text-sm text-[#F9C80E]">100% Gratis</span>
                </div>
              </div>

              {/* Card Action Link */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-xs text-white/60">Pendaftaran Gelombang 1 Dibuka</span>
                <Link
                  href="/informasi-kampus#bimtren"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F9C80E] hover:text-white transition-colors"
                >
                  <span>Daftar Sekarang</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Floating Glass Card: Agenda Terdekat */}
            <div className="hidden lg:flex absolute -right-6 bottom-4 z-20 w-64 flex-col p-5 rounded-3xl glass-card text-left text-white shadow-2xl animate-in fade-in slide-in-from-right-4 duration-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#F9C80E]" /> Agenda DPW
                </span>
                <span className="w-2 h-2 rounded-full bg-[#F9C80E] animate-ping" />
              </div>
              <div className="font-heading font-bold text-sm text-white mb-1">
                Kajian Kitab Turats & Silaturahmi Akbar
              </div>
              <p className="text-xs text-white/60 mb-3">
                Membahas kitab karya masyaikh Bata-Bata bersama alumni di Yogyakarta.
              </p>
              <Link
                href="/berita?kategori=agenda"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#4F5CF2] hover:text-white transition-colors"
              >
                <span>Lihat Jadwal Lengkap</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ============================================================ */}
      {/* LIGHT SECTION (#EEF1F9): HIGH-RADIUS WHITE CARDS GRID */}
      {/* ============================================================ */}
      <section className="w-full bg-[#EEF1F9] dark:bg-[#080E38] text-[#050A2E] dark:text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <FadeUp className="text-center flex flex-col items-center">
            {/* Section Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E2FB8]/10 dark:bg-white/10 text-[#1E2FB8] dark:text-[#D8E0FF] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#F9C80E]" />
              <span>Fasilitas & Khidmah Organisasi</span>
            </div>

            {/* Section Heading */}
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-center tracking-tight text-[#050A2E] dark:text-white max-w-3xl leading-[1.2] mb-5">
              Merawat Tradisi Keilmuan, Membina Generasi Unggul di Jogja
            </h2>

            <p className="font-sans text-base sm:text-lg text-gray-600 dark:text-white/70 text-center max-w-2xl mb-14">
              Seluruh layanan dan program dirancang untuk mendukung kader santri sejak persiapan
              masuk kampus, masa perkuliahan, hingga kiprah karya intelektual.
            </p>
          </FadeUp>

          {/* Grid of Large-Radius Cards dengan Stagger Animation */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
            {/* Card 1: Featured Highlight Card with Indigo Gradient */}
            <StaggerItem className="h-full">
              <div className="card-radius-large p-8 bg-gradient-to-br from-[#1E2FB8] to-[#4F5CF2] text-white flex flex-col justify-between shadow-xl shadow-blue-900/20 h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-6">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-white mb-3 tracking-tight">
                    Bimtren Masuk Kampus
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed mb-6">
                    Program unggulan pendampingan masuk perguruan tinggi negeri & keagamaan di Jogja
                    khusus bagi santri lulusan pesantren Bata-Bata.
                  </p>
                </div>

                <Link
                  href="/informasi-kampus#bimtren"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#F9C80E] hover:text-white transition-colors group mt-2"
                >
                  <span>Pelajari Program Bimtren</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </StaggerItem>

            {/* Card 2: Portal Informasi Beasiswa */}
            <StaggerItem className="h-full">
              <div className="card-radius-large p-8 bg-white dark:bg-[#0B1446] border border-[#DCE2F2] dark:border-white/10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF1F9] dark:bg-white/10 text-[#1E2FB8] dark:text-[#4F5CF2] flex items-center justify-center mb-6">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-[#050A2E] dark:text-white mb-3 tracking-tight">
                    Informasi Beasiswa
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                    Direktori beasiswa KIP Kuliah, Beasiswa Kemenag (PBSB), beasiswa Pemda Jawa Timur/Madura,
                    serta pendampingan keringanan biaya UKT.
                  </p>
                </div>

                <Link
                  href="/informasi-kampus#beasiswa"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#1E2FB8] dark:text-[#4F5CF2] hover:text-[#050A2E] dark:hover:text-white transition-colors group"
                >
                  <span>Cari Info Beasiswa</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </StaggerItem>

            {/* Card 3: Karya Kader & Ruang Literasi */}
            <StaggerItem className="h-full">
              <div className="card-radius-large p-8 bg-white dark:bg-[#0B1446] border border-[#DCE2F2] dark:border-white/10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF1F9] dark:bg-white/10 text-[#1E2FB8] dark:text-[#4F5CF2] flex items-center justify-center mb-6">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-[#050A2E] dark:text-white mb-3 tracking-tight">
                    Karya Kader & Literasi
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                    Ruang publikasi naskah opini, analisis sosial, cerpen sastra santri, sajak puisi,
                    serta esai kritis kader IMABA se-Yogyakarta.
                  </p>
                </div>

                <Link
                  href="/karya-kader"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#1E2FB8] dark:text-[#4F5CF2] hover:text-[#050A2E] dark:hover:text-white transition-colors group"
                >
                  <span>Baca Karya Terbaru</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </StaggerItem>

            {/* Card 4: Advokasi & Jaringan Kampus */}
            <StaggerItem className="h-full">
              <div className="card-radius-large p-8 bg-white dark:bg-[#0B1446] border border-[#DCE2F2] dark:border-white/10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF1F9] dark:bg-white/10 text-[#1FA83C] flex items-center justify-center mb-6">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-[#050A2E] dark:text-white mb-3 tracking-tight">
                    Advokasi & Asrama
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                    Pendampingan kebutuhan tempat tinggal santri baru, jejaring kos/asrama mahasiswa,
                    serta advokasi hak-hak akademik kader.
                  </p>
                </div>

                <Link
                  href="/informasi-kampus"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#1FA83C] hover:text-[#16802e] transition-colors group"
                >
                  <span>Layanan Advokasi</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </StaggerItem>

            {/* Card 5: Divisi Puteri Imaba */}
            <StaggerItem className="h-full">
              <div className="card-radius-large p-8 bg-white dark:bg-[#0B1446] border border-[#DCE2F2] dark:border-white/10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF1F9] dark:bg-white/10 text-[#E3262A] flex items-center justify-center mb-6">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-[#050A2E] dark:text-white mb-3 tracking-tight">
                    Divisi Puteri Imaba
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                    Wadah konsolidasi dan pemberdayaan mahasiswi alumni Bata-Bata melalui pelatihan
                    kepemimpinan, kajian keperempuanan, dan kegiatan kreatif.
                  </p>
                </div>

                <Link
                  href="/puteri-imaba"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#E3262A] hover:text-[#b81d20] transition-colors group"
                >
                  <span>Ruang Puteri Imaba</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </StaggerItem>

            {/* Card 6: Kajian Turats & Sanad Keilmuan */}
            <StaggerItem className="h-full">
              <div className="card-radius-large p-8 bg-white dark:bg-[#0B1446] border border-[#DCE2F2] dark:border-white/10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF1F9] dark:bg-white/10 text-[#050A2E] dark:text-[#D8E0FF] flex items-center justify-center mb-6">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-[#050A2E] dark:text-white mb-3 tracking-tight">
                    Kajian Turats & Spiritual
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                    Merawat sanad keilmuan dan ketenangan batin lewat kajian kitab kuning berkala,
                    istighosah mingguan, dan peringatan haul masyaikh.
                  </p>
                </div>

                <Link
                  href="/berita?kategori=agenda"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#050A2E] dark:text-[#D8E0FF] hover:text-[#1E2FB8] transition-colors group"
                >
                  <span>Jadwal Pengajian</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </div>
  )
}
