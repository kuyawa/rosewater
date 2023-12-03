import { NextRequest } from 'next/server'
import { ContractFactory, JsonRpcProvider, Wallet } from 'ethers'
import { put } from '@vercel/blob'
import { randomNumber } from '@/utils/random'
import { getDreamById, getUserByAddress, newDream, newUser } from '@/utils/db'
import contractABI from '@/contracts/dreamers-abi.json'
import contractBIN from '@/contracts/dreamers-bin.json'

type Dictionary = { [key:string]:any }

export async function GET(request: NextRequest) {
  const id:string = request.nextUrl.searchParams.get('id')?.toString() || ''
  const dream = await getDreamById(id)
  return Response.json(dream)
}

export async function POST(request: NextRequest) {
  try {
    console.log('FORM')
    const form = await request.formData()

    let rec:Dictionary = {}
    let file:File = new File([], 'test.txt')
    form.forEach((val, key) => {
      console.log('-', key, val)
      if(key=='image') { 
        file = val as File
        rec[key] = file?.name || ''
      } else { 
        rec[key] = val
      }
    })
    console.log('REC:', rec)
    console.log('FILE', file)
    const owner = rec.owner.toLowerCase()

    // upload metadata to vercel
    const rand = randomNumber()
    const metaname = `meta-${rand}.txt`
    const metafile = JSON.stringify(rec,null,2)
    console.log('Uploading', metaname)
    console.log('Metafile', metafile)
    const metablob = await put(metaname, metafile, { access: 'public' })
    console.log('Blob', metablob)
    const uri = metablob.url

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

    // upload image
    const filename = file?.name || 'noname.jpg'
    console.log('Uploading', filename)
    const blob = await put(filename, file, { access: 'public' }) // https://2x1swtt81k3wqss3.public.blob.vercel-storage.com/test-fkv5wkTb6HKJi7ZinyTJKrXDQhA5Kl.jpg
    console.log('BLOB', blob)
    const url = blob.url
    //const url = 'nothing'
    
    // check user in db by address
    const user = await getUserByAddress(owner)
    console.log('USER', user)
    if(!user){
      const saved = await newUser({
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
    const info = await newDream({
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
  const form = await request.formData()
  console.log('FORM', form)
  // SAVE
  const data = { success: false, error:'Nothing to see here' }
  return Response.json(data)
}


/*
{
  url: 'https://2x1swtt81k3wqss3.public.blob.vercel-storage.com/test-fkv5wkTb6HKJi7ZinyTJKrXDQhA5Kl.jpg',
  pathname: 'test.jpg',
  contentType: 'image/jpeg',
  contentDisposition: 'attachment; filename="test.jpg"'
}
*/