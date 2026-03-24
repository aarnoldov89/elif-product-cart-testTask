const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

// Load environment variables
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let client = null;
let db = null;

const connectToMongoDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('⚠️  MONGODB_URI not found in environment variables');
      return false;
    }
    
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db('elif_food_delivery');
    console.log('✅ Connected to MongoDB Atlas');
    return true;
  } catch (error) {
    console.log('⚠️  MongoDB connection failed:', error.message);
    return false;
  }
};

// Initialize MongoDB connection
connectToMongoDB();

// Helper function to read mock data
const readMockData = (filename) => {
  try {
    const mockPath = path.join(__dirname, '..', 'src', filename);
    const data = fs.readFileSync(mockPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log(`⚠️  Could not read ${filename}:`, error.message);
    return null;
  }
};

// API Routes

// Get products
app.get('/api/products', async (req, res) => {
  try {
    // Try MongoDB first
    if (db) {
      const products = await db.collection('products').find({}).toArray();
      if (products.length > 0) {
        console.log('✅ Products loaded from MongoDB');
        return res.json({ products, source: 'mongodb' });
      }
    }
    
    // Fallback to mock data
    console.log('⚠️  No products in MongoDB, using mock data');
    const mockData = readMockData('mock-data.json');
    if (mockData && mockData.products) {
      return res.json({ products: mockData.products, source: 'mock' });
    }
    
    return res.status(500).json({ error: 'No products available' });
  } catch (error) {
    console.log('⚠️  Error fetching products:', error.message);
    
    // Fallback to mock data
    const mockData = readMockData('mock-data.json');
    if (mockData && mockData.products) {
      return res.json({ products: mockData.products, source: 'mock' });
    }
    
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    
    // Validate required fields
    if (!orderData.customerInfo || !orderData.items || !orderData.summary) {
      return res.status(400).json({ error: 'Missing required order fields' });
    }
    
    // Try to save to MongoDB
    if (db) {
      try {
        const result = await db.collection('orders').insertOne({
          ...orderData,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        
        console.log('✅ Order saved to MongoDB with ID:', result.insertedId);
        return res.json({ 
          success: true, 
          orderId: result.insertedId,
          message: 'Order saved successfully',
          source: 'mongodb'
        });
      } catch (mongoError) {
        console.log('⚠️  MongoDB save failed:', mongoError.message);
      }
    }
    
    // If MongoDB fails, respond with success but indicate fallback needed
    console.log('⚠️  Order not saved to database, client should use fallback');
    return res.status(503).json({
      error: 'Database temporarily unavailable',
      fallbackRequired: true,
      orderId: orderData.id
    });
    
  } catch (error) {
    console.log('⚠️  Order submission error:', error.message);
    res.status(500).json({ 
      error: 'Failed to process order',
      fallbackRequired: true 
    });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    // Try MongoDB first
    if (db) {
      const orders = await db.collection('orders').find({}).sort({ orderDate: -1 }).toArray();
      console.log(`✅ ${orders.length} orders loaded from MongoDB`);
      return res.json({ orders, source: 'mongodb' });
    }
    
    // If no MongoDB, return empty
    console.log('⚠️  MongoDB not available for orders');
    return res.json({ orders: [], source: 'unavailable' });
  } catch (error) {
    console.log('⚠️  Error fetching orders:', error.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const status = {
    server: 'running',
    mongodb: db ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  };
  res.json(status);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Server running on port', PORT);
  console.log('📊 Health check: http://localhost:' + PORT + '/api/health');
  console.log('🛍️  Products API: http://localhost:' + PORT + '/api/products');
  console.log('📦 Orders API: http://localhost:' + PORT + '/api/orders');
});