import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Menu, Package, Search, ShoppingBag, User, X } from 'lucide-react';
import { toast } from "react-toastify";
import { AnimatePresence, motion} from "framer-motion";
import { useCart } from "../context/CartContext";
import logo from '../assets/logo.png'
import { useShop } from "../context/ShopContext";
import { NotificationDropdown } from "./orders/Notifications";

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

  const handleCtaClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 md:py-0 py-2 bg-[#FDFCFA] sticky top-0 z-40 border-b border-stone-100">
      
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
            onClick={handleCtaClick}
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

      {/* Icons (Search, Notification, User, Cart) */}
        <div className="flex items-center gap-1 md:gap-4 text-stone-700">
          <button onClick={handleSearchToggle} className="p-2 hover:bg-stone-100 rounded-full">
            <Search size={20} />
          </button>
          
          {/* ADD THE NOTIFICATION BELL HERE */}
          {user && <NotificationDropdown />}

        
        {/* User Icon - Hidden on very small screens if preferred, or keep as is */}
        <div 
          className="relative hidden md:block"
          onMouseEnter={() => user && setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button onClick={handleUserClick} className="p-2 hover:bg-stone-100 rounded-full">
            <User size={20} className={user ? "text-black" : "text-stone-400"} />
          </button>
          <AnimatePresence>
            {user && showDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                className="absolute right-0 top-full pt-2 w-52 z-50"
              >
                <div className="bg-white border border-stone-200 rounded-2xl shadow-xl py-2 overflow-hidden bg-white/95 backdrop-blur-md">
                  <div className="px-4 py-2.5 border-b border-stone-100 mb-1 bg-stone-50/50">
                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Logged in as</p>
                    <p className="text-xs font-semibold text-stone-800 truncate mt-0.5">{user.username}</p>
                  </div>
                  
                  <Link 
                    to="/orders" 
                    className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-950 transition-colors"
                  >
                    <Package size={14} strokeWidth={1.75} /> My Orders
                  </Link>
                  
                  <button 
                    onClick={handleLogout} 
                    className="w-full flex items-center gap-3 px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-50/60 transition-colors"
                  >
                    <LogOut size={14} strokeWidth={1.75} /> Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
      {/* Mobile Menu Drawer Menu Block */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Layer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-stone-950/30 backdrop-blur-sm z-[60] md:hidden"
            />
            
            {/* Drawer Sliding Overlay Layout */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-xs bg-[#FDFCFA] z-[70] p-6 shadow-2xl border-r border-stone-200 md:hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-100">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Menu</span>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1 hover:bg-stone-100 rounded-full transition-colors"
                  >
                    <X size={20} strokeWidth={1.75} />
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <NavLink 
                      key={link.path} 
                      to={link.path}
                      className={({ isActive }) => 
                        `px-3 py-2.5 text-sm font-semibold uppercase tracking-widest rounded-xl transition-all ${
                          isActive ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-950'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Bottom Container Profile Details (Mobile Specific) */}
              <div className="pt-6 border-t border-stone-100 space-y-3">
                {user ? (
                  <>
                    <div className="px-3 py-1">
                      <p className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Account</p>
                      <p className="text-xs font-bold text-stone-800 truncate">{user.username}</p>
                    </div>
                    <Link 
                      to="/orders" 
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50 rounded-xl transition-colors"
                    >
                      <Package size={16} strokeWidth={1.75} /> My Orders
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LogOut size={16} strokeWidth={1.75} /> Logout
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    className="flex items-center gap-3 px-3 py-3 text-sm font-semibold uppercase tracking-wider text-center justify-center bg-stone-900 text-white rounded-xl shadow-sm transition-colors hover:bg-stone-800"
                  >
                    <User size={14} strokeWidth={2} /> Login / Register
                  </Link>
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