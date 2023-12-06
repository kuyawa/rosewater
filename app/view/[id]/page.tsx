"use client"
import { useState, useEffect } from 'react'
import ReactDOM from "react-dom"
import QRCode from "react-qr-code"
import Link from 'next/link'
import Image from 'next/image'
import Page from '@/components/page'
import ViewArea from '@/components/view-area'
import ViewText from '@/components/view-text'
import ButtonFund from '@/components/button-fund'
import Donations from '@/components/donations'
import * as db from '@/utils/dbclient'
import money from '@/utils/money'
import styles from '@/app/page.module.css'
import common from '@/app/common.module.css'

export default function View(props:any) {
  const id = props?.params?.id || '0'
  console.log('PROPS', id)
  const noImage = '/media/noimage.png'
  const [imageSource, setImageSource] = useState(noImage)
  //const [message, setMessage] = useState('Donate')
  const [dream, setDream] = useState({name:'Dream', descrip:'Loading...', contract:'0x0', goal:'0', country:'N/A'})
  const [user, setUser] = useState({name:'Anonymous'})
  const [donations, setDonations] = useState([{id:0, created:'', donor:'No records found', usdval:0}])
  const [percent, setPercent] = useState(0)
  const [since, setSince] = useState('Jan 2000')

  async function getDream(id:string){
    //const res1  = await fetch('/api/dreams?id='+id) || {}
    //const dream = await res1.json() || {name:'Dream', descrip:'Not found', goal:'0', country:'N/A', image:''}
    const dream = await db.getDreamById(id)
    //console.log('DREAM', dream)
    //const res2  = await fetch('/api/users?address='+dream?.owner) || {}
    //const user  = await res2.json() || {name:'Anonymous'}
    const user = await db.getUserByAddress(dream?.owner)
    //console.log('OWNER', dream?.owner)
    //console.log('USER', user)
    const donors = await db.getDonationsByDream(id)
    //console.log('DONORS', donors)
    //const image = dream?.image ? '/api/image?url='+dream?.image : noImage
    const image = dream?.image ?? noImage
    const pct = Math.round((dream?.funds ?? 0) / (dream?.goal ?? 1) * 100)
    const date = new Date(dream?.created)
    //console.log('PCT', pct)
    setSince(date.toLocaleDateString("en-US", { month: 'long', year: 'numeric'}))
    setPercent(pct)
    setImageSource(image)
    setDream(dream)
    setUser(user)
    setDonations(donors)
  }

  useEffect(() => {
    getDream(id)
  }, [id])


  return (
    <Page>
      <div className={common.view}>
        <Image src={imageSource} alt="Dream Image" width={650} height={425} />
        <div className={common.hbar}>
          <span>by {user.name} </span>
          <span>Country {dream.country} </span>
        </div>
        <h1 className={styles.title}>{dream.name}</h1>
        <ViewArea label="Description" value={dream.descrip}/>
        <div className={common.cbar}>
          <ViewText label="Funding goal in USD" value={money(dream.goal)}/>
          <progress value={percent} max="100" />
          <div className={styles.fund}>{percent}% funded since {since}</div>
          <br/>
          <ButtonFund cause={dream.contract} />
          <p><small>If you want to donate a different amount, scan the qrcode<br/>Use only XRPL-EVM network</small></p>
          <div className={styles.qrcode}>
            <QRCode value={dream.contract} />
          </div>
          <div className={styles.contract}>
            <Link href={`https://evm-sidechain.xrpl.org/address/${dream.contract}`}>{dream.contract}</Link>
          </div>
        </div>
        <div className={common.cbar}>
          <Donations data={donations} />
        </div>
      </div>
    </Page>
  )
}
