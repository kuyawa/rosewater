import { NextRequest } from 'next/server'
import * as db from '@/utils/db'

type Dictionary = { [key:string]:any }

export async function GET(request: NextRequest) {
  console.log('GET DONATIONS')
  const id:string    = request.nextUrl.searchParams.get('id')?.toString() || ''
  const dream:string = request.nextUrl.searchParams.get('dream')?.toString() || ''
  const donor:string = request.nextUrl.searchParams.get('donor')?.toString() || ''
  console.log(id,dream,donor)

  if(id){
    console.log('id')
    const rec = await db.getDonationById(id)
    return Response.json(rec)
  }
  if(dream){
    console.log('dream')
    const rec = await db.getDonationsByDream(dream)
    return Response.json(rec)
  }
  if(donor){
    console.log('donor')
    const rec = await db.getDonationsByDonor(donor)
    return Response.json(rec)
  }

  console.log('all')
  const data = await db.getDonations()
  return Response.json(data)
}

export async function POST(request: NextRequest) {
  try {
    //const {dreamid, donor, amount, usdval, txid, status} = request?.body
    //const rec = {dreamid, donor, amount, usdval, txid, status}
    const rec = await request.json()
    //console.log('REC', rec)
    //console.log('DREAMID', rec?.dreamid)
    //const form = await request.formData()
    //console.log('FORM', form)
/*
    let rec:Dictionary = {}
    let file:File = new File([], 'test.txt')
    form.forEach((val, key) => {
      console.log('-', key, val)
      if(key=='image') { 
        file = val as File
        console.log('File', file)
        rec[key] = file?.name || ''
      } else { 
        rec[key] = val
      }
    })
    console.log('REC:', rec)
*/
    // save donation to db
    const info = await db.newDonation(rec)
    const data = { success: true, info }
    return Response.json(data)    
  } catch(ex:any) {
    console.error(ex)
    return Response.json({ success: false, error:ex?.message })
  }  
}

export async function PUT(request: NextRequest) {
  //const form = await request.formData()
  //console.log('FORM', form)
  // SAVE
  const data = { success: false, error:'Nothing to see here' }
  return Response.json(data)
}
