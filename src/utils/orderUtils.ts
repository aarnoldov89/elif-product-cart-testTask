// Utility functions for order management

export const getOrdersFromStorage = (): any[] => {
  try {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error('Error retrieving orders from localStorage:', error);
    return [];
  }
};

export const clearOrdersFromStorage = (): void => {
  try {
    localStorage.removeItem('orders');
    console.log('All orders cleared from localStorage');
  } catch (error) {
    console.error('Error clearing orders from localStorage:', error);
  }
};

export const getOrderById = (orderId: string): any | null => {
  try {
    const orders = getOrdersFromStorage();
    return orders.find(order => order.id === orderId) || null;
  } catch (error) {
    console.error('Error retrieving order by ID:', error);
    return null;
  }
};

// Debug function to view all orders in console
export const debugOrders = (): void => {
  const orders = getOrdersFromStorage();
  console.log('=== ALL ORDERS ===');
  console.log('Total orders:', orders.length);
  console.table(orders);
  console.log('Raw data:', orders);
};

// Function to export orders as JSON (for development/testing)
export const exportOrdersAsJSON = (): string => {
  const orders = getOrdersFromStorage();
  return JSON.stringify({ orders }, null, 2);
};