import { put } from '@vercel/blob'

export default async function Upload(file:File, name:string) {
  try {
    const filename = name || 'noname.jpg'
    console.log('Uploading', filename)
    const blob = await put(filename, file, { access: 'public' })
    //const blob = await put('meta/hello.txt', 'Hello World!', { access: 'public' })
    return {success:true, blob}
  } catch(ex:any) {
    console.error(ex)
    return {success:false, error:ex?.message}
  }
}