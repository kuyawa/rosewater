"use client"
import { useState, useEffect } from 'react'
//import * as db from '@/utils/db'
import Page from '@/components/page'
import ViewArea from '@/components/view-area'
import ViewText from '@/components/view-text'
import ButtonFund from '@/components/button-fund'
import money from '@/utils/money'
import styles from '@/app/page.module.css'
import common from '@/app/common.module.css'

export default function View(props:any) {
  const id = props?.params?.id || '0'
  console.log('PROPS', id)
  const noImage = '/media/noimage.png'
  const [imageSource, setImageSource] = useState(noImage)
  //const [message, setMessage] = useState('Donate')
  const [dream, setDream] = useState({name:'Dream', descrip:'Loading...', goal:'0', country:'N/A'})
  const [user, setUser] = useState({name:'Anonymous'})
  const [percent, setPercent] = useState(0)
  const [since, setSince] = useState('Jan 2000')

  async function getDream(id:string){
    const res1  = await fetch('/api/dream?id='+id) || {}
    const dream = await res1.json() || {name:'Dream', descrip:'Not found', goal:'0', country:'N/A', image:''}
    console.log('DREAM', dream)
    const res2  = await fetch('/api/users?address='+dream?.owner) || {}
    const user  = await res2.json() || {name:'Anonymous'}
    console.log('OWNER', dream?.owner)
    const image = dream?.image ? '/api/image?url='+dream?.image : noImage
    const pct = Math.round((dream?.funds ?? 0) / (dream?.goal ?? 1) * 100)
    const date = new Date(dream?.created)
    console.log('PCT', pct)
    setSince(date.toLocaleDateString("en-US", { month: 'long', year: 'numeric'}))
    setPercent(pct)
    setImageSource(image)
    setDream(dream)
    setUser(user)
  }

  useEffect(() => {
    getDream(id)
  }, [])


  return (
    <Page>
      <div className={common.view}>
        <img src={imageSource} alt="Dream Image" width={650} height={425} />
        <div className={common.hbar}>
          <span>by {user.name} </span>
          <span>Country {dream.country} </span>
        </div>
        <h1 className={styles.title}>{dream.name}</h1>
        <ViewArea label="Description" value={dream.descrip}/>
        <div className={common.cbar}>
          <ViewText label="Funding goal in USD" value={money(dream.goal)}/>
          <progress value={percent} max="100" />
          <div className={styles.fund}>{percent}% funded - since {since}</div>
          <br/>
          <ButtonFund cause="0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e" />
        </div>
      </div>

    </Page>
  )
}
