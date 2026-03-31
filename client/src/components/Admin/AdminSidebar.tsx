import { NavLink } from 'react-router-dom';
import { DiamondPlus, LucideGuitar, Package } from 'lucide-react';


const navItems = [
  { name: 'Add items', path: '/admin/add' , icon: <DiamondPlus />},
  { name: 'Product list', path: '/admin/list', icon:  <LucideGuitar />},
  { name: 'Orders', path: '/admin/orders', icon: <Package /> },
];


export default function AdminSidebar() {
  return (
    <aside className="w-[250px] bg-white pt-10 flex flex-col gap-2 pl-12">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          // The ternary handles styling based on the active route
          className={({ isActive }) => `
            block border border-r-transparent border-stone-300 text-sm font-medium
            px-5 py-2 ${isActive ? 'bg-[#EADECA] text-stone-900 font-bold' : 'bg-white hover:bg-stone-50'}
            transition-all duration-150 flex gap-x-4
          `}
        >
            {item.icon}
            {item.name}
        </NavLink>
      ))}
    </aside>
  );
}