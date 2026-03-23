import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onView?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleView = () => {
    if (onView) {
      onView();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {/* Placeholder for product image */}
        <span className="text-4xl">
          {product.category === 'vegetables' && '🥕'}
          {product.category === 'fruits' && '🍎'}
          {product.category === 'pizza' && '🍕'}
          {product.category === 'burgers' && '🍔'}
          {product.category === 'drinks' && '🥤'}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</span>
          <div className="flex space-x-2">
            <button 
              onClick={handleView}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              View
            </button>
            <button
              onClick={handleAddToCart}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;