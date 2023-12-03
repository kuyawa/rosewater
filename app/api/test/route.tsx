//import { NextResponse } from 'next/server'
//import { cookies } from 'next/headers'
import * as db from '@/utils/db'

export async function GET(request: Request) {
  console.log('> api/test')
  //const info = await db.showTables()
  //const cookie = cookies()
  //const token = cookie.get('token')
  //const token = request.cookies.get('token')?.value
  //const data = {
  //  owner:    'x',
  //  contract: 'c',
  //  name:     'n',
  //  descrip:  'd',
  //  goal:     1000,
  //  funds:    10,
  //  country:  'y',
  //  image:    'i'
  //}
  //const info = await db.newDream(data)
  const info = await db.getDreams()
  //const info = await db.deleteDream(5)
  //const info = await db.getUsers()
  return new Response(
    JSON.stringify(info||null,null,2),
    {
      status: 200,
      headers: { "Content-Type": "text/plain" }
    }
  )
  //return Response.json(data)
}
