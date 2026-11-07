import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Inter, Newsreader } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { JsonLd } from '@/components/json-ld'
import { cn } from '@/lib/utils'

const fontSans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const fontHeading = Plus_Jakarta_Sans({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
})

const fontArticle = Newsreader({
  variable: '--font-article',
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://imabayogyakarta.org'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'IMABA Yogyakarta | Ikatan Mahasiswa Bata-Bata',
    template: '%s | IMABA Yogyakarta',
  },
  description:
    'Portal resmi Ikatan Mahasiswa Bata-Bata (IMABA) Daerah Istimewa Yogyakarta. Wadah silaturahmi, pengkaderan intelektual, informasi kampus, beasiswa, dan publikasi karya santri di Yogyakarta.',
  keywords: [
    'IMABA',
    'IMABA Jogja',
    'IMABA Yogyakarta',
    'Ikatan Mahasiswa Bata-Bata',
    'Pondok Pesantren Mambaul Ulum Bata-Bata',
    'Bata-Bata Pamekasan',
    'Bimtren Jogja',
    'Santri Jogja',
    'Beasiswa Santri',
    'Kuliah di Jogja',
  ],
  authors: [{ name: 'DPW IMABA Daerah Istimewa Yogyakarta', url: siteUrl }],
  creator: 'DPW IMABA Daerah Istimewa Yogyakarta',
  publisher: 'Ikatan Mahasiswa Bata-Bata (IMABA) DIY',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    siteName: 'IMABA Yogyakarta',
    title: 'IMABA Yogyakarta | Ikatan Mahasiswa Bata-Bata',
    description:
      'Portal resmi Ikatan Mahasiswa Bata-Bata (IMABA) Daerah Istimewa Yogyakarta. Wadah silaturahmi, pengkaderan intelektual, informasi kampus, beasiswa, dan publikasi karya santri di Yogyakarta.',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'Logo IMABA Yogyakarta',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IMABA Yogyakarta | Ikatan Mahasiswa Bata-Bata',
    description:
      'Portal resmi Ikatan Mahasiswa Bata-Bata (IMABA) Daerah Istimewa Yogyakarta.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#EEF1F9' },
    { media: '(prefers-color-scheme: dark)', color: '#050A2E' },
  ],
}

// Skema JSON-LD Organisasi & Website IMABA Jogja
const ROOT_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Ikatan Mahasiswa Bata-Bata (IMABA) Daerah Istimewa Yogyakarta',
      alternateName: ['IMABA Jogja', 'IMABA DIY', 'IMABA Bata-Bata Yogyakarta'],
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
        caption: 'Logo IMABA Yogyakarta',
      },
      description:
        'Organisasi perhimpunan santri dan alumni Pondok Pesantren Mambaul Ulum Bata-Bata Pamekasan yang menempuh pendidikan di perguruan tinggi Daerah Istimewa Yogyakarta.',
      sameAs: [
        'https://instagram.com/imabajogja',
        'https://youtube.com/@imabajogja',
        'https://instagram.com/puteriimabayogyakarta',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sleman',
        addressRegion: 'Daerah Istimewa Yogyakarta',
        addressCountry: 'ID',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'IMABA Yogyakarta',
      description:
        'Portal resmi Ikatan Mahasiswa Bata-Bata (IMABA) Daerah Istimewa Yogyakarta.',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      inLanguage: 'id-ID',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        'h-full antialiased',
        fontSans.variable,
        fontHeading.variable,
        fontArticle.variable,
      )}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-[#1E2FB8] selection:text-white">
        <JsonLd data={ROOT_JSON_LD} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
