import { client } from './client'
import type { QueryParams } from 'next-sanity'

export async function sanityFetch<T>({
  query,
  params = {},
  fallback,
}: {
  query: string
  params?: QueryParams
  fallback: T
}): Promise<T> {
  try {
    // Jalankan fetch query dari Sanity
    const data = await client.fetch<T>(query, params)
    return data !== undefined && data !== null ? data : fallback
  } catch (error) {
    // Menghindari kegagalan render jika CMS belum diisi atau koneksi offline
    if (process.env.NODE_ENV === 'development') {
      console.warn('[sanityFetch] Gagal memuat data dari Sanity:', error)
    }
    return fallback
  }
}
