import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../api/checkout';
import { type CheckoutResponse, type OrderData } from '../types/checkout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout: React.FC = () => {
  const { cart, cartTotal, setCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    street: '',
    city: '',
    province: '', // Changed from state
    zipcode: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData: OrderData = {
      user_id: user?.id || null,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.street,
      city: formData.city,
      state: formData.province, // Mapping province to the 'state' field for your backend
      zip_code: formData.zipcode,
      payment_method: paymentMethod,
      subtotal: cartTotal,
      shipping_fee: 10.00,
      total_amount: cartTotal + 10.00,
      items: cart.map(item => ({
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image_url: item.product.images?.[0] || item.product.image_url
      }))
    };

    try {
      const res = await placeOrder(orderData) as CheckoutResponse;
      setCart([]);
      localStorage.removeItem('vibe-cart');
      navigate('/order-success', {
        state: { orderId: res.order_id, items: orderData.items, total: orderData.total_amount }
      });
    } catch (error) {
      alert("Checkout failed: " + error);
    }
  };

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-white py-10 px-4 font-sans text-black">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b border-black pb-4">
          <h1 className="text-2xl font-bold tracking-tight uppercase">
            Delivery <span className="text-gray-400 font-light">Information</span>
          </h1>
        </header>

        <form onSubmit={handleCheckout} className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT: DELIVERY INFORMATION CARD */}
          <div className="flex-1 bg-white p-7 rounded-2xl border border-black shadow-none">
            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">First Name</label>
                <input required name="firstName" onChange={onChangeHandler} value={formData.firstName} type="text" placeholder="John" className="w-full border border-black rounded-xl p-3 text-sm outline-none focus:bg-gray-50 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Last Name</label>
                <input required name="lastName" onChange={onChangeHandler} value={formData.lastName} type="text" placeholder="Doe" className="w-full border border-black rounded-xl p-3 text-sm outline-none focus:bg-gray-50 transition-all" />
              </div>

              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Email Address</label>
                <input required name="email" onChange={onChangeHandler} value={formData.email} type="email" placeholder="john@email.com" className="w-full border border-black rounded-xl p-3 text-sm outline-none focus:bg-gray-50 transition-all" />
              </div>

              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Street / Barangay</label>
                <input required name="street" onChange={onChangeHandler} value={formData.street} type="text" placeholder="House No, Street, Barangay" className="w-full border border-black rounded-xl p-3 text-sm outline-none focus:bg-gray-50 transition-all" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">City / Municipality</label>
                <input required name="city" onChange={onChangeHandler} value={formData.city} type="text" placeholder="Quezon City" className="w-full border border-black rounded-xl p-3 text-sm outline-none focus:bg-gray-50 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Province</label>
                <input required name="province" onChange={onChangeHandler} value={formData.province} type="text" placeholder="Metro Manila" className="w-full border border-black rounded-xl p-3 text-sm outline-none focus:bg-gray-50 transition-all" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Zipcode</label>
                <input required name="zipcode" onChange={onChangeHandler} value={formData.zipcode} type="text" placeholder="1100" className="w-full border border-black rounded-xl p-3 text-sm outline-none focus:bg-gray-50 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Phone</label>
                <input required name="phone" onChange={onChangeHandler} value={formData.phone} type="text" placeholder="0917XXXXXXX" className="w-full border border-black rounded-xl p-3 text-sm outline-none focus:bg-gray-50 transition-all" />
              </div>
            </div>
          </div>

          {/* RIGHT: SUMMARY & PAYMENT */}
          <div className="lg:w-[380px] w-full sticky top-8 flex flex-col gap-6">
            <div className="bg-white p-7 rounded-2xl border border-black shadow-none">
              <h2 className="text-lg font-bold text-black mb-6">Cart <span className="text-gray-400 font-light">Total</span></h2>
              
              <div className="space-y-3 pb-4 border-b border-black text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="text-black font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span className="text-black font-medium">$10.00</span>
                </div>
              </div>

              <div className="flex justify-between py-5">
                <span className="text-black font-bold uppercase tracking-tighter">Total Amount</span>
                <span className="text-black font-black text-xl">${(cartTotal + 10).toFixed(2)}</span>
              </div>

              <h3 className="text-[10px] font-bold text-black uppercase tracking-widest mb-3">Select Payment Method</h3>
              
              <div className="grid grid-cols-2 mb-6 border border-black rounded-xl overflow-hidden">
                <div
                  onClick={() => setPaymentMethod('GCASH')}
                  className={`flex flex-col items-center justify-center py-4 cursor-pointer border-r border-black transition-all ${
                    paymentMethod === 'GCASH' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
                  }`}
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/GCash_logo.svg/1280px-GCash_logo.svg.png" 
                    alt="GCash" className="h-4 mb-1.5" 
                    style={{ filter: paymentMethod === 'GCASH' ? 'brightness(0) invert(1)' : 'grayscale(100%)' }} 
                  />
                  <span className={`text-[9px] font-bold ${paymentMethod === 'GCASH' ? 'text-white' : 'text-black'}`}>GCASH</span>
                </div>

                <div
                  onClick={() => setPaymentMethod('COD')}
                  className={`flex flex-col items-center justify-center py-4 cursor-pointer transition-all ${
                    paymentMethod === 'COD' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
                  }`}
                >
                  <span className={`text-[9px] font-bold ${paymentMethod === 'COD' ? 'text-white' : 'text-black'}`}>CASH</span>
                </div>
              </div>

              <button type="submit" className="w-full bg-black hover:bg-zinc-800 text-white font-bold py-4 rounded-xl transition-all active:scale-95 uppercase tracking-widest">
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;