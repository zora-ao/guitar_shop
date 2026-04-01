import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Package, Search, ShoppingBag, User } from 'lucide-react';
import { toast } from "react-toastify";

const Navbar = () => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleUserClick = () => {
    if (!user) {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    toast.success("Logged out");
    logout();
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
        <div 
            className="relative"
            onMouseEnter={() => user && setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button 
              onClick={handleUserClick}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors"
            >
              <User size={20} className={user ? "text-black" : "text-stone-400"} />
            </button>

            {/* Floating Dropdown (Only appears if user is logged in & hovering) */}
            {user && showDropdown && (
              <div className="absolute right-0 top-full pt-2 w-48 z-50">
                <div className="bg-white border border-stone-200 rounded-sm shadow-xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-stone-100 mb-1">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Logged in as</p>
                    <p className="text-xs font-medium text-stone-800 truncate">{user.email}</p>
                  </div>
                  
                  <Link 
                    to="/orders" 
                    className="flex items-center gap-3 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 transition-colors"
                  >
                    <Package size={16} />
                    My Orders
                  </Link>

                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors mt-1"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        <button className="p-2 hover:bg-stone-100 rounded-full relative">
          <ShoppingBag size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar