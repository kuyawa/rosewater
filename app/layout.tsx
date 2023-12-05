import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
//import { Poppins } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import './globals.css'

const font = Inter({ subsets: ['latin'] })
//const font = Poppins({ subsets: ['latin'], display:'swap', weight: '400', style: ['normal', 'italic'] })

export const metadata: Metadata = {
  title: 'Rosewater',
  description: 'Make dreams come true',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
      </body>
    </html>
  )
}
