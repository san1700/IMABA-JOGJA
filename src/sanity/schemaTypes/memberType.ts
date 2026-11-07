import {UsersIcon} from '@sanity/icons/Users'
import {defineField, defineType} from 'sanity'

export const memberType = defineType({
  name: 'member',
  title: 'Pengurus DPW & Anggota',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Lengkap',
      type: 'string',
      validation: (rule) => rule.required().error('Nama pengurus wajib diisi'),
    }),
    defineField({
      name: 'position',
      title: 'Jabatan / Posisi',
      type: 'string',
      description: 'Contoh: Ketua Umum, Sekretaris Umum, Bendahara Umum, Koordinator Divisi Kaderisasi',
      validation: (rule) => rule.required().error('Jabatan wajib diisi'),
    }),
    defineField({
      name: 'division',
      title: 'Departemen / Divisi',
      type: 'string',
      options: {
        list: [
          {title: 'Badan Pengurus Harian (BPH)', value: 'bph'},
          {title: 'Divisi Kaderisasi & Pengembangan SDM', value: 'kaderisasi'},
          {title: 'Divisi Keorganisasian & Advokasi', value: 'organisasi'},
          {title: 'Divisi Pendidikan & Keagamaan', value: 'pendidikan'},
          {title: 'Divisi Minat, Bakat, & Olahraga', value: 'minat-bakat'},
          {title: 'Divisi Kewirausahaan & Ekonomi Kreatif', value: 'ekonomi'},
          {title: 'Divisi Humas & Media Komunikasi (Infokom)', value: 'humas-infokom'},
          {title: 'Divisi Puteri Imaba', value: 'puteri-imaba'},
          {title: 'Dewan Pembina / Penasihat Organisasi', value: 'penasihat'},
        ],
      },
      initialValue: 'bph',
      validation: (rule) => rule.required().error('Divisi wajib dipilih'),
    }),
    defineField({
      name: 'period',
      title: 'Periode Kepengurusan',
      type: 'string',
      description: 'Contoh: 2025/2026',
      initialValue: '2025/2026',
      validation: (rule) => rule.required().error('Periode kepengurusan wajib diisi'),
    }),
    defineField({
      name: 'photo',
      title: 'Foto Pengurus',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'campus',
      title: 'Asal Kampus / Fakultas',
      type: 'reference',
      to: [{type: 'campus'}],
      description: 'Pilih kampus di Jogja tempat menempuh studi',
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampilan Struktur',
      type: 'number',
      initialValue: 10,
      description: 'Angka lebih kecil tampil lebih dulu (misal: Ketum = 1, Sekum = 2, Bendum = 3)',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Tautan Media Sosial',
      type: 'object',
      fields: [
        defineField({name: 'instagram', title: 'Username Instagram (tanpa @)', type: 'string'}),
        defineField({name: 'linkedin', title: 'Tautan Profil LinkedIn', type: 'url'}),
        defineField({name: 'email', title: 'Alamat Email', type: 'string'}),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      position: 'position',
      period: 'period',
      media: 'photo',
    },
    prepare({title, position, period, media}) {
      return {
        title: title || 'Pengurus',
        subtitle: `${position || ''} • Periode ${period || ''}`,
        media,
      }
    },
  },
})

