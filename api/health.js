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
    await connectDB();
    res.json({ server: 'running', mongodb: 'connected', timestamp: new Date().toISOString() });
  } catch (error) {
    res.json({ server: 'running', mongodb: 'disconnected', timestamp: new Date().toISOString() });
  }
};