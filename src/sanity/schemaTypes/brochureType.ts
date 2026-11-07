import {DownloadIcon} from '@sanity/icons/Download'
import {defineField, defineType} from 'sanity'

export const brochureType = defineType({
  name: 'brochure',
  title: 'Brosur & Dokumen Panduan',
  type: 'document',
  icon: DownloadIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Brosur / Dokumen',
      type: 'string',
      description: 'Contoh: Brosur PMB UGM 2026, Panduan Bimtren IMABA Jogja 2026, Buku Saku Maba Madura',
      validation: (rule) => rule.required().error('Judul brosur wajib diisi'),
    }),
    defineField({
      name: 'category',
      title: 'Kategori Dokumen',
      type: 'string',
      options: {
        list: [
          {title: 'Brosur PMB / Jalur Masuk Kampus', value: 'campus'},
          {title: 'Bimtren (Bimbingan Masuk Pesantren & Kampus)', value: 'bimtren'},
          {title: 'Panduan Beasiswa & Tips Kuliah', value: 'scholarship'},
          {title: 'Dokumen / AD-ART Organisasi', value: 'organization'},
        ],
      },
      initialValue: 'campus',
      validation: (rule) => rule.required().error('Kategori dokumen wajib dipilih'),
    }),
    defineField({
      name: 'campus',
      title: 'Kampus Terkait (Opsional)',
      type: 'reference',
      to: [{type: 'campus'}],
      description: 'Isi jika dokumen ini khusus untuk kampus tertentu',
    }),
    defineField({
      name: 'year',
      title: 'Tahun / Angkatan',
      type: 'string',
      initialValue: () => new Date().getFullYear().toString(),
      description: 'Contoh: 2026',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Gambar Sampul / Preview',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Sampul brosur untuk tampilan kartu di website',
    }),
    defineField({
      name: 'file',
      title: 'File Dokumen (PDF)',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx,.zip',
      },
      description: 'Unggah file dokumen langsung ke Sanity',
    }),
    defineField({
      name: 'externalLink',
      title: 'Tautan Unduhan Luar (Opsional)',
      type: 'url',
      description: 'Alternatif jika file berada di Google Drive / Cloud Storage lain',
    }),
    defineField({
      name: 'description',
      title: 'Keterangan Singkat',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      year: 'year',
      media: 'thumbnail',
    },
    prepare({title, category, year, media}) {
      const categoryLabels: Record<string, string> = {
        campus: 'Brosur Kampus',
        bimtren: 'Bimtren IMABA',
        scholarship: 'Panduan Beasiswa',
        organization: 'Dokumen Organisasi',
      }
      return {
        title: title || 'Brosur',
        subtitle: `${categoryLabels[category] || category} • ${year || ''}`,
        media,
      }
    },
  },
})

