'use client'

import * as React from 'react'
import { Search, Building2, Award, BookOpen, ChevronLeft, ChevronRight, Filter } from 'lucide-react'

export interface ProdiItem {
  no?: number
  name: string
  degree?: string
  accreditation?: string
  faculty?: string
  campus: string
  campusShort?: string
  campusAccreditation?: string
}

interface ProdiTableProps {
  initialData?: ProdiItem[]
}

// Fallback data awal dari prodi terpopuler di Jogja jika data migrasi belum diisi
const DEFAULT_PRODI: ProdiItem[] = [
  { no: 1, name: 'Sistem Informasi', degree: 'S1', accreditation: 'A', faculty: 'Fakultas Teknologi Industri', campus: 'Universitas Atma Jaya Yogyakarta (UAJY)', campusShort: 'UAJY', campusAccreditation: 'A' },
  { no: 2, name: 'Teknik Industri', degree: 'S1', accreditation: 'A', faculty: 'Fakultas Teknologi Industri', campus: 'Universitas Atma Jaya Yogyakarta (UAJY)', campusShort: 'UAJY', campusAccreditation: 'A' },
  { no: 3, name: 'Informatika', degree: 'S1', accreditation: 'A', faculty: 'Fakultas Teknologi Industri', campus: 'Universitas Atma Jaya Yogyakarta (UAJY)', campusShort: 'UAJY', campusAccreditation: 'A' },
  { no: 4, name: 'Teknik Sipil', degree: 'S1', accreditation: 'A', faculty: 'Fakultas Teknik', campus: 'Universitas Atma Jaya Yogyakarta (UAJY)', campusShort: 'UAJY', campusAccreditation: 'A' },
  { no: 5, name: 'Arsitektur', degree: 'S1', accreditation: 'A', faculty: 'Fakultas Teknik', campus: 'Universitas Atma Jaya Yogyakarta (UAJY)', campusShort: 'UAJY', campusAccreditation: 'A' },
  { no: 6, name: 'Akuntansi', degree: 'S1', accreditation: 'A', faculty: 'Fakultas Bisnis Dan Ekonomi', campus: 'Universitas Atma Jaya Yogyakarta (UAJY)', campusShort: 'UAJY', campusAccreditation: 'A' },
  { no: 7, name: 'Manajemen', degree: 'S1', accreditation: 'A', faculty: 'Fakultas Bisnis Dan Ekonomi', campus: 'Universitas Atma Jaya Yogyakarta (UAJY)', campusShort: 'UAJY', campusAccreditation: 'A' },
  { no: 8, name: 'Ekonomi Pembangunan', degree: 'S1', accreditation: 'A', faculty: 'Fakultas Bisnis Dan Ekonomi', campus: 'Universitas Atma Jaya Yogyakarta (UAJY)', campusShort: 'UAJY', campusAccreditation: 'A' },
  { no: 9, name: 'Biologi', degree: 'S1', accreditation: 'A', faculty: 'Fakultas Teknobiologis', campus: 'Universitas Atma Jaya Yogyakarta (UAJY)', campusShort: 'UAJY', campusAccreditation: 'A' },
  { no: 10, name: 'Ilmu Hukum', degree: 'S1', accreditation: 'A', faculty: 'Fakultas Hukum', campus: 'Universitas Atma Jaya Yogyakarta (UAJY)', campusShort: 'UAJY', campusAccreditation: 'A' },
  { no: 11, name: 'Sosiologi', degree: 'S1', accreditation: 'A', faculty: 'Fakultas Ilmu Sosial dan Politik', campus: 'Universitas Atma Jaya Yogyakarta (UAJY)', campusShort: 'UAJY', campusAccreditation: 'A' },
  { no: 12, name: 'Ilmu Komunikasi', degree: 'S1', accreditation: 'A', faculty: 'Fakultas Ilmu Sosial dan Politik', campus: 'Universitas Atma Jaya Yogyakarta (UAJY)', campusShort: 'UAJY', campusAccreditation: 'A' },
  { no: 13, name: 'Ilmu Al-Qur\'an dan Tafsir', degree: 'S1', accreditation: 'Unggul', faculty: 'Fakultas Ushuluddin dan Pemikiran Islam', campus: 'UIN Sunan Kalijaga Yogyakarta', campusShort: 'UIN Suka', campusAccreditation: 'Unggul' },
  { no: 14, name: 'Pendidikan Agama Islam', degree: 'S1', accreditation: 'Unggul', faculty: 'Fakultas Ilmu Tarbiyah dan Keguruan', campus: 'UIN Sunan Kalijaga Yogyakarta', campusShort: 'UIN Suka', campusAccreditation: 'Unggul' },
  { no: 15, name: 'Hukum Ekonomi Syariah', degree: 'S1', accreditation: 'Unggul', faculty: 'Fakultas Syari\'ah dan Hukum', campus: 'UIN Sunan Kalijaga Yogyakarta', campusShort: 'UIN Suka', campusAccreditation: 'Unggul' },
  { no: 16, name: 'Sastra Arab', degree: 'S1', accreditation: 'Unggul', faculty: 'Fakultas Adab dan Ilmu Budaya', campus: 'UIN Sunan Kalijaga Yogyakarta', campusShort: 'UIN Suka', campusAccreditation: 'Unggul' },
  { no: 17, name: 'Teknologi Informasi', degree: 'S1', accreditation: 'Unggul', faculty: 'Fakultas Teknik', campus: 'Universitas Gadjah Mada', campusShort: 'UGM', campusAccreditation: 'Unggul' },
  { no: 18, name: 'Farmasi', degree: 'S1', accreditation: 'Unggul', faculty: 'Fakultas Farmasi', campus: 'Universitas Gadjah Mada', campusShort: 'UGM', campusAccreditation: 'Unggul' },
  { no: 19, name: 'Pendidikan Bahasa Inggris', degree: 'S1', accreditation: 'A', faculty: 'Fakultas Bahasa, Seni, dan Budaya', campus: 'Universitas Negeri Yogyakarta', campusShort: 'UNY', campusAccreditation: 'Unggul' },
  { no: 20, name: 'Teknik Geologi', degree: 'S1', accreditation: 'Unggul', faculty: 'Fakultas Teknologi Mineral', campus: 'UPN "Veteran" Yogyakarta', campusShort: 'UPN Jogja', campusAccreditation: 'Unggul' },
]

export function ProdiTable({ initialData }: ProdiTableProps) {
  const data = initialData && initialData.length > 0 ? initialData : DEFAULT_PRODI

  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCampus, setSelectedCampus] = React.useState('ALL')
  const [selectedDegree, setSelectedDegree] = React.useState('ALL')
  const [selectedAccreditation, setSelectedAccreditation] = React.useState('ALL')
  const [currentPage, setCurrentPage] = React.useState(1)
  const rowsPerPage = 15

  // Ambil daftar unik kampus untuk dropdown
  const campusOptions = React.useMemo(() => {
    const set = new Set<string>()
    data.forEach((item) => {
      if (item.campus) set.add(item.campus)
    })
    return Array.from(set).sort()
  }, [data])

  // Ambil daftar jenjang yang ada
  const degreeOptions = React.useMemo(() => {
    const set = new Set<string>()
    data.forEach((item) => {
      if (item.degree) set.add(item.degree)
    })
    const order = ['S1', 'D3', 'D4', 'S2', 'S3', 'Profesi', 'Spesialis', 'D1', 'D2']
    return order.filter((d) => set.has(d))
  }, [data])

  // Filter Data
  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const q = searchTerm.toLowerCase()
      const matchSearch =
        !searchTerm ||
        item.name.toLowerCase().includes(q) ||
        (item.faculty && item.faculty.toLowerCase().includes(q)) ||
        item.campus.toLowerCase().includes(q)

      const matchCampus = selectedCampus === 'ALL' || item.campus === selectedCampus

      const matchDegree =
        selectedDegree === 'ALL' || (item.degree && item.degree === selectedDegree)

      const matchAccreditation =
        selectedAccreditation === 'ALL' ||
        (item.accreditation &&
          item.accreditation.trim().toUpperCase() === selectedAccreditation.toUpperCase())

      return matchSearch && matchCampus && matchDegree && matchAccreditation
    })
  }, [data, searchTerm, selectedCampus, selectedDegree, selectedAccreditation])

  // Reset page saat filter berubah
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCampus, selectedDegree, selectedAccreditation])

  // Paginasi
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage))
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredData.slice(start, start + rowsPerPage)
  }, [filteredData, currentPage, rowsPerPage])

  return (
    <div className="w-full flex flex-col bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
      {/* Header & Filter Controls */}
      <div className="p-5 sm:p-6 bg-muted/30 border-b border-border flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Tabel Program Studi & Kampus
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Menampilkan {filteredData.length} program studi di berbagai perguruan tinggi Daerah Istimewa Yogyakarta.
            </p>
          </div>

          <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary w-fit border border-primary/20">
            Total {filteredData.length} Prodi
          </div>
        </div>

        {/* Input Pencarian & Dropdown Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          {/* Kolom Pencarian */}
          <div className="sm:col-span-4 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari prodi, fakultas, atau kampus..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Kampus */}
          <div className="sm:col-span-4 relative">
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              aria-label="Filter Kampus"
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer truncate"
            >
              <option value="ALL">Semua Perguruan Tinggi ({campusOptions.length})</option>
              {campusOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Jenjang */}
          <div className="sm:col-span-2 relative">
            <select
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
              aria-label="Filter Jenjang"
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer"
            >
              <option value="ALL">Semua Jenjang</option>
              {degreeOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Akreditasi */}
          <div className="sm:col-span-2 relative">
            <select
              value={selectedAccreditation}
              onChange={(e) => setSelectedAccreditation(e.target.value)}
              aria-label="Filter Akreditasi"
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer"
            >
              <option value="ALL">Semua Akred.</option>
              <option value="Unggul">Unggul</option>
              <option value="A">Akreditasi A</option>
              <option value="Baik Sekali">Baik Sekali</option>
              <option value="B">Akreditasi B</option>
              <option value="Baik">Baik</option>
              <option value="C">Akreditasi C</option>
              <option value="Prodi Baru">Prodi Baru</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabel Data (Tampilan Desktop / Layar Lebar) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <th className="py-3.5 px-4 text-center w-12">No</th>
              <th className="py-3.5 px-4">Program Studi</th>
              <th className="py-3.5 px-3 text-center">Akreditasi Prodi</th>
              <th className="py-3.5 px-4">Fakultas</th>
              <th className="py-3.5 px-4">Nama Kampus</th>
              <th className="py-3.5 px-3 text-center">Akred. Kampus</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs sm:text-sm">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, idx) => {
                const noIndex = (currentPage - 1) * rowsPerPage + idx + 1
                const isAccreditationA =
                  item.accreditation === 'Unggul' || item.accreditation === 'A'
                return (
                  <tr
                    key={`${item.campus}-${item.name}-${noIndex}`}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-center text-muted-foreground font-medium">
                      {noIndex}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-foreground">
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.degree && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-muted text-muted-foreground border border-border shrink-0">
                            {item.degree}
                          </span>
                        )}
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          isAccreditationA
                            ? 'bg-[#1FA83C]/10 text-[#1FA83C] border border-[#1FA83C]/20'
                            : 'bg-primary/10 text-primary border border-primary/20'
                        }`}
                      >
                        {item.accreditation || '-'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {item.faculty || '-'}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-foreground">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{item.campus}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {item.campusAccreditation || '-'}
                      </span>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-muted-foreground">
                  <p className="font-semibold text-base mb-1">Tidak ada data ditemukan</p>
                  <p className="text-xs">Coba ubah kata kunci pencarian atau filter kampus.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card List (Tampilan Mobile / HP agar nyaman dibaca) */}
      <div className="md:hidden divide-y divide-border">
        {paginatedData.length > 0 ? (
          paginatedData.map((item, idx) => {
            const noIndex = (currentPage - 1) * rowsPerPage + idx + 1
            const isAccreditationA =
              item.accreditation === 'Unggul' || item.accreditation === 'A'
            return (
              <div key={`mob-${item.campus}-${item.name}-${noIndex}`} className="p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground shrink-0 mt-0.5">
                      {noIndex}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.degree && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-muted text-muted-foreground border border-border">
                            {item.degree}
                          </span>
                        )}
                        <h4 className="font-heading font-bold text-sm text-foreground">
                          {item.name}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isAccreditationA
                        ? 'bg-[#1FA83C]/10 text-[#1FA83C] border border-[#1FA83C]/20'
                        : 'bg-primary/10 text-primary border border-primary/20'
                    }`}
                  >
                    Akred. {item.accreditation || '-'}
                  </span>
                </div>

                <div className="text-xs text-muted-foreground pl-8">
                  {item.faculty && <p className="mb-0.5">{item.faculty}</p>}
                  <p className="font-medium text-foreground flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{item.campus}</span>
                  </p>
                </div>
              </div>
            )
          })
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <p className="font-semibold text-sm mb-1">Tidak ada data ditemukan</p>
            <p className="text-xs">Coba sesuaikan kata kunci pencarian.</p>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-4 bg-muted/20 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Halaman {currentPage} dari {totalPages} ({filteredData.length} program studi)
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

