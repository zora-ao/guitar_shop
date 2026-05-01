import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the data we passed from Checkout
  const { orderId, items, total } = location.state || { orderId: 'N/A', items: [], total: 0 };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4 font-sans">
      {/* Success Checkmark */}
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-sm">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank you for your purchase</h1>
      <p className="text-gray-600 text-lg text-center max-w-md">
        We've received your order and will ship it in 5-7 business days.
      </p>
      <p className="text-gray-800 font-medium mt-2 mb-10">
        Your order number is <span className="text-stone-500">#{orderId}</span>
      </p>

      {/* Order Summary Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
          
          <div className="space-y-6">
            {items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={ item.image_url || '/placeholder.png'} 
                      alt={item.product_name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 leading-tight">{item.product_name}</p>
                    <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold text-gray-800">₱{item.price.toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900 uppercase tracking-tight">Total</span>
            <span className="text-2xl font-black text-gray-900 font-sans">₱{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => navigate('/')}
        className="mt-12 px-8 py-3 border-2 border-black text-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 rounded-sm"
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderSuccess;