import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { signup } from '../api/auth'

export default function Signup() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState(''); // New state
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
            // 2. Call the service instead of raw fetch
            const data = await signup({ email, username, password });

            // 3. Update React Query cache
            queryClient.setQueryData(["authUser"], data.user || data);
            
            toast.success("Account created successfully!");
            navigate("/");
        } catch (err: any) {
            // apiFetch usually throws an error object with a message
            toast.error(err.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4 lg:p-2">
            <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[400px]">
                
                {/* Left Side: Brand Section */}
                <div className="hidden lg:block lg:w-1/2 relative">
                    <img 
                        src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop" 
                        alt="Guitar Player" 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-white p-10 text-center">
                        <div className="w-16 h-[2px] bg-white mb-6" />
                        <h1 className="text-4xl font-serif tracking-tighter mb-2">Join Guitars</h1>
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
                        
                        {/* Username Input - NEW FIELD */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                                <input 
                                    type="text" 
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-black focus:bg-white outline-none transition-all"
                                    placeholder="jimi_hendrix"
                                />
                            </div>
                        </div>

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