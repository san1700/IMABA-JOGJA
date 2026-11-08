import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Users,
  BookOpen,
  FileText,
  Sparkles,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/fetch'
import { MEMBERS_QUERY, type Member } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/motion/fade-in'
import { SectionHeader } from '@/components/ui/section-header'

export const metadata: Metadata = {
  title: 'Profil Organisasi, Sejarah & Struktur Pengurus DPW',
  description:
    'Mengenal lebih dekat Ikatan Mahasiswa Bata-Bata (IMABA) Daerah Istimewa Yogyakarta: sejarah pendirian, filosofi santri, AD/ART, dan struktur kepengurusan DPW.',
  alternates: {
    canonical: '/profil',
  },
  openGraph: {
    title: 'Profil IMABA Yogyakarta | Sejarah & Struktur Pengurus',
    description:
      'Mengenal lebih dekat Ikatan Mahasiswa Bata-Bata (IMABA) Daerah Istimewa Yogyakarta: sejarah pendirian, filosofi santri, AD/ART, dan struktur kepengurusan DPW.',
    url: '/profil',
  },
}

// Fallback data pengurus inti DPW jika Sanity belum diisi
const FALLBACK_MEMBERS: Member[] = [
  {
    _id: 'm-1',
    name: 'Moh. Hosen',
    position: 'Ketua Umum DPW',
    division: 'bph',
    period: '2025/2026',
    campus: { name: 'UIN Sunan Kalijaga', shortName: 'UIN Suka' },
    order: 1,
    socialMedia: { instagram: 'hosen_bata' },
  },
  {
    _id: 'm-2',
    name: 'Ahmad Muzammil',
    position: 'Sekretaris Umum',
    division: 'bph',
    period: '2025/2026',
    campus: { name: 'Universitas Gadjah Mada', shortName: 'UGM' },
    order: 2,
    socialMedia: { instagram: 'muzammil_imaba' },
  },
  {
    _id: 'm-3',
    name: 'Khoirul Anam',
    position: 'Bendahara Umum',
    division: 'bph',
    period: '2025/2026',
    campus: { name: 'Universitas Negeri Yogyakarta', shortName: 'UNY' },
    order: 3,
    socialMedia: { instagram: 'anam_jogja' },
  },
  {
    _id: 'm-4',
    name: 'Fathur Rahman',
    position: 'Koordinator Divisi Kaderisasi',
    division: 'kaderisasi',
    period: '2025/2026',
    campus: { name: 'UIN Sunan Kalijaga', shortName: 'UIN Suka' },
    order: 4,
  },
  {
    _id: 'm-5',
    name: 'Siti Aminah',
    position: 'Koordinator Puteri Imaba',
    division: 'puteri-imaba',
    period: '2025/2026',
    campus: { name: 'Universitas Gadjah Mada', shortName: 'UGM' },
    order: 5,
  },
  {
    _id: 'm-6',
    name: 'Zainal Abidin',
    position: 'Koordinator Divisi Humas & Infokom',
    division: 'humas-infokom',
    period: '2025/2026',
    campus: { name: 'Universitas Islam Indonesia', shortName: 'UII' },
    order: 6,
  },
]

