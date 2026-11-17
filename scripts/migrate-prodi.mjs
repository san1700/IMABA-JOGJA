/**
 * Script Migrasi Data Perguruan Tinggi & Program Studi dari WordPress ke Sanity / Web IMABA
 * Sumber: https://imabayogyakarta.com/daftar-prodi-dan-kampus/
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

const WP_BASE_URL = process.env.WP_BASE_URL || 'https://imabayogyakarta.com'
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

function decodeHtml(html = '') {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim()
}

function cleanText(str = '') {
  return decodeHtml(str.replace(/<[^>]+>/g, '').trim())
}

async function run() {
  console.log('========================================================')
  console.log('🔍 MENGAMBIL DATA LAMAN "DAFTAR PRODI DAN KAMPUS"')
  console.log(`   Sumber: ${WP_BASE_URL}/wp-json/wp/v2/pages?slug=daftar-prodi-dan-kampus`)
  console.log('========================================================\n')

  const url = `${WP_BASE_URL}/wp-json/wp/v2/pages?slug=daftar-prodi-dan-kampus`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Gagal memuat halaman: ${res.status} ${res.statusText}`)
  }

  const pages = await res.json()
  if (!pages || pages.length === 0) {
    throw new Error('Laman daftar-prodi-dan-kampus tidak ditemukan di WordPress API.')
  }

  const page = pages[0]
  const content = page.content?.rendered || ''
  console.log(`✓ Laman ditemukan: "${page.title?.rendered}"`)
  console.log(`  Panjang konten HTML: ${content.length} karakter.\n`)

  // Cari tabel HTML di dalam konten
  const tableRowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi
  const rows = []
  let rowMatch

  while ((rowMatch = tableRowRegex.exec(content)) !== null) {
    const rowHtml = rowMatch[1]
    const cellRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi
    const cells = []
    let cellMatch
    while ((cellMatch = cellRegex.exec(rowHtml)) !== null) {
      cells.push(cleanText(cellMatch[1]))
    }
    if (cells.length >= 4) {
      rows.push(cells)
    }
  }

  console.log(`📊 Ditemukan ${rows.length} baris tabel di dalam HTML laman.`)

  if (rows.length === 0) {
    console.warn('\n⚠️ Tabel tidak ditemukan dalam format <tr> langsung di content.rendered.')
    console.warn('Kemungkinan tabel menggunakan plugin seperti TablePress atau wpDataTables.')
    console.log('Menyimpan konten mentah laman ke file temporary untuk dianalisis...')
    fs.writeFileSync('scripts/debug-page-content.html', content)
    console.log('Tersimpan di scripts/debug-page-content.html')
    return
  }

  // Baris pertama kemungkinan header: No, Prodi, Akreditasi, Fakultas, Nama Kampus, Akreditasi Kampus
  let dataRows = rows
  const firstRow = rows[0].map((c) => c.toLowerCase())
  if (firstRow.some((c) => c.includes('prodi') || c.includes('kampus'))) {
    console.log('  Header terdeteksi:', rows[0].join(' | '))
    dataRows = rows.slice(1)
  }

  console.log(`\n📋 Memproses ${dataRows.length} program studi...`)

  const parsedPrograms = []
  const uniqueCampuses = new Map()

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i]
    // Susunan kolom dari WordPress:
    // Kolom 0: No (misal "1")
    // Kolom 1: Prodi (misal "Sistem Informasi")
    // Kolom 2: Akreditasi Prodi (misal "A")
    // Kolom 3: Fakultas (misal "Fakultas Teknologi Industri")
    // Kolom 4: Nama Kampus (misal "Universitas Atma Jaya Yogyakarta (UAJY)")
    // Kolom 5: Akreditasi Kampus (misal "A")

    let prodiName = row[1] || ''
    let prodiAccreditation = row[2] || ''
    let faculty = row[3] || ''
    let campusName = row[4] || ''
    let campusAccreditation = row[5] || ''

    if (!prodiName && row[0] && isNaN(Number(row[0]))) {
      // Jika kolom No tidak ada
      prodiName = row[0]
      prodiAccreditation = row[1] || ''
      faculty = row[2] || ''
      campusName = row[3] || ''
      campusAccreditation = row[4] || ''
    }

    if (!prodiName) continue

    // Deteksi singkatan kampus dari nama, misal "Universitas Atma Jaya Yogyakarta (UAJY)" -> UAJY
    let shortName = ''
    const shortMatch = campusName.match(/\(([^)]+)\)/)
    if (shortMatch) {
      shortName = shortMatch[1].trim()
    } else {
      shortName = campusName.split(' ')[0]
    }

    if (!uniqueCampuses.has(campusName) && campusName) {
      uniqueCampuses.set(campusName, {
        name: campusName,
        shortName,
        accreditation: campusAccreditation,
      })
    }

    parsedPrograms.push({
      no: i + 1,
      name: prodiName,
      degree: 'S1', // default umum
      accreditation: prodiAccreditation,
      faculty,
      campus: campusName,
      campusShort: shortName,
      campusAccreditation,
    })
  }

  console.log(`✓ Berhasil mem-parsing ${parsedPrograms.length} program studi dari ${uniqueCampuses.size} perguruan tinggi.\n`)

  // Simpan ke file JSON lokal agar bisa langsung dipakai komponen tabel web Next.js
  const outputDir = path.resolve(process.cwd(), 'src/data')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  const jsonPath = path.join(outputDir, 'prodi-kampus.json')
  fs.writeFileSync(jsonPath, JSON.stringify(parsedPrograms, null, 2))
  console.log(`💾 Data tersimpan rapi di: src/data/prodi-kampus.json`)

  // Jika token Sanity tersedia, buat dokumen di Sanity juga
  if (client) {
    console.log('\n--- Mengunggah ke Sanity CMS ---')
    // 1. Simpan Kampus ke Sanity
    const campusIdMap = new Map()
    for (const [name, c] of uniqueCampuses.entries()) {
      const slug = (c.shortName || name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      const docId = `campus-wp-${slug}`
      const doc = {
        _id: docId,
        _type: 'campus',
        name: c.name,
        shortName: c.shortName || c.name,
        slug: { _type: 'slug', current: slug },
        type: name.toLowerCase().includes('islam negeri') || name.toLowerCase().includes('uin') ? 'ptkin' : 'pts',
        description: `Informasi program studi dan jalur masuk ${c.name}.`,
      }
      try {
        await client.createOrReplace(doc)
        campusIdMap.set(name, docId)
        console.log(`  ✓ Kampus Sanity: ${c.name}`)
      } catch (err) {
        console.warn(`  ⚠️ Gagal simpan kampus ${name}:`, err.message)
      }
    }

    // 2. Simpan Study Program ke Sanity
    let progCount = 0
    for (const p of parsedPrograms) {
      const slug = `${p.campusShort}-${p.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      const campusRef = campusIdMap.get(p.campus)
      const doc = {
        _id: `prodi-wp-${slug}`,
        _type: 'studyProgram',
        name: p.name,
        degree: p.degree,
        faculty: p.faculty,
        accreditation: p.accreditation,
        campus: campusRef ? { _type: 'reference', _ref: campusRef } : undefined,
      }
      try {
        await client.createOrReplace(doc)
        progCount++
      } catch (err) {
        // silent
      }
    }
    console.log(`  ✓ Berhasil mengunggah ${progCount} program studi ke Sanity CMS!`)
  }

  console.log('\n========================================================')
  console.log('🎉 MIGRASI PERGURUAN TINGGI & PRODI SELESAI!')
  console.log('========================================================\n')
}

run().catch((err) => {
  console.error('\n❌ Terjadi kesalahan:', err)
  process.exit(1)
})
