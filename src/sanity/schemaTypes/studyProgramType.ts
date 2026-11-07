import {BookIcon} from '@sanity/icons/Book'
import {defineField, defineType} from 'sanity'

export const studyProgramType = defineType({
  name: 'studyProgram',
  title: 'Program Studi',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Program Studi',
      type: 'string',
      description: 'Contoh: Ilmu Komunikasi, Teknik Informatika, Manajemen, Hukum Islam',
      validation: (rule) => rule.required().error('Nama program studi wajib diisi'),
    }),
    defineField({
      name: 'degree',
      title: 'Jenjang Pendidikan',
      type: 'string',
      options: {
        list: [
          {title: 'D3 (Diploma 3)', value: 'D3'},
          {title: 'D4 / Sarjana Terapan', value: 'D4'},
          {title: 'S1 (Sarjana)', value: 'S1'},
          {title: 'S2 (Magister)', value: 'S2'},
          {title: 'S3 (Doktor)', value: 'S3'},
        ],
      },
      initialValue: 'S1',
      validation: (rule) => rule.required().error('Jenjang pendidikan wajib dipilih'),
    }),
    defineField({
      name: 'campus',
      title: 'Perguruan Tinggi',
      type: 'reference',
      to: [{type: 'campus'}],
      validation: (rule) => rule.required().error('Kampus wajib dipilih'),
    }),
    defineField({
      name: 'faculty',
      title: 'Fakultas',
      type: 'string',
      description: 'Contoh: Fakultas Ilmu Sosial dan Humaniora, Fakultas Teknik',
    }),
    defineField({
      name: 'accreditation',
      title: 'Akreditasi BAN-PT / LAM',
      type: 'string',
      options: {
        list: [
          {title: 'Unggul', value: 'Unggul'},
          {title: 'A', value: 'A'},
          {title: 'Baik Sekali', value: 'Baik Sekali'},
          {title: 'Baik', value: 'Baik'},
          {title: 'B', value: 'B'},
          {title: 'C', value: 'C'},
          {title: 'Internasional', value: 'Internasional'},
        ],
      },
    }),
    defineField({
      name: 'careerProspects',
      title: 'Prospek Karir & Keterangan',
      type: 'text',
      rows: 3,
      description: 'Peluang kerja atau fokus studi untuk referensi calon mahasiswa.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      degree: 'degree',
      campusName: 'campus.shortName',
      campusFull: 'campus.name',
    },
    prepare({title, degree, campusName, campusFull}) {
      const campus = campusName || campusFull || 'Tanpa Kampus'
      return {
        title: title || 'Program Studi',
        subtitle: `${degree || 'S1'} • ${campus}`,
      }
    },
  },
})

