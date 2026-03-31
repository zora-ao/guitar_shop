import { type Product } from '../data/products';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isBestSeller = product.isBestSeller;

  return (
    <div className={`${isBestSeller ? 'bg-[#EADECA]' : 'bg-[#EFEFEF]'} rounded-xl p-5 flex flex-col justify-between min-h-[350px]`}>
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-stone-900">{product.name}</h3>
            {isBestSeller && <p className="text-xs font-semibold text-stone-600">Best seller</p>}
          </div>
          <p className="font-bold text-stone-800 text-sm">{product.price}</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <img src={product.image} alt={product.name} className="max-h-48 object-contain" />
      </div>
    </div>
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