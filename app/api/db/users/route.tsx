import { NextRequest } from 'next/server'
import * as db from '@/utils/db'

export async function GET(request: NextRequest) {
  const id:string  = request.nextUrl.searchParams.get('id')?.toString() || ''
  const adr:string = request.nextUrl.searchParams.get('address')?.toString() || ''
  if(id){
    const user = await db.getUserById(id)
    return Response.json(user)
  }
  if(adr){
    const user = await db.getUserByAddress(adr)
    return Response.json(user)
  }
  const list = await db.getUsers()
  return Response.json(list)
}

export async function POST(request: NextRequest) {
  return Response.json({error:'Not ready yet'})
}

export async function PUT(request: NextRequest) {
  return Response.json({error:'Not ready yet'})
}
