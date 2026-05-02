import { useState } from 'react';
import ProductCard from '../ui/ProductCard'
import { useShop } from '../../context/ShopContext';
import LoadingSpinner from '../../utils/LoadingSpinner';

export default function CollectionContent() {
  const [sortOrder, setSortOrder] = useState('relevant');
  const { products, search, showSearch, isLoading, selectedCategories } = useShop();

  // Filter by both search input and sidebar categories
  const filteredProducts = products.filter((item) => {
    // 1. Search Filter
    const matchesSearch = !showSearch || search === "" || 
      item.name.toLowerCase().includes(search.toLowerCase());

    // 2. Category Filter (Matches if no categories are selected OR if the item's category is in the list)
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(item.category);

    return matchesSearch && matchesCategory;
  });


  const finalDisplayProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'low-to-high') return a.price - b.price;
    if (sortOrder === 'high-to-low') return b.price - a.price;
    return 0; // 'relevant' (default order from API)
  });
  
  if (isLoading) {
    return <LoadingSpinner message="Tuning our instruments..." />;
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

      {/* 1. Empty State Check */}
      {finalDisplayProducts.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          No instruments found in our collection.
        </div>
      ) : (
        /* 2. THE MISSING GRID: This is why products weren't showing! */
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {finalDisplayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}