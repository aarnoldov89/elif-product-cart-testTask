import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-6xl">
              {product.category === 'vegetables' && '🥕'}
              {product.category === 'fruits' && '🍎'}
              {product.category === 'pizza' && '🍕'}
              {product.category === 'burgers' && '🍔'}
              {product.category === 'drinks' && '🥤'}
            </span>
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{product.name}</h2>
            <p className="text-gray-600 text-base mb-4 leading-relaxed">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-green-600">${product.price.toFixed(2)}</span>
              <button
                onClick={handleAddToCart}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;