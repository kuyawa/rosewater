import { ReactNode } from 'react';
import Header from '@/components/header'
import Footer from '@/components/footer'
import '@/app/globals.css'
import styles from '@/app/page.module.css'

interface PageProps {
  className?: string;
  children?: ReactNode;
}

const Page = ({ className, children }: PageProps) => {
  return (
    <div>
      <div className={styles.wrap}>
        <Header />
      </div>
      <div className={styles.page}>
        {children}
      </div>
      <div className={styles.page}>
        <Footer />
      </div>
    </div>
  )
}

export default Page