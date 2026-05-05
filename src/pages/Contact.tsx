import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowUpRight } from 'lucide-react';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    setTimeout(() => {
      toast.success("Message received. We'll be in touch.");
      setFormData({ name: '', email: '', message: '' });
      setIsSending(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        
        {/* Simplified Header */}
        <div className="mb-16 border-l-4 border-black pl-8">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400 mb-2">Contact</p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Let's Talk <br /> <span className="italic">Tone.</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Essential Info (4 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div className="space-y-10">
              <div className="group cursor-default">
                <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                   <Mail size={12} className="text-stone-400" /> Correspondence
                </h3>
                <p className="text-sm font-bold hover:translate-x-1 transition-transform">concierge@auraguitars.com</p>
                <p className="text-sm font-bold text-stone-400 hover:translate-x-1 transition-transform">sales@auraguitars.com</p>
              </div>

              <div className="group cursor-default">
                <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                   <Phone size={12} className="text-stone-400" /> Direct Line
                </h3>
                <p className="text-sm font-bold">+1 (888) AURA-TONE</p>
                <p className="text-xs text-stone-400 uppercase font-bold tracking-tighter">Availability: 09:00 — 18:00 EST</p>
              </div>

              <div className="group cursor-default">
                <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                   <MapPin size={12} className="text-stone-400" /> Head Quarters
                </h3>
                <p className="text-sm font-bold">Resonance District, Studio 402</p>
                <p className="text-sm font-bold text-stone-400">Manhattan, NY 10001</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-stone-100">
                <a href="#" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-stone-400 transition-colors">
                    <MessageSquare size={14} /> Instagram <ArrowUpRight size={12} />
                </a>
            </div>
          </div>

          {/* Right Column: Compact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-stone-50 p-8 md:p-10 rounded-3xl border border-stone-100 shadow-sm relative overflow-hidden">
              {/* Subtle accent glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-stone-200 rounded-full blur-3xl opacity-50"></div>

              <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-400 ml-1">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-xs focus:border-black outline-none transition-all placeholder:text-stone-300"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-400 ml-1">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-xs focus:border-black outline-none transition-all placeholder:text-stone-300"
                    placeholder="you@aura.com"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-400 ml-1">Message</label>
                  <textarea 
                    required
                    rows={4} // Reduced rows to keep height down
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-xs focus:border-black outline-none transition-all resize-none placeholder:text-stone-300"
                    placeholder="Tell us about the instrument you're looking for..."
                  />
                </div>

                <div className="md:col-span-2 pt-2">
                  <button 
                    type="submit"
                    disabled={isSending}
                    className="w-full md:w-auto bg-black text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-stone-800 transition-all active:scale-95 disabled:bg-stone-300 flex items-center justify-center gap-3"
                  >
                    {isSending ? "SENDING..." : (
                        <>
                            Submit Inquiry <Send size={12} />
                        </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;