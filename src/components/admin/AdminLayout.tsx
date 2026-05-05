import { Navigate, Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCFA]">
        <p className="text-stone-400 animate-pulse font-medium tracking-widest uppercase text-xs">
          Verifying Admin Access...
        </p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FDFCFA] flex flex-col">
      {/* 
          Container changes to flex-col on mobile to stack the 
          mobile-nav-bar and main content. 
          On desktop (lg), it switches to flex-row.
      */}
      <div className="flex flex-col lg:flex-row flex-1 w-full max-w-[1600px] mx-auto">
        
        {/* The Sidebar (Acts as Top Bar on mobile, Sidebar on Desktop) */}
        <AdminSidebar />
        
        {/* The Main Content Area */}
        <main className="flex-1 flex flex-col border-stone-200 lg:border-l min-w-0">
          <div className="p-4 md:p-0">
              <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}