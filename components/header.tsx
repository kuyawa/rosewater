'use client'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/app/page.module.css'

export default function Header() {
  return (
    <header>
      <Link href='/'>
        <Image src="/media/logo.png" alt="logo" width={400} height={100} />
      </Link>
    </header>
  )
}