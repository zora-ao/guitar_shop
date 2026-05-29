import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Mail, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    setTimeout(() => {
      toast.success("Message received.");
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSending(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFA] text-stone-900 font-sans selection:bg-stone-900 selection:text-white flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 md:px-16 py-16 md:py-10 space-y-12">
        
        {/* Header Section - Enhanced contrast and solid weight */}
        <div className="max-w-4xl mx-auto pl-2">
          <h1 className="text-3xl md:text-5xl font-normal uppercase tracking-[0.2em] text-stone-950">
            Contact
          </h1>
          <p className="text-xs font-bold text-stone-500 tracking-[0.2em] uppercase mt-3">
            Aura Guitars Atelier
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* LEFT: Elegant Form Card */}
          <form 
            onSubmit={handleSubmit} 
            className="lg:col-span-7 bg-white border border-stone-200 p-8 md:p-10 rounded-3xl space-y-10 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-stone-200 py-2 text-sm text-stone-900 focus:border-stone-900 outline-none transition-colors placeholder:text-stone-400 font-normal"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-stone-200 py-2 text-sm text-stone-900 focus:border-stone-900 outline-none transition-colors placeholder:text-stone-400 font-normal"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                  Subject
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-stone-200 py-2 text-sm text-stone-900 focus:border-stone-900 outline-none transition-colors placeholder:text-stone-400 font-normal"
                  placeholder="Inquiry detail"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                  Message
                </label>
                <textarea 
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-stone-200 py-2 text-sm text-stone-900 focus:border-stone-900 outline-none transition-colors resize-none placeholder:text-stone-400 font-normal leading-relaxed"
                  placeholder="Tell us about your project..."
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={isSending}
                className="w-full md:w-auto bg-stone-900 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors disabled:bg-stone-200 disabled:text-stone-400 rounded-xl shadow-sm flex items-center justify-center gap-2.5"
              >
                {isSending ? "Sending..." : <>Send Message <Send size={12} /></>}
              </button>
            </div>
          </form>

          {/* RIGHT: Contact Information Cards Stack */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="flex-1 bg-white border border-stone-200 p-8 rounded-3xl space-y-8 shadow-sm flex flex-col justify-center">
              
              {/* Location */}
              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-stone-100 rounded-xl text-stone-700 shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Location
                  </h4>
                  <p className="text-sm font-normal text-stone-800 leading-relaxed">
                    Santa Cruz, Studio 402<br />Laguna, street 10001
                  </p>
                </div>
              </div>

              {/* Correspondence */}
              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-stone-100 rounded-xl text-stone-700 shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Digital Correspondence
                  </h4>
                  <p className="text-sm font-normal text-stone-800 leading-relaxed">
                    +1 (888) AURA-TONE<br />
                    <span className="text-stone-950 font-medium hover:text-stone-600 transition-colors cursor-pointer border-b-2 border-stone-200 hover:border-stone-600 pb-0.5">
                      aozora@auraguitars.com
                    </span>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-stone-100 rounded-xl text-stone-700 shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Hours
                  </h4>
                  <p className="text-sm font-normal text-stone-800 leading-relaxed">
                    Mon — Fri: 10AM – 6PM EST<br />Sat: By Appointment Only
                  </p>
                </div>
              </div>

            </div>

            {/* Image Card */}
            <div className="h-40 rounded-3xl overflow-hidden border border-stone-200 shadow-sm relative bg-stone-100">
              <img 
                src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2070&auto=format&fit=crop" 
                alt="Aura Guitars Workshop" 
                className="w-full h-full object-cover grayscale opacity-95 contrast-[1.05]"
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;