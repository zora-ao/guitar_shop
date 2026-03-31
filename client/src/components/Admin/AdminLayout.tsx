import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#FDFCFA] flex flex-col">
      <AdminHeader />
      
      {/* Sidebar + Content Container */}
      <div className="flex flex-1 max-w-[1400px] mx-auto w-full">
        {/* The Sidebar (fixed width) */}
        <AdminSidebar />
        
        {/* The Main Content Area (occupies remaining space) */}
        <main className="flex-1 flex flex-col border-l border-stone-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
}