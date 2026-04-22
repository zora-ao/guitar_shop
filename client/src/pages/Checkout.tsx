import React, { useState } from 'react';

const Checkout: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('stripe');

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        DELIVERY <span className="text-gray-500 font-light">INFORMATION</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left Side: Form */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First name"
              className="border border-gray-300 rounded p-2 flex-1 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <input
              type="text"
              placeholder="Last name"
              className="border border-gray-300 rounded p-2 flex-1 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <input
            type="email"
            placeholder="Email address"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-black"
          />
          <input
            type="text"
            placeholder="Street"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-black"
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="City"
              className="border border-gray-300 rounded p-2 flex-1 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <input
              type="text"
              placeholder="State"
              className="border border-gray-300 rounded p-2 flex-1 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Zipcode"
              className="border border-gray-300 rounded p-2 flex-1 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <input
              type="text"
              placeholder="Country"
              className="border border-gray-300 rounded p-2 flex-1 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Right Side: Cart Totals & Payment */}
        <div className="lg:w-1/3">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              Cart <span className="text-gray-500 font-light">Total</span>
            </h2>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Subtotal</span>
                <span>$304.00</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Shipping Fee</span>
                <span>$10.00</span>
              </div>
              <div className="flex justify-between font-bold pt-2">
                <span>Total</span>
                <span>$314.00</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-600">
              Payment Method
            </h2>
            <div className="flex flex-wrap gap-4 mb-8">
              {/* Payment Option Stripe */}
              <div 
                onClick={() => setPaymentMethod('stripe')}
                className="flex items-center gap-3 border p-3 px-6 cursor-pointer hover:bg-gray-50"
              >
                <div className={`w-3 h-3 rounded-full border ${paymentMethod === 'stripe' ? 'bg-green-500' : ''}`} />
                <img src="/stripe-logo.png" alt="Stripe" className="h-4" />
              </div>

              {/* Payment Option Razorpay */}
              <div 
                onClick={() => setPaymentMethod('razorpay')}
                className="flex items-center gap-3 border p-3 px-6 cursor-pointer hover:bg-gray-50"
              >
                <div className={`w-3 h-3 rounded-full border ${paymentMethod === 'razorpay' ? 'bg-green-500' : ''}`} />
                <img src="/razorpay-logo.png" alt="Razorpay" className="h-4" />
              </div>

              {/* Cash on Delivery */}
              <div 
                onClick={() => setPaymentMethod('cod')}
                className="flex items-center gap-3 border p-3 px-6 cursor-pointer hover:bg-gray-50"
              >
                <div className={`w-3 h-3 rounded-full border ${paymentMethod === 'cod' ? 'bg-green-500' : ''}`} />
                <span className="text-xs font-medium text-gray-500 uppercase">Cash on Delivery</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="bg-black text-white px-12 py-3 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;