'use client'
import Link from 'next/link'
import styles from '@/app/page.module.css'

export default function Header() {
  return (
    <header>
      <Link href='/'><span className={styles.appname}>Rosewater</span></Link>
      <h2>Making dreams come true</h2>
    </header>
  )
}