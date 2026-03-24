// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API service functions
export const apiService = {
  // Get all products
  async getProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      console.log('✅ Products loaded from API:', data.source);
      return data.products;
    } catch (error) {
      console.log('⚠️  API failed, using fallback:', error);
      // Fallback to local mock data
      const mockData = await import('../mock-data.json');
      return mockData.products;
    }
  },

  // Submit an order
  async submitOrder(orderData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const data = await response.json();
      console.log('✅ Order submitted via API:', data);
      return { success: true, orderId: data.orderId, source: 'api' };
    } catch (error) {
      console.log('⚠️  API failed, using localStorage fallback:', error);
      
      // Fallback to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(existingOrders));
      
      console.log('✅ Order saved to localStorage');
      console.log('📋 Copy this JSON to src/mock-checkout.json:');
      console.log('='.repeat(50));
      console.log(JSON.stringify({ orders: existingOrders }, null, 2));
      console.log('='.repeat(50));
      
      return { success: true, orderId: orderData.id, source: 'localStorage' };
    }
  },

  // Get all orders  
  async getOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      console.log('✅ Orders loaded from API');
      return data.orders;
    } catch (error) {
      console.log('⚠️  API failed for orders:', error);
      // Fallback to localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      return orders;
    }
  }
};

export default apiService;