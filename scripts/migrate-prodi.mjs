/**
 * Script Migrasi Data Ninja Tables (ID: 4578) - Perguruan Tinggi & Prodi IMABA Jogja
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
const TABLE_ID = 4578

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

async function tryFetchEndpoint(url, desc) {
  console.log(`📡 Mencoba ${desc}: ${url}`)
  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.log(`   ❌ Status: ${res.status} ${res.statusText}`)
      return null
    }
    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const json = await res.json()
      console.log(`   ✅ Berhasil mendapatkan JSON!`)
      return json
    } else {
      const text = await res.text()
      try {
        const parsed = JSON.parse(text)
        console.log(`   ✅ Berhasil parse JSON dari respons teks!`)
        return parsed
      } catch {
        console.log(`   ⚠️ Respons bukan JSON (panjang: ${text.length} karakter)`)
        return null
      }
    }
  } catch (err) {
    console.log(`   ❌ Error: ${err.message}`)
    return null
  }
}

async function run() {
  console.log('========================================================')
  console.log(`🎯 MENGAMBIL DATA NINJA TABLES [ID: ${TABLE_ID}]`)
  console.log(`   Target: Data Perguruan Tinggi & Prodi di Yogyakarta`)
  console.log('========================================================\n')

  const candidateUrls = [
    {
      url: `${WP_BASE_URL}/wp-admin/admin-ajax.php?action=ninja_tables_public_action&table_id=${TABLE_ID}&target_action=get-all-data`,
      desc: 'Ninja Tables AJAX (get-all-data)',
    },
    {
      url: `${WP_BASE_URL}/wp-admin/admin-ajax.php?action=ninja_tables_public_action&table_id=${TABLE_ID}&target_action=get-data`,
      desc: 'Ninja Tables AJAX (get-data)',
    },
    {
      url: `${WP_BASE_URL}/wp-json/ninja-tables/v1/tables/${TABLE_ID}`,
      desc: 'Ninja Tables REST API (table)',
    },
    {
      url: `${WP_BASE_URL}/wp-json/ninja-tables/v1/tables/${TABLE_ID}/rows`,
      desc: 'Ninja Tables REST API (rows)',
    },
    {
      url: `${WP_BASE_URL}/wp-admin/admin-ajax.php?action=get_ninja_table_public_data&table_id=${TABLE_ID}`,
      desc: 'Ninja Tables Public Data Action',
    },
    {
      url: `${WP_BASE_URL}/wp-json/wp/v2/posts/${TABLE_ID}`,
      desc: 'WordPress Post CPT Object',
    },
  ]

  let rawTableData = null
  for (const candidate of candidateUrls) {
    const data = await tryFetchEndpoint(candidate.url, candidate.desc)
    if (data) {
      rawTableData = data
      break
    }
  }

  if (!rawTableData) {
    console.error('\n❌ Belum berhasil mengambil data otomatis dari endpoint Ninja Tables.')
    console.error('Silakan cek apakah tabel dapat diekspor langsung dari dashboard WordPress:')
    console.error('Menu: Ninja Tables -> Klik Tabel "Daftar Perguruan Tinggi" -> Export Table (CSV / JSON)')
    return
  }

  console.log('\n🔍 Menganalisis struktur data yang diterima...')
  fs.writeFileSync('scripts/debug-ninja-data.json', JSON.stringify(rawTableData, null, 2))
  console.log('Tersimpan di scripts/debug-ninja-data.json')

  // Normalisasi data baris
  let rows = []
  if (Array.isArray(rawTableData)) {
    rows = rawTableData
  } else if (Array.isArray(rawTableData.rows)) {
    rows = rawTableData.rows
  } else if (Array.isArray(rawTableData.data)) {
    rows = rawTableData.data
  } else if (rawTableData.content?.rendered) {
    console.log('Data ada di dalam post content rendered')
  }

  console.log(`📊 Berhasil mendeteksi ${rows.length} data baris!`)

  if (rows.length === 0) {
    console.log('Struktur data mentah:', Object.keys(rawTableData))
    return
  }

  console.log('\nContoh baris pertama:', rows[0])

  const parsedPrograms = []
  const uniqueCampuses = new Map()

  rows.forEach((row, idx) => {
    // Ninja tables biasanya menyimpan data dalam key seperti 'prodi', 'akreditasi', 'fakultas', 'nama_kampus', dll
    // atau 'value' objek
    const item = row.values || row.value || row

    // Deteksi field secara fleksibel
    const prodi =
      item.prodi || item['prodi'] || item['nama_prodi'] || item.column_1 || item.program_studi || item[1] || ''
    const akredProdi =
      item.akreditasi || item['akreditasi'] || item.column_2 || item.akreditasi_prodi || item[2] || ''
    const fakultas =
      item.fakultas || item['fakultas'] || item.column_3 || item[3] || ''
    const kampus =
      item.nama_kampus || item['nama_kampus'] || item.kampus || item.column_4 || item[4] || ''
    const akredKampus =
      item.akreditasi_kampus || item['akreditasi_kampus'] || item.column_5 || item[5] || ''

    if (!prodi && !kampus) return

    // Deteksi singkatan
    let shortName = ''
    const shortMatch = kampus.match(/\(([^)]+)\)/)
    if (shortMatch) {
      shortName = shortMatch[1].trim()
    } else {
      shortName = kampus.split(' ')[0]
    }

    if (!uniqueCampuses.has(kampus) && kampus) {
      uniqueCampuses.set(kampus, {
        name: kampus,
        shortName,
        accreditation: akredKampus,
      })
    }

    parsedPrograms.push({
      no: idx + 1,
      name: prodi,
      degree: 'S1',
      accreditation: akredProdi,
      faculty: fakultas,
      campus: kampus,
      campusShort: shortName,
      campusAccreditation: akredKampus,
    })
  })

  console.log(`✓ Berhasil memproses ${parsedPrograms.length} program studi dari ${uniqueCampuses.size} kampus.`)

  // Simpan ke src/data/prodi-kampus.json
  const outputDir = path.resolve(process.cwd(), 'src/data')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  const jsonPath = path.join(outputDir, 'prodi-kampus.json')
  fs.writeFileSync(jsonPath, JSON.stringify(parsedPrograms, null, 2))
  console.log(`💾 File JSON berhasil diperbarui: src/data/prodi-kampus.json`)

  // Simpan ke Sanity jika ada token
  if (client) {
    console.log('\n--- Mengunggah ke Sanity CMS ---')
    let progCount = 0
    for (const p of parsedPrograms) {
      const slug = `${p.campusShort}-${p.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      const doc = {
        _id: `prodi-wp-${slug}`,
        _type: 'studyProgram',
        name: p.name,
        degree: p.degree,
        faculty: p.faculty,
        accreditation: p.accreditation,
      }
      try {
        await client.createOrReplace(doc)
        progCount++
      } catch (e) {
        // silent
      }
    }
    console.log(`  ✓ Berhasil mengunggah ${progCount} program studi ke Sanity!`)
  }

  console.log('\n========================================================')
  console.log('🎉 MIGRASI NINJA TABLES BERHASIL!')
  console.log('========================================================\n')
}

run().catch((err) => {
  console.error('\n❌ Terjadi kesalahan:', err)
})
