import { NextRequest } from 'next/server'
import { getUserByAddress } from '@/utils/db'

export async function GET(request: NextRequest) {
  const adr:string = request.nextUrl.searchParams.get('address')?.toString() || ''
  const user = await getUserByAddress(adr)
  return Response.json(user)
}

