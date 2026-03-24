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
    await connectDB();
    res.json({
      server: 'running',
      mongodb: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      server: 'running',
      mongodb: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}