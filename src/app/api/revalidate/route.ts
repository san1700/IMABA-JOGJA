import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

interface SanityWebhookPayload {
  _type?: string
  slug?: string
  section?: string
}

function processRevalidation(body: SanityWebhookPayload | null) {
  const type = body?._type
  const slug = body?.slug
  const revalidatedPaths: string[] = []
  const revalidatedTags: string[] = []

  if (type === 'post') {
    revalidatePath('/')
    revalidatePath('/berita')
    revalidatePath('/karya-kader')
    revalidatePath('/sitemap.xml')
    revalidateTag('posts', 'max')

    revalidatedPaths.push('/', '/berita', '/karya-kader', '/sitemap.xml')
    revalidatedTags.push('posts')

    if (slug) {
      revalidatePath(`/berita/${slug}`)
      revalidatePath(`/karya-kader/${slug}`)
      revalidatedPaths.push(`/berita/${slug}`, `/karya-kader/${slug}`)
    }
  } else if (type === 'campus' || type === 'scholarship' || type === 'brochure') {
    revalidatePath('/')
    revalidatePath('/informasi-kampus')
    revalidateTag('campuses', 'max')

    revalidatedPaths.push('/', '/informasi-kampus')
    revalidatedTags.push('campuses')
  } else if (type === 'member') {
    revalidatePath('/profil')
    revalidateTag('members', 'max')

    revalidatedPaths.push('/profil')
    revalidatedTags.push('members')
  } else if (type === 'page') {
    revalidatePath('/')
    revalidatePath('/profil')
    revalidatePath('/puteri-imaba')

    revalidatedPaths.push('/', '/profil', '/puteri-imaba')
  } else {
    // Revalidasi umum jika trigger dokumen lain atau pembaruan menyeluruh
    revalidatePath('/')
    revalidatePath('/berita')
    revalidatePath('/karya-kader')
    revalidatePath('/informasi-kampus')
    revalidatePath('/profil')
    revalidateTag('posts', 'max')

    revalidatedPaths.push('/', '/berita', '/karya-kader', '/informasi-kampus', '/profil')
    revalidatedTags.push('posts')
  }

  return NextResponse.json({
    success: true,
    revalidated: true,
    type: type || 'general',
    slug: slug || null,
    paths: revalidatedPaths,
    tags: revalidatedTags,
    timestamp: new Date().toISOString(),
  })
}

// Handler POST untuk Sanity On-Demand Webhook
export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET

    // Jika secret terdefinisi, lakukan verifikasi keamanan
    if (secret) {
      const headerSecret = req.headers.get('x-revalidate-secret')
      const hasHeaderSecretMatch = headerSecret && headerSecret === secret

      if (!hasHeaderSecretMatch) {
        const { isValidSignature, body } = await parseBody<SanityWebhookPayload>(
          req,
          secret,
          false
        )

        if (isValidSignature === false) {
          return NextResponse.json(
            { success: false, message: 'Invalid webhook signature' },
            { status: 401 }
          )
        }

        return processRevalidation(body)
      }
    }

    const rawBody = await req.json().catch(() => null)
    return processRevalidation(rawBody)
  } catch (err: unknown) {
    console.error('Sanity webhook revalidation error:', err)
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : 'Unknown revalidation error',
      },
      { status: 500 }
    )
  }
}

// Handler GET untuk pengujian revalidasi manual pengurus/developer via URL
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  const path = searchParams.get('path') || '/'
  const tag = searchParams.get('tag')
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json(
      { success: false, message: 'Invalid secret parameter' },
      { status: 401 }
    )
  }

  if (tag) {
    revalidateTag(tag, 'max')
  }
  revalidatePath(path)

  return NextResponse.json({
    success: true,
    message: `Manual revalidation triggered for path: ${path}${tag ? ` and tag: ${tag}` : ''}`,
    timestamp: new Date().toISOString(),
  })
}

