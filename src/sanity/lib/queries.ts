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

