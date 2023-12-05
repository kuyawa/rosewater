import { NextRequest } from 'next/server'
import * as db from '@/utils/db'

type Dictionary = { [key:string]:any }

export async function GET(request: NextRequest) {
  const id:string    = request.nextUrl.searchParams.get('id')?.toString() || ''
  const dream:string = request.nextUrl.searchParams.get('dream')?.toString() || ''
  const donor:string = request.nextUrl.searchParams.get('donor')?.toString() || ''

  if(id){
    const rec = await db.getDonationById(id)
    return Response.json(rec)
  }
  if(dream){
    const rec = await db.getDonationsByDream(dream)
    return Response.json(rec)
  }
  if(donor){
    const rec = await db.getDonationsByDonor(donor)
    return Response.json(rec)
  }

  const data = await db.getDonations()
  return Response.json(data)
}

export async function POST(request: NextRequest) {
  try {
    const rec = await request.json()
    //console.log('BODY', rec)
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
