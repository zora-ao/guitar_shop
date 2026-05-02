import { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ChevronDown, Filter, X } from 'lucide-react'; // Assuming you use lucide for consistency

export default function FilterSidebar() {
  const { selectedCategories, toggleCategory } = useShop();
  const [showFilter, setShowFilter] = useState(false); // Controls mobile visibility

  const categories = ['Acoustic', 'Electric', 'Bass', 'Classical'];

  return (
    <aside className="w-full md:w-64 flex flex-col gap-4 md:gap-8">
      {/* Mobile Toggle Button - Hidden on Desktop */}
      <div 
        onClick={() => setShowFilter(!showFilter)}
        className="md:hidden flex items-center justify-between p-4 border border-stone-300 rounded-sm cursor-pointer bg-white"
      >
        <div className="flex items-center gap-2">
          <Filter size={18} />
          <span className="text-sm font-semibold tracking-tight uppercase">Filters</span>
          {selectedCategories.length > 0 && (
            <span className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {selectedCategories.length}
            </span>
          )}
        </div>
        <ChevronDown 
          size={18} 
          className={`transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`} 
        />
      </div>

      {/* Filter Content - Toggleable on mobile, always visible on desktop */}
      <div className={`${showFilter ? 'block' : 'hidden'} md:block transition-all duration-300`}>
        <h2 className="hidden md:block text-2xl font-semibold tracking-tight mb-8 uppercase">Filters</h2>
        
        <div className="border border-stone-300 p-6 rounded-sm bg-white">
          <h3 className="font-bold text-sm mb-4">Category</h3>
          <div className="flex flex-col gap-3">
            {categories.map((item) => (
              <label key={item} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  value={item}
                  checked={selectedCategories.includes(item)}
                  onChange={() => toggleCategory(item)}
                  className="w-4 h-4 border-stone-300 rounded focus:ring-0 accent-black"
                />
                <span className="text-sm text-stone-600 group-hover:text-black transition-colors">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}