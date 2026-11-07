import {HomeIcon} from '@sanity/icons/Home'
import {defineField, defineType} from 'sanity'

export const campusType = defineType({
  name: 'campus',
  title: 'Kampus / Perguruan Tinggi',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Perguruan Tinggi',
      type: 'string',
      description: 'Contoh: Universitas Gadjah Mada, UIN Sunan Kalijaga Yogyakarta',
      validation: (rule) => rule.required().error('Nama kampus wajib diisi'),
    }),
    defineField({
      name: 'shortName',
      title: 'Nama Singkatan / Akronim',
      type: 'string',
      description: 'Contoh: UGM, UIN Suka, UNY, UII, UMY',
      validation: (rule) => rule.required().error('Singkatan kampus wajib diisi'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'shortName',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug wajib dibuat'),
    }),
    defineField({
      name: 'type',
      title: 'Kategori Kampus',
      type: 'string',
      options: {
        list: [
          {title: 'PTN (Perguruan Tinggi Negeri)', value: 'ptn'},
          {title: 'PTKIN (PT Keagamaan Islam Negeri)', value: 'ptkin'},
          {title: 'PTS (Perguruan Tinggi Swasta)', value: 'pts'},
          {title: 'Kedinasan / Politeknik Negeri', value: 'kedinasan'},
        ],
      },
      initialValue: 'ptn',
      validation: (rule) => rule.required().error('Kategori kampus wajib dipilih'),
    }),
    defineField({
      name: 'logo',
      title: 'Logo Kampus',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Foto / Banner Kampus',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'address',
      title: 'Alamat Kampus',
      type: 'string',
      description: 'Contoh: Sleman, DI Yogyakarta',
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Situs Web Resmi',
      type: 'url',
    }),
    defineField({
      name: 'admissionUrl',
      title: 'Portal Penerimaan Mahasiswa Baru (PMB)',
      type: 'url',
      description: 'Tautan resmi pendaftaran maba / jalur masuk',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 3,
      description: 'Gambaran umum kampus untuk calon mahasiswa baru dari Madura.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      media: 'logo',
    },
    prepare({title, subtitle, media}) {
      const typeLabels: Record<string, string> = {
        ptn: 'PTN',
        ptkin: 'PTKIN',
        pts: 'PTS',
        kedinasan: 'Kedinasan',
      }
      return {
        title: title || 'Kampus',
        subtitle: subtitle ? `Kategori: ${typeLabels[subtitle] || subtitle}` : undefined,
        media,
      }
    },
  },
})

