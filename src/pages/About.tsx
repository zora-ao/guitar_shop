import { Music, ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import about_image from '../assets/about_img.avif'

const About = () => {
  /* Global handler to snap the browser view to the top when navigating away */
  const handleCtaClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="bg-white text-black font-sans selection:bg-black selection:text-white min-h-screen">
      
      {/* Cinematic Banner Hero */}
      <section className="relative w-full h-[75vh] min-h-[550px] overflow-hidden bg-black flex items-center">
        {/* Subtle, premium dark mask over the image layout */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        
        <img 
          src={about_image} 
          alt="Aura Guitars Workshop" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-[1200ms] ease-out scale-105 hover:scale-100"
        />
        
        {/* Text Overlay */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">
            Established 2026
          </p>
          <h1 className="text-white text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.85] mb-8">
            Aura <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-200 to-stone-500">
              Guitars
            </span>
          </h1>
          <div className="h-[2px] w-12 bg-white mb-8 opacity-60"></div>
          <p className="text-stone-300 max-w-sm text-xs md:text-sm leading-relaxed font-medium tracking-wide">
            Hand-crafted instruments for the modern virtuoso. We bridge the absolute gap between 
            architectural design precision and legendary raw tone.
          </p>
        </div>
      </section>

      {/* Feature Grid - Framed Studio Layout */}
      <section className="bg-white py-28 px-6 md:px-12 lg:px-16 border-b border-stone-100">
        <div className="max-w-6xl mx-auto">
          {/* Section Section Label Header */}
          <div className="mb-16 border-b border-stone-100 pb-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">
              Built To Perform
            </h2>
          </div>

          {/* Grid using clean internal dividing borders instead of loose text */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0 lg:divide-x lg:divide-stone-100">
            {[
              { icon: <Music size={18}/>, title: "Pro Sound", desc: "Studio-grade resonance engineered into every single build." },
              { icon: <ShieldCheck size={18}/>, title: "Vault Secure", desc: "Lifetime structural protection guarantees on all stock hardware." },
              { icon: <Truck size={18}/>, title: "Express Logistics", desc: "Fully insured global air-freight delivery drop within 72 hours." },
              { icon: <Sparkles size={18}/>, title: "Artisan Support", desc: "Direct 1-on-1 backend access to our active master workbench." },
            ].map((val, i) => (
              <div key={i} className="flex flex-col lg:px-6 first:pl-0 last:pr-0">
                <div className="mb-5 text-black p-2 bg-stone-50 w-fit rounded-lg border border-stone-100">
                  {val.icon}
                </div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-2 text-black">
                  {val.title}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed font-normal">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-32 text-center bg-stone-50/50">
        <div className="max-w-xl mx-auto px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-3">
            Experience the Aura
          </p>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-black mb-8">
            Ready to find your perfect instrument?
          </h2>
          
          <Link 
            to="/collection" 
            onClick={handleCtaClick}
            className="group relative inline-flex items-center justify-center gap-4 bg-black border border-black px-10 py-4 text-white overflow-hidden rounded-xl shadow-xs transition-all duration-300 hover:bg-stone-950"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] z-10">
              Browse Vault Collection
            </span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300 z-10" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;