import { Link } from 'react-router-dom';
import { type Product } from './CollectionContent';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isBestSeller = product.isBestSeller;

  return (
    /* Wrap everything in a Link pointing to the product's unique ID */
    <Link
      to={`/product/${product.id}`} 
      className="block no-underline"
    >
      <div className={`group relative ${isBestSeller ? 'bg-[#EADECA]' : 'bg-[#EFEFEF]'} rounded-xl p-6 flex flex-col justify-between min-h-[280px] transition-all duration-300 hover:shadow-lg cursor-pointer`}>

        {/* Top Section: Name and Price */}
        <div className="flex justify-between items-start z-10">
          <div>
            <h3 className="font-bold text-[18px] text-stone-900 leading-tight">{product.name}</h3>
            {isBestSeller && (
              <span className="inline-block mt-1 bg-black/5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-stone-600">
                Best seller
              </span>
            )}
          </div>
          <p className="text-stone-800 text-sm">${product.price}</p>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center p-0 relative">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="max-h-44 w-full object-contain transform transition-transform duration-500 group-hover:scale-110" 
          />
        </div>

        {/* Hover Action */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black text-white p-2 rounded-full shadow-lg">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ProductSection({ products }: { products: Product[] }) {
  const bestSeller = products.find(p => p.isBestSeller);
  const regularProducts = products.filter(p => !p.isBestSeller);

  return (
    <section className="px-6 md:px-12 py-16 bg-[#FDFCFA]">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold font-serif">What's New</h2>
        <p className="text-stone-500 text-sm mt-2 max-w-xl mx-auto">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Large Best Seller Card */}
        {bestSeller && (
          <div className="md:col-span-1">
            <ProductCard product={bestSeller} />
          </div>
        )}

        {/* Other Products */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {regularProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Carousel Controls & Button */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-2">
          <button className="border border-stone-300 p-2 rounded-full hover:bg-stone-100">
            <ArrowLeft size={16} />
          </button>
          <button className="border border-stone-300 p-2 rounded-full hover:bg-stone-100">
            <ArrowRight size={16} />
          </button>
        </div>
        <button className="bg-black text-white px-6 py-2 rounded-full text-xs font-semibold hover:bg-stone-800">
          Collections
        </button>
      </div>
    </section>
  );
}