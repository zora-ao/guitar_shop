import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, category, images } = product;

  return (
    <Link to={`/product/${id}`} className="group block">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-stone-100 rounded-xl aspect-[4/5] mb-4">
        {/* Main Image */}
        <img 
          src={product.images[0]} 
          className={`w-full h-full object-cover transition-opacity duration-500 ${product.images.length > 1 ? 'group-hover:opacity-0' : ''}`}
        />
        
        {/* Secondary Image (Revealed on Hover) */}
        {product.images.length > 1 && (
          <img 
            src={images[1]} 
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100"
          />
        )}
      </div>

      {/* Product Info - Stacked Column */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-stone-800">{name}</h3>
        <p className="text-xs text-stone-500 uppercase tracking-wider">{category}</p>
        <p className="text-sm font-bold text-stone-900">${price}</p>
      </div>
    </Link>
  );
}

export default ProductCard