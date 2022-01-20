// import dotenv from 'dotenv'
// import express from 'express'
// import { Client } from 'pg'

const dotenv = require("dotenv")
const express = require("express")
const { Client } = require("pg")

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL
})
client.connect()

const app = express()
const PORT = process.env.PORT || 5000

app.get('/users', async (req, res) => {
  const result = await client.query('SELECT * FROM users;')

  return res.json({ users: result.rows })
});

app.get('/populate', async (req, res) => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    );
  `)

  await client.query(`
    INSERT INTO users (name) 
    VALUES ('Lucas'), ('Diogo'), ('Bruna'), ('Lucas');
  `)

  return res.json({ message: 'Populated' })
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))