export default function FilterSidebar() {
  const categories = ["Acoustic", "Electric", "Acoustic-Electric"];

  return (
    <aside className="w-full md:w-64 flex flex-col gap-8">
      <h2 className="text-2xl font-semibold tracking-tight">FILTERS</h2>
      
      <div className="border border-stone-300 p-6 rounded-sm">
        <h3 className="font-bold text-sm mb-4">Category</h3>
        <div className="flex flex-col gap-3">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 border-stone-300 rounded focus:ring-0 accent-black"
              />
              <span className="text-sm text-stone-600 group-hover:text-black transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}