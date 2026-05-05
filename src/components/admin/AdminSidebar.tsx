import { useState } from 'react'; // 1. Added State
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  DiamondPlus, 
  LucideGuitar, 
  Package, 
  LayoutDashboard, 
  LogOut,
  Menu, // 2. Added Menu Icon
  X     // 3. Added Close Icon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
  { name: 'Add items', path: '/admin/add', icon: <DiamondPlus size={18} /> },
  { name: 'Product list', path: '/admin/list', icon: <LucideGuitar size={18} /> },
  { name: 'Orders', path: '/admin/orders', icon: <Package size={18} /> },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile state
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.")
    }
  }

  return (
    <>
      {/* MOBILE TOP BAR (Only visible on small screens) */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <LucideGuitar size={20} />
           <span className="font-black text-sm uppercase">Guitar Admin</span>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-stone-100 rounded-lg"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* OVERLAY (Darkens screen when menu is open) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[60] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-64 bg-white border-r border-stone-200 h-screen flex flex-col p-6 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:sticky lg:top-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Close Button (Mobile Only) */}
        <button 
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-6 right-6 p-2 text-stone-400 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* 1. Brand Section */}
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
            <LucideGuitar className="text-white" size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-black uppercase tracking-tighter text-lg leading-none">
              GUITAR<span className="text-stone-400">Admin</span>
            </span>
            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-1">Management</span>
          </div>
        </div>

        {/* 2. Menu Section */}
        <nav className="flex-1 space-y-1">
          <p className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] mb-4 px-4">Main Menu</p>
          
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)} // Close sidebar when link is clicked
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-black text-white shadow-xl shadow-stone-200' 
                  : 'text-stone-500 hover:bg-stone-50 hover:text-black'}
              `}
            >
              <span className="transition-transform group-hover:scale-110">
                {item.icon}
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest">
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* 3. Footer Section */}
        <div className="pt-6 border-t border-stone-100 space-y-1">
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full text-stone-400 hover:text-red-600 transition-colors">
            <LogOut size={18} />
            <span className="text-[11px] font-black uppercase tracking-widest">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}