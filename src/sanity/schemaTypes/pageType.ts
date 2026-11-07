import {DocumentIcon} from '@sanity/icons/Document'
import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Halaman Statis',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Halaman',
      type: 'string',
      description: 'Contoh: Sejarah & Filosofi IMABA, AD / ART, Puteri Imaba',
      validation: (rule) => rule.required().error('Judul halaman wajib diisi'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug halaman wajib dibuat'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subjudul / Tagline Halaman',
      type: 'string',
      description: 'Kalimat pengantar di bagian atas halaman (hero banner)',
    }),
    defineField({
      name: 'heroImage',
      title: 'Gambar Utama (Hero Banner)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Teks Alternatif Gambar',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Isi Konten Halaman',
      type: 'blockContent',
      description: 'Format konten teks lengkap, termasuk subjudul, kutipan, dan gambar pendukung.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      media: 'heroImage',
    },
    prepare({title, slug, media}) {
      return {
        title: title || 'Halaman',
        subtitle: slug ? `/${slug}` : 'Belum ada slug',
        media,
      }
    },
  },
})

