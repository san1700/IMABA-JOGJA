---
name: imaba-nextjs-site
description: Panduan membangun website IMABA Jogja (Ikatan Mahasiswa Bata-Bata Yogyakarta) dengan Next.js 16 (App Router) + Tailwind CSS + shadcn/ui + Motion + Sanity CMS, lengkap dengan arah desain modern (hero navy bergaris vertikal, kartu kaca, tombol pil, grid kartu putih). Gunakan skill ini setiap kali user meminta membuat, melanjutkan, memperbaiki, atau menambah fitur pada website IMABA - termasuk design system, warna, font, navbar, footer, beranda, halaman berita/karya kader/informasi kampus/profil, query Sanity, SEO, migrasi konten dari WordPress, atau deploy ke Vercel - meskipun user tidak menyebut nama skill ini.
---

# IMABA Jogja - Next.js + Sanity Website

Skill ini memandu pembangunan situs organisasi **IMABA Jogja** (Ikatan Mahasiswa Bata-Bata, Yogyakarta) secara bertahap sampai live. Tujuan: modern, cepat, interaktif, aman, dan mudah dikelola pengurus non-teknis lewat dashboard Sanity.

## 1. Konteks proyek

- Situs lama (WordPress, imabayogyakarta.com) terkena injeksi spam judi. Karena itu:
  - **Jangan** menyalin file/tema/plugin/database lama. Ambil hanya konten bersih (artikel, gambar) dan periksa manual.
  - Anggap semua kredensial lama bocor; ingatkan user menggantinya.
- Folder proyek: `imaba-web`. Editor: Antigravity IDE. Skill ini berada di `.agents/skills/imaba-nextjs-site/SKILL.md`.
- Bahasa antarmuka situs: Indonesia. Kode, nama variabel, komentar teknis: Inggris.
- User sedang belajar. Jelaskan istilah teknis singkat saat pertama muncul, kerjakan per fase, dan tunjukkan hasil nyata.

### Status pengerjaan (perbarui saat fase selesai)

- [x] Fase 0 - Persiapan & keamanan
- [x] Fase 1 - Next.js 16 + Tailwind + shadcn/ui (Base UI) + motion, lucide-react, next-themes, fuse.js
- [x] Fase 2 - Sanity ter-init, Studio tertanam di `/studio`, schema sudah dibuat, 1 artikel uji sudah Published
- [x] Fase 3 - Design system (warna, font, token)
- [x] Fase 4 - Layout global (Navbar, Footer, dark mode)
- [x] Fase 5 - Halaman (Beranda, Berita, Karya Kader, Informasi Kampus, Profil, Puteri Imaba, 404)
- [ ] Fase 6 - Interaksi & animasi
- [ ] Fase 7 - SEO, performa, aksesibilitas
- [ ] Fase 8 - Migrasi konten & redirect
- [ ] Fase 9 - Deploy
- [ ] Fase 10 - Serah terima

## 2. Aturan wajib Next.js 16 (jangan dilanggar)

Proyek ini memakai **Next.js 16 dengan `cacheComponents` aktif**. Ini sudah pernah menyebabkan error nyata.

1. **Baca dokumentasi lokal dulu.** Sebelum menulis kode routing/caching/data fetching, baca panduan terkait di `node_modules/next/dist/docs/` (diperintahkan juga oleh `AGENTS.md`). Pengetahuan lama tentang Next.js bisa keliru.
2. **Jangan menambahkan route segment config** seperti `export const dynamic`, `revalidate`, `fetchCache`, `dynamicParams`, `runtime` dst. di file route; semuanya tidak kompatibel dengan `cacheComponents` dan membuat build error. Template Sanity sempat menambahkan `export const dynamic = 'force-static'` di `src/app/studio/[[...tool]]/page.tsx`; baris itu sudah dihapus dan tidak boleh dikembalikan.
3. **Caching data memakai pendekatan cacheComponents** (direktif `'use cache'`, `cacheTag`, `cacheLife`, dan invalidasi tag), bukan pola lama `fetch(..., { next: { tags } })` dan `export const revalidate`. Cek dokumentasi lokal untuk sintaks persis versi yang terpasang sebelum menulisnya.
4. Komponen yang membaca data runtime (cookies, headers, searchParams) harus dibungkus `<Suspense>` sesuai panduan dokumentasi.
5. Jalankan `npm run build` setelah perubahan besar untuk menangkap error semacam ini lebih awal.

## 3. Stack

- Next.js 16 (App Router, TypeScript, `src/`), React Server Components
- Tailwind CSS + shadcn/ui (Base UI; preset tercatat di `components.json`)
- `motion` (import dari `motion/react`) untuk animasi, `lucide-react` untuk ikon, `next-themes` untuk dark mode, `fuse.js` untuk pencarian
- Sanity: `sanity`, `next-sanity`, `@sanity/image-url`, `@portabletext/react`
- Deploy: Vercel; domain `imabayogyakarta.com`

## 4. Struktur konten (sudah ada di Sanity Studio)

Struktur Studio berbahasa Indonesia dan dikelompokkan seperti ini:

- **Publikasi & Literasi** -> Semua Artikel & Berita, Kategori, Penulis / Kontributor
- **Artikel & Berita**
- **Informasi Kampus & Pendidikan** -> Daftar Kampus, Beasiswa, Brosur & Dokumen
- **Profil & Keorganisasian** -> Halaman Statis, Pengurus DPW

Artikel punya field **Kanal / Bagian** dengan tiga pilihan: *Berita & Agenda DPW*, *Karya Kader (Opini, Esai, Puisi, Cerpen, Memoar)*, *Informasi Kampus & Pendidikan*. Kategori adalah referensi (misal Opini, Cerpen, Agenda, Info Beasiswa) dan **wajib berjudul serta sudah Published** agar artikel bisa dipublikasikan.

**Penting:** nama field persisnya ada di `src/sanity/schemaTypes/`. **Selalu baca file schema itu** sebelum menulis query GROQ atau komponen; jangan menebak nama field. Hanya dokumen berstatus Published yang boleh tampil di situs publik.

### Peta situs

| Menu | Isi | Sumber data |
|---|---|---|
| Beranda | hero, berita terbaru, sorotan karya kader, info kampus/beasiswa | post, campus, scholarship |
| Profil | sejarah, AD/ART, struktur DPW | page, member |
| Berita | artikel + Agenda DPW | post (kanal Berita) |
| Informasi Kampus | prodi & kampus, jalur masuk, beasiswa, brosur, bimtren | campus, scholarship, brochure, post |
| Karya Kader | opini, esai, puisi, cerpen, memoar, resensi | post (kanal Karya Kader) |
| Puteri Imaba | profil & kegiatan divisi putri | page |

## 5. Identitas & arah desain

### Logo

IMABA = **Ikatan Mahasiswa Bata-Bata**. Logo berupa segitiga bertembok bata biru, menara masjid hijau, globe dengan bendera merah-putih, cincin hijau, tulisan IMABA bergradasi biru-kuning, dan "JOGJA" merah. Logo asli berlatar putih dan efek 3D, jadi:

- Pakai versi **PNG transparan** di `public/logo.png` (dan ukuran kecil untuk favicon). Bila belum ada, minta user menyiapkan; jangan memakai logo berlatar putih langsung di atas hero gelap.
- Di navbar gelap, letakkan logo pada badge/lingkaran putih kecil atau gunakan versi transparan.

### Referensi visual

Gaya "modern landing page" (referensi AirLume): hero navy gelap dengan garis vertikal bergradasi, badge pil kecil, judul besar tebal dengan kata beraksen, kartu kaca melayang, tombol pil dengan lingkaran panah, lalu transisi ke bagian terang berisi grid kartu putih berradius besar. **Ambil gayanya, bukan menyalin layout/kontennya.**

### Palet warna

Nilai hex perkiraan dari logo dan referensi. Jika user memberi nilai resmi, ganti di satu tempat (token CSS).

| Peran | Warna | Hex |
|---|---|---|
| Latar gelap (hero, footer) | Navy sangat tua | `#050A2E` |
| Biru utama (primary) | Biru segitiga logo | `#1E2FB8` |
| Aksen interaktif | Indigo terang | `#4F5CF2` |
| Latar bagian terang | Abu kebiruan | `#EEF1F9` |
| Aksen 1 | Kuning logo | `#F9C80E` |
| Aksen 2 | Hijau logo | `#1FA83C` |
| Aksen 3 | Merah logo | `#E3262A` |

Aturan pemakaian: **biru + indigo dominan**; kuning/hijau/merah hanya aksen kecil (badge, ikon, highlight kata, penanda kategori). Jangan menjadikan situs pelangi. Pastikan kontras teks memenuhi WCAG AA (teks putih di navy, teks navy di latar terang).

### Token warna

Pasang di `src/app/globals.css` dengan **memetakan ke variabel shadcn yang sudah ada** (`--background`, `--foreground`, `--primary`, `--accent`, `--muted`, `--card`, `--border`, `--ring`, dll.) alih-alih membuat sistem paralel. Tambahkan token tambahan:

```css
:root {
  --imaba-navy: #050a2e;
  --imaba-blue: #1e2fb8;
  --imaba-indigo: #4f5cf2;
  --imaba-surface: #eef1f9;
  --imaba-yellow: #f9c80e;
  --imaba-green: #1fa83c;
  --imaba-red: #e3262a;
}
```

Sediakan nilai untuk **light dan dark mode**. Di dark mode, latar memakai navy, kartu memakai navy sedikit lebih terang, dan teks hampir putih. Konversi hex ke format yang dipakai `globals.css` (misalnya oklch) bila template shadcn memintanya.

### Font (via `next/font/google`)

- Judul: **Plus Jakarta Sans** (600-800)
- Isi umum/UI: **Inter**
- Isi artikel Karya Kader (puisi, cerpen, esai): **Newsreader** atau Lora; lebar baris sekitar 65 karakter, line-height 1.7-1.8

### Pola komponen khas

**Hero dengan garis vertikal bergradasi:**
```css
.hero-stripes {
  background-color: var(--imaba-navy);
  background-image:
    repeating-linear-gradient(90deg,
      rgb(79 92 242 / 0.00) 0 36px,
      rgb(79 92 242 / 0.28) 48px,
      rgb(30 47 184 / 0.55) 60px,
      rgb(79 92 242 / 0.00) 72px),
    linear-gradient(180deg, rgb(5 10 46) 0%, rgb(15 25 120) 100%);
}
```

**Kartu kaca:**
```css
.glass-card {
  background: rgb(255 255 255 / 0.08);
  border: 1px solid rgb(255 255 255 / 0.18);
  backdrop-filter: blur(14px);
  border-radius: 1.5rem;
  box-shadow: 0 20px 60px -20px rgb(79 92 242 / 0.5);
}
```

**Tombol pil dengan lingkaran panah:** tombol `rounded-full`, latar indigo, teks putih, di ujung kanan ada lingkaran putih berisi ikon `ArrowRight` (lucide) yang bergeser sedikit saat hover.

**Badge pil:** `rounded-full`, border tipis, teks kecil, di atas judul hero (misal "Ikatan Mahasiswa Bata-Bata Jogja").

**Kartu putih di bagian terang:** `rounded-2xl`, bayangan lembut, ikon dalam lingkaran pastel, judul tebal, deskripsi abu, tautan "Pelajari" dengan panah. Satu kartu sorotan boleh berlatar biru penuh.

**Judul berakses:** satu atau dua kata kunci diberi warna aksen (indigo terang/kuning), sisanya putih atau navy.

### Prinsip

- Mobile-first; mayoritas pengunjung memakai ponsel.
- Animasi memperjelas, bukan menghias; hormati `prefers-reduced-motion`.
- Efek berat (blur besar, banyak gradien) dipakai hemat agar performa tetap baik.
- Halaman baca (artikel, karya) dibuat tenang: latar terang polos, tipografi nyaman, tanpa animasi yang mengganggu.

## 6. Struktur folder target

```
src/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx            # Navbar + Footer + providers
│   │   ├── page.tsx              # Beranda
│   │   ├── profil/page.tsx
│   │   ├── berita/page.tsx
│   │   ├── berita/[slug]/page.tsx
│   │   ├── informasi-kampus/...
│   │   ├── karya-kader/page.tsx
│   │   ├── karya-kader/[slug]/page.tsx
│   │   └── puteri-imaba/page.tsx
│   ├── studio/[[...tool]]/page.tsx   # Sanity Studio (tanpa route segment config)
│   ├── sitemap.ts
│   ├── robots.ts
│   └── not-found.tsx
├── components/
│   ├── ui/                       # shadcn
│   ├── layout/ (Navbar, Footer, MobileMenu, ThemeToggle)
│   ├── sections/ (Hero, LatestPosts, FeatureGrid, ...)
│   ├── cards/ (PostCard, ScholarshipCard, ...)
│   └── motion/ (FadeUp, Stagger, ...)
├── lib/
└── sanity/
    ├── env.ts
    ├── lib/ (client, image, queries)
    └── schemaTypes/              # sudah dibuat; baca sebelum query
```

## 7. Alur kerja per fase

### Fase 3 - Design system
Pasang token warna (light & dark), font lewat `next/font`, komponen dasar (Button varian pil, Badge, Card, Container, SectionHeading). Letakkan logo di `public/`. Tunjukkan hasilnya di halaman uji sebelum lanjut.

### Fase 4 - Layout global
Navbar sticky (menu: Profil, Berita, Informasi Kampus [dropdown Daftar Kampus, Beasiswa, Brosur], Karya Kader, Puteri Imaba), menu mobile berupa sheet, toggle dark mode, kolom pencarian. Footer: kontak, sosmed, tautan cepat, logo.

### Fase 5 - Halaman
Urut: Beranda -> Berita (daftar + detail) -> Karya Kader -> Informasi Kampus -> Profil -> Puteri Imaba -> 404. Data diambil di Server Component. Gunakan data uji yang sudah ada (artikel "Tahu buka") untuk verifikasi awal. Beranda memuat: hero bergaya referensi, berita terbaru, sorotan karya kader, info kampus/beasiswa, CTA.

### Fase 6 - Interaksi
Animasi masuk hero, fade-up saat scroll, hover kartu, filter kategori tanpa reload, pencarian instan (Fuse.js), progress bar baca di artikel.

### Fase 7 - SEO, performa, aksesibilitas
`generateMetadata` per halaman, `sitemap.ts`, `robots.ts`, JSON-LD `Article`, `next/image` dengan `alt`, jangan mengunci zoom (`user-scalable=no`), target Lighthouse >= 90.

### Fase 8 - Migrasi konten
Impor atau input manual konten bersih dari ekspor WP. Pasang `redirects()` di `next.config.ts` untuk URL lama (`/category/*`, slug artikel).

### Fase 9 - Deploy
GitHub -> Vercel -> env vars -> domain -> CORS origin Sanity untuk domain produksi -> webhook revalidasi (sesuaikan dengan mekanisme caching Next.js 16 di dokumentasi lokal).

### Fase 10 - Serah terima
Panduan singkat untuk pengurus: login Studio, buat dan publish artikel, unggah gambar. Atur peran Sanity (Administrator, Editor).

## 8. Aturan kode

- TypeScript strict, hindari `any`.
- Server Components secara default; `'use client'` hanya untuk state, efek, dan animasi.
- Komponen kecil, satu tanggung jawab, props bertipe.
- Gunakan `next/image` dan `next/link`.
- Jangan commit `.env*`. Token tulis Sanity tidak pernah berawalan `NEXT_PUBLIC_`.
- Jalankan `npm run lint` dan `npm run build` sebelum menyatakan suatu fase selesai.

## 9. Keamanan & kebiasaan baik

- Aktifkan 2FA admin Sanity, beri peran minimum, batasi CORS ke domain sendiri.
- Validasi input form (Zod) bila ada form kontak.
- Tambahkan security headers dasar di `next.config.ts`.
- **Jangan menjalankan `npm audit fix --force`** (bisa merusak versi paket). Gunakan `npm audit --omit=dev` menjelang deploy untuk melihat kerentanan yang relevan di production.
- Peringatan `ERESOLVE overriding peer dependency` dan `install-scripts` dari npm hanya peringatan; bila paket seperti `esbuild` gagal berjalan, setujui skripnya dengan `npm install-scripts approve <paket>`.
- Perintah yang butuh login interaktif (misal `sanity login`) dijalankan user sendiri di terminal; agent tidak menjalankannya.

## 10. Checklist akhir

- [ ] Semua menu lama punya halaman padanan
- [ ] Konten bersih dari spam; redirect URL lama terpasang
- [ ] Studio bisa dipakai editor non-teknis
- [ ] Desain konsisten dengan palet, font, dan pola komponen di bagian 5; logo tampil baik di terang dan gelap
- [ ] Lighthouse >= 90, tanpa masalah aksesibilitas besar
- [ ] Sitemap, robots, metadata, OG image aktif
- [ ] Dark mode dan mobile dicek manual
- [ ] `npm run build` bersih tanpa error `cacheComponents`
- [ ] Env vars dan mekanisme revalidasi berfungsi di production
- [ ] Domain terhubung, HTTPS aktif, Search Console dikirim ulang
