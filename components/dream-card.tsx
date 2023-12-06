'use client'
import Link from 'next/link'
import Image from 'next/image'
import ButtonFund from '@/components/button-fund'
import money from '@/utils/money'
import styles from '@/app/page.module.css'

type Dictionary = { [key:string]:any }

export default function DreamCard(info:Dictionary) {
  //console.log('DREAM', info)
  const dream = info.data
  const url = '/view/'+dream.id
  //const image = dream?.image ? '/api/image?url='+dream.image : '/media/noimage.png'
  const image = dream?.image ?? '/media/noimage.png'
  const percent = dream?.funds / dream?.goal * 100
  const funded = Math.ceil(percent)
  const since = new Date(dream?.created).toLocaleDateString("en-US", { month: 'short', year: 'numeric'})

  return (
    <div className={styles.card}>
      <a href={url}><Image src={image} alt="image" width={250} height={220} /></a>
      <h1>{dream?.name}</h1>
      <p>{dream?.descrip}</p>
      <div className={styles.goal}>Dream goal {money(dream?.goal)}</div>
      <progress value={percent} max="100" />
      <div className={styles.fund}>{funded}% funded since {since}</div>
      <ButtonFund cause={dream?.contract} />
    </div>
  )
}