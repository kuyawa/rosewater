import * as db from '@/utils/db'

export async function GET(request: Request) {
  const data = await db.showTables()
  const json = JSON.stringify(data||null,null,2)
  const opts = { status: 200, headers: { "Content-Type": "text/plain" } }
  return new Response(json, opts)
}
