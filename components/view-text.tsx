import React, { HTMLProps } from 'react'
import styles from '@/app/common.module.css'

interface ViewTextProps {
  label?: string;
  value?: string;
}

export default function ViewText({ label, value, ...props }: ViewTextProps & HTMLProps<HTMLLabelElement>){
  return (
    <div>
      <label className={styles.textLabel}>{label}</label>
      <label className={styles.textValue}>{value}</label>
    </div>
  )
}