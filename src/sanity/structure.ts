import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Konten IMABA Yogyakarta')
    .items([
      // Bagian 1: Publikasi & Literasi
      S.listItem()
        .title('Publikasi & Literasi')
        .child(
          S.list()
            .title('Publikasi & Literasi')
            .items([
              S.documentTypeListItem('post').title('Semua Artikel & Berita'),
              S.documentTypeListItem('category').title('Kategori'),
              S.documentTypeListItem('author').title('Penulis / Kontributor'),
            ]),
        ),

      // Shortcut langsung ke Artikel
      S.documentTypeListItem('post').title('Artikel & Berita'),

      S.divider(),

      // Bagian 2: Informasi Kampus & Pendidikan
      S.listItem()
        .title('Informasi Kampus & Pendidikan')
        .child(
          S.list()
            .title('Informasi Kampus & Pendidikan')
            .items([
              S.documentTypeListItem('campus').title('Perguruan Tinggi'),
              S.documentTypeListItem('studyProgram').title('Program Studi'),
              S.documentTypeListItem('scholarship').title('Informasi Beasiswa'),
              S.documentTypeListItem('brochure').title('Brosur & Dokumen Panduan'),
            ]),
        ),

      S.documentTypeListItem('campus').title('Daftar Kampus'),
      S.documentTypeListItem('scholarship').title('Beasiswa'),
      S.documentTypeListItem('brochure').title('Brosur & Dokumen'),

      S.divider(),

      // Bagian 3: Profil & Keorganisasian
      S.listItem()
        .title('Profil & Keorganisasian')
        .child(
          S.list()
            .title('Profil & Keorganisasian')
            .items([
              S.documentTypeListItem('page').title('Halaman Statis (Profil, Puteri Imaba, dll.)'),
              S.documentTypeListItem('member').title('Struktur Pengurus DPW'),
            ]),
        ),

      S.documentTypeListItem('page').title('Halaman Statis'),
      S.documentTypeListItem('member').title('Pengurus DPW'),

      S.divider(),

      // Dokumen lainnya jika ada
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            'post',
            'category',
            'author',
            'campus',
            'studyProgram',
            'scholarship',
            'brochure',
            'page',
            'member',
          ].includes(item.getId()!),
      ),
    ])
