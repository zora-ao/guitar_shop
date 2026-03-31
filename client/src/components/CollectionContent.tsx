import { ProductCard } from './ProductCard';
import { Products } from '../data/products';

export default function CollectionContent() {
  return (
    <div className="flex-1">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-serif">All Collections</h1>
        
        <div className="relative">
          <select className="appearance-none bg-white border border-stone-300 px-4 py-2 pr-10 rounded-sm text-sm focus:outline-none focus:border-black cursor-pointer">
            <option>Sort by: Low to High</option>
            <option>Sort by: High to Low</option>
            <option>Sort by: Newest</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="black" strokeWidth="1.5"/></svg>
          </div>
        </div>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Products.map((product) => (
          <div key={product.id} className="border border-stone-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}