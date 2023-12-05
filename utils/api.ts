export async function getRate(id:string) {
  try {
    const res = await fetch('/api/rate?id='+id)
    const inf = await res.json()
    return inf?.rate || 0
  } catch(ex){
    console.log('RATE ERROR:', ex)
    return 0
  }
}
