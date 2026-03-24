import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { Shop, Product } from '../types';

type SortOrder = 'price-asc' | 'price-desc' | 'name-asc';

interface ProductsProps {
  selectedShop: Shop;
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ selectedShop, products }) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('name-asc');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'price-asc') return a.price - b.price;
    if (sortOrder === 'price-desc') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  return (
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
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Products;
