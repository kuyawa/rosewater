"use client"
import { useState, useEffect, FormEvent } from 'react'
import { BrowserProvider } from 'ethers'
import Page from '@/components/page'
import InputArea from '@/components/input-area'
import InputText from '@/components/input-text'
import styles from '@/app/page.module.css'

type Dictionary = { [key:string]:any }

//interface Window {
//  ethereum: any
//}

interface CustomWindow extends Window {
  ethereum?: any;
}

declare const window: CustomWindow;

export default function Start() {
  const [button, setButton] = useState('SUBMIT')
  const [disabled, setDisabled] = useState(false)
  const [message, setMessage] = useState('Enter your dream info and submit it')
  const [imageSource, setImageSource] = useState('/media/noimage.png')
  const [address, setAddress] = useState('')

  useEffect(() => {
    loadWallet()
  }, [])

  async function loadWallet() {
    const provider = new BrowserProvider(window?.ethereum)
    console.log('PROVIDER', provider)
    const accounts = await provider.send("eth_requestAccounts", [])
    console.log('ACCOUNTS', accounts)
    if(accounts?.length>0){
      setAddress(accounts[0] || '')
      //setMessage('Wallet connected')
    } else {
      //setMessage('Wallet not connected')
    }
  }

  function imageView(event:any){
    //console.log('IMG', event)
    const file = event?.target?.files[0]
    if(!file){ return }
    const reader = new FileReader()
    reader.onload = function(evt:any) {
      //console.log('READER!', e)
      const src = evt?.target?.result?.toString() || ''
      setImageSource(src)
    }
    reader.readAsDataURL(file)
  }

  async function submit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    console.log('FORM SUBMIT')
    setMessage('Saving dream info, wait...')
    try {
      const form = new FormData(event.currentTarget)
      //form.append('description', description) // Textarea not passed to form data?
      const data:Dictionary = {}
      form.forEach((val, key) => {
        //console.log('-', key, val)
        data[key] = val
      })
      console.log(data)
      //console.log(data.image.size)
      if(!data?.owner){ setMessage('Connect with Metamask first'); loadWallet(); return }
      if(!data?.name){ setMessage('Name is required'); return }
      if(!data?.mail){ setMessage('Email is required'); return }
      if(!data?.country){ setMessage('Country is required'); return }
      if(!data?.goal){ setMessage('Funding goal in USD is required'); return }
      if(!data?.title){ setMessage('Dream title is required'); return }
      if(!data?.desc){ setMessage('Dream description is required'); return }
      if(data?.image?.size<1){ setMessage('Image is required'); return }
      setDisabled(true)
      setButton('WAIT')
      const resp = await fetch('/api/dream', {
        method: 'POST',
        body: form,
      })
      const info = await resp.json()
      //const info = {success:true}
      console.log('INFO', info)
      if (!info?.success || info?.error) {
        setMessage('Failed to submit data. Please try again.')
        setButton('SUBMIT')
        setDisabled(false)
        return
      }
      setMessage('Thank you for starting your dream!')
      setButton('DONE')
    } catch (ex:any) {
      console.error(ex)
      setMessage(ex?.message)
      setButton('SUBMIT')
      setDisabled(false)
      return
    }
  }

  return (
    <Page>
      <h1 className={styles.title}>START YOUR DREAM</h1>
      <form onSubmit={submit}>
        <h2 className={styles.title}>Tell us about yourself</h2>
        <input type="hidden" name="owner" value={address} />
        <InputText name="name" label="Your name" info="" />
        <InputText name="mail" label="Your email" info="" />
        <InputText name="country" label="Your country" info="" />
        <h2 className={styles.title}>Tell us about your dream</h2>
        <InputText name="title" label="Dream Title" info="One line as the title of your dream, be concise" />
        <InputArea name="desc" label="Describe your dream" info="Expand on your ideas and goals, how you will invest the money" />
        <InputText name="goal" label="Funding goal in USD" info="Amount of money you need to start your dream" />
        <label>Upload an image for your dream <small>(Max size 1000x1000 pixels)</small></label>
        <img src={imageSource} alt="Dream Image" width={650} height={425} />
        <input type="file" name="image" onChange={imageView} />
        <button className={styles.submit} type="submit" disabled={disabled}>{button}</button>
        <div className={styles.message}>{message}</div>
      </form>
    </Page>
  )
}
