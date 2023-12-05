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
    <main>
      <Header />
        <div className={styles.page + ' ' + className||''}>
          {children}
        </div>
      <Footer />
    </main>
  )
}

export default Page