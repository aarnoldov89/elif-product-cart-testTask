import React, { useState, useEffect } from 'react';
import ShopsSidebar, { RatingFilter } from '../components/ShopsSidebar';
import Products from '../components/Products';
import { Shop, Product } from '../types';
import apiService from '../services/apiService';

const ShopsPage: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('all');

  useEffect(() => {
    const loadShops = async () => {
      const data = await apiService.getShops();
      setShops(data);
    };
    loadShops();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await apiService.getProducts();
      setAllProducts(data);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedShop) {
      const shopProducts = allProducts.filter(product => product.shopId === selectedShop.id);
      setProducts(shopProducts);
    } else {
      setProducts([]);
    }
  }, [selectedShop, allProducts]);

  const filteredShops = shops.filter((shop) => {
    if (ratingFilter === 'all') return true;
    if (ratingFilter === '4-5') return shop.rating >= 4.0 && shop.rating <= 5.0;
    if (ratingFilter === '3-4') return shop.rating >= 3.0 && shop.rating < 4.0;
    if (ratingFilter === '2-3') return shop.rating >= 2.0 && shop.rating < 3.0;
    return true;
  });

  useEffect(() => {
    if (selectedShop && !filteredShops.find((s) => s.id === selectedShop.id)) {
      setSelectedShop(null);
    }
  }, [ratingFilter]);

  const handleShopSelect = (shop: Shop) => {
    setSelectedShop(shop);
  };

  return (
    <div className="flex container mx-auto px-4">
      <ShopsSidebar
        shops={filteredShops}
        selectedShop={selectedShop}
        onShopSelect={handleShopSelect}
        ratingFilter={ratingFilter}
        onRatingFilterChange={setRatingFilter}
      />
      <div className="flex-1 p-6">
        {selectedShop ? (
          <Products
            selectedShop={selectedShop}
            products={products}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-600 mb-2">
                Welcome to Elif Food Delivery!
              </h2>
              <p className="text-gray-500">
                Select a shop from the sidebar to view their products
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopsPage;