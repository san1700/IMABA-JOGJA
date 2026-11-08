/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { connection } from 'next/server'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const metadata: Metadata = {
  title: 'Sanity Studio — IMABA Jogja',
  robots: {
    index: false,
    follow: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export function generateStaticParams() {
  return [{ tool: [] }]
}

async function StudioDynamicMarker() {
  await connection()
  return null
}

export default function StudioPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center bg-[#050A2E] text-white">
          <p className="animate-pulse text-sm">Memuat Studio IMABA...</p>
        </div>
      }
    >
      <StudioDynamicMarker />
      <NextStudio config={config} />
    </Suspense>
  )
}
