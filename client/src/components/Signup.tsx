import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) return toast.error("Passwords do not match");

        try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, role: 'costumer' }), // Force admin for your dashboard testing
            credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
            queryClient.setQueryData(["authUser"], data.user || data);
            toast.success("Account created successfully!");
            navigate("/admin/add");
        } else {
            toast.error(data.error || "Signup failed");
        }
        } catch (err) {
        toast.error("Error connecting to server");
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCFA] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-stone-200 p-8 rounded-sm shadow-sm">
            <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-stone-800">Create an Account</h2>
            <p className="text-stone-500 text-sm mt-2">Create an account to access exclusive collections and personalized services.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Email</label>
                <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-stone-300 rounded-sm px-4 py-2 text-sm focus:border-black outline-none"
                required
                />
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Password</label>
                <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-stone-300 rounded-sm px-4 py-2 text-sm focus:border-black outline-none"
                required
                />
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Confirm Password</label>
                <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-stone-300 rounded-sm px-4 py-2 text-sm focus:border-black outline-none"
                required
                />
            </div>

            <button 
                type="submit"
                className="w-full bg-black text-white py-3 rounded-sm text-sm font-bold hover:bg-stone-800 transition mt-4"
            >
                CREATE ACCOUNT
            </button>
            </form>

            <div className="mt-6 text-center">
            <p className="text-sm text-stone-500">
                Already have an account? <Link to="/login" className="text-black font-semibold hover:underline">Login</Link>
            </p>
            </div>
        </div>
        </div>
    );
}