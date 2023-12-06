'use client'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/app/page.module.css'

export default function Footer() {
  return (
    <footer>
      <div className={styles.footLogo}>
        <p><Image src="/media/logo.svg" alt="Logo" width={200} height={50} /></p>
        <p><b>Copyright 2023 Rosewater by CFCE</b></p>
        <p><Link href="https://cfce.io">Center for Collaborative Economics</Link></p>
      </div>
      <div className={styles.footInfo}>
        <p>Rosewater is developed on XRPL-EVM Sidechain</p>
        <p>You will need Metamask or any EVM compatible wallet and have some funds to interact with the app</p>
        <p>Download Metamask at <Link href="https://metamask.io">https://metamask.io</Link></p>
      </div>
      <div className={styles.footHelp}>
        <p>Need help? Find us on X / Twitter</p>
        <p><Link href="https://x.com/c4collabecon">X.com/c4collabecon</Link></p>
      </div>
    </footer>
  )
}