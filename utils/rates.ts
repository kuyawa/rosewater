//import {RequestInit} from 'node-fetch'
//import {Headers, HeadersInit} from 'next/headers'
//import {Headers, HeadersInit} from 'node-fetch'
//import {HeadersInit} from 'node-fetch'
//import {headers} from 'next/headers'

//
//type ReqHeaders = {
//  'Accept':string
//  'Content-Type':string
//  'X-CMC_PRO_API_KEY':string
//}

export default async function getRates(symbol:string){
  console.warn('Getting CMC ticker for symbol', symbol)
  try {
    const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol='+symbol
    //const hdr:HeadersInit = new Headers()
    //hdr.set('Accept', 'application/json')
    //hdr.set('Content-Type', 'application/json')
    //hdr.set('X-CMC_PRO_API_KEY', process.env.NEXT_PUBLIC_TICKER_API_KEY)
    const hdr:any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_TICKER_API_KEY
    }
    const opt = { method: 'GET', headers: hdr }
    const res = await fetch(url, opt)
    const tkr = await res.json()
    const usd = tkr?.data[symbol]?.quote?.USD?.price || 0
    console.warn('Ticker:', usd)
    return usd
  } catch(ex) {
    console.error('Error in CMC ticker:', ex)
    return 0
  }
}
