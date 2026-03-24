export interface Shop {
  id: number;
  name: string;
  type: string;
  image: string;
  rating: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  shopId: number;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}