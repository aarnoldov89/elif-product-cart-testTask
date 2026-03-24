import React, { useState, useEffect } from 'react';
import ShopsSidebar, { RatingFilter } from '../components/ShopsSidebar';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Shop, Product } from '../types';
import apiService from '../services/apiService';

type SortOrder = 'price-asc' | 'price-desc' | 'name-asc';

const ShopsPage: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('name-asc');
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

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'price-asc') return a.price - b.price;
    if (sortOrder === 'price-desc') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  const handleShopSelect = (shop: Shop) => {
    setSelectedShop(shop);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
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
          <>
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{selectedShop.name}</h1>
                <p className="text-gray-600 capitalize">
                  {selectedShop.type} • {products.length} items available
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <label htmlFor="sort-select" className="text-sm font-medium text-gray-600 whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
                >
                  <option value="name-asc">Name (A → Z)</option>
                  <option value="price-asc">Price (Low → High)</option>
                  <option value="price-desc">Price (High → Low)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onView={() => handleViewProduct(product)} />
              ))}
            </div>
          </>
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
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ShopsPage;