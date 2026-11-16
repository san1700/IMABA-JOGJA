/**
 * Script Migrasi Konten Otomatis dari WordPress REST API ke Sanity CMS
 * Project: IMABA Daerah Istimewa Yogyakarta
 * 
 * Penggunaan:
 * 1. Dapatkan Write Token dari https://www.sanity.io/manage (Project: d109xcpl -> API -> Tokens -> Add Token -> Editor/Write)
 * 2. Tambahkan token ke .env.local:
 *    SANITY_API_WRITE_TOKEN="sk..."
 * 3. Jalankan script:
 *    node scripts/migrate-wp.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { createClient } from 'next-sanity'

// 1. Baca konfigurasi dari .env.local
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
const SANITY_TOKEN = process.env.SANITY_API_WRITE_TOKEN

if (!SANITY_TOKEN) {
  console.error('\n❌ ERROR: SANITY_API_WRITE_TOKEN belum disetel!')
  console.error('Silakan buat token dengan hak akses "Editor" di https://www.sanity.io/manage')
  console.error('Lalu tambahkan ke file .env.local:')
  console.error('SANITY_API_WRITE_TOKEN="sk..."\n')
  process.exit(1)
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2026-11-06',
  token: SANITY_TOKEN,
  useCdn: false,
})

// Helper konversi teks HTML entitas ke string biasa
function decodeHtmlEntities(str = '') {
  return str
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&hellip;/g, '…')
    .replace(/&#[0-9]+;/g, '')
    .trim()
}

// Helper mengubah HTML sederhana WordPress ke format Blok Portable Text Sanity
function htmlToPortableText(html = '') {
  if (!html) return []

  // Pisahkan berdasarkan tag block level
  const cleanHtml = html
    .replace(/\r\n/g, '\n')
    .replace(/<!--[\s\S]*?-->/g, '') // hapus komentar Gutenberg

  // Regex sederhana untuk menemukan paragraf, heading, dan blockquote
  const blockRegex = /<(p|h2|h3|h4|blockquote)[\s\S]*?>([\s\S]*?)<\/\1>/gi
  const blocks = []
  let match

  while ((match = blockRegex.exec(cleanHtml)) !== null) {
    const tag = match[1].toLowerCase()
    let innerText = match[2]
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '') // bersihkan sisa tag
      .trim()

    innerText = decodeHtmlEntities(innerText)
    if (!innerText) continue

    let style = 'normal'
    if (tag === 'h2') style = 'h2'
    else if (tag === 'h3') style = 'h3'
    else if (tag === 'h4') style = 'h4'
    else if (tag === 'blockquote') style = 'blockquote'

    blocks.push({
      _key: Math.random().toString(36).substring(2, 11),
      _type: 'block',
      style,
      markDefs: [],
      children: [
        {
          _key: Math.random().toString(36).substring(2, 11),
          _type: 'span',
          marks: [],
          text: innerText,
        },
      ],
    })
  }

  // Jika tidak ada tag yang cocok, buat satu paragraf dari seluruh teks bersih
  if (blocks.length === 0 && html.trim()) {
    const rawText = decodeHtmlEntities(html.replace(/<[^>]+>/g, '').trim())
    if (rawText) {
      blocks.push({
        _key: Math.random().toString(36).substring(2, 11),
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: Math.random().toString(36).substring(2, 11),
            _type: 'span',
            marks: [],
            text: rawText,
          },
        ],
      })
    }
  }

  return blocks
}

// 2. Fetch Helper dari WP REST API
async function fetchWp(endpoint) {
  const url = `${WP_BASE_URL}/wp-json/wp/v2/${endpoint}`
  console.log(`📡 Mengambil data: ${url}`)
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Gagal memuat ${url} (Status: ${res.status} ${res.statusText})`)
  }
  const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1', 10)
  const data = await res.json()
  return { data, totalPages }
}

// 3. Upload Gambar ke Sanity Asset Pipeline
async function uploadImageToSanity(imageUrl, filename = 'cover.jpg') {
  try {
    const res = await fetch(imageUrl)
    if (!res.ok) return null
    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const asset = await client.assets.upload('image', buffer, { filename })
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: filename,
    }
  } catch (err) {
    console.warn(`⚠️ Gagal mengunggah gambar ${imageUrl}:`, err.message)
    return null
  }
}

// 4. Main Runner
async function runMigration() {
  console.log('========================================================')
  console.log(`🚀 MEMULAI MIGRASI KONTEN DARI WORDPRESS KE SANITY CMS`)
  console.log(`   Sumber : ${WP_BASE_URL}`)
  console.log(`   Tujuan : Sanity Project [${SANITY_PROJECT_ID}] Dataset [${SANITY_DATASET}]`)
  console.log('========================================================\n')

  // A. Migrasi Kategori
  console.log('--- 1. Memeriksa & Memindahkan Kategori ---')
  let wpCategories = []
  try {
    const catRes = await fetchWp('categories?per_page=100')
    wpCategories = catRes.data
    console.log(`Ditemukan ${wpCategories.length} kategori di WordPress.`)
  } catch (e) {
    console.warn('Lewati kategori otomatis:', e.message)
  }

  const categoryMap = new Map() // WP ID -> Sanity _id
  for (const cat of wpCategories) {
    const catName = decodeHtmlEntities(cat.name)
    const catSlug = cat.slug
    const catId = `category-${cat.id}`

    // Tentukan section berdasarkan nama kategori
    const lowerName = catName.toLowerCase()
    let section = 'berita'
    if (
      lowerName.includes('opini') ||
      lowerName.includes('esai') ||
      lowerName.includes('puisi') ||
      lowerName.includes('cerpen') ||
      lowerName.includes('sastra') ||
      lowerName.includes('karya')
    ) {
      section = 'karya'
    } else if (lowerName.includes('beasiswa') || lowerName.includes('kampus') || lowerName.includes('bimtren')) {
      section = 'info'
    }

    const doc = {
      _id: catId,
      _type: 'category',
      title: catName,
      slug: { _type: 'slug', current: catSlug },
      section,
      description: decodeHtmlEntities(cat.description || ''),
    }

    await client.createOrReplace(doc)
    categoryMap.set(cat.id, { id: catId, section })
    console.log(`  ✓ Kategori: "${catName}" -> Kanal [${section}]`)
  }

  // B. Migrasi Penulis / Users
  console.log('\n--- 2. Memeriksa & Memindahkan Penulis ---')
  let wpUsers = []
  try {
    const userRes = await fetchWp('users?per_page=100')
    wpUsers = userRes.data
    console.log(`Ditemukan ${wpUsers.length} penulis di WordPress.`)
  } catch (e) {
    console.warn('Lewati penulis otomatis:', e.message)
  }

  const authorMap = new Map() // WP ID -> Sanity _id
  for (const user of wpUsers) {
    const authorId = `author-${user.id}`
    const doc = {
      _id: authorId,
      _type: 'author',
      name: user.name,
      slug: { _type: 'slug', current: user.slug },
      role: 'Kontributor IMABA',
      bio: user.description || 'Penulis dan kader Ikatan Mahasiswa Bata-Bata (IMABA) Yogyakarta.',
    }
    await client.createOrReplace(doc)
    authorMap.set(user.id, authorId)
    console.log(`  ✓ Penulis: "${user.name}"`)
  }

  // C. Migrasi Artikel & Berita (Pagination Loop)
  console.log('\n--- 3. Mengunduh & Mengimpor Artikel (Posts) ---')
  let currentPage = 1
  let totalPages = 1
  let totalMigrated = 0

  do {
    console.log(`\n📄 Memproses Halaman ${currentPage}...`)
    const { data: posts, totalPages: tp } = await fetchWp(`posts?_embed=1&per_page=50&page=${currentPage}`)
    totalPages = tp

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]
      const title = decodeHtmlEntities(post.title?.rendered || 'Tanpa Judul')
      const slug = post.slug || `post-${post.id}`
      const publishedAt = new Date(post.date_gmt ? `${post.date_gmt}Z` : post.date).toISOString()
      const rawExcerpt = decodeHtmlEntities((post.excerpt?.rendered || '').replace(/<[^>]+>/g, '').trim())
      const excerpt = rawExcerpt.slice(0, 240)
      const bodyBlocks = htmlToPortableText(post.content?.rendered || '')

      // Tentukan Kanal & Kategori
      let primaryCategoryRef = null
      let assignedSection = 'berita'

      if (post.categories && post.categories.length > 0) {
        const firstCatId = post.categories[0]
        const catInfo = categoryMap.get(firstCatId)
        if (catInfo) {
          primaryCategoryRef = { _type: 'reference', _ref: catInfo.id }
          assignedSection = catInfo.section
        }
      }

      // Penulis
      let authorRef = null
      if (post.author && authorMap.has(post.author)) {
        authorRef = { _type: 'reference', _ref: authorMap.get(post.author) }
      }

      // Unggah Featured Image Cover jika ada
      let coverObject = null
      const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]
      const imageUrl = featuredMedia?.source_url || featuredMedia?.media_details?.sizes?.full?.source_url
      if (imageUrl) {
        console.log(`    🖼️  Mengunggah cover: ${imageUrl}`)
        coverObject = await uploadImageToSanity(imageUrl, `${slug}.jpg`)
        if (coverObject) {
          coverObject.alt = title
          coverObject.caption = featuredMedia?.caption?.rendered
            ? decodeHtmlEntities(featuredMedia.caption.rendered.replace(/<[^>]+>/g, ''))
            : ''
        }
      }

      const postDoc = {
        _id: `wp-post-${post.id}`,
        _type: 'post',
        title,
        slug: { _type: 'slug', current: slug },
        section: assignedSection,
        category: primaryCategoryRef || undefined,
        author: authorRef || undefined,
        cover: coverObject || undefined,
        excerpt: excerpt || undefined,
        body: bodyBlocks,
        publishedAt,
        featured: false,
      }

      await client.createOrReplace(postDoc)
      totalMigrated++
      console.log(`  [${totalMigrated}] Sukses: "${title}" -> [Kanal: ${assignedSection}]`)
    }

    currentPage++
  } while (currentPage <= totalPages)

  console.log('\n========================================================')
  console.log(`🎉 MIGRASI SELESAI DENGAN SUKSES!`)
  console.log(`   Total Konten Berhasil Dimigrasikan: ${totalMigrated} artikel.`)
  console.log(`   Silakan buka Sanity Studio di: http://localhost:3000/studio`)
  console.log('========================================================\n')
}

runMigration().catch((err) => {
  console.error('\n❌ Terjadi kesalahan saat migrasi:', err)
  process.exit(1)
})
