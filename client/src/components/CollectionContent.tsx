import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from './ProductCard';
import { type Product } from '../types/product';
import { getProducts } from '../api/products';

export default function CollectionContent() {
  const [sortOrder, setSortOrder] = useState('relevant');

  const {data: products = [], isLoading} = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder == 'low-to-high') return a.price - b.price;
    if (sortOrder == 'high-to-low') return b.price - a.price;
    return 0;
  });

  if (isLoading) {
    return (
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 bg-stone-100 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-serif">All Collections</h1>
        
        <div className="relative">
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none bg-white border border-stone-300 px-4 py-2 pr-10 rounded-sm text-sm focus:outline-none focus:border-black cursor-pointer">
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low-to-high'>Sort by: Low to High</option>
            <option value='high-to-low'>Sort by: High to Low</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="black" strokeWidth="1.5"/></svg>
          </div>
        </div>
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-20 text-stone-400">
          No instruments found in our collection.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <div key={product.id} className="border border-stone-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}