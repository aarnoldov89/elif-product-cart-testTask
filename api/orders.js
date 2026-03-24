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

    if (req.method === 'GET') {
      const orders = await db.collection('orders').find({}).sort({ orderDate: -1 }).toArray();
      return res.json({ orders, source: 'mongodb' });
    }

    if (req.method === 'POST') {
      const orderData = req.body;
      if (!orderData.customerInfo || !orderData.items || !orderData.summary) {
        return res.status(400).json({ error: 'Missing required order fields' });
      }
      const result = await db.collection('orders').insertOne({
        ...orderData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return res.json({ success: true, orderId: result.insertedId, source: 'mongodb' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}