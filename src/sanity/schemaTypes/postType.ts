import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Artikel & Berita',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Artikel',
      type: 'string',
      validation: (rule) => rule.required().error('Judul artikel wajib diisi'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug URL wajib dibuat'),
    }),
    defineField({
      name: 'section',
      title: 'Kanal / Bagian',
      type: 'string',
      description: 'Pilih kanal utama tempat artikel ini akan ditampilkan di website',
      options: {
        list: [
          {title: 'Berita & Agenda DPW', value: 'berita'},
          {title: 'Karya Kader (Opini, Esai, Puisi, Cerpen, Memoar)', value: 'karya'},
          {title: 'Informasi Kampus & Pendidikan', value: 'info'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().error('Kanal wajib dipilih'),
      initialValue: 'berita',
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Kategori spesifik (misal: Opini, Cerpen, Agenda, Info Beasiswa)',
    }),
    defineField({
      name: 'author',
      title: 'Penulis / Kontributor',
      type: 'reference',
      to: [{type: 'author'}],
    }),
    defineField({
      name: 'cover',
      title: 'Gambar Utama (Cover)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Teks Alternatif (Deskripsi Gambar untuk Aksesibilitas & SEO)',
          validation: (rule) => rule.required().warning('Disarankan mengisi teks alternatif untuk SEO'),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Keterangan Gambar / Sumber',
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan Singkat (Excerpt)',
      type: 'text',
      rows: 3,
      description: 'Ringkasan artikel untuk preview di kartu beranda dan meta description SEO (maks. 160 karakter disarankan).',
      validation: (rule) => rule.max(250).warning('Sebaiknya ringkasan tidak lebih dari 250 karakter'),
    }),
    defineField({
      name: 'body',
      title: 'Isi Konten Artikel',
      type: 'blockContent',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Publikasi',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required().error('Tanggal publikasi wajib diisi'),
    }),
    defineField({
      name: 'featured',
      title: 'Artikel Pilihan / Utama (Featured)',
      type: 'boolean',
      description: 'Aktifkan jika artikel ini ingin dijadikan sorotan utama di halaman depan',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      section: 'section',
      media: 'cover',
    },
    prepare({title, author, section, media}) {
      const sectionLabels: Record<string, string> = {
        berita: 'Berita',
        karya: 'Karya Kader',
        info: 'Info Kampus',
      }
      const sectionName = (section && sectionLabels[section]) || 'Artikel'
      const authorName = author ? `oleh ${author}` : 'Anonim'
      return {
        title: title || 'Tanpa Judul',
        subtitle: `[${sectionName}] ${authorName}`,
        media,
      }
    },
  },
})
