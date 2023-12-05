import { sql } from '@vercel/postgres'   // sql connects every time
//import { db } from '@vercel/postgres'  // db does one connect then queries
//const client = await db.connect()      // it's recommended to use db instead of sql
//await client.sql`SELECT ...`

type Dictionary = { [key:string]:any }

export async function showTables() {
  const { rows } = await sql`
    SELECT tablename 
    FROM pg_catalog.pg_tables 
    WHERE schemaname != 'pg_catalog' 
    AND schemaname != 'information_schema'
    ORDER BY tablename
  `
  const list = rows.map(row => row.tablename)
  return list
}


//---- USERS

export async function newUser(data:Dictionary) {
  console.log('DATA', data)
  try {
    //if(!client){ client = await db.connect() }
    //const res = await client.sql`INSERT INTO users(
    const res = await sql`INSERT INTO users(
      name,
      email,
      image,
      address
    ) VALUES (
      ${data?.name},
      ${data?.email},
      ${data?.image}
      ${data?.address}
    )`
    console.log('RES', res)
    return res
  } catch(ex:any) {
    console.error(ex)
    return {error: ex?.message}
  }
}

export async function getUsers() {
  const { rows } = await sql`SELECT * FROM users`
  return rows
}

export async function getUserById(id:string) {
  const { rows } = await sql`SELECT * FROM users WHERE id=${id}`
  return rows.length > 0 ? rows[0] : null
}

export async function getUserByAddress(address:string) {
  const { rows } = await sql`SELECT * FROM users WHERE address=${address}`
  return rows.length > 0 ? rows[0] : null
}


//---- DREAMS

export async function getDreams() {
  const { rows } = await sql`SELECT * FROM dreams`
  return rows
}

export async function getMainDreams(location:string) {
  const res1 = await sql`SELECT * FROM dreams ORDER BY created DESC`
  const res2 = await sql`SELECT *, (funds/goal) as percent FROM dreams ORDER BY percent DESC`
  const res3 = await sql`SELECT * FROM dreams WHERE country = ${location}`
  return {latest:res1.rows, funded:res2.rows, located:res3.rows}
}

export async function getDreamById(id:string) {
  const { rows } = await sql`SELECT * FROM dreams WHERE id=${id}`
  return rows.length > 0 ? rows[0] : null
}

export async function getDreamByContract(id:string) {
  const { rows } = await sql`SELECT * FROM dreams WHERE contract=${id}`
  return rows.length > 0 ? rows[0] : null
}

export async function getDreamsByOwner(id:string) {
  const { rows } = await sql`SELECT * FROM dreams WHERE owner=${id}`
  return rows
}

export async function getDreamsByCountry(id:string) {
  const { rows } = await sql`SELECT * FROM dreams WHERE country=${id}`
  return rows
}

export async function newDream(data:Dictionary) {
  console.log('DATA', data)
  try {
    const res = await sql`
      INSERT INTO dreams(owner, contract, name, descrip, goal, funds, country, image, metadata)
      VALUES (${data?.owner}, ${data?.contract}, ${data?.name}, ${data?.descrip}, ${data?.goal || 0}, ${data?.funds || 0}, ${data?.country}, ${data?.image}, ${data?.metadata})
      RETURNING id
    `
    return res
  } catch(ex:any) {
    console.error(ex)
    return {error: ex?.message}
  }
}

export async function deleteDream(id:string) {
  const res = await sql`DELETE FROM dreams WHERE id=${id}`
  console.log('RES', res)
  return res
}

export async function addFunds(id:string, amount:number) {
  const res = await sql`UPDATE dreams SET funds = funds + ${amount} WHERE id=${id}`
  console.log('RES', res)
  return res
}

//---- DONATIONS

export async function getDonations() {
  const { rows } = await sql`SELECT * FROM donations`
  return rows
}

export async function getDonationById(id:string) {
  const { rows } = await sql`SELECT * FROM donations WHERE id=${id}`
  return rows.length > 0 ? rows[0] : null
}

export async function getDonationsByDream(id:string) {
  const { rows } = await sql`SELECT * FROM donations WHERE dreamid=${id}`
  return rows
}

export async function getDonationsByDonor(id:string) {
  const { rows } = await sql`SELECT * FROM donations WHERE donor=${id}`
  return rows
}

export async function newDonation(data:Dictionary) {
  console.log('DATA', data)
  try {
    const res = await sql`
      INSERT INTO donations(dreamid,donor,amount,usdval,txid,status) 
      VALUES(${data.dreamid}, ${data.donor}, ${data.amount}, ${data.usdval}, ${data.txid}, ${data.status})
      RETURNING id
    `
    console.log('RES', res)
    // id = res.rows[0].id
    return res
  } catch(ex:any) {
    console.error(ex)
    return {error: ex?.message}
  }
}
