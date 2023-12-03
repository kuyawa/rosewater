'use client'
 
import { ethers } from 'ethers'
import { useState } from 'react'
import styles from '@/app/page.module.css'

declare let window: any;

export default function ButtonFund(props:any) {
  const cause = props?.cause || ''
  const [message, setMessage] = useState('FUND A DREAM')
  function toWei(amt:number){
    const wei = ethers.WeiPerEther
    return (BigInt(amt)*wei).toString()
  }
  async function fund(amount:number){
    try {
      setMessage('CONFIRM PAYMENT')
      //console.log('Ethers', ethers)
      //return
      console.log('Funding', cause, amount)
      //console.log('Ethereum', window.ethereum)
      const provider = new ethers.BrowserProvider(window?.ethereum)
      //const provider = new ethers.providers.Web3Provider(window.ethereum)
      //console.log('Provider', provider)
      const accts = await provider.send("eth_requestAccounts", []);
      //console.log('Accounts', accts)
      const signer = await provider.getSigner()
      //console.log('Signer', signer)
      const address = signer.address
      const tx = await signer.sendTransaction({
        to: cause,
        value: toWei(amount)
      });
      setMessage('DREAM FUNDED!')
      console.log('TX', tx)
    } catch(ex) {
      console.error(ex)
      setMessage('ERROR FUNDING')
      setTimeout(()=>{setMessage('FUND A DREAM')}, 3000)
    }
  }
 
  return (
    <div className={styles.funding}>
      <h1>{message}</h1>
      <div className={styles.fundButtons}>
        <button onClick={()=>fund(1000)}>1000 <small>XRP</small></button>
        <button onClick={()=>fund( 100)}>100 <small>XRP</small></button>
        <button onClick={()=>fund(  10)}>10 <small>XRP</small></button>
      </div>
    </div>
  )
}

