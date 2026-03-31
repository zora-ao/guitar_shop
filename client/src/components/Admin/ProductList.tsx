import React from 'react';
import { X } from 'lucide-react'; // Using Lucide for the delete icon

// Mock data based on your screenshot
const products = [
  { id: 1, name: "Kid Tapered Slim Fit Trouser", category: "Kids", price: 38, image: "https://via.placeholder.com/50" },
  { id: 2, name: "Men Round Neck Pure Cotton T-shirt", category: "Men", price: 64, image: "https://via.placeholder.com/50" },
  { id: 3, name: "Boy Round Neck Pure Cotton T-shirt", category: "Kids", price: 60, image: "https://via.placeholder.com/50" },
  { id: 4, name: "Women Zip-Front Relaxed Fit Jacket", category: "Women", price: 74, image: "https://via.placeholder.com/50" },
  { id: 5, name: "Men Tapered Fit Flat-Front Trousers", category: "Men", price: 58, image: "https://via.placeholder.com/50" },
];

const ProductList: React.FC = () => {
  return (
    <div className="p-8 w-full max-w-6xl">
      <h2 className="text-xl font-medium text-stone-600 mb-6">All Products List</h2>

      {/* Table Container */}
      <div className="border border-stone-200 rounded-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[100px_1fr_150px_100px_100px] bg-stone-50 border-b border-stone-200 py-3 px-4">
          <span className="font-bold text-stone-800 text-sm">Image</span>
          <span className="font-bold text-stone-800 text-sm">Name</span>
          <span className="font-bold text-stone-800 text-sm">Category</span>
          <span className="font-bold text-stone-800 text-sm">Price</span>
          <span className="font-bold text-stone-800 text-sm text-center">Action</span>
        </div>

        {/* Table Body */}
        <div className="flex flex-col">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="grid grid-cols-[100px_1fr_150px_100px_100px] items-center py-2 px-4 border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors"
            >
              {/* Product Image */}
              <div className="w-12 h-12 bg-stone-100 rounded-sm overflow-hidden border border-stone-200">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Product Name */}
              <span className="text-sm text-stone-600 font-medium">
                {product.name}
              </span>

              {/* Category */}
              <span className="text-sm text-stone-600">
                {product.category}
              </span>

              {/* Price */}
              <span className="text-sm text-stone-600 font-medium">
                ${product.price}
              </span>

              {/* Action (Delete) */}
              <div className="flex justify-center">
                <button className="text-stone-400 hover:text-red-500 transition-colors p-1">
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;