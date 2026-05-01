import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { placeOrder } from '../api/checkout'
import { type CheckoutResponse, type OrderData } from '../types/checkout'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

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
    state: '',
    zipcode: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

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
      state: formData.state,
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
      alert("Order placed! ID: " + res.order_id);

      setCart([]);
      localStorage.removeItem('vibe-cart');

      navigate('/order-success', {
        state: {
          orderId: res.order_id,
          items: orderData.items,
          total: orderData.total_amount
        }
      });
    } catch (error) {
      alert("Checkout failed: " + error);
    }

  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <form onSubmit={handleCheckout} className="max-w-7xl mx-auto px-4 py-10 font-sans">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2 uppercase">
        Delivery <span className="text-gray-500 font-light">Information</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left Side: Form Inputs */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex gap-4">
            <input required name="firstName" onChange={onChangeHandler} value={formData.firstName} type="text" placeholder="First name" className="border border-gray-300 rounded p-2 flex-1 outline-none" />
            <input required name="lastName" onChange={onChangeHandler} value={formData.lastName} type="text" placeholder="Last name" className="border border-gray-300 rounded p-2 flex-1 outline-none" />
          </div>
          <input required name="email" onChange={onChangeHandler} value={formData.email} type="email" placeholder="Email address" className="border border-gray-300 rounded p-2 outline-none" />
          <input required name="street" onChange={onChangeHandler} value={formData.street} type="text" placeholder="Street" className="border border-gray-300 rounded p-2 outline-none" />
          <div className="flex gap-4">
            <input required name="city" onChange={onChangeHandler} value={formData.city} type="text" placeholder="City" className="border border-gray-300 rounded p-2 flex-1 outline-none" />
            <input required name="state" onChange={onChangeHandler} value={formData.state} type="text" placeholder="State" className="border border-gray-300 rounded p-2 flex-1 outline-none" />
          </div>
          <div className="flex gap-4">
            <input required name="zipcode" onChange={onChangeHandler} value={formData.zipcode} type="text" placeholder="Zipcode" className="border border-gray-300 rounded p-2 flex-1 outline-none" />
            <input required type="text" placeholder="Country" className="border border-gray-300 rounded p-2 flex-1 outline-none" defaultValue="Philippines" />
          </div>
          <input required name="phone" onChange={onChangeHandler} value={formData.phone} type="text" placeholder="Phone" className="border border-gray-300 rounded p-2 outline-none" />
        </div>

        {/* Right Side: Totals & Payment */}
        <div className="lg:w-1/3">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Cart <span className="text-gray-500 font-light">Total</span></h2>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Shipping Fee</span>
                <span>$10.00</span>
              </div>
              <div className="flex justify-between font-bold pt-2">
                <span>Total</span>
                <span>${(cartTotal + 10).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <h2 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-600">Payment Method</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            <div onClick={() => setPaymentMethod('stripe')} className={`flex items-center gap-3 border p-3 px-4 cursor-pointer ${paymentMethod === 'stripe' ? 'border-green-500 bg-green-50' : ''}`}>
              <div className={`w-3 h-3 rounded-full border ${paymentMethod === 'stripe' ? 'bg-green-500' : ''}`} />
              <span className="text-xs font-semibold">STRIPE</span>
            </div>
            <div onClick={() => setPaymentMethod('cod')} className={`flex items-center gap-3 border p-3 px-4 cursor-pointer ${paymentMethod === 'cod' ? 'border-green-500 bg-green-50' : ''}`}>
              <div className={`w-3 h-3 rounded-full border ${paymentMethod === 'cod' ? 'bg-green-500' : ''}`} />
              <span className="text-xs font-semibold">CASH ON DELIVERY</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-black text-white px-12 py-3 text-sm uppercase tracking-widest hover:bg-stone-800">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Checkout;