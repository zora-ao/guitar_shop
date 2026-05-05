import { Music, ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import about_image from '../assets/about_img.avif'

const About = () => {
  return (
    <div className="bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* Cinematic Banner Hero */}
      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-black">
        {/* The Banner Image */}
        <img 
          src={about_image} 
          alt="Aura Guitars Workshop" 
          className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
        />
        
        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 max-w-6xl mx-auto">
          <p className="text-white text-[10px] font-black uppercase tracking-[0.5em] mb-4 drop-shadow-md">
            Established 2026
          </p>
          <h1 className="text-white text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] drop-shadow-2xl mb-6">
            Aura <br /> Guitars
          </h1>
          <div className="h-1 w-24 bg-white mb-8"></div>
          <p className="text-stone-200 max-w-md text-sm leading-relaxed font-medium drop-shadow-md">
            Hand-crafted instruments for the modern virtuoso. We bridge the gap between 
            architectural design and legendary tone.
          </p>
        </div>
      </section>

      {/* Feature Grid - Minimalist Modern */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: <Music size={20}/>, title: "Pro Sound", desc: "Studio-grade resonance in every build." },
              { icon: <ShieldCheck size={20}/>, title: "Vault Secure", desc: "Lifetime protection on all hardware." },
              { icon: <Truck size={20}/>, title: "Express", desc: "Insured global delivery in 72 hours." },
              { icon: <Sparkles size={20}/>, title: "Artisan Support", desc: "Direct access to our master shop." },
            ].map((val, i) => (
              <div key={i} className="flex flex-col">
                <div className="mb-6 text-black">{val.icon}</div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-3">{val.title}</h3>
                <p className="text-[10px] uppercase font-bold tracking-tight text-stone-400 leading-4">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-24 border-t border-stone-100 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-400 mb-8">
          Experience the Aura
        </p>
        <Link 
          to="/collection" 
          className="group inline-flex items-center gap-6 border-2 border-black px-12 py-5 rounded-full hover:bg-black hover:text-white transition-all duration-300"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Browse Collection</span>
          <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform"/>
        </Link>
      </section>
    </div>
  );
};

export default About;