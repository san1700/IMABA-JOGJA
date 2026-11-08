import * as React from 'react'
import { Suspense } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Suspense fallback={<div className="h-20 w-full bg-[#050A2E]" />}>
        <Navbar />
      </Suspense>
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  )
}