export default async function ProfilPage() {
  const members = await sanityFetch<Member[]>({
    query: MEMBERS_QUERY,
    fallback: FALLBACK_MEMBERS,
  })

  const displayMembers = members && members.length > 0 ? members : FALLBACK_MEMBERS

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
            <ShieldCheck className="w-3.5 h-3.5 text-[#F9C80E]" />
            <span>Tentang IMABA Yogyakarta</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white mb-6">
            Profil, Sejarah & Struktur Organisasi
          </h1>

          <p className="font-sans text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed mb-8">
            Mengenal perjalanan panjang ikatan kekeluargaan santri Mambaul Ulum Bata-Bata di tanah
            perantauan Yogyakarta, berasaskan keislaman Ahlussunnah wal Jama&apos;ah dan pengabdian umat.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#sejarah"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-white text-[#050A2E] hover:bg-gray-100 transition-colors shadow-sm"
            >
              Sejarah & Filosofi
            </a>
            <a
              href="#ad-art"
              className="px-4 py-2 rounded-full text-xs font-semibold glass-pill text-white hover:bg-white/15 transition-colors"
            >
              AD / ART
            </a>
            <a
              href="#struktur"
              className="px-4 py-2 rounded-full text-xs font-semibold glass-pill text-white hover:bg-white/15 transition-colors"
            >
              Struktur Pengurus DPW
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 1: SEJARAH & FILOSOFI */}
      {/* ============================================================ */}
      <section id="sejarah" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-20">
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Jejak Sejarah</span>
              </div>

              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-foreground mb-6 tracking-tight leading-snug">
                Lahir dari Kerinduan, Bertumbuh dalam Persaudaraan Santri di Jogja
              </h2>

              <div className="space-y-4 text-foreground/80 leading-relaxed text-base">
                <p>
                  Pondok Pesantren Mambaul Ulum Bata-Bata Pamekasan Madura telah melahirkan puluhan ribu
                  santri yang tersebar di seantero nusantara. Yogyakarta, sebagai barometer kota pendidikan
                  dan kebudayaan Indonesia, menjadi salah satu destinasi utama para alumni untuk melanjutkan
                  jenjang studi tinggi.
                </p>
                <p>
                  Didorong oleh rasa persaudaraan yang erat dan kebutuhan untuk saling menguatkan di tanah
                  perantauan, para sesepuh alumni mendirikan <strong>Ikatan Mahasiswa Bata-Bata (IMABA)
                  Dewan Pengurus Wilayah Daerah Istimewa Yogyakarta</strong>.
                </p>
                <p>
                  IMABA Jogja berfungsi sebagai rumah kedua, tempat bertukar pikiran, menempa kepemimpinan,
                  mengawal tradisi intelektual, dan memastikan nilai-nilai kesantrian tetap berakar kuat di
                  tengah heterogenitas pergaulan akademis.
                </p>
              </div>

              {/* Quote Slogan */}
              <div className="mt-8 p-6 rounded-2xl bg-muted/60 border-l-4 border-primary">
                <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                  Falsafah Pesantren Bata-Bata
                </span>
                <p className="font-article text-lg italic text-foreground">
                  &ldquo;Kesopanan Lebih Tinggi Nilainya daripada Kebudayaan&rdquo;
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="p-8 rounded-[32px] bg-gradient-to-br from-[#050A2E] to-[#1E2FB8] text-white shadow-xl">
                <h3 className="font-heading font-bold text-xl mb-4 text-[#F9C80E] flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> 5 Pilar Gerakan IMABA Jogja
                </h3>
                <ul className="space-y-3.5 text-sm text-white/90">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#F9C80E]" />
                    <span><strong>Ketauhidan:</strong> Berpijak pada akidah Ahlussunnah wal Jama&apos;ah</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#F9C80E]" />
                    <span><strong>Intelektualitas:</strong> Menjunjung tinggi nalar kritis & riset ilmiah</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#F9C80E]" />
                    <span><strong>Kekeluargaan:</strong> Silaturahmi lintas generasi dan kampus</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#F9C80E]" />
                    <span><strong>Kemandirian:</strong> Berjiwa wirausaha dan solutif bagi masyarakat</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#F9C80E]" />
                    <span><strong>Pengabdian:</strong> Berkhidmah untuk agama, bangsa, dan almamater</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: AD / ART ORGANISASI */}
      {/* ============================================================ */}
      <section id="ad-art" className="w-full bg-muted/40 py-16 sm:py-24 border-y border-border scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="left"
            badge="Konstitusi Organisasi"
            badgeIcon={<FileText className="w-3.5 h-3.5 text-[#F9C80E]" />}
            title="Anggaran Dasar & Anggaran Rumah Tangga (AD/ART)"
            description="Pedoman konstitusional yang mengatur tata kelola organisasi, syarat keanggotaan, kewajiban pengurus, serta mekanisme musyawarah wilayah di Yogyakarta."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-card border border-border">
              <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                Bab I: Asas & Sifat
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                IMABA berasaskan Islam berhaluan Ahlussunnah wal Jama&apos;ah, bersifat independen,
                kekeluargaan, akademis, dan kemasyarakatan.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-card border border-border">
              <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                Bab II: Tujuan & Usaha
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Membina insan akademis yang berakhlakul karimah, berilmu amaliyah, serta mengamalkan
                ilmu pengetahuan demi kemaslahatan umat.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-card border border-border">
              <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                Bab III: Keanggotaan
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Anggota IMABA terdiri dari anggota biasa (santri/alumni Bata-Bata yang berstatus
                mahasiswa di DIY) dan anggota kehormatan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: STRUKTUR PENGURUS DPW */}
      {/* ============================================================ */}
      <section id="struktur" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-20">
        <SectionHeader
          align="center"
          badge="Jajaran Kepengurusan"
          badgeIcon={<Users className="w-3.5 h-3.5 text-[#F9C80E]" />}
          title="Struktur Pengurus DPW IMABA DIY"
          description="Amanah pengabdian kader santri Mambaul Ulum Bata-Bata periode masa khidmah aktif."
        />

        {/* Grid Anggota Pengurus */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayMembers.map((member) => {
            let photoUrl = ''
            if (member.photo?.asset) {
              photoUrl = urlFor(member.photo).width(400).height(400).auto('format').url()
            }

            return (
              <StaggerItem key={member._id}>
                <div className="h-full card-radius-large p-7 bg-card border border-border flex flex-col items-center text-center group hover:border-primary/50 transition-all">
                  {/* Foto / Avatar */}
                  <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#1E2FB8] via-[#4F5CF2] to-[#F9C80E] mb-5 shadow-md">
                    <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden text-2xl font-bold font-heading text-primary">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        member.name[0]
                      )}
                    </div>
                  </div>

                  {/* Nama & Posisi */}
                  <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                    {member.name}
                  </h3>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                    {member.position}
                  </span>

                  {/* Kampus */}
                  {member.campus?.name && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-4">
                      <GraduationCap className="w-3.5 h-3.5 text-primary" />
                      <span>{member.campus.shortName || member.campus.name}</span>
                    </p>
                  )}

                  {/* Periode */}
                  <span className="text-[11px] px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium mt-auto">
                    Periode {member.period}
                  </span>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </section>
    </div>
  )
}
