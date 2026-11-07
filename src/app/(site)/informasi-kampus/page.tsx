import type { Metadata } from 'next'
import {
  GraduationCap,
  Award,
  Download,
  Sparkles,
  CheckCircle2,
  FileText,
  ArrowRight,
  School,
} from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  CAMPUSES_QUERY,
  SCHOLARSHIPS_QUERY,
  BROCHURES_QUERY,
  type Campus,
  type Scholarship,
  type Brochure,
} from '@/sanity/lib/queries'
import { ScholarshipCard } from '@/components/cards/scholarship-card'
import { CampusFilterTabs } from '@/components/campus-filter-tabs'

export const metadata: Metadata = {
  title: 'Informasi Kampus, Beasiswa & Bimtren 2026',
  description:
    'Panduan lengkap kuliah di Yogyakarta bagi santri Bata-Bata: direktori kampus & prodi, jalur masuk PTN/PTKIN, informasi beasiswa, brosur PMB, dan Bimtren IMABA Jogja.',
}

// Fallback data kampus populer Jogja jika Sanity belum diisi
const FALLBACK_CAMPUSES: Campus[] = [
  {
    _id: 'ugm',
    name: 'Universitas Gadjah Mada',
    shortName: 'UGM',
    slug: 'ugm',
    type: 'ptn',
    address: 'Bulaksumur, Sleman, DI Yogyakarta',
    websiteUrl: 'https://ugm.ac.id',
    admissionUrl: 'https://um.ugm.ac.id',
    description:
      'Perguruan tinggi negeri tertua dan terkemuka di Indonesia dengan 18 fakultas dan program studi berstandar internasional.',
  },
  {
    _id: 'uin',
    name: 'UIN Sunan Kalijaga Yogyakarta',
    shortName: 'UIN Suka',
    slug: 'uin-sunan-kalijaga',
    type: 'ptkin',
    address: 'Jl. Marsda Adisucipto, Sleman, DI Yogyakarta',
    websiteUrl: 'https://uin-suka.ac.id',
    admissionUrl: 'https://admisi.uin-suka.ac.id',
    description:
      'Kampus keagamaan Islam negeri pelopor integrasi-interkoneksi keilmuan Islam dan sains modern, rumah bagi ratusan santri Bata-Bata.',
  },
  {
    _id: 'uny',
    name: 'Universitas Negeri Yogyakarta',
    shortName: 'UNY',
    slug: 'uny',
    type: 'ptn',
    address: 'Jl. Colombo No. 1, Sleman, DI Yogyakarta',
    websiteUrl: 'https://uny.ac.id',
    admissionUrl: 'https://pmb.uny.ac.id',
    description:
      'Pusat keunggulan pendidikan kependidikan dan non-kependidikan dengan fasilitas modern dan reputasi nasional.',
  },
  {
    _id: 'upn',
    name: 'UPN "Veteran" Yogyakarta',
    shortName: 'UPN Jogja',
    slug: 'upn-veteran-yogyakarta',
    type: 'ptn',
    address: 'Jl. SWK 104 (Lingkar Utara) Condongcatur, Sleman',
    websiteUrl: 'https://upnyk.ac.id',
    admissionUrl: 'https://pmb.upnyk.ac.id',
    description:
      'Kampus bela negara dengan keunggulan spesifik di bidang ilmu kebumian, pertambangan, teknik, dan ilmu sosial komunikasi.',
  },
  {
    _id: 'uii',
    name: 'Universitas Islam Indonesia',
    shortName: 'UII',
    slug: 'uii',
    type: 'pts',
    address: 'Jl. Kaliurang KM 14.5, Sleman, DI Yogyakarta',
    websiteUrl: 'https://uii.ac.id',
    admissionUrl: 'https://pmb.uii.ac.id',
    description:
      'Perguruan tinggi swasta nasional pertama di Indonesia yang mengintegrasikan nilai-nilai Islam dengan keunggulan akademik global.',
  },
  {
    _id: 'umy',
    name: 'Universitas Muhammadiyah Yogyakarta',
    shortName: 'UMY',
    slug: 'umy',
    type: 'pts',
    address: 'Jl. Brawijaya, Kasihan, Bantul, DI Yogyakarta',
    websiteUrl: 'https://umy.ac.id',
    admissionUrl: 'https://admisi.umy.ac.id',
    description:
      'Kampus swasta unggul bertaraf internasional dengan motto Muda Mendunia dan fasilitas pendidikan terintegrasi.',
  },
]

