import { NextRequest } from 'next/server'
import * as db from '@/utils/db'

type Dictionary = { [key:string]:any }

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
  return Response.json({ success: false, error:'Not ready' })
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
