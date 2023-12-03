import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rosewater',
  description: 'Help dreams come true',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Header />
            {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
