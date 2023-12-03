import { NextRequest, NextResponse } from 'next/server'


// Use in client <img src="/api/image?url={vercelbloburl}" alt="image" width={650} height={320} />
export async function GET(request: NextRequest) {
  const url:string = request.nextUrl.searchParams.get('url')?.toString() || ''
  //console.log('IMG', url)
  const res = await fetch(url)
  const blob = await res.blob()
  const headers = new Headers()
  headers.set('Content-Type', 'image/*')
  return new NextResponse(blob, { status: 200, statusText: 'OK', headers })
}