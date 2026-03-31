import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Search, ShoppingBag, User } from 'lucide-react';

const Navbar = () => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      logout(); // <--- THIS UPDATES THE NAVBAR GLOBALLY
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#FDFCFA]">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="border border-black p-1 rounded-sm">
          <span className="font-serif font-bold text-xs">VibeStrings</span>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="hidden md:flex items-center border border-stone-300 rounded-full px-1 py-1">
        <Link to="/" className="px-6 py-2 bg-stone-100 rounded-full font-medium text-sm">Home</Link>
        <Link to="/collection" className="px-6 py-2 hover:bg-stone-50 rounded-full font-medium text-sm">Collection</Link>
        <Link to="/about" className="px-6 py-2 hover:bg-stone-50 rounded-full font-medium text-sm">About</Link>
        <Link to="/contact" className="px-6 py-2 hover:bg-stone-50 rounded-full font-medium text-sm">Contact</Link>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4 text-stone-700">
        <button className="p-2 hover:bg-stone-100 rounded-full"><Search size={20} /></button>
        <button className="p-2 hover:bg-stone-100 rounded-full"><User size={20} /></button>
        <button className="p-2 hover:bg-stone-100 rounded-full relative">
          <ShoppingBag size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar