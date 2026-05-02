import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useCart } from "../context/CartContext";
import { login } from "../api/auth";
import { syncCart, getCart } from "../api/cart";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { setCart } = useCart();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await login({ email, password });
            queryClient.setQueryData(["authUser"], data.user || data);
            const localCart = JSON.parse(localStorage.getItem('vibe-cart') || '[]');
            if (localCart.length > 0) {
                await syncCart(localCart);
                localStorage.removeItem('vibe-cart');
            }
            const dbCart = await getCart();
            setCart(dbCart);
            toast.success('Welcome back!');
            navigate(data.user?.role === 'admin' ? "/admin/add" : '/');
        } catch (error) {
            toast.error("Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        /* The Background: Center everything with flex */
        <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4 lg:p-4">
            
            {/* The Central Card */}
            <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[550px]">
                
                {/* Left Side: Form Section */}
                <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-3xl font-serif text-stone-800 tracking-tight">Login</h2>
                        <p className="text-stone-400 text-sm mt-1">Please enter your details to continue.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-black focus:bg-white outline-none transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-12 py-3 text-sm focus:border-black focus:bg-white outline-none transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-black transition"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-4 rounded-xl text-xs font-bold tracking-widest hover:bg-stone-800 transition-all shadow-lg shadow-stone-200 disabled:bg-stone-400 mt-2"
                        >
                            {loading ? "AUTHENTICATING..." : "LOGIN NOW"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-stone-400">
                        Don't have an account? <Link to="/signup" className="text-black font-bold hover:underline underline-offset-4">Sign up</Link>
                    </p>
                </div>

                {/* Right Side: Image/Brand Section (Hidden on Mobile) */}
                <div className="hidden lg:block lg:w-1/2 relative">
                    <img 
                        src="https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=2040&auto=format&fit=crop" 
                        alt="Guitar Collection" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Brand Overlay */}
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-10 text-center">
                        <div className="w-16 h-[2px] bg-white mb-6" />
                        <h1 className="text-4xl font-serif tracking-tighter mb-2">VibeStrings</h1>
                        <p className="text-sm font-light tracking-[0.3em] uppercase opacity-80">Premium Gear</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;