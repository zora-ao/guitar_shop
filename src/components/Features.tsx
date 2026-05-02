import { useQuery } from "@tanstack/react-query"
import type { Product } from "../types/product"
import { getProducts } from "../api/products"
import { Link } from "react-router-dom";
import ProductCard from "./ui/ProductCard";


const Features = () => {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['featured-products'],
    queryFn: () => getProducts('undefined', 2),
  });

  if (isLoading) return null;

  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 block mb-2">
              Selected Works
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
              Featured Instruments
            </h2>
          </div>
          
          <Link 
            to="/collection" 
            className="text-sm font-semibold border-b-2 border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-300 transition-all"
          >
            View All Collections
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features
