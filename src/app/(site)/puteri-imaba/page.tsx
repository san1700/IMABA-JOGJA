import type { Metadata } from 'next'
import {
  Sparkles,
  Heart,
  BookOpen,
  Award,
  Feather,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { InstagramIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Puteri Imaba Yogyakarta | Pemberdayaan Mahasiswi Santri',
  description:
    'Profil, visi misi, dan program kerja Divisi Puteri Imaba Daerah Istimewa Yogyakarta: ruang konsolidasi, kepemimpinan, dan karya intelektual santriwati Bata-Bata.',
}

export default function PuteriImabaPage() {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header Banner */}
      <section className="relative w-full bg-[#050A2E] text-white py-16 sm:py-24 border-b border-white/10 overflow-hidden">
        {/* Ambient Glow bernuansa Merah Marun & Indigo */}
        <div
          className="absolute top-0 right-1/4 w-96 h-96 bg-[#E3262A]/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-10 w-80 h-80 bg-[#4F5CF2]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-white/90 mb-4 border-[#E3262A]/40">
            <span className="w-2 h-2 rounded-full bg-[#E3262A] animate-pulse" />
            <span>Divisi Pemberdayaan Mahasiswi IMABA</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white mb-6">
            Puteri Imaba Yogyakarta
          </h1>

          <p className="font-sans text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed mb-8">
            Wadah berhimpun, bertukar gagasan, dan meneguhkan kepemimpinan bagi seluruh mahasiswi
            alumni Pondok Pesantren Mambaul Ulum Bata-Bata di kampus-kampus Daerah Istimewa Yogyakarta.
          </p>

          <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
            <a
              href="#program"
              className="btn-pill-arrow bg-[#E3262A] hover:bg-[#c91e22] text-white shadow-xl"
            >
              <span>Program Kerja Puteri</span>
              <span className="arrow-disc bg-white text-[#E3262A]">
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </a>
            <a
              href="https://instagram.com/puteriimabayogyakarta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass-pill text-white/90 hover:text-white text-xs font-semibold"
            >
              <InstagramIcon className="w-4 h-4 text-[#F9C80E]" />
              <span>Instagram @puteriimaba</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 1: VISI & IDENTITAS PUTERI IMABA */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3262A]/10 text-[#E3262A] text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visi & Keanggunan</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-foreground mb-6 leading-tight">
              Melahirkan Mahasiswi Santri yang Cerdas, Mandiri, dan Berakhlakul Karimah
            </h2>

            <p className="text-foreground/80 leading-relaxed text-base mb-6">
              Puteri Imaba hadir sebagai ruang aman dan kondusif bagi para santriwati perantau di Jogja
              untuk saling mendukung dalam studi, mengasah kepekaan sosial, memperdalam wawasan
              keagamaan, serta melatih kecakapan publik dan kepemimpinan.
            </p>

            <div className="space-y-3.5 text-sm text-foreground/85">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E3262A] flex-shrink-0 mt-0.5" />
                <span>Mempererat ukhuwah silaturahmi antar mahasiswi Bata-Bata se-Yogyakarta.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E3262A] flex-shrink-0 mt-0.5" />
                <span>Membekali kader dengan kecakapan public speaking, riset, dan kepenulisan.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E3262A] flex-shrink-0 mt-0.5" />
                <span>Mengawal kesadaran isu gender, keluarga sakinah, dan kesehatan mental santriwati.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-br from-[#050A2E] to-[#1E2FB8] text-white shadow-2xl border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#F9C80E] mb-6">
                <Feather className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-white mb-3">
                Falsafah Gerakan
              </h3>
              <p className="text-white/80 leading-relaxed text-sm italic mb-6">
                &ldquo;Keanggunan seorang santriwati tidak hanya tercermin dari kesantunan tutur kata,
                tetapi juga dari ketajaman daya nalar, kemandirian sikap, dan kesiapan berkhidmah
                bagi peradaban.&rdquo;
              </p>
              <div className="pt-4 border-t border-white/10 text-xs text-white/60">
                Divisi Puteri DPW IMABA Daerah Istimewa Yogyakarta
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: PROGRAM KERJA UNGGULAN */}
      {/* ============================================================ */}
      <section id="program" className="w-full bg-muted/40 py-16 sm:py-24 border-t border-border scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3262A]/10 text-[#E3262A] text-xs font-bold mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Agenda Rutin</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-foreground mb-3">
              Program Kerja Unggulan Puteri Imaba
            </h2>
            <p className="text-sm text-muted-foreground">
              Aktivitas terencana yang menyelaraskan kedalaman spiritual, wacana intelektual, dan ketrampilan terapan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-radius-large p-7 bg-card border border-border">
              <div className="w-10 h-10 rounded-2xl bg-[#E3262A]/10 text-[#E3262A] flex items-center justify-center mb-5">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                Kajian Fiqhun Nisa
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Kajian kitab klasik seputar fiqih wanita, hukum keluarga, dan perspektif ulama nusantara.
              </p>
            </div>

            <div className="card-radius-large p-7 bg-card border border-border">
              <div className="w-10 h-10 rounded-2xl bg-[#1E2FB8]/10 text-[#1E2FB8] flex items-center justify-center mb-5">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                Leadership & Soft Skills
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Workshop public speaking, kepemimpinan organisasi mahasiswa, dan manajemen waktu kuliah.
              </p>
            </div>

            <div className="card-radius-large p-7 bg-card border border-border">
              <div className="w-10 h-10 rounded-2xl bg-[#F9C80E]/20 text-[#D97706] flex items-center justify-center mb-5">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                Kelas Literasi & Puisi
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pelatihan menulis kreatif, cerpen, esai, dan kurasi antologi karya santriwati perantau.
              </p>
            </div>

            <div className="card-radius-large p-7 bg-card border border-border">
              <div className="w-10 h-10 rounded-2xl bg-[#1FA83C]/10 text-[#1FA83C] flex items-center justify-center mb-5">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                Bakti Sosial & Edukasi
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Aksi sosial kemasyarakatan, mengajar anak-anak TPA, dan kegiatan peduli lingkungan di DIY.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
