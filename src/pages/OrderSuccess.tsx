import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = location.state || { orderId: 'N/A' };

  return (
    <div className="min-h-screen bg-[#f1f1f1] flex items-center justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl p-12 flex flex-col items-center text-center">
        
        {/* Animated-style Success Icon */}
        <div className="relative mb-10">
          {/* Decorative dots to mimic the image */}
          <div className="absolute -top-4 -left-4 w-2 h-2 bg-gray-200 rounded-full animate-ping"></div>
          <div className="absolute top-0 -right-6 w-3 h-3 bg-gray-300 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-2 -left-8 w-2 h-2 bg-gray-400 rounded-full"></div>
          
          <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center shadow-xl ring-8 ring-gray-50">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-black text-black mb-4 uppercase tracking-tight">
          Thank you for ordering!
        </h1>
        
        <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-2">
          Your order <span className="font-bold text-black">#{orderId}</span> has been placed successfully. 
          We'll send you a tracking link as soon as your items ship.
        </p>

        <div className="w-full flex flex-col sm:flex-row gap-4 mt-12">
          <button 
            onClick={() => navigate('/my-orders')} // Or wherever you keep order history
            className="flex-1 py-4 border-2 border-black text-black text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gray-50 transition-all rounded-lg"
          >
            View Order
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="flex-1 py-4 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-lg rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;