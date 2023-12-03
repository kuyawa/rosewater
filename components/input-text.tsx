import React, { HTMLProps } from 'react'

interface InputTextProps {
  label?: string;
  info?: string;
  value?: string;
  className?: string;
}

export default function InputText({ label, info, value, className, ...props }: InputTextProps & HTMLProps<HTMLInputElement>){
  return (
    <div>
      <label className={`${className ?? ''}`}>{label}</label>
      <input {...props} value={value} />
      <label className='info'>{info}</label>
    </div>
  )
}