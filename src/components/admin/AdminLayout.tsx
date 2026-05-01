import { Navigate, Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const {user, isLoading} = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCFA]">
        <p className="text-stone-400 animate-pulse">Verifying Admin Access...</p>
      </div>
    );
  };

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }



  return (
    <div className="min-h-screen bg-[#FDFCFA] flex flex-col">
      <AdminHeader />
      
      {/* Sidebar + Content Container */}
      <div className="flex flex-1 max-w-350 mx-auto w-full">
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