import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate a sending process
    setTimeout(() => {
      toast.success("Message sent! We'll vibrate back to you soon.");
      setFormData({ name: '', email: '', message: '' });
      setIsSending(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFA] text-stone-800 py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24 max-w-2xl">
          <h1 className="text-5xl font-serif tracking-tighter mb-6">Get in Touch</h1>
          <p className="text-stone-500 font-light text-lg leading-relaxed">
            Have questions about a specific instrument or need help with a custom setup? 
            Our team of specialists is here to help you find your perfect sound.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
          
          {/* Left Column: Contact Information */}
          <div className="space-y-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-12">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <Mail className="text-stone-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-widest mb-2">Email Us</h3>
                  <p className="text-stone-500 font-light text-sm">support@vibestrings.com</p>
                  <p className="text-stone-500 font-light text-sm">sales@vibestrings.com</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <Phone className="text-stone-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-widest mb-2">Call Us</h3>
                  <p className="text-stone-500 font-light text-sm">+1 (555) 000-VIBE</p>
                  <p className="text-stone-500 font-light text-sm">Mon - Fri: 9am - 6pm</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <MapPin className="text-stone-600" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-widest mb-2">Visit the Studio</h3>
                  <p className="text-stone-500 font-light text-sm">123 Resonance Way</p>
                  <p className="text-stone-500 font-light text-sm">Guitar District, NY 10001</p>
                </div>
              </div>
            </div>

            {/* Social / Branding Element */}
            <div className="pt-12 border-t border-stone-200">
                <div className="flex items-center gap-4 text-stone-400">
                    <MessageSquare size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest">Connect on Social</span>
                </div>
            </div>
          </div>

          {/* Right Column: The Contact Form */}
          <div className="bg-white border border-stone-200 p-8 md:p-12 rounded-2xl shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-4 text-sm focus:border-black focus:bg-white outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-4 text-sm focus:border-black focus:bg-white outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-1">Your Message</label>
                <textarea 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-4 text-sm focus:border-black focus:bg-white outline-none transition-all resize-none"
                  placeholder="How can we help you find your sound?"
                />
              </div>

              <button 
                type="submit"
                disabled={isSending}
                className="w-full bg-black text-white py-4 rounded-xl text-xs font-bold tracking-widest hover:bg-stone-800 transition-all shadow-lg shadow-stone-100 disabled:bg-stone-400 flex items-center justify-center gap-3"
              >
                {isSending ? "SENDING..." : (
                    <>
                        SEND MESSAGE
                        <Send size={14} />
                    </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;