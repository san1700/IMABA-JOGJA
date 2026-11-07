'use client'

/**
 * Konfigurasi Sanity Studio yang dipasang pada rute Next.js App Router:
 * `/app/studio/[[...tool]]/page.tsx`
 *
 * Catatan Arsitektur:
 * Proyek ini memakai Next.js 16 dengan cacheComponents aktif.
 * Tidak menggunakan route segment config seperti `export const dynamic = 'force-dynamic'`.
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  title: 'IMABA Yogyakarta Studio',
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
    // Vision Tool untuk mengeksekusi query GROQ langsung dari Studio
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
