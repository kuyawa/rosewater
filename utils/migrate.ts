import { sql } from '@vercel/postgres'

// TODO: ADD imgsrc FIELD TO DREAMS TABLE

/*
export async function createTableUsers() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS users (
      id       SERIAL PRIMARY KEY,
      created  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      name     VARCHAR(255) NOT NULL,
      email    VARCHAR(255) UNIQUE NOT NULL,
      image    VARCHAR(255),
      address  VARCHAR(255)
    );
  `
  console.log(`Created "users" table`)
}

export async function createTableDreams() {
  const res = await sql`
    CREATE TABLE IF NOT EXISTS dreams (
      id       SERIAL PRIMARY KEY,
      created  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      owner    VARCHAR(255) NOT NULL,
      contract VARCHAR(255) NOT NULL,
      name     VARCHAR(255) NOT NULL,
      descrip  TEXT,
      goal     NUMERIC(14,2),
      funds    NUMERIC(14,2),
      country  CHAR(3),
      image    VARCHAR(255)
    );
  `
  console.log(`Created "dreams" table:`, res)
  return res
}

export async function createTableDonations() {
  const res = await sql`
    CREATE TABLE IF NOT EXISTS donations (
      id       SERIAL PRIMARY KEY,
      dreamid  INTEGER NOT NULL,
      created  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      donor    VARCHAR(255) NOT NULL,
      amount   INTEGER DEFAULT 0,
      usdval   NUMERIC(12,4) DEFAULT 0,
      txid     VARCHAR(255) NOT NULL,
      status   SMALLINT DEFAULT 0
    );
  `
  console.log(`Table created:`, res)
  return res
}

export async function insertDreams() {
  const recs = await Promise.all([
    sql`INSERT INTO dreams (owner, contract, name, descrip, image, goal, funds, country)
        VALUES (
          '0x1ac546d21473062f3c3b16b6392a2ec26f4539f0', 
          '0xB9dE738497f2770A3b9c2Edc4F49FA03708C326e',
          'Build a soccer field', 
          'Help kids from Ethiopia build their field of dreams so they can play football after school',
          'dream01.jpg',
          '100000',
          '0',
          'ETH'
        )
    `
  ])
  console.log(`Inserted ${recs.length} dreams`)
  return res
}

export async function insertUsers() {
  const users = await Promise.all([
    sql`INSERT INTO users (name, email, image)
        VALUES ('Guillermo Rauch', 'rauchg@vercel.com', 'https://images.ctfassets.net/e5382hct74si/2P1iOve0LZJRZWUzfXpi9r/9d4d27765764fb1ad7379d7cbe5f1043/ucxb4lHy_400x400.jpg')
        ON CONFLICT (email) DO NOTHING;
    `,
    sql`INSERT INTO users (name, email, image)
        VALUES ('Lee Robinson', 'lee@vercel.com', 'https://images.ctfassets.net/e5382hct74si/4BtM41PDNrx4z1ml643tdc/7aa88bdde8b5b7809174ea5b764c80fa/adWRdqQ6_400x400.jpg')
        ON CONFLICT (email) DO NOTHING;
    `,
    sql`INSERT INTO users (name, email, image)
        VALUES ('Steven Tey', 'stey@vercel.com', 'https://images.ctfassets.net/e5382hct74si/4QEuVLNyZUg5X6X4cW4pVH/eb7cd219e21b29ae976277871cd5ca4b/profile.jpg')
        ON CONFLICT (email) DO NOTHING;
    `,
  ])
  console.log(`Inserted ${users.length} users`)
}

export async function alterColumn(){
  const res = sql`ALTER TABLE users RENAME COLUMN "createdAt" TO created`
  return res
}

export async function alterUsers(){
  const res = sql`ALTER TABLE users ADD COLUMN "address" VARCHAR(100)`
  return res
}

export async function updateUser(){
  const res = sql`UPDATE users SET address = '0x12345678903' WHERE id=3`
  return res
}
*/