// Fallback Beasiswa
const FALLBACK_SCHOLARSHIPS: Scholarship[] = [
  {
    _id: 'sch-1',
    title: 'KIP Kuliah Kemendikbudristek & Kemenag 2026',
    slug: 'kip-kuliah-2026',
    provider: 'Kementerian Pendidikan & Kemenag RI',
    coverageType: 'full',
    targetAudience: 'Calon Mahasiswa Baru (Maba) Berprestasi',
    deadline: '2026-08-31',
    requirements: [
      'Lulusan SMA/SMK/MA/Pesantren sederajat',
      'Memiliki keterbatasan ekonomi yang dibuktikan dengan KIP/KKS/SKTM',
      'Diterima di PTN atau PTS program studi terakreditasi',
    ],
    isActive: true,
  },
  {
    _id: 'sch-2',
    title: 'Program Beasiswa Santri Berprestasi (PBSB) Kemenag',
    slug: 'pbsb-kemenag-2026',
    provider: 'Direktorat PD Pontren Kemenag RI',
    coverageType: 'full',
    targetAudience: 'Santri Aktif Pondok Pesantren',
    deadline: '2026-06-30',
    requirements: [
      'Santri berdomisili di pesantren minimal 3 tahun',
      'Mendapat surat rekomendasi pimpinan pesantren',
      'Pilihan prodi kedokteran, farmasi, sains, humaniora',
    ],
    isActive: true,
  },
  {
    _id: 'sch-3',
    title: 'Beasiswa Bantuan UKT Mahasiswa Pemda Madura',
    slug: 'beasiswa-bantuan-ukt-pemda-madura',
    provider: 'Pemerintah Kabupaten (Pamekasan, Sumenep, Sampang, Bangkalan)',
    coverageType: 'tuition',
    targetAudience: 'Mahasiswa Aktif Semester 3 - 7 KTP Madura',
    deadline: '2026-09-15',
    requirements: [
      'KTP & Kartu Keluarga wilayah Madura',
      'IPK minimal 3.25',
      'Surat keterangan aktif kuliah di perguruan tinggi DIY',
    ],
    isActive: true,
  },
]

