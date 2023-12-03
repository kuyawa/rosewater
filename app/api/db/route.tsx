import * as db from '@/utils/db'

export async function GET(request: Request) {
  const data = await db.showTables()
  //const data = await db.getUsers()
  //const data = await db.getUserById(1)
  //const data = await db.getDreams()
  //const data = await db.getDreamById(1)
  //const data = await db.getDreamsByOwner('0x1ac546d21473062f3c3b16b6392a2ec26f4539f0')
  //const data = await db.getDreamsByCountry('ETH')
  //const data = await db.getDreamByContract('0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e')
  const json = JSON.stringify(data||null,null,2)
  const opts = { status: 200, headers: { "Content-Type": "text/plain" } }
  return new Response(json, opts)
}
