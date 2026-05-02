import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { type Product } from "../types/product";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, LifeBuoy, ShieldCheck, ShoppingCart, Store, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import ProductCard from "../components/ui/ProductCard";
import { Button } from "../components/ui/Button";
import { getProducts, getProductsById } from "../api/products";
import LoadingSpinner from "../utils/LoadingSpinner";

const ProductDetails = () => {
    const {addToCart, cart} = useCart(); 
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    

    const {data: product, isLoading} = useQuery<Product>({
            queryKey: ['product', id],
            queryFn: () => getProductsById(id!),
            enabled: !!id
        });

    const [activeImgIndex, setActiveImgIndex] = useState(0);

    const {data: relatedProducts = []} = useQuery<Product[]>({
            queryKey: ['related-products', product?.category],
            enabled: !!product?.category,
            queryFn: () => getProducts(product?.category, 4),
        });
    
    useEffect(() => {
        window.scrollTo(0, 0);
        setQuantity(1);
        setActiveImgIndex(0);
    }, [id]);

    const handleIncrement = () => {
        if (!product) return;

        if (quantity >= product.stock) {
            toast.info(`Only ${product.stock} units available.`);
            return;
        }
        setQuantity(prev => prev + 1);
    }
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));


    const handleAddToCart = async(product: Product, quantity: number) => {
        if (isProcessing) return; 
        setIsProcessing(true);

        try {
            if (!product || product.stock <= 0) {
                toast.error("This item is currently out of stock.");
                return;
            }

            const existingCartItem = cart.find(item => item.product.id == product.id);
            const currentCartQty = existingCartItem ? existingCartItem.quantity : 0;

            if (currentCartQty + quantity > product.stock){
                toast.error(`You already have ${currentCartQty} in cart. Only ${product.stock - currentCartQty} more available.`);
                return;
            }

            await addToCart(product, quantity);

        } catch (error) {
            console.error("Add to cart error:", error);
            toast.error("Failed to add item to cart.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (isLoading) return <LoadingSpinner message="Loading instruments..." />
    if (!product) return <div className="p-20 text-center">Instrument not found.</div>;

    const gallery = product.images && product.images.length > 0
            ? product.images
            : [product.image_url];

    return (
    <div className="min-h-screen bg-[#FDFCFA] pb-20">
        <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Left Side: Gallery */}
            <div className="flex flex-col-reverse md:flex-row gap-4">
                {/* THUMBNAILS - Column on Desktop, Row on Mobile */}
                {gallery.length > 1 && (
                    <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 md:w-24">
                        {gallery.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveImgIndex(index)}
                                className={`aspect-square w-20 md:w-full rounded-lg border-2 overflow-hidden bg-white p-1 transition-all shrink-0 ${
                                    activeImgIndex === index 
                                    ? 'border-stone-800 opacity-100' 
                                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-stone-200'
                                }`}
                            >
                                <img 
                                    src={img} 
                                    alt={`${product.name} thumbnail ${index + 1}`} 
                                    className="w-full h-full object-contain"
                                />
                            </button>
                        ))}
                    </div>
                )}

                {/* MAIN IMAGE BOX */}
                <div className="flex-1 bg-white border border-stone-200 rounded-xl p-8 flex items-center justify-center min-h-[350px] md:min-h-[500px] relative overflow-hidden">
                    <img 
                        src={gallery[activeImgIndex]} 
                        alt={product.name} 
                        key={activeImgIndex}
                        className="max-h-[450px] w-full object-contain transition-all duration-500 animate-in fade-in zoom-in-95" 
                    />
                    
                    {/* Optional: Zoom indicator or subtle "Best Seller" tag if applicable */}
                    {product.stock > 0 && product.stock <= 5 && (
                        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-orange-100">
                            <p className="text-[10px] font-bold text-orange-600 tracking-tighter">LIMITED STOCK</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Info */}
            <div className="flex flex-col gap-6">
                <div>
                    <h2 className="text-4xl md:text-4xl font-serif text-stone-900 mb-2">{product.name}</h2>
                    <div className="flex items-center gap-4">
                        <p className="text-2xl font-bold text-stone-800">${product.price}</p>
                        
                        {/* NEW: Stock Status Badge */}
                        {product.stock > 0 ? (
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${
                                product.stock <= 5 ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                            }`}>
                                {product.stock <= 5 ? `Only ${product.stock} left` : 'In Stock'}
                            </span>
                        ) : (
                            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-red-50 text-red-600 rounded-sm">
                                Out of Stock
                            </span>
                        )}
                    </div>
                </div>


                <p className="text-stone-500 leading-relaxed max-w-lg">
                {product.description || "Lorem ipsum dolor sit amet consectetur. Tristique lobortis phasellus viverra pretium tempus dignissim consequat consectetur vitae."}
                </p>

                {product.stock > 0 && product.stock <= 3 && (
                <div className="bg-orange-50 border border-orange-100 p-3 rounded-md">
                    <p className="text-orange-700 text-xs font-medium">
                        🔥 Fast selling! Only {product.stock} items left in stock.
                    </p>
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Select Quantity</p>
                    <div className="flex items-center border border-stone-200 w-fit rounded-sm overflow-hidden bg-white">
                        <button 
                            onClick={handleDecrement}
                            className="px-4 py-2 hover:bg-stone-50 text-stone-600 transition-colors border-r border-stone-200">
                            −
                        </button>
                        <span className="px-8 py-2 text-sm font-medium min-w-[60px] text-center">
                        {quantity}
                        </span>
                        <button 
                            onClick={handleIncrement}
                            disabled={product.stock === 0 || quantity >= product.stock}
                            className="px-4 py-2 hover:bg-stone-50 text-stone-600 transition-colors border-l border-stone-200">
                            +
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button
                    onClick={() => handleAddToCart(product, quantity)}
                        variant="outline"
                        disabled={product.stock === 0 || isProcessing}
                        className="flex-1 py-4 flex items-center justify-center gap-2"
                        >
                        <ShoppingCart size={16} />
                        {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
                    </Button>
                    <Button 
                        variant="primary"
                        disabled={product.stock === 0}
                        className="flex-1 py-4 flex items-center justify-center gap-2"
                    >
                        <CreditCard size={16} />
                        BUY NOW
                    </Button>
                </div>

                <div className="mt-0 pt-10 border-t border-stone-100 grid grid-cols-2 gap-y-8 gap-x-4">
                    {/* Fast Shipping */}
                    <div className="flex gap-3">
                        <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center shrink-0">
                            <Truck size={30} className="text-stone-600" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-tight text-stone-800">Fast Shipping</h4>
                            <p className="text-[11px] text-stone-500 mt-0.5">Carrier information</p>
                        </div>
                    </div>

                    {/* Store Pickup */}
                    <div className="flex gap-3">
                        <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center shrink-0">
                            <Store size={30} className="text-stone-600" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-tight text-stone-800">Store Pickup</h4>
                            <p className="text-[11px] text-stone-500 mt-0.5">Pick-up at your preferred store</p>
                        </div>
                    </div>

                    {/* 24/7 Support */}
                    <div className="flex gap-3">
                        <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center shrink-0">
                            <LifeBuoy size={30} className="text-stone-600" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-tight text-stone-800">24/7 Support</h4>
                            <p className="text-[11px] text-stone-500 mt-0.5">Unlimited help desk</p>
                        </div>
                    </div>

                    {/* Warranty */}
                    <div className="flex gap-3">
                        <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center shrink-0">
                            <ShieldCheck size={30} className="text-stone-600" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-tight text-stone-800">Warranty</h4>
                            <p className="text-[11px] text-stone-500 mt-0.5">7 Days after purchase</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {/* Related Products Section */}
            <section className="mt-32">
            <h2 className="text-3xl font-serif mb-10 text-center md:text-left">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.filter(p => p.id !== product.id).slice(0, 4).map(item => (
                <ProductCard key={item.id} product={item} />
                ))}
            </div>
            </section>
        </main>
        </div>
    );
}

export default ProductDetails
