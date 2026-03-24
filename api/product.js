const { MongoClient } = require('mongodb');

let client = null;
let db = null;

const connectDB = async () => {
  if (db) return db;
  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db('elif_food_delivery');
  return db;
};

module.exports = async (req, res) => {
  try {
    const db = await connectDB();
    const products = await db.collection('products').find({}).toArray();
    res.json({ products, source: 'mongodb' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};