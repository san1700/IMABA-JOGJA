import {StarIcon} from '@sanity/icons/Star'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const scholarshipType = defineType({
  name: 'scholarship',
  title: 'Informasi Beasiswa',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Beasiswa',
      type: 'string',
      description: 'Contoh: Beasiswa KIP Kuliah 2026, Beasiswa Santri Berprestasi Kemenag, Beasiswa BAZNAS',
      validation: (rule) => rule.required().error('Nama beasiswa wajib diisi'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug beasiswa wajib dibuat'),
    }),
    defineField({
      name: 'provider',
      title: 'Penyelenggara / Lembaga',
      type: 'string',
      description: 'Contoh: Kemendikbudristek, Kementerian Agama RI, Pemerintah Daerah, Djarum Foundation',
      validation: (rule) => rule.required().error('Penyelenggara beasiswa wajib diisi'),
    }),
    defineField({
      name: 'coverageType',
      title: 'Tipe Cakupan Beasiswa',
      type: 'string',
      options: {
        list: [
          {title: 'Penuh (Full Funded: Biaya Kuliah + Uang Saku)', value: 'full'},
          {title: 'Bantuan Biaya Pendidikan / UKT Saja', value: 'tuition'},
          {title: 'Uang Saku / Biaya Hidup Saja', value: 'allowance'},
          {title: 'Parsial / Bantuan Sebagian', value: 'partial'},
        ],
      },
      initialValue: 'full',
    }),
    defineField({
      name: 'targetAudience',
      title: 'Sasaran Penerima',
      type: 'string',
      description: 'Contoh: Calon Mahasiswa Baru (Maba), Mahasiswa Aktif Semester 3-7, Khusus Santri/Alumni Pesantren',
    }),
    defineField({
      name: 'deadline',
      title: 'Batas Akhir Pendaftaran (Deadline)',
      type: 'date',
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
    }),
    defineField({
      name: 'poster',
      title: 'Poster / Banner Beasiswa',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Tautan Pendaftaran Resmi',
      type: 'url',
      description: 'Link pendaftaran online atau informasi resmi',
    }),
    defineField({
      name: 'requirements',
      title: 'Persyaratan Utama',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Daftar syarat pokok (misal: IPK minimal 3.00, Surat Rekomendasi, KTP Madura, dll.)',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi & Informasi Lengkap',
      type: 'blockContent',
    }),
    defineField({
      name: 'isActive',
      title: 'Status Pendaftaran Masih Dibuka',
      type: 'boolean',
      initialValue: true,
      description: 'Centang jika pendaftaran beasiswa saat ini masih aktif / dibuka',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      provider: 'provider',
      deadline: 'deadline',
      media: 'poster',
      isActive: 'isActive',
    },
    prepare({title, provider, deadline, media, isActive}) {
      const statusText = isActive ? '🟢 Buka' : '🔴 Tutup'
      const deadlineText = deadline ? `(Deadline: ${deadline})` : ''
      return {
        title: title || 'Beasiswa',
        subtitle: `${statusText} • ${provider || ''} ${deadlineText}`.trim(),
        media,
      }
    },
  },
})

