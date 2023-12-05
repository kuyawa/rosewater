import { NextRequest } from 'next/server'
import getRates from '@/utils/rates'

export async function GET(request: NextRequest) {
  const id:string = request.nextUrl.searchParams.get('id')?.toString() || ''
  const rate = await getRates(id)
  return Response.json({rate})
}
