import React from 'react';
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
  return (
    <div className="w-64 bg-white shadow-lg h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Shops</h2>
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
                    <p className="text-xs text-gray-500 capitalize mb-0.5">{shop.type}</p>
                    <StarRating rating={shop.rating} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopsSidebar;