import React, { HTMLProps } from 'react'

interface InputAreaProps {
  name: string;
  label?: string;
  info?: string;
  className?: string;
}

export default function InputArea({ name, label, info, className, ...props }: InputAreaProps & HTMLProps<HTMLInputElement>){
  return (
    <div>
      <label className={`${className ?? ''}`}>{label}</label>
      <textarea name={name}></textarea>
      <label className='info'>{info}</label>
    </div>
  )
}