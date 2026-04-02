import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            const data = await res.json();

            if(res.ok){
                queryClient.setQueryData(["authUser"], data.user || data);

                const userRole = data.user?.role || data.role;

                if (userRole == 'admin'){
                    toast.success("Welcome back!");
                    navigate("/admin/add");
                } else {
                    toast.success("Welcome back!");
                    navigate("/");
                }

                
            } else {
                toast.error(data.error);
            }

        } catch (error) {
            toast.error("Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
    <div className="min-h-screen bg-[#FDFCFA] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-stone-200 p-8 rounded-sm shadow-sm">
            <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-stone-800">Login</h2>
            <p className="text-stone-500 text-sm mt-2">Enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">Email Address</label>
                <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-stone-300 rounded-sm px-4 py-3 text-sm focus:border-black outline-none transition"
                placeholder="your@email.com"
                />
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">Password</label>
                <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-stone-300 rounded-sm px-4 py-3 text-sm focus:border-black outline-none transition"
                placeholder="••••••••"
                />
            </div>

            <button 
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-sm text-sm font-bold hover:bg-stone-800 transition disabled:bg-stone-400"
            >
                {loading ? "Logging in..." : "LOGIN"}
            </button>
            </form>

            <div className="mt-6 text-center">
            <p className="text-sm text-stone-500">
                Don't have an account? <Link to="/signup" className="text-black font-semibold hover:underline">Sign up</Link>
            </p>
            </div>
        </div>
        </div>
    );
}

export default Login
