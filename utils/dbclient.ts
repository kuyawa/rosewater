
type Dictionary = { [key:string]:any }

export async function showTables() {
  const res = await fetch('/api/db/admin/tables')
  const inf = await res.json()
  return inf
}


//---- USERS

export async function newUser(data:Dictionary) {
  const res = await fetch('/api/db/users', {method:'POST', headers:{ 'Content-Type': 'application/json' }, body:JSON.stringify(data)})
  const inf = await res.json()
  return inf
}

export async function getUsers() {
  const res = await fetch('/api/db/users')
  const inf = await res.json()
  return inf
}

export async function getUserById(id:string) {
  const res = await fetch('/api/db/users?id='+id)
  const inf = await res.json()
  return inf
}

export async function getUserByAddress(address:string) {
  const res = await fetch('/api/db/users?address='+address)
  const inf = await res.json()
  return inf
}


//---- DREAMS

export async function getDreams() {
  const res = await fetch('/api/db/dreams')
  const inf = await res.json()
  return inf
}

export async function getMainDreams(country:string) {
  const res = await fetch('/api/db/dreams?main=true&country='+country)
  const inf = await res.json()
  return inf
}

export async function getDreamById(id:string) {
  const res = await fetch('/api/db/dreams?id='+id)
  const inf = await res.json()
  return inf
}

export async function getDreamByContract(id:string) {
  const res = await fetch('/api/db/dreams?contract='+id)
  const inf = await res.json()
  return inf
}

export async function getDreamsByOwner(id:string) {
  const res = await fetch('/api/db/dreams?owner='+id)
  const inf = await res.json()
  return inf
}

export async function getDreamsByCountry(id:string) {
  const res = await fetch('/api/db/dreams?country='+id)
  const inf = await res.json()
  return inf
}

export async function newDream(data:Dictionary) {
  const res = await fetch('/api/db/dreams', {method:'POST', headers:{ 'Content-Type': 'application/json' }, body:JSON.stringify(data)})
  const inf = await res.json()
  return inf
}

export async function deleteDream(id:string) {
  const res = await fetch('/api/db/dreams?id='+id, {method:'DELETE'})
  const inf = await res.json()
  return inf
}

export async function addFunds(id:string, amount:number) {
  const res = await fetch(`/api/db/dreams?id=${id}&amount=${amount}`, {method:'PUT'})
  const inf = await res.json()
  return inf
}

//---- DONATIONS

export async function getDonations() {
  const res = await fetch('/api/db/donations')
  const inf = await res.json()
  return inf
}

export async function getDonationById(id:string) {
  const res = await fetch('/api/db/donations?id='+id)
  const inf = await res.json()
  return inf
}

export async function getDonationsByDream(id:string) {
  const res = await fetch('/api/db/donations?dream='+id)
  const inf = await res.json()
  return inf
}

export async function getDonationsByDonor(id:string) {
  const res = await fetch('/api/db/donations?donor='+id)
  const inf = await res.json()
  return inf
}

export async function newDonation(data:Dictionary) {
  const res = await fetch('/api/db/donations', {method:'POST', headers:{ 'Content-Type': 'application/json' }, body:JSON.stringify(data)})
  const inf = await res.json()
  return inf
}
