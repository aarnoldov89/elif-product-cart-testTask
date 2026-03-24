import React, { useState } from 'react';
import { Shop } from '../types';

export type RatingFilter = 'all' | '4-5' | '3-4' | '2-3';

interface ShopsSidebarProps {
  shops: Shop[];
  selectedShop: Shop | null;
  onShopSelect: (shop: Shop) => void;
  ratingFilter: RatingFilter;
  onRatingFilterChange: (filter: RatingFilter) => void;
}

function StarRating({ rating }: { rating: number }) {
  const rounded = Math.round(rating * 2) / 2; // round to nearest 0.5
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const full = i < Math.floor(rounded);
        const half = !full && i < rounded;
        return (
          <span
            key={i}
            className={full || half ? 'text-yellow-400' : 'text-gray-300'}
            style={{ fontSize: '11px', lineHeight: 1 }}
          >
            {full ? '★' : half ? '⯨' : '★'}
          </span>
        );
      })}
      <span className="text-gray-500 text-xs ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

const RATING_FILTER_OPTIONS: { value: RatingFilter; label: string }[] = [
  { value: 'all', label: 'All ratings' },
  { value: '4-5', label: '★ 4.0 – 5.0' },
  { value: '3-4', label: '★ 3.0 – 4.0' },
  { value: '2-3', label: '★ 2.0 – 3.0' },
];

const ShopsSidebar: React.FC<ShopsSidebarProps> = ({
  shops,
  selectedShop,
  onShopSelect,
  ratingFilter,
  onRatingFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShopSelect = (shop: Shop) => {
    onShopSelect(shop);
    setIsOpen(false);
  };

  const filterAndList = (
    <>
      <div className="mb-4">
        <label htmlFor="rating-filter" className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
          Filter by rating
        </label>
        <select
          id="rating-filter"
          value={ratingFilter}
          onChange={(e) => onRatingFilterChange(e.target.value as RatingFilter)}
          className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
        >
          {RATING_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      {shops.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">No shops match this rating.</p>
      ) : (
        <div className="space-y-2">
          {shops.map((shop) => (
            <button
              key={shop.id}
              onClick={() => handleShopSelect(shop)}
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
                  <p className="text-xs text-gray-500 capitalize mb-0.5">{shop.type}</p>
                  <StarRating rating={shop.rating} />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile dropdown */}
      <div className="md:hidden w-full relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-white shadow-md px-4 py-3 border-b border-gray-200"
        >
          <div className="flex items-center gap-3">
            {selectedShop ? (
              <>
                <img src={selectedShop.image} className="w-8 h-8 object-cover rounded-full" />
                <span className="font-medium text-gray-800">{selectedShop.name}</span>
                <StarRating rating={selectedShop.rating} />
              </>
            ) : (
              <span className="text-gray-500">Select a shop</span>
            )}
          </div>
          <span className="text-gray-400 text-sm">{isOpen ? '▲' : '▼'}</span>
        </button>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute top-full left-0 right-0 z-50 bg-white shadow-lg max-h-[60vh] overflow-y-auto">
              <div className="p-4">{filterAndList}</div>
            </div>
          </>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block w-64 bg-white shadow-lg h-[calc(100vh-4rem)] overflow-y-auto shrink-0">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Shops</h2>
          {filterAndList}
        </div>
      </div>
    </>
  );
};

export default ShopsSidebar;