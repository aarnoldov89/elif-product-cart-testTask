import mockData from '../mock-data.json';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiService = {
  async getShops() {
    try {
      const response = await fetch(`${API_BASE_URL}/shops`);
      if (!response.ok) throw new Error('Failed to fetch shops');
      const data = await response.json();
      console.log('✅ Shops loaded from API');
      return data.shops;
    } catch (error) {
      console.log('⚠️ API failed for shops, using fallback:', error);
      return mockData.shops;
    }
  },

  async getProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      console.log('✅ Products loaded from API:', data.source);
      return data.products;
    } catch (error) {
      console.log('⚠️ API failed for products, using fallback:', error);
      return mockData.products;
    }
  },

  async submitOrder(orderData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error('Failed to submit order');
      const data = await response.json();
      console.log('✅ Order submitted via API:', data);
      return { success: true, orderId: data.orderId, source: 'api' };
    } catch (error) {
      console.log('⚠️ API failed, using localStorage fallback:', error);
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(existingOrders));
      return { success: true, orderId: orderData.id, source: 'localStorage' };
    }
  },

  async getOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      console.log('✅ Orders loaded from API');
      return data.orders;
    } catch (error) {
      console.log('⚠️ API failed for orders, using fallback:', error);
      return JSON.parse(localStorage.getItem('orders') || '[]');
    }
  }
};

export default apiService;