// backend/seed.js
require('dotenv').config({ path: __dirname + '/.env' });
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const mockData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'mock-data.json')));

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('elif_food_delivery');

  await db.collection('shops').insertMany(mockData.shops);
  await db.collection('products').insertMany(mockData.products);

  console.log('✅ Data seeded successfully!');
  await client.close();
}

seed();