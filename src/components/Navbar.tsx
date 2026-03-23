import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Elif Food Delivery
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="hover:text-blue-200 transition-colors"
            >
              Shops
            </Link>
            <Link 
              to="/cart" 
              className="hover:text-blue-200 transition-colors flex items-center"
            >
              Cart 
              {totalItems > 0 && (
                <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;