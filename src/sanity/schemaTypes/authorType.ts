import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Penulis & Kontributor',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Lengkap',
      type: 'string',
      validation: (rule) => rule.required().error('Nama penulis wajib diisi'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug penulis wajib dibuat'),
    }),
    defineField({
      name: 'role',
      title: 'Status / Peran',
      type: 'string',
      description: 'Contoh: Kader IMABA, Pengurus DPW, Demisioner, Penulis Tamu',
      initialValue: 'Kader IMABA',
    }),
    defineField({
      name: 'avatar',
      title: 'Foto Penulis',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'campus',
      title: 'Asal Kampus / Instansi',
      type: 'string',
      description: 'Contoh: UIN Sunan Kalijaga, UGM, UNY, dll.',
    }),
    defineField({
      name: 'bio',
      title: 'Biografi Singkat',
      type: 'text',
      rows: 3,
      description: 'Profil singkat penulis yang akan ditampilkan di akhir artikel.',
    }),
    defineField({
      name: 'instagram',
      title: 'Akun Instagram (Opsional)',
      type: 'string',
      description: 'Username Instagram tanpa @ (misal: imabayogyakarta)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'avatar',
    },
  },
})
