import { ReactNode } from 'react';
import styles from '@/app/page.module.css'

interface PageProps {
  className?: string;
  children?: ReactNode;
}

const Page = ({ className, children }: PageProps) => {
  return (
    <div className={styles.page + ' ' + className||''}>
      {children}
    </div>
  )
}

export default Page