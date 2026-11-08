import { groq } from 'next-sanity'

// ============================================================================
// TypeScript Interfaces
// ============================================================================

export interface SanityImage {
  asset?: {
    _ref?: string
    _type?: string
    url?: string
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Author {
  name: string
  slug?: string
  role?: string
  campus?: string
  bio?: string
  instagram?: string
  avatar?: SanityImage | string
}

export interface Category {
  _id: string
  title: string
  slug: string
  section?: string
  description?: string
}

export interface Post {
  _id: string
  title: string
  slug: string
  section: 'berita' | 'karya' | 'info'
  category?: Category
  author?: Author
  cover?: SanityImage
  excerpt?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[]
  publishedAt: string
  featured?: boolean
}

// Fallback Data Resmi (Berdasarkan Data Organisasi IMABA Yogyakarta)
export const FALLBACK_POSTS: Post[] = [
  {
    _id: 'sample-1',
    title: 'Pelantikan Pengurus DPW IMABA DIY Periode 2026/2027 Berlangsung Khidmat',
    slug: 'pelantikan-pengurus-dpw-imaba-diy-2026',
    section: 'berita',
    category: { _id: 'cat-1', title: 'Liputan Acara', slug: 'liputan' },
    author: { name: 'Humas & Infokom DPW', role: 'Pengurus DPW' },
    excerpt:
      'Pelantikan kepengurusan baru DPW IMABA Yogyakarta sukses diselenggarakan dengan dihadiri para sesepuh, alumni, dan ratusan santri perantauan di Yogyakarta.',
    publishedAt: '2026-03-01T08:00:00.000Z',
    featured: true,
  },
  {
    _id: 'sample-2',
    title: 'Agenda Rutin Bimtren 2026: Siapkan Ratusan Calon Mahasiswa Baru Masuk Kampus Impian',
    slug: 'agenda-rutin-bimtren-2026',
    section: 'berita',
    category: { _id: 'cat-2', title: 'Agenda DPW', slug: 'agenda' },
    author: { name: 'Divisi Pendidikan', role: 'Pengurus DPW' },
    excerpt:
      'Program tahunan Bimtren IMABA Jogja kembali dibuka untuk mendampingi calon mahasiswa dari pondok pesantren menembus seleksi SNBP, SNBT, dan Ujian Mandiri.',
    publishedAt: '2026-02-28T10:00:00.000Z',
    featured: false,
  },
  {
    _id: 'sample-3',
    title: 'Kajian Ilmiah Bulanan: Menjaga Sanad Keilmuan Pesantren di Tengah Arus Modernitas',
    slug: 'kajian-ilmiah-bulanan-turats',
    section: 'berita',
    category: { _id: 'cat-3', title: 'Kajian & Dakwah', slug: 'kajian' },
    author: { name: 'Divisi Kaderisasi', role: 'Pengurus DPW' },
    excerpt:
      'Menelaah kitab-kitab turats karya ulama nusantara dan masyaikh Bata-Bata dalam forum intelektual santri mahasiswa di Yogyakarta.',
    publishedAt: '2026-02-25T14:30:00.000Z',
    featured: false,
  },
]

export const FALLBACK_KARYA: Post[] = [
  {
    _id: 'karya-1',
    title: 'Menimbang Relevansi Tradisi Pesantren di Era Disrupsi Digital',
    slug: 'relevansi-tradisi-pesantren-era-digital',
    section: 'karya',
    category: { _id: 'cat-opini', title: 'Opini', slug: 'opini' },
    author: { name: 'Ahmad Faiz', role: 'Kader IMABA UIN Sunan Kalijaga' },
    excerpt:
      'Refleksi atas nilai-nilai kesopanan dan ketawaduan pesantren Mambaul Ulum Bata-Bata dalam menghadapi percepatan teknologi kecerdasan buatan.',
    publishedAt: '2026-03-02T09:00:00.000Z',
    featured: true,
  },
  {
    _id: 'karya-2',
    title: 'Surat dari Sudut Malioboro: Catatan Santri Perantau di Kota Pelajar',
    slug: 'catatan-santri-perantau-malioboro',
    section: 'karya',
    category: { _id: 'cat-cerpen', title: 'Cerpen Santri', slug: 'cerpen' },
    author: { name: 'Nurul Hidayah', role: 'Kader IMABA UNY' },
    excerpt:
      'Sebuah kisah fiksi tentang kerinduan seorang santri pada gemuruh lalaran nadhom Imrithi di tengah gemerlap lampu malam Malioboro.',
    publishedAt: '2026-02-26T16:00:00.000Z',
    featured: false,
  },
  {
    _id: 'karya-3',
    title: 'Bait-Bait Doa di Bawah Langit Mataram',
    slug: 'bait-bait-doa-langit-mataram',
    section: 'karya',
    category: { _id: 'cat-puisi', title: 'Puisi', slug: 'puisi' },
    author: { name: 'M. Rizqi Pratama', role: 'Kader IMABA UGM' },
    excerpt:
      'Kumpulan sajak tentang perjalanan menuntut ilmu, aroma kitab kuning yang lapuk, dan ikhtiar merajut masa depan di Yogyakarta.',
    publishedAt: '2026-02-20T19:00:00.000Z',
    featured: false,
  },
]

export interface Campus {
  _id: string
  name: string
  shortName: string
  slug: string
  type: 'ptn' | 'ptkin' | 'pts' | 'kedinasan'
  logo?: SanityImage
  coverImage?: SanityImage
  address?: string
  websiteUrl?: string
  admissionUrl?: string
  description?: string
}

export interface StudyProgram {
  _id: string
  name: string
  degree: string
  campus?: Campus
  faculty?: string
  accreditation?: string
  careerProspects?: string
}

export interface Scholarship {
  _id: string
  title: string
  slug: string
  provider: string
  coverageType: 'full' | 'tuition' | 'allowance' | 'partial'
  targetAudience?: string
  deadline?: string
  poster?: SanityImage
  registrationUrl?: string
  requirements?: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any
  isActive?: boolean
}

export interface Brochure {
  _id: string
  title: string
  category: 'campus' | 'bimtren' | 'scholarship' | 'organization'
  campus?: { name: string; shortName: string }
  year?: string
  thumbnail?: SanityImage
  fileUrl?: string
  externalLink?: string
  description?: string
}

export interface Member {
  _id: string
  name: string
  position: string
  division: string
  period: string
  photo?: SanityImage
  campus?: { name: string; shortName: string }
  order?: number
  socialMedia?: {
    instagram?: string
    linkedin?: string
    email?: string
  }
}

export interface PageContent {
  _id: string
  title: string
  slug: string
  subtitle?: string
  heroImage?: SanityImage
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[]
}

// ============================================================================
// GROQ Queries
// ============================================================================

export const POSTS_QUERY = groq`
  *[_type == "post" && ($section == null || section == $section) && ($category == null || category->slug.current == $category)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    section,
    "category": category->{ _id, title, "slug": slug.current },
    "author": author->{ name, role, campus, "slug": slug.current, avatar },
    cover,
    excerpt,
    publishedAt,
    featured
  }
`

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    section,
    "category": category->{ _id, title, "slug": slug.current },
    "author": author->{ name, role, campus, bio, instagram, "slug": slug.current, avatar },
    cover,
    excerpt,
    body,
    publishedAt,
    featured
  }
`

export const RELATED_POSTS_QUERY = groq`
  *[_type == "post" && slug.current != $currentSlug && section == $section] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    section,
    "category": category->{ _id, title, "slug": slug.current },
    "author": author->{ name },
    cover,
    publishedAt
  }
`

export const CATEGORIES_QUERY = groq`
  *[_type == "category" && ($section == null || section == $section || section == "general")] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    section,
    description
  }
`

export const CAMPUSES_QUERY = groq`
  *[_type == "campus"] | order(name asc) {
    _id,
    name,
    shortName,
    "slug": slug.current,
    type,
    logo,
    coverImage,
    address,
    websiteUrl,
    admissionUrl,
    description
  }
`

export const SCHOLARSHIPS_QUERY = groq`
  *[_type == "scholarship"] | order(isActive desc, deadline asc) {
    _id,
    title,
    "slug": slug.current,
    provider,
    coverageType,
    targetAudience,
    deadline,
    poster,
    registrationUrl,
    requirements,
    description,
    isActive
  }
`

export const BROCHURES_QUERY = groq`
  *[_type == "brochure"] | order(year desc) {
    _id,
    title,
    category,
    "campus": campus->{ name, shortName },
    year,
    thumbnail,
    "fileUrl": file.asset->url,
    externalLink,
    description
  }
`

export const MEMBERS_QUERY = groq`
  *[_type == "member"] | order(order asc) {
    _id,
    name,
    position,
    division,
    period,
    photo,
    "campus": campus->{ name, shortName },
    order,
    socialMedia
  }
`

export const PAGE_BY_SLUG_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    heroImage,
    body
  }
`

export interface SitemapPost {
  slug: string
  section: 'berita' | 'karya' | 'info'
  _updatedAt?: string
  publishedAt?: string
}

export const SITEMAP_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    section,
    _updatedAt,
    publishedAt
  }
`


