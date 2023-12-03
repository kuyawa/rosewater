//import { cookies } from 'next/headers'

export async function GET(request: Request) {
  //const cookie = cookies()
  //cookie.set('token', '654321')
  const data = { success: false, error:'Nothing to see here' }
  return Response.json(data)
}
