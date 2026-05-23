import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../api/checkout';
import { type CheckoutResponse, type OrderData } from '../types/checkout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Wallet, Truck, ArrowRight } from 'lucide-react';

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
    province: '',
    zipcode: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData: OrderData = {
      user_id: user?.id || null,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.street,
      city: formData.city,
      state: formData.province,
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
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#FDFCFA] py-12 px-4 md:px-8 font-sans text-stone-900 selection:bg-stone-900 selection:text-white flex justify-center items-center">
      <div className="w-full max-w-5xl space-y-10">
        
        {/* Modern Header Section */}
        <div className="border-b border-stone-200/80 pb-6">
          <h1 className="text-3xl font-normal uppercase tracking-[0.2em] text-stone-950">
            Checkout
          </h1>
          <p className="text-xs font-semibold text-stone-500 tracking-wider uppercase mt-2">
            Secure Order Atelier
          </p>
        </div>

        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Premium Delivery Form (7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-stone-200 p-8 md:p-10 rounded-3xl space-y-8 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-widest text-stone-950 mb-2">
              Delivery Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* First Name */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">First Name</label>
                <input required name="firstName" onChange={onChangeHandler} value={formData.firstName} type="text" placeholder="John" className="w-full bg-transparent border-b-2 border-stone-200 py-2 text-sm text-stone-900 focus:border-stone-900 outline-none transition-colors placeholder:text-stone-300 font-normal" />
              </div>
              
              {/* Last Name */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Last Name</label>
                <input required name="lastName" onChange={onChangeHandler} value={formData.lastName} type="text" placeholder="Doe" className="w-full bg-transparent border-b-2 border-stone-200 py-2 text-sm text-stone-900 focus:border-stone-900 outline-none transition-colors placeholder:text-stone-300 font-normal" />
              </div>

              {/* Email Address */}
              <div className="md:col-span-2 flex flex-col space-y-1.5">
                <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Email Address</label>
                <input required name="email" onChange={onChangeHandler} value={formData.email} type="email" placeholder="john@email.com" className="w-full bg-transparent border-b-2 border-stone-200 py-2 text-sm text-stone-900 focus:border-stone-900 outline-none transition-colors placeholder:text-stone-300 font-normal" />
              </div>

              {/* Street */}
              <div className="md:col-span-2 flex flex-col space-y-1.5">
                <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Street / Barangay</label>
                <input required name="street" onChange={onChangeHandler} value={formData.street} type="text" placeholder="House No, Street, Barangay" className="w-full bg-transparent border-b-2 border-stone-200 py-2 text-sm text-stone-900 focus:border-stone-900 outline-none transition-colors placeholder:text-stone-300 font-normal" />
              </div>

              {/* City */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">City / Municipality</label>
                <input required name="city" onChange={onChangeHandler} value={formData.city} type="text" placeholder="Quezon City" className="w-full bg-transparent border-b-2 border-stone-200 py-2 text-sm text-stone-900 focus:border-stone-900 outline-none transition-colors placeholder:text-stone-300 font-normal" />
              </div>

              {/* Province */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Province</label>
                <input required name="province" onChange={onChangeHandler} value={formData.province} type="text" placeholder="Metro Manila" className="w-full bg-transparent border-b-2 border-stone-200 py-2 text-sm text-stone-900 focus:border-stone-900 outline-none transition-colors placeholder:text-stone-300 font-normal" />
              </div>

              {/* Zipcode */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Zipcode</label>
                <input required name="zipcode" onChange={onChangeHandler} value={formData.zipcode} type="text" placeholder="1100" className="w-full bg-transparent border-b-2 border-stone-200 py-2 text-sm text-stone-900 focus:border-stone-900 outline-none transition-colors placeholder:text-stone-300 font-normal" />
              </div>

              {/* Phone */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Phone</label>
                <input required name="phone" onChange={onChangeHandler} value={formData.phone} type="text" placeholder="0917XXXXXXX" className="w-full bg-transparent border-b-2 border-stone-200 py-2 text-sm text-stone-900 focus:border-stone-900 outline-none transition-colors placeholder:text-stone-300 font-normal" />
              </div>
            </div>
          </div>

          {/* RIGHT: Modern Summary Panel (5 Columns) */}
          <div className="lg:col-span-5 w-full space-y-6 lg:sticky lg:top-24">
            
            {/* Inline Mini Cart Item Feed Preview */}
            {cart.length > 0 && (
              <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">Review Items</h3>
                <div className="max-h-[160px] overflow-y-auto space-y-3 pr-1">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 justify-between text-xs pb-2 last:pb-0 last:border-0 border-b border-stone-100">
                      <div className="flex items-center gap-3 truncate">
                        <img 
                          src={item.product.images?.[0] || item.product.image_url} 
                          alt={item.product.name} 
                          className="w-10 h-10 object-cover bg-stone-50 rounded-xl border border-stone-100" 
                        />
                        <div className="truncate">
                          <p className="font-semibold text-stone-900 truncate">{item.product.name}</p>
                          <p className="text-stone-400 text-[10px]">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-medium text-stone-800">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Calculations Card */}
            <div className="bg-white border border-stone-200 p-7 rounded-3xl shadow-sm space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-stone-950">Summary</h2>
              
              <div className="space-y-3.5 pb-4 border-b border-stone-100 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span className="text-stone-900 font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Insured Shipping</span>
                  <span className="text-stone-900 font-medium">$10.00</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Total Amount</span>
                <span className="text-stone-950 font-black text-2xl tracking-tight">${(cartTotal + 10).toFixed(2)}</span>
              </div>

              {/* Redesigned Payment Methods Selector */}
              <div className="space-y-2.5">
                <h3 className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Payment Method</h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* GCash */}
                  <div
                    onClick={() => setPaymentMethod('GCASH')}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'GCASH' 
                        ? 'border-stone-950 bg-stone-950 text-white shadow-sm' 
                        : 'border-stone-200 bg-stone-50/50 text-stone-600 hover:bg-stone-50 hover:border-stone-300'
                    }`}
                  >
                    <Wallet size={16} strokeWidth={1.75} />
                    <span className="text-xs font-bold uppercase tracking-wider">GCash</span>
                  </div>

                  {/* COD */}
                  <div
                    onClick={() => setPaymentMethod('COD')}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'COD' 
                        ? 'border-stone-950 bg-stone-950 text-white shadow-sm' 
                        : 'border-stone-200 bg-stone-50/50 text-stone-600 hover:bg-stone-50 hover:border-stone-300'
                    }`}
                  >
                    <Truck size={16} strokeWidth={1.75} />
                    <span className="text-xs font-bold uppercase tracking-wider">COD</span>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || cart.length === 0}
                className="w-full mt-2 bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs py-4 rounded-xl transition-all active:scale-[0.98] uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm disabled:bg-stone-100 disabled:text-stone-400"
              >
                {isSubmitting ? "Processing..." : <>Complete Order <ArrowRight size={14} /></>}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;