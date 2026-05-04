import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Menu, Package, Search, ShoppingBag, User, X } from 'lucide-react';
import { toast } from "react-toastify";
import { AnimatePresence, motion} from "framer-motion";
import { useCart } from "../context/CartContext";
import logo from '../assets/logo.png'
import { useShop } from "../context/ShopContext";

const Navbar = () => {
  const { cartCount, setCart } = useCart();
  const {user, logout} = useAuth();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const {setShowSearch} = useShop();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

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

  const handleSearchToggle = () => {
    setShowSearch(true);
    navigate('/collection');
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 md:py-0 py-2 bg-[#FDFCFA] sticky top-0 z-50 border-b border-stone-100">
      
      {/* Mobile Menu Icon (Left side on mobile) */}
      <button 
        onClick={() => setIsMenuOpen(true)}
        className="p-2 md:hidden text-stone-700"
      >
        <Menu size={24} />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link to="/">
          <img 
            src={logo} 
            alt="Vibe Logo" 
            className="h-26 md:h-26 -my-8 md:-my-6 w-auto object-contain transition-transform duration-300 hover:scale-105" 
          />
        </Link>
      </div>

      {/* Navigation Pills (Desktop Only) */}
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

      {/* Icons (Search, User, Cart) */}
      <div className="flex items-center gap-1 md:gap-4 text-stone-700">
        <button 
          onClick={handleSearchToggle}
          className="p-2 hover:bg-stone-100 rounded-full">
          <Search size={20} />
        </button>
        
        {/* User Icon - Hidden on very small screens if preferred, or keep as is */}
        <div 
          className="relative hidden md:block"
          onMouseEnter={() => user && setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button onClick={handleUserClick} className="p-2 hover:bg-stone-100 rounded-full">
            <User size={20} className={user ? "text-black" : "text-stone-400"} />
          </button>
          {user && showDropdown && (
            <div className="absolute right-0 top-full pt-2 w-48 z-50">
              <div className="bg-white border border-stone-200 rounded-sm shadow-xl py-2">
                <div className="px-4 py-2 border-b border-stone-100 mb-1">
                    <p className="text-[10px] font-bold text-stone-400 uppercase">Logged in as</p>
                    <p className="text-xs font-medium text-stone-800 truncate">{user.email}</p>
                </div>
                <Link to="/orders" className="flex items-center gap-3 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50"><Package size={16} /> My Orders</Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50"><LogOut size={16} /> Logout</button>
              </div>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <Link to='/cart' className="p-2 hover:bg-stone-100 rounded-full relative">
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] md:hidden"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[75%] max-w-sm bg-white z-[70] p-6 shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif text-xl font-bold">Menu</span>
                <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <NavLink 
                    key={link.path} 
                    to={link.path}
                    className={({ isActive }) => `text-lg font-medium ${isActive ? 'text-black' : 'text-stone-500'}`}
                  >
                    {link.name}
                  </NavLink>
                ))}
                
                <hr className="border-stone-100" />
                
                {/* Mobile specific User links */}
                {user ? (
                  <>
                    <Link to="/orders" className="flex items-center gap-3 text-stone-600"><Package size={18} /> My Orders</Link>
                    <button onClick={handleLogout} className="flex items-center gap-3 text-red-500"><LogOut size={18} /> Logout</button>
                  </>
                ) : (
                  <Link to="/login" className="flex items-center gap-3 text-stone-600"><User size={18} /> Login / Register</Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar