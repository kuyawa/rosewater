import { ReactNode } from 'react';
import Header from '@/components/header'
import Footer from '@/components/footer'
import '@/app/globals.css'
import styles from '@/app/page.module.css'

interface IndexProps {
  className?: string;
  children?: ReactNode;
}

const Index = ({ className, children }: IndexProps) => {
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

export default Index