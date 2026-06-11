import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, category, images } = product;

  // Format price with commas. If it's an integer, don't force decimal places.
  const formattedPrice = Number(price).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return (
    <Link to={`/product/${id}`} className="group block">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-stone-100 rounded-xl aspect-[4/5] mb-4">
        {/* Main Image */}
        <img 
          src={images[0] || '/placeholder'} 
          alt={name}
          className={`w-full h-full object-cover transition-opacity duration-500 ${images.length > 1 ? 'group-hover:opacity-0' : ''}`}
        />
        
        {/* Secondary Image (Revealed on Hover) */}
        {images.length > 1 && (
          <img 
            src={images[1]} 
            alt={`${name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100"
          />
        )}
      </div>

      {/* Product Info - Stacked Column */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-stone-800">{name}</h3>
        <p className="text-xs text-stone-500 uppercase tracking-wider">{category}</p>
        {/* Render formatted price here */}
        <p className="text-sm font-bold text-stone-900">₱{formattedPrice}</p>
      </div>
    </Link>
  );
}

export default ProductCard;