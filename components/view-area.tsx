import React, { HTMLProps } from 'react'
import styles from '@/app/common.module.css'

interface ViewAreaProps {
  label?: string;
  value?: string;
}

export default function ViewArea({ label, value, ...props }: ViewAreaProps & HTMLProps<HTMLLabelElement>){
  return (
    <div>
      <label className={styles.areaLabel}>{label}</label>
      <label className={styles.areaValue}>{value}</label>
    </div>
  )
}