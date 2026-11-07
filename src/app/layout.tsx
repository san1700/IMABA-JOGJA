import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Inter, Newsreader } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
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

export const metadata: Metadata = {
  title: {
    default: 'IMABA Yogyakarta | Ikatan Mahasiswa Bata-Bata',
    template: '%s | IMABA Yogyakarta',
  },
  description:
    'Portal resmi Ikatan Mahasiswa Bata-Bata (IMABA) Daerah Istimewa Yogyakarta. Wadah silaturahmi, pengkaderan intelektual, informasi kampus, beasiswa, dan publikasi karya santri di Yogyakarta.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#EEF1F9' },
    { media: '(prefers-color-scheme: dark)', color: '#050A2E' },
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
