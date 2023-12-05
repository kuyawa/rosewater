import { NextRequest } from 'next/server'
import { ContractFactory, JsonRpcProvider, Wallet } from 'ethers'
//import { put } from '@vercel/blob'
import * as db from '@/utils/db'
import { randomNumber } from '@/utils/random'
import contractABI from '@/contracts/dreamers-abi.json'
import contractBIN from '@/contracts/dreamers-bin.json'

type Dictionary = { [key:string]:any }

function getExtension(mime:string){
  switch(mime){
    case 'image/jpg':  return 'jpg';  break;
    case 'image/jpeg': return 'jpg';  break;
    case 'image/png':  return 'png';  break;
    case 'image/svg':  return 'svg';  break;
    case 'image/gif':  return 'gif';  break;
    case 'image/webp': return 'webp'; break;
    case 'application/json': return 'json'; break;
    case 'text/plain': return 'txt'; break;
    default: return 'jpg'
  }
}

async function upload(form:any){
  console.log('Uploading...')
  const opts = { method:'POST', body: form }
  const res = await fetch('https://kuyawa.net/upload', opts)
  //const res = await fetch('http://localhost:5000/upload', opts)
  const rex = await res.json()
  return {url:rex.url}
}

export async function GET(request: NextRequest) {
  const id:string       = request.nextUrl.searchParams.get('id')?.toString() || ''
  const main:string     = request.nextUrl.searchParams.get('main')?.toString() || ''
  const contract:string = request.nextUrl.searchParams.get('contract')?.toString() || ''
  const owner:string    = request.nextUrl.searchParams.get('owner')?.toString() || ''
  const country:string  = request.nextUrl.searchParams.get('country')?.toString() || ''

  if(id){
    const rec = await db.getDreamById(id)
    return Response.json(rec)
  }
  if(main){
    const rec = await db.getMainDreams(country)
    return Response.json(rec)
  }
  if(contract){
    const rec = await db.getDreamByContract(contract)
    return Response.json(rec)
  }
  if(owner){
    const rec = await db.getDreamsByOwner(owner)
    return Response.json(rec)
  }
  if(country){
    const rec = await db.getDreamsByCountry(country)
    return Response.json(rec)
  }
  const list = await db.getDreams()
  return Response.json(list)
}

export async function POST(request: NextRequest) {
  try {
    console.log('FORM')
    const form = await request.formData()

    let rec:Dictionary = {}
    let file:File = new File([''], 'test.txt')
    form.forEach((val:any, key:string) => {
      console.log('-', key, val)
      if(key=='image') { 
        file = val as File
        console.log('File', file)
        rec[key] = file?.name || 'file.jpg'
      } else { 
        rec[key] = val
      }
    })
    console.log('REC:', rec)
    console.log('FILE', file)
    const owner = rec.owner.toLowerCase()

    // upload metadata to vercel
    const rand = randomNumber()
    const metaname = `${rand}-meta.json`
    const metafile = JSON.stringify(rec,null,2)
    console.log('Uploading', metaname)
    console.log('Metafile', metafile)
    //const metablob = await put(metaname, metafile, { access: 'public' })
    const metaform = new FormData()
    metaform.append('file', new Blob([metafile], { type: 'application/json' }), metaname)
    const metablob = await upload(metaform)
    console.log('MetaBlob', metablob)
    const uri = metablob?.url || ''

    // upload image
    const ext = getExtension(file?.type)
    const filename = `${rand}-file.${ext}`
    console.log('Uploading', filename)
    //const blob = await put(filename, file, { access: 'public' }) // https://2x1swtt81k3wqss3.public.blob.vercel-storage.com/test-fkv5wkTb6HKJi7ZinyTJKrXDQhA5Kl.jpg
    const fileform = new FormData()
    fileform.append('file', new Blob([file], { type: file?.type }), filename)
    const blob = await upload(fileform)
    console.log('FileBlob', blob)
    const url = blob?.url || ''
    //const url = 'nothing'
    //return Response.json({ success: false, error:'testing' })
    
    // create contract, get contract address
    const secret = process.env.SERVER_SECRET || ''
    const ethers = new JsonRpcProvider('https://rpc-evm-sidechain.xrpl.org', {chainId: 1440002, name: "XRPL EVM"})
    const wallet = new Wallet(secret, ethers)
    const factory = new ContractFactory(contractABI, contractBIN.bytecode, wallet)
    const args = [owner, rand]
    console.log('ARGS', args)
    const contract = await factory.deploy(owner, rand)
    console.log('CONTRACT', contract)
    const address = contract?.target?.toString().toLowerCase()
    //const address = contract?.address
    //const txid = contract?.deployTransaction
    console.log('ADDRESS', address)
    //console.log('TX', txid)
    //await contract.deployTransaction.wait() // wait for confirmation
    rec['contract'] = address

    // check user in db by address
    const user = await db.getUserByAddress(owner)
    console.log('USER', user)
    if(!user){
      const saved = await db.newUser({
        name:    rec.name,
        email:   rec.mail,
        address: owner,
        image:   ''
      })
      if(!saved){
        return Response.json({ success: false, error:'Error saving user info' })
      }
    }

    // save dream to db
    const info = await db.newDream({
      owner,
      contract: rec.contract,
      name: rec.title,
      descrip: rec.desc,
      goal: rec.goal,
      funds: 0,
      country: rec.country,
      image: url,
      metadata: uri
    })

    const data = { success: true, url, uri }
    return Response.json(data)    
  } catch(ex:any) {
    console.error(ex)
    return Response.json({ success: false, error:ex?.message })
  }  
}

export async function PUT(request: NextRequest) {
  const id:string     = request.nextUrl.searchParams.get('id')?.toString() || ''
  const amount:string = request.nextUrl.searchParams.get('amount')?.toString() || ''
  const usdvalue = Number(amount)
  if(id && usdvalue){
    const rec = await db.addFunds(id, usdvalue)
    return Response.json(rec)
  }
  return Response.json({error:'Not implemented'})
}


/*
{
  url: 'https://2x1swtt81k3wqss3.public.blob.vercel-storage.com/test-fkv5wkTb6HKJi7ZinyTJKrXDQhA5Kl.jpg',
  pathname: 'test.jpg',
  contentType: 'image/jpeg',
  contentDisposition: 'attachment; filename="test.jpg"'
}
*/