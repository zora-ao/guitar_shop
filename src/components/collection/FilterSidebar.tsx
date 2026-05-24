import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Filter, X } from 'lucide-react';

export default function FilterSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);

  /* 1. Expand the array to fully support your 6 clean guitar families */
  const categories = ['Acoustic', 'Electric', 'Bass', 'Hollowbody', 'Classical', 'Custom Shop'];

  /* 2. Read current active types directly from the URL query strings */
  const selectedCategories = searchParams.getAll('type');

  const handleCategoryChange = (category: string) => {
    const lowerCategory = category.toLowerCase().replace(' ', '-');
    const currentParams = new URLSearchParams(searchParams);
    
    // Get all currently active category parameters
    const activeParams = currentParams.getAll('type');

    if (activeParams.includes(lowerCategory)) {
      // If it's already checked, remove it from the URL array parameters
      const updatedParams = activeParams.filter(item => item !== lowerCategory);
      currentParams.delete('type');
      updatedParams.forEach(item => currentParams.append('type', item));
    } else {
      // If it's not checked, append it to the URL array parameters
      currentParams.append('type', lowerCategory);
    }

    setSearchParams(currentParams);
  };

  const clearAllFilters = () => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.delete('type');
    setSearchParams(currentParams);
  };

  return (
    <aside className="w-full md:w-60 flex flex-col gap-4 select-none">
      {/* Mobile Toggle Trigger */}
      <div 
        onClick={() => setShowFilter(!showFilter)}
        className="md:hidden flex items-center justify-between p-4 border border-stone-200 rounded-xl cursor-pointer bg-white shadow-xs"
      >
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-black" />
          <span className="text-xs font-bold tracking-wider uppercase text-black">Filters</span>
          {selectedCategories.length > 0 && (
            <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
              {selectedCategories.length}
            </span>
          )}
        </div>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-300 text-stone-600 ${showFilter ? 'rotate-180' : ''}`} 
        />
      </div>

      {/* Filter Card Container */}
      <div className={`${showFilter ? 'block' : 'hidden'} md:block`}>
        <div className="bg-white border border-stone-200 p-5 rounded-xl shadow-xs">
          
          {/* Header Title with Muted Clear-All Option */}
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-stone-100">
            <h3 className="font-bold text-[10px] tracking-widest uppercase text-black">Category</h3>
            {selectedCategories.length > 0 && (
              <button 
                onClick={clearAllFilters}
                className="text-[9px] font-bold uppercase text-stone-400 hover:text-black transition-colors flex items-center gap-1"
              >
                Clear <X size={10} />
              </button>
            )}
          </div>

          {/* Interactive Checkbox List */}
          <div className="flex flex-col gap-3">
            {categories.map((item) => {
              const urlValue = item.toLowerCase().replace(' ', '-');
              const isChecked = selectedCategories.includes(urlValue);

              return (
                <label key={item} className="flex items-center justify-between cursor-pointer group py-0.5">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      value={urlValue}
                      checked={isChecked}
                      onChange={() => handleCategoryChange(item)}
                      className="w-4 h-4 border-stone-300 rounded text-black bg-white focus:ring-0 checked:bg-black accent-black cursor-pointer"
                    />
                    <span className={`text-xs transition-colors duration-200 ${isChecked ? 'text-black font-semibold' : 'text-stone-500 group-hover:text-black'}`}>
                      {item}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}