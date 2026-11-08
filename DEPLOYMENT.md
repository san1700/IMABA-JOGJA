# Panduan Deploy & Migrasi Konten IMABA Jogja

Dokumen ini memandu langkah demi langkah proses deploy website **IMABA Daerah Istimewa Yogyakarta** ke Vercel, penyambungan Sanity CMS, konfigurasi Webhook Revalidasi On-Demand, serta tata kelola migrasi konten dari situs lama.

---

## 1. Persiapan Environment Variables di Vercel

Saat mengimpor repositori ke Vercel ([vercel.com](https://vercel.com)), tambahkan Environment Variables berikut:

| Nama Variabel | Nilai Rekomendasi | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `d109xcpl` | ID Project Sanity IMABA |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Nama dataset Sanity |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-11-06` | Versi API Sanity |
| `SANITY_REVALIDATE_SECRET` | *(string acak yang aman)* | Kunci rahasia webhook revalidasi |
| `NEXT_PUBLIC_SITE_URL` | `https://imabayogyakarta.com` | URL domain produksi |

> **Catatan Pengaturan Root Directory Vercel:**  
> Jika repositori GitHub Anda memiliki folder `imaba-web` di dalamnya, pastikan mengatur **Root Directory** di Vercel ke `imaba-web`.

---

## 2. Pengaturan CORS Origin di Sanity Management

Agar Sanity Studio dan website di Vercel dapat berkomunikasi tanpa kendala CORS:

1. Buka dashboard Sanity Management: [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Pilih project: **d109xcpl**
3. Masuk ke tab **API** > **CORS Origins** > Klik **Add CORS origin**
4. Daftarkan origin berikut:
   - `https://imabayogyakarta.com` *(Allow credentials: **Centang / Yes**)*
   - `https://*.vercel.app` *(Allow credentials: **Centang / Yes** untuk preview build)*
   - `http://localhost:3000` *(Sudah ada untuk pengembangan lokal)*

---

## 3. Konfigurasi Webhook Revalidasi Otomatis (On-Demand ISR)

Webhook ini memastikan saat pengurus mempublikasikan atau mengubah artikel di Sanity Studio, website publik di Vercel akan langsung terbarui secara instan dalam hitungan detik tanpa perlu redeploy.

1. Di dashboard Sanity: [https://www.sanity.io/manage](https://www.sanity.io/manage) > Pilih project `d109xcpl`
2. Masuk ke tab **API** > **Webhooks** > Klik **Create Webhook**
3. Isi parameter konfigurasi berikut:
   - **Name:** `IMABA Vercel Revalidate`
   - **Description:** `On-demand cache revalidation for Next.js 16`
   - **URL:** `https://imabayogyakarta.com/api/revalidate`
   - **Dataset:** `production`
   - **Trigger on:** Centang `Create`, `Update`, `Delete`
   - **Filter:**  
     ```groq
     _type in ["post", "category", "author", "campus", "scholarship", "brochure", "member", "page"]
     ```
   - **Projection:**  
     ```json
     {
       "_type": _type,
       "slug": slug.current,
       "section": section
     }
     ```
   - **HTTP method:** `POST`
   - **HTTP Headers:** Kosongkan
   - **Secret:** Masukkan nilai yang sama persis dengan `SANITY_REVALIDATE_SECRET` yang didaftarkan di Vercel.
4. Klik **Save**.

---

## 4. Strategi Migrasi Konten dari Situs Lama (WordPress)

Situs WordPress lama (`imabayogyakarta.com`) memiliki riwayat injeksi spam. Untuk menjaga integritas dan keamanan sistem baru:

### A. Prosedur Kurasi Konten Bersih
- **Dilarang keras** mengimpor database SQL mentah atau plugin WordPress lama secara otomatis.
- Lakukan kurasi manual pada naskah artikel berharga:
  1. Salin judul dan isi teks murni artikel.
  2. Pastikan tidak ada tautan tersembunyi (hidden links) atau skrip berbahaya di dalam teks.
  3. Unggah gambar artikel langsung ke Sanity Studio (`/studio`).
  4. Tetapkan Penulis (*Author*), Kategori (*Category*), dan Kanal (*Section*: Berita, Karya Kader, atau Informasi Kampus).

### B. Pengalihan URL Warisan (*SEO Preservation*)
Aturan pengalihan otomatis (*301 Permanent Redirect*) telah diaktifkan pada `next.config.ts`:
- `/category/:slug` ➔ `/berita`
- `/tag/:slug` ➔ `/berita`
- `/author/:slug` ➔ `/profil`
- `/:year/:month/:slug` ➔ `/berita/:slug`
- `/:year/:month/:day/:slug` ➔ `/berita/:slug`
- `/feed` ➔ `/sitemap.xml`
- `/wp-admin` & `/wp-login.php` ➔ `/studio`
- `/tentang-kami`, `/sejarah`, `/ad-art`, `/struktur-pengurus` ➔ `/profil`
- `/bimtren`, `/beasiswa`, `/daftar-kampus` ➔ `/informasi-kampus`
- `/putri-imaba`, `/putri` ➔ `/puteri-imaba`

Dengan skema ini, peringkat pencarian Google dari situs lama tidak akan hilang, dan pengunjung lama tidak akan mengalami error 404.

