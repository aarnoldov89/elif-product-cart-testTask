import React, { useState, useEffect } from 'react';
import ShopsSidebar from '../components/ShopsSidebar';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Shop, Product } from '../types';
import apiService from '../services/apiService';
import mockData from '../mock-data.json';

const ShopsPage: React.FC = () => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const shops: Shop[] = mockData.shops;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await apiService.getProducts();
        setAllProducts(data);
      } catch (error) {
        console.log('⚠️ Using mock products fallback');
        setAllProducts(mockData.products as Product[]);
      }
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
        shops={shops}
        selectedShop={selectedShop}
        onShopSelect={handleShopSelect}
      />
      <div className="flex-1 p-6">
        {selectedShop ? (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">{selectedShop.name}</h1>
              <p className="text-gray-600 capitalize">
                {selectedShop.type} • {products.length} items available
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
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