import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Package, Search, ShoppingBag, User } from 'lucide-react';
import { toast } from "react-toastify";
import { motion} from "framer-motion";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartCount, setCart } = useCart();
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
    setCart([]);
    localStorage.removeItem('vibe-cart');
    logout();
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#FDFCFA]">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="border border-black p-1 rounded-sm">
          <span className="font-serif font-bold text-xs">VibeStrings</span>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="hidden md:flex items-center border border-stone-200 rounded-full px-1 py-1 bg-white relative">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `relative px-6 py-2 z-10 font-medium text-sm transition-colors duration-300 ${
                isActive ? "text-white" : "text-stone-500 hover:text-stone-800"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {link.name}
                {/* This is the magic sliding pill */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-black rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
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
        <Link to='/cart' className="p-2 hover:bg-stone-100 rounded-full relative">
          <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar