import {TagIcon} from '@sanity/icons/Tag'
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Kategori',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Kategori',
      type: 'string',
      description: 'Contoh: Opini, Esai, Cerpen, Puisi, Agenda DPW, Beasiswa',
      validation: (rule) => rule.required().error('Nama kategori wajib diisi'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug wajib dibuat'),
    }),
    defineField({
      name: 'section',
      title: 'Kanal Terkait',
      type: 'string',
      description: 'Hubungkan kategori ini dengan kanal utama',
      options: {
        list: [
          {title: 'Berita & Agenda', value: 'berita'},
          {title: 'Karya Kader', value: 'karya'},
          {title: 'Informasi Kampus', value: 'info'},
          {title: 'Umum / Semua Kanal', value: 'general'},
        ],
      },
      initialValue: 'general',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Kategori',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      section: 'section',
    },
    prepare({title, section}) {
      const sectionLabels: Record<string, string> = {
        berita: 'Berita',
        karya: 'Karya Kader',
        info: 'Info Kampus',
        general: 'Umum',
      }
      return {
        title: title || 'Kategori',
        subtitle: section ? `Kanal: ${sectionLabels[section] || section}` : undefined,
      }
    },
  },
})
