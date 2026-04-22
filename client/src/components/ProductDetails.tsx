import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { type Product } from "../types/product";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, ShoppingCart } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const ProductDetails = () => {
    const {addToCart} = useCart(); 
    const {user} = useAuth();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const {data: product, isLoading} = useQuery<Product>({
            queryKey: ['product', id],
            queryFn: async () => {
                const res = await fetch(`http://localhost:5000/api/products/${id}`);
                return res.json();
            },
        });

    const {data: relatedProducts = []} = useQuery<Product[]>({
            queryKey: ['related-products', product?.category],
            enabled: !!product?.category,
            queryFn: async () => {
                const res = await fetch(`http://localhost:5000/api/products?category=${product?.category}&limit=4`);
                return res.json();
            }
        });


    const handleAddToCart = async() => {
        if (!product) return;

        addToCart(product, quantity);
        if (user) {
            try {
                await fetch("http://localhost:5000/api/cart/sync", {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify([{
                        id: product.id,
                        quantity: quantity
                    }]), 
                    credentials: 'include'
                });
                
            } catch (error) {
                console.error("Sync Error:", error);
            }
        } 
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);


    if (isLoading) return <div className="p-20 text-center animate-pulse">Loading Instrument...</div>;
    if (!product) return <div className="p-20 text-center">Instrument not found.</div>;

    return (
    <div className="min-h-screen bg-[#FDFCFA] pb-20">
        <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
            
            {/* Breadcrumbs */}
            <nav className="text-xs text-stone-400 mb-8 uppercase tracking-widest">
            <Link to="/" className="hover:text-black">Home</Link> / 
            <Link to="/collection" className="mx-2 hover:text-black">Collection</Link> / 
            <span className="text-stone-800 ml-1">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Left Side: Large Image */}
            <div className="bg-white border border-stone-200 rounded-xl p-8 flex items-center justify-center min-h-[400px] md:min-h-[600px]">
                <img 
                src={product.image_url} 
                alt={product.name} 
                className="max-h-[500px] w-full object-contain hover:scale-105 transition-transform duration-500" 
                />
            </div>

            {/* Right Side: Info */}
            <div className="flex flex-col gap-6">
                <div>
                <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-2">{product.name}</h1>
                <p className="text-2xl font-bold text-stone-800">${product.price}</p>
                </div>

                <p className="text-stone-500 leading-relaxed max-w-lg">
                {product.description || "Lorem ipsum dolor sit amet consectetur. Tristique lobortis phasellus viverra pretium tempus dignissim consequat consectetur vitae."}
                </p>

            <div className="flex flex-col gap-4">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Select Quantity</p>
                <div className="flex items-center border border-stone-200 w-fit rounded-sm overflow-hidden bg-white">
                    <button 
                    onClick={handleDecrement}
                    className="px-4 py-2 hover:bg-stone-50 text-stone-600 transition-colors border-r border-stone-200"
                    >
                    −
                    </button>
                    <span className="px-8 py-2 text-sm font-medium min-w-[60px] text-center">
                    {quantity}
                    </span>
                    <button 
                    onClick={handleIncrement}
                    className="px-4 py-2 hover:bg-stone-50 text-stone-600 transition-colors border-l border-stone-200"
                    >
                    +
                    </button>
                </div>
            </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-white border border-black text-black py-4 rounded-sm text-xs font-bold hover:bg-stone-50 transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart size={16} />
                    ADD TO CART
                </button>
                <button className="flex-1 bg-black text-white py-4 rounded-sm text-xs font-bold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2">
                    <CreditCard size={16} />
                    BUY NOW
                </button>
                </div>

                {/* Trust Badges */}
                <div className="border-t border-stone-200 pt-8 mt-4 grid grid-cols-2 gap-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    In Stock & Ready to Ship
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-stone-300 rounded-full" />
                    Free 30-Day Returns
                </div>
                </div>
            </div>
            </div>

            {/* Related Products Section */}
            <section className="mt-32">
            <h2 className="text-3xl font-serif mb-10 text-center md:text-left">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
