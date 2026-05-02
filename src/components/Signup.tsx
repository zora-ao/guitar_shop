import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../utils/api';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) return toast.error("Passwords do not match");

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role: 'customer' }), 
                credentials: "include",
            });

            const data = await res.json();

            if (res.ok) {
                queryClient.setQueryData(["authUser"], data.user || data);
                toast.success("Account created successfully!");
                // Directing to home or shop after signup is usually better UX for customers
                navigate("/");
            } else {
                toast.error(data.error || "Signup failed");
            }
        } catch (err) {
            toast.error("Error connecting to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4 lg:p-2">
            
            {/* The Central Card - matching the Login UI */}
            <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[400px]">
                
                {/* Left Side: Brand Section (Hidden on Mobile) */}
                <div className="hidden lg:block lg:w-1/2 relative">
                    <img 
                        src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop" 
                        alt="Guitar Player" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-white p-10 text-center">
                        <div className="w-16 h-[2px] bg-white mb-6" />
                        <h1 className="text-4xl font-serif tracking-tighter mb-2">Join VibeStrings</h1>
                        <p className="text-sm font-light tracking-[0.3em] uppercase opacity-80">Start your musical journey</p>
                    </div>
                </div>

                {/* Right Side: Signup Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-3xl font-serif text-stone-800 tracking-tight">Create Account</h2>
                        <p className="text-stone-400 text-sm mt-1">Join our community of enthusiasts.</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                        {/* Email Input */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">Email Address</label>
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

                        {/* Password Input */}
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

                        {/* Confirm Password Input */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-black focus:bg-white outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-4 rounded-xl text-xs font-bold tracking-widest hover:bg-stone-800 transition-all shadow-lg shadow-stone-200 disabled:bg-stone-400 mt-4 flex items-center justify-center gap-2"
                        >
                            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-stone-400">
                        Already have an account? <Link to="/login" className="text-black font-bold hover:underline underline-offset-4">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}