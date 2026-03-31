import { useState } from 'react';

export default function AdminAddProducts() {
  // State management example (simplified)
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: 'Acoustic',
    price: '',
    isBestSeller: false,
  });
  const categories = ["Acoustic", "Electric", "Acoustic-Electric"];

  return (
    <div className="p-10 flex gap-12 bg-[#FDFCFA]">
      
      {/* 1. Upload Section */}
      <div className="flex flex-col gap-4 items-center">
        <h3 className="text-xl font-medium">Upload Image</h3>
        <label htmlFor="file-upload" className="w-[100px] h-[100px] border-2 border-dashed border-stone-300 bg-[#EFEFEF] rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer group hover:border-black transition">
          <svg className="text-stone-400 group-hover:text-black" width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M12 16V8M12 8L9 11M12 8L15 11" stroke="currentColor" strokeWidth="2"/><path d="M4 17V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V17" stroke="currentColor" strokeWidth="2"/></svg>
          <span className="text-sm text-stone-500 font-medium group-hover:text-black">Upload</span>
          <input id="file-upload" type="file" className="hidden" />
        </label>
      </div>

      {/* 2. Form Section */}
      <div className="flex-1 max-w-2xl space-y-2 pt-1">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Product name</label>
          <input type="text" placeholder="Type here" className="w-full border border-stone-300 rounded-sm px-4 py-2 text-sm focus:border-black" />
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Product Description</label>
          <textarea placeholder="Write content here" rows={5} className="w-full border border-stone-300 rounded-sm px-4 py-2 text-sm focus:border-black"></textarea>
        </div>

        {/* Category & Price Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Product category</label>
            <div className="relative">
              <select className="w-full appearance-none border border-stone-300 px-4 py-2 pr-10 rounded-sm text-sm focus:border-black cursor-pointer">
                {categories.map(cat => <option key={cat}>{cat}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5"/></svg>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Product price</label>
            <input type="text" placeholder="25" className="w-full border border-stone-300 rounded-sm px-4 py-2 text-sm focus:border-black" />
          </div>
        </div>

        {/* Best Seller Checkbox */}
        <label className="flex items-center gap-3 cursor-pointer group mt-4">
          <input type="checkbox" className="w-4 h-4 border-stone-300 rounded focus:ring-0 accent-black" />
          <span className="text-sm font-medium text-stone-600 group-hover:text-black transition-colors">Add to best seller</span>
        </label>

        {/* Add Button */}
        <button className="bg-black text-white px-10 py-4 mt-4 rounded w-full text-sm font-semibold hover:bg-stone-800 transition">
          ADD
        </button>
      </div>
    </div>
  );
}