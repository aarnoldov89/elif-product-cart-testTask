// backend/seed.js
require('dotenv').config({ path: __dirname + '/.env' });
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env');
  process.exit(1);
}

const mockData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'mock-data.json')));

// Flags: --shops  → seed only shops
//        --products → seed only products
//        (no flag)  → seed everything
const args = process.argv.slice(2);
const onlyShops    = args.includes('--shops');
const onlyProducts = args.includes('--products');
const seedShops    = !onlyProducts; // seed shops unless --products only
const seedProducts = !onlyShops;   // seed products unless --shops only

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('elif_food_delivery');

    if (seedShops) {
      await db.collection('shops').deleteMany({});
      await db.collection('shops').insertMany(mockData.shops);
      console.log(`✅ Seeded ${mockData.shops.length} shops`);
    }

    if (seedProducts) {
      await db.collection('products').deleteMany({});
      await db.collection('products').insertMany(mockData.products);
      console.log(`✅ Seeded ${mockData.products.length} products`);
    }

    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();