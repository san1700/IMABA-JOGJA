/**
 * Script Migrasi Data Perguruan Tinggi & Prodi IMABA Jogja ke Sanity CMS & JSON
 */

import fs from 'node:fs'
import path from 'node:path'
import { createClient } from 'next-sanity'

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local')
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8')
    content.split('\n').forEach((line) => {
      const match = line.match(/^([^=]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        const value = match[2].trim().replace(/^["']|["']$/g, '')
        if (!process.env[key]) {
          process.env[key] = value
        }
      }
    })
  }
}

loadEnv()

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'd109xcpl'
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
let SANITY_TOKEN = process.env.SANITY_API_WRITE_TOKEN?.trim().replace(/^["']|["']$/g, '')
if (SANITY_TOKEN && SANITY_TOKEN.startsWith('sk_sk')) {
  SANITY_TOKEN = SANITY_TOKEN.replace(/^sk_sk/, 'sk')
}

const client = SANITY_TOKEN
  ? createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: '2026-11-06',
      token: SANITY_TOKEN,
      useCdn: false,
    })
  : null

function normalizeAccreditation(val) {
  if (!val) return '-'
  const s = val.toString().trim()
  if (!s || s === '-' || s === '--' || s === '---' || s === '----' || s === '-----' || s === '_') return '-'
  const upper = s.toUpperCase()
  if (upper === 'UNGGUL' || upper.includes('INSTITUSI UNGGUL')) return 'Unggul'
  if (upper === 'BAIK SEKALI' || upper.includes('BAIK SEKALI')) return 'Baik Sekali'
  if (upper === 'BAIK' || upper.includes('AKREDITASI BAIK') || upper === 'TERAKREDITASI' || upper.includes('BAN PT')) return 'Baik'
  if (upper === 'A' || upper.startsWith('A-')) return 'A'
  if (upper === 'B') return 'B'
  if (upper === 'C' || upper.startsWith('C ')) return 'C'
  if (upper.includes('BARU') || upper.includes('PROSES') || upper.includes('MINIMUM')) return 'Prodi Baru'
  if (upper.includes('SK/BAN-PT') || upper.includes('LAMTEKNIK')) return 'Terakreditasi'
  return s
}

function normalizeCampus(rawName) {
  if (!rawName) return ''
  let name = rawName.replace(/\s+/g, ' ').trim()
  if (name.includes('Negri')) name = name.replace('Negri', 'Negeri')
  if (name.includes('Nahdhotul Ulamak')) name = 'Universitas Nahdlatul Ulama (UNU) Yogyakarta'
  if (name.includes('Kesehtan')) name = name.replace('Kesehtan', 'Kesehatan')
  if (name.toLowerCase() === 'sekolah tinggi maritim yogyakarta') name = 'Sekolah Tinggi Maritim Yogyakarta'
  if (name.toLowerCase() === 'sekolah tinggi ilmu kesehatan akbidyo') name = 'Sekolah Tinggi Ilmu Kesehatan AKBIDYO'
  if (name === 'Universitas Islam Negeri Sunan Kalijaga') name = 'UIN Sunan Kalijaga Yogyakarta'
  if (name === 'UPN Veteran Yogyakarta') name = 'UPN "Veteran" Yogyakarta'
  if (name === 'Universitas Muhammadiyah Yogyakarta') name = 'Universitas Muhammadiyah Yogyakarta (UMY)'
  if (name === 'Universitas Sanata Dharma') name = 'Universitas Sanata Dharma (USD)'
  if (name === 'Universitas BSI Yogyakarta' || name === 'Universitas Bina Sarana Informatika Yogyakarta') name = 'Universitas BSI Yogyakarta'
  if (name === 'UNIVERSITAS TEKNOLOGI DIGITAL INDONESIA (UTDI)') name = 'Universitas Teknologi Digital Indonesia (UTDI)'
  return name
}

function getCampusShort(campus) {
  const m = campus.match(/\(([^)]+)\)/)
  if (m) return m[1].replace(/"/g, '').trim()
  if (campus.includes('UIN Sunan Kalijaga')) return 'UIN Suka'
  if (campus.includes('Sanata Dharma')) return 'USD'
  if (campus.includes('Institut Seni Indonesia')) return 'ISI Jogja'
  if (campus.includes('Alma Ata')) return 'UAA'
  if (campus.includes('AMIKOM')) return 'AMIKOM'
  if (campus.includes('AKPRIND')) return 'AKPRIND'
  if (campus.includes('Poltekkes Kemenkes')) return 'Poltekkes'
  if (campus.includes('Achmad Yani')) return 'UNJAYA'
  if (campus.includes('Duta Wacana')) return 'UKDW'
  if (campus.includes('Mercu Buana')) return 'UMBY'
  if (campus.includes('PGRI')) return 'UPY'
  if (campus.includes('Aisyiyah')) return 'UNISA'
  if (campus.includes('Janabadra')) return 'Janabadra'
  if (campus.includes('MMTC')) return 'MMTC'
  if (campus.includes('STPN')) return 'STPN'
  if (campus.includes('Panti Rapih')) return 'STIKES Panti Rapih'
  if (campus.includes('STIPRAM')) return 'STIPRAM'
  return campus.split(' ')[0]
}

function getCampusType(campus) {
  const c = campus.toLowerCase()
  if (c.includes('gadjah mada') || c.includes('negeri yogyakarta') || c.includes('veteran yogyakarta') || c.includes('seni indonesia')) {
    return 'ptn'
  }
  if (c.includes('sunan kalijaga') || c.includes('uin')) {
    return 'ptkin'
  }
  if (c.includes('poltekkes') || c.includes('pertanahan') || c.includes('udara') || c.includes('mmtc') || c.includes('atk')) {
    return 'kedinasan'
  }
  return 'pts'
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function run() {
  console.log('========================================================')
  console.log('🎓 MIGRASI DATA PERGURUAN TINGGI & PROGRAM STUDI')
  console.log('   Sumber: Ninja Tables Export / src/data/prodi-kampus.json')
  console.log('========================================================\n')

  const jsonPath = path.resolve(process.cwd(), 'src/data/prodi-kampus.json')
  let prodiList = []

  if (fs.existsSync(jsonPath)) {
    console.log(`✓ Ditemukan file lokal: ${jsonPath}`)
    prodiList = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    console.log(`  Memuat ${prodiList.length} data program studi.`)
  } else {
    console.log('⚠️ File src/data/prodi-kampus.json belum ditemukan.')
    return
  }

  // Ringkasan Kampus
  const campusMap = new Map()
  prodiList.forEach((p) => {
    if (!campusMap.has(p.campus)) {
      campusMap.set(p.campus, {
        name: p.campus,
        shortName: p.campusShort,
        type: getCampusType(p.campus),
        accreditation: p.campusAccreditation,
        prodiCount: 0,
      })
    }
    campusMap.get(p.campus).prodiCount++
  })

  console.log(`\n📊 Terdeteksi ${campusMap.size} perguruan tinggi di Yogyakarta:`)
  Array.from(campusMap.values())
    .sort((a, b) => b.prodiCount - a.prodiCount)
    .slice(0, 10)
    .forEach((c, idx) => {
      console.log(`   ${idx + 1}. ${c.name} (${c.shortName}) - ${c.prodiCount} prodi [${c.type.toUpperCase()}]`)
    })
  if (campusMap.size > 10) {
    console.log(`   ... dan ${campusMap.size - 10} perguruan tinggi lainnya.`)
  }

  // Upload ke Sanity jika client terhubung
  if (client) {
    console.log('\n🚀 Menyinkronkan ke Sanity CMS...')

    // 1. Sinkronisasi Kampus
    console.log('   Mengunggah dokumen Kampus...')
    let campusSaved = 0
    for (const [name, c] of campusMap.entries()) {
      const slug = slugify(c.shortName || c.name)
      const campusDocId = `campus-${slug}`
      const doc = {
        _id: campusDocId,
        _type: 'campus',
        name: c.name,
        shortName: c.shortName,
        slug: { _type: 'slug', current: slug },
        type: c.type,
      }
      try {
        await client.createOrReplace(doc)
        campusSaved++
      } catch (err) {
        console.warn(`   ⚠️ Gagal menyimpan kampus ${c.name}: ${err.message}`)
      }
    }
    console.log(`   ✓ Berhasil menyinkronkan ${campusSaved} dari ${campusMap.size} kampus ke Sanity!`)

    // 2. Sinkronisasi Program Studi
    console.log('\n   Mengunggah dokumen Program Studi...')
    let prodiSaved = 0
    for (const p of prodiList) {
      const campusSlug = slugify(p.campusShort || p.campus)
      const prodiSlug = slugify(p.name)
      const docId = `prodi-${campusSlug}-${prodiSlug}`

      const doc = {
        _id: docId,
        _type: 'studyProgram',
        name: p.name,
        degree: p.degree || 'S1',
        campus: {
          _type: 'reference',
          _ref: `campus-${campusSlug}`,
        },
        faculty: p.faculty !== '-' ? p.faculty : undefined,
        accreditation: p.accreditation !== '-' ? p.accreditation : undefined,
      }

      try {
        await client.createOrReplace(doc)
        prodiSaved++
        if (prodiSaved % 100 === 0) {
          console.log(`   ... ${prodiSaved} / ${prodiList.length} prodi tersimpan`)
        }
      } catch (err) {
        // Skip individual error silently
      }
    }
    console.log(`   ✓ Berhasil menyinkronkan ${prodiSaved} dari ${prodiList.length} prodi ke Sanity!`)
  } else {
    console.log('\n💡 Tips: Untuk menyinkronkan ke Sanity CMS, pastikan SANITY_API_WRITE_TOKEN diisi di .env.local.')
    console.log('   Data tabel di website tetap tampil 100% lengkap melalui src/data/prodi-kampus.json!')
  }

  console.log('\n========================================================')
  console.log('🎉 SELESAI! Seluruh data prodi & kampus siap digunakan.')
  console.log('========================================================\n')
}

run().catch((err) => {
  console.error('\n❌ Terjadi kesalahan:', err)
})
