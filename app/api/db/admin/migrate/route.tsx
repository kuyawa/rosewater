import * as db from '@/utils/migrate'

export async function GET(request: Request) {
  //const data = await db.createTableDonations()
  const data = { ok:true }
  const json = JSON.stringify(data||null,null,2)
  const opts = { status: 200, headers: { "Content-Type": "text/plain" } }
  return new Response(json, opts)
}
