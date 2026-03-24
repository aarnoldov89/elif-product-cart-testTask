import { MongoClient } from 'mongodb';

let client = null;
let db = null;

const connectDB = async () => {
  if (db) return db;
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set');
  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db('elif_food_delivery');
  return db;
};

export default async function handler(req, res) {
  try {
    const db = await connectDB();
    const products = await db.collection('products').find({}).toArray();
    res.json({ products, source: 'mongodb' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}