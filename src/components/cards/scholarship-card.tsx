import Link from 'next/link'
import Image from 'next/image'
import { Building2, ExternalLink, CheckCircle2, Clock } from 'lucide-react'
import type { Scholarship } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

interface ScholarshipCardProps {
  scholarship: Scholarship
  className?: string
}

export function ScholarshipCard({ scholarship, className = '' }: ScholarshipCardProps) {
  const coverageLabels: Record<string, string> = {
    full: 'Penuh (Full Funded)',
    tuition: 'Bantuan UKT / SPP',
    allowance: 'Uang Saku / Biaya Hidup',
    partial: 'Bantuan Parsial',
  }

  const formattedDeadline = scholarship.deadline
    ? new Date(scholarship.deadline).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null

  let posterUrl = ''
  if (scholarship.poster?.asset) {
    posterUrl = urlFor(scholarship.poster).width(600).height(400).auto('format').url()
  }

  return (
    <div
      className={cn(
        'group flex flex-col bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 card-radius-large p-6 sm:p-7 justify-between',
        className,
      )}
    >
      <div>
        {/* Status Badge & Tipe Pendanaan */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
              scholarship.isActive
                ? 'bg-[#1FA83C]/15 text-[#1FA83C] border border-[#1FA83C]/30'
                : 'bg-muted text-muted-foreground border border-border',
            )}
          >
            {scholarship.isActive ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Pendaftaran Dibuka
              </>
            ) : (
              'Pendaftaran Ditutup'
            )}
          </span>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
            {coverageLabels[scholarship.coverageType] || 'Beasiswa'}
          </span>
        </div>

        {/* Poster Opsional jika ada */}
        {posterUrl && (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-5 bg-muted">
            <Image
              src={posterUrl}
              alt={scholarship.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Penyelenggara */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
          <Building2 className="w-3.5 h-3.5 text-primary" />
          <span className="font-medium">{scholarship.provider}</span>
        </div>

        {/* Judul Beasiswa */}
        <h3 className="font-heading font-extrabold text-xl text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
          {scholarship.title}
        </h3>

        {/* Sasaran Penerima */}
        {scholarship.targetAudience && (
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            <span className="font-semibold text-foreground/80">Sasaran: </span>
            {scholarship.targetAudience}
          </p>
        )}

        {/* Persyaratan Singkat */}
        {scholarship.requirements && scholarship.requirements.length > 0 && (
          <div className="mb-5 bg-muted/50 rounded-2xl p-3.5 border border-border">
            <span className="text-[11px] font-bold uppercase text-foreground/70 block mb-2 tracking-wider">
              Syarat Utama:
            </span>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              {scholarship.requirements.slice(0, 3).map((req, i) => (
                <li key={i} className="line-clamp-1">
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer Kartu: Deadline & Link Aksi */}
      <div className="pt-4 border-t border-border flex items-center justify-between gap-3 mt-4">
        {formattedDeadline ? (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5 text-[#F9C80E]" />
            <span>
              Deadline: <strong className="text-foreground">{formattedDeadline}</strong>
            </span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">Buka Sepanjang Tahun</span>
        )}

        {scholarship.registrationUrl ? (
          <a
            href={scholarship.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-full transition-all shadow-sm"
          >
            <span>Daftar</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <Link
            href={`/informasi-kampus#beasiswa`}
            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
          >
            Info Detail &rarr;
          </Link>
        )}
      </div>
    </div>
  )
}