export default async function InformasiKampusPage() {
  const campuses = await sanityFetch<Campus[]>({
    query: CAMPUSES_QUERY,
    fallback: FALLBACK_CAMPUSES,
  })

  const scholarships = await sanityFetch<Scholarship[]>({
    query: SCHOLARSHIPS_QUERY,
    fallback: FALLBACK_SCHOLARSHIPS,
  })

  const brochures = await sanityFetch<Brochure[]>({
    query: BROCHURES_QUERY,
    fallback: [],
  })

  const displayCampuses = campuses && campuses.length > 0 ? campuses : FALLBACK_CAMPUSES
  const displayScholarships =
    scholarships && scholarships.length > 0 ? scholarships : FALLBACK_SCHOLARSHIPS

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header Banner */}
      <section className="relative w-full bg-[#050A2E] text-white py-16 sm:py-24 border-b border-white/10 overflow-hidden">
        <div
          className="absolute top-0 right-1/4 w-96 h-96 bg-[#1E2FB8]/25 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-white/90 mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-[#F9C80E]" />
            <span>Gerbang Pendidikan Santri di Jogja</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white mb-6">
            Informasi Kampus, Beasiswa & Bimtren
          </h1>

          <p className="font-sans text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed mb-8">
            Panduan terlengkap bagi calon mahasiswa dan kader santri Mambaul Ulum Bata-Bata dalam
            merencanakan studi, menembus kampus impian, dan meraih beasiswa di Kota Pelajar.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="#bimtren"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#F9C80E] text-[#050A2E] hover:bg-yellow-300 transition-colors shadow-sm"
            >
              ⭐ Program Bimtren 2026
            </a>
            <a
              href="#kampus"
              className="px-4 py-2 rounded-full text-xs font-semibold glass-pill text-white hover:bg-white/15 transition-colors"
            >
              Direktori Kampus
            </a>
            <a
              href="#jalur-masuk"
              className="px-4 py-2 rounded-full text-xs font-semibold glass-pill text-white hover:bg-white/15 transition-colors"
            >
              Jalur Masuk Kuliah
            </a>
            <a
              href="#beasiswa"
              className="px-4 py-2 rounded-full text-xs font-semibold glass-pill text-white hover:bg-white/15 transition-colors"
            >
              Info Beasiswa
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 1: PROGRAM UNGGULAN BIMTREN IMABA JOGJA 2026 */}
      {/* ============================================================ */}
      <section id="bimtren" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-20">
        <div className="rounded-[32px] p-8 sm:p-12 bg-gradient-to-br from-[#050A2E] via-[#0B1446] to-[#1E2FB8] text-white shadow-2xl border border-white/15 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#F9C80E] border border-white/20 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Program Khidmah Tahunan DPW IMABA</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-4 leading-tight">
              Bimtren 2026: Bimbingan Intensif Masuk Kampus Impian di Jogja
            </h2>

            <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed mb-8">
              Bimtren (Bimbingan Masuk Pesantren & Kampus) adalah program pendampingan total bagi alumni
              Bata-Bata yang hendak melanjutkan studi di Yogyakarta. Kami menyediakan bimbingan materi tes,
              simulasi UTBK, pemilihan prodi, hingga penjemputan dan asrama sementara.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.06] border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">Bimbingan Belajar & Tryout</h4>
                  <p className="text-xs text-white/60">Bedah soal SNBT, UTBK, dan Ujian Mandiri kampus ternama.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.06] border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">Pendampingan Tempat Tinggal</h4>
                  <p className="text-xs text-white/60">Bantuan survei dan asrama sementara selama masa seleksi di Jogja.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.06] border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">Konsultasi Jurusan & Karir</h4>
                  <p className="text-xs text-white/60">Sharing session bersama kakak tingkat dari berbagai fakultas.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.06] border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-[#4ADE80] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">100% Khidmah Tanpa Biaya</h4>
                  <p className="text-xs text-white/60">Program ikhlas berkhidmah untuk adik-adik sesama santri Bata-Bata.</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/6281234567890?text=Halo%20Pengurus%20IMABA%20Jogja,%20saya%20ingin%20mendaftar%20Bimtren%202026"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-arrow bg-[#F9C80E] hover:bg-yellow-300 text-[#050A2E] shadow-xl group inline-flex"
            >
              <span>Daftar Bimtren IMABA 2026</span>
              <span className="arrow-disc bg-[#050A2E] text-white">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: DIREKTORI KAMPUS JOGJA */}
      {/* ============================================================ */}
      <section id="kampus" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
              <School className="w-3.5 h-3.5" />
              <span>Direktori Perguruan Tinggi</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl text-foreground">
              Kampus Populer di Daerah Istimewa Yogyakarta
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Tempat ratusan kader santri Mambaul Ulum Bata-Bata menimba ilmu di berbagai disiplin.
          </p>
        </div>

        <CampusFilterTabs campuses={displayCampuses} />
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: INFORMASI JALUR MASUK KULIAH */}
      {/* ============================================================ */}
      <section id="jalur-masuk" className="w-full bg-muted/40 py-16 sm:py-20 border-y border-border scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading font-extrabold text-3xl text-foreground mb-3">
              Jalur Masuk Kuliah di Indonesia
            </h2>
            <p className="text-sm text-muted-foreground">
              Ketahui karakteristik masing-masing jalur seleksi agar strategi memilih prodi lebih matang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-card border border-border">
              <span className="w-8 h-8 rounded-full bg-[#1E2FB8]/15 text-primary flex items-center justify-center font-bold text-xs mb-4">
                01
              </span>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">SNBP / SNBT</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Jalur seleksi nasional berbasis prestasi rapor (SNBP) dan seleksi tes berbasis UTBK (SNBT)
                untuk seluruh perguruan tinggi negeri se-Indonesia.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-card border border-border">
              <span className="w-8 h-8 rounded-full bg-[#1FA83C]/15 text-[#1FA83C] flex items-center justify-center font-bold text-xs mb-4">
                02
              </span>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">SPAN & UM-PTKIN</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Jalur khusus perguruan tinggi keagamaan Islam negeri (UIN, IAIN, STAIN) yang ramah santri,
                dengan penilaian prestasi maupun tes mandiri nasional.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-card border border-border">
              <span className="w-8 h-8 rounded-full bg-[#F9C80E]/20 text-[#D97706] flex items-center justify-center font-bold text-xs mb-4">
                03
              </span>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">Ujian Mandiri (UM)</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Seleksi resmi yang diselenggarakan langsung oleh masing-masing kampus (seperti UM UGM CBT,
                CBT UNY, Mandiri UIN Suka) dengan beragam skema.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-card border border-border">
              <span className="w-8 h-8 rounded-full bg-[#4F5CF2]/15 text-[#4F5CF2] flex items-center justify-center font-bold text-xs mb-4">
                04
              </span>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">Jalur Khusus Santri</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Jalur apresiasi santri berprestasi, hafiz Al-Qur&apos;an 30 juz, qiroatul kutub, dan rekomendasi
                pesantren di kampus-kampus mitra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: INFORMASI BEASISWA AKTIF */}
      {/* ============================================================ */}
      <section id="beasiswa" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Pusat Peluang Beasiswa</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl text-foreground">
              Informasi Beasiswa untuk Santri & Mahasiswa
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Bantuan biaya pendidikan, pembebasan UKT, dan uang saku bulanan dari berbagai instansi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayScholarships.map((sch) => (
            <ScholarshipCard key={sch._id} scholarship={sch} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5: UNDUHAN BROSUR & PANDUAN PMB */}
      {/* ============================================================ */}
      <section id="unduhan" className="w-full bg-muted/40 py-16 sm:py-20 border-t border-border scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
                <Download className="w-3.5 h-3.5" />
                <span>Dokumen & Unduhan</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl text-foreground">
                Brosur Kampus & Panduan Masuk Kuliah
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Unduh panduan resmi PMB, materi tryout Bimtren, dan panduan beasiswa dalam format PDF.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brochures && brochures.length > 0 ? (
              brochures.map((b) => (
                <div key={b._id} className="card-radius-large p-7 bg-card border border-border flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-3 inline-block">
                      {b.year || 'Dokumen'}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                      {b.title}
                    </h3>
                    {b.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                        {b.description}
                      </p>
                    )}
                  </div>
                  {b.fileUrl ? (
                    <a
                      href={b.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh File</span>
                    </a>
                  ) : (
                    <span className="text-xs text-muted-foreground">Tersedia di Sekretariat</span>
                  )}
                </div>
              ))
            ) : (
              <>
                <div className="card-radius-large p-7 bg-card border border-border flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary mb-3 inline-block">
                      Buku Saku 2026
                    </span>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                      Buku Saku Maba Santri Bata-Bata di Jogja
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                      Panduan bertahan hidup anak rantau: transportasi umum, tips kos ramah santri, dan kontak pengurus per kampus.
                    </p>
                  </div>
                  <a
                    href="#bimtren"
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Unduh Buku Panduan</span>
                  </a>
                </div>

                <div className="card-radius-large p-7 bg-card border border-border flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#1FA83C]/10 text-[#1FA83C] mb-3 inline-block">
                      Brosur PMB
                    </span>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                      Panduan Jalur Masuk Mandiri PTN & PTKIN
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                      Kompilasi jadwal pendaftaran, persyaratan berkas, dan kuota penerimaan mahasiswa baru di DIY.
                    </p>
                  </div>
                  <a
                    href="#bimtren"
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Unduh Brosur PMB</span>
                  </a>
                </div>

                <div className="card-radius-large p-7 bg-card border border-border flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F9C80E]/20 text-[#D97706] mb-3 inline-block">
                      Modul Bimtren
                    </span>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                      Bank Soal & Pembahasan UTBK-SNBT
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                      Kumpulan soal latihan TPS, literasi bahasa, dan penalaran matematika yang disusun oleh alumni santri berprestasi.
                    </p>
                  </div>
                  <a
                    href="#bimtren"
                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Unduh Soal Latihan</span>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
