import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
    const context = useCart();
    const { user } = useAuth();
    

    // 1. Safety Check: If context is undefined, show a clear message
    if (!context) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-stone-500">Error: CartProvider not found. Check App.tsx or main.tsx.</p>
            </div>
        );
    }

    // 2. Destructure with solid fallbacks
    const { 
        cart = [], 
        removeFromCart = () => {}, 
        updateQuantity = () => {}, 
        cartTotal = 0 
    } = context;

    // 3. Logic Safety
    const shippingFee = cart.length > 0 ? 10.00 : 0;
    const finalTotal = (cartTotal || 0) + shippingFee;

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-serif text-stone-800">Your cart is empty</h2>
                <Link to="/collection" className="text-sm font-bold underline uppercase tracking-widest">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCFA] py-12 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-serif text-stone-900 mb-10">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Side: Items List */}
                    <div className="lg:col-span-2 space-y-8">
                        {cart.map((item) => (
                                <div key={item.id} className="flex gap-6 pb-8 border-b border-stone-200 group">
                                    {/* Product Image */}
                                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white border border-stone-100 rounded-sm p-2 flex-shrink-0">
                                        <img 
                                            src={ item.product?.images?.[0] || item.product?.image_url || item.product.image_url || "/placeholder-image.png"} 
                                            alt={item.product?.name || "Product"} 
                                            className="w-full h-full object-contain" 
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-medium text-stone-900">{item.product.name || "Unnamed Product"}</h3>
                                                {/* Safety: toFixed(2) will crash if item.price is undefined */}
                                                <p className="text-stone-500 text-sm mt-1">
                                                    ${(item.product.price || 0).toFixed(2)}
                                                </p>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.product?.id)}
                                                className="text-stone-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center border border-stone-200 w-fit rounded-sm bg-white mt-4">
                                            <button 
                                                onClick={() => updateQuantity(item.product.id, (item.quantity || 1) - 1)}
                                                disabled={item.quantity <= 1}
                                                className="px-3 py-1 hover:bg-stone-50 text-stone-600"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="px-6 py-1 text-sm font-medium min-w-[40px] text-center">
                                                {item.quantity || 1}
                                            </span>
                                            <button 
                                                onClick={() => updateQuantity(item.product.id, (item.quantity || 1) + 1)}
                                                className="px-3 py-1 hover:bg-stone-50 text-stone-600"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                        ))}
                    </div>

                    {/* Right Side: Summary Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-stone-200 p-8 rounded-sm sticky top-24">
                            <h2 className="text-2xl font-serif text-stone-900 mb-8 text-center lg:text-left">Cart Total</h2>
                            
                            <div className="space-y-4 text-sm mb-8">
                                <div className="flex justify-between text-stone-600">
                                    <span>Subtotal</span>
                                    <span>${(cartTotal || 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-stone-600">
                                    <span>Shipping Fee</span>
                                    <span>${shippingFee.toFixed(2)}</span>
                                </div>
                                <div className="pt-4 border-t border-stone-100 flex justify-between font-bold text-lg text-stone-900">
                                    <span>Total</span>
                                    {/* Double safety check for the final number */}
                                    <span>${(finalTotal || 0).toFixed(2)}</span>
                                </div>
                            </div>

                            <Link
                                to='/checkout' 
                                className="block w-full text-center bg-stone-900 text-white py-4 rounded-sm text-xs font-bold hover:bg-black transition-colors uppercase tracking-widest"
                            >
                                Proceed to Checkout
                            </Link>
                            
                            {!user && (
                                <p className="text-[10px] text-stone-400 text-center mt-4 uppercase tracking-tighter">
                                    Sign in for a faster checkout experience
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;