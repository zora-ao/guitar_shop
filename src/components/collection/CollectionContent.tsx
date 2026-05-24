import { useState } from 'react';
import ProductCard from '../ui/ProductCard'
import { useShop } from '../../context/ShopContext';
import LoadingSpinner from '../../utils/LoadingSpinner';
import { useSearchParams } from 'react-router-dom';

export default function CollectionContent() {
  const [sortOrder, setSortOrder] = useState('relevant');
  const [searchParams] = useSearchParams();

  const { products, search, showSearch, isLoading } = useShop();

  const urlCategories = searchParams.getAll('type');

  // Filter by both search input and sidebar categories
  const filteredProducts = products.filter((item) => {
    // 1. Search Filter
    const matchesSearch = !showSearch || search === "" || 
      item.name.toLowerCase().includes(search.toLowerCase());

    const itemCategoryUrlFriendly = item.category.toLowerCase().replace(' ', '-');
    const matchesCategory = urlCategories.length === 0 || 
      urlCategories.includes(itemCategoryUrlFriendly);

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
    <div className="flex-1 min-h-screen">
      {/* Header Area styled with a sharp studio layout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-stone-100 pb-4">
        <div>
          <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-black">
            Guitar Collection
          </h1>
          <p className="text-[10px] text-stone-400 uppercase tracking-wider mt-1">
            Showing {finalDisplayProducts.length} {finalDisplayProducts.length === 1 ? 'Instrument' : 'Instruments'}
          </p>
        </div>
        
        {/* Sleek Custom Select Box Wrapper */}
        <div className="relative w-full sm:w-auto">
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full sm:w-auto appearance-none bg-white border border-stone-200 px-4 py-2 pr-10 rounded-xl text-xs font-semibold tracking-wider uppercase text-stone-700 focus:outline-none focus:border-black cursor-pointer shadow-xs transition-colors"
          >
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low-to-high'>Price: Low to High</option>
            <option value='high-to-low'>Price: High to Low</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Product Display State Handling */}
      {finalDisplayProducts.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-stone-200 rounded-xl bg-stone-50/50">
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
            No instruments match the selected criteria.
          </p>
        </div>
      ) : (
        /* Responsive Grid matching your minimalist look */
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {finalDisplayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}