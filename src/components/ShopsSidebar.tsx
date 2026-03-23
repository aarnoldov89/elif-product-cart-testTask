import React from 'react';
import { Shop } from '../types';

interface ShopsSidebarProps {
  shops: Shop[];
  selectedShop: Shop | null;
  onShopSelect: (shop: Shop) => void;
}

const ShopsSidebar: React.FC<ShopsSidebarProps> = ({ shops, selectedShop, onShopSelect }) => {
  return (
    <div className="w-64 bg-white shadow-lg h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Shops</h2>
        <div className="space-y-2">
          {shops.map((shop) => (
            <button
              key={shop.id}
              onClick={() => onShopSelect(shop)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedShop?.id === shop.id
                  ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                  : 'hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={shop.image} className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{shop.name}</h3>
                  <p className="text-xs text-gray-500 capitalize">{shop.type}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopsSidebar;