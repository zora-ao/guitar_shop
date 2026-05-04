import { Music, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import about_image from '../assets/about_img.avif'

const About = () => {
  return (
    <div className="bg-white text-black font-sans">
      {/* Small Hero */}
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">VibeStrings</h1>
        <p className="text-sm text-stone-500 uppercase font-bold tracking-widest mb-8">We sell great guitars.</p>
        <div className="h-64 w-full grayscale rounded-lg overflow-hidden">
          <img src={about_image} alt="Shop" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Grid Features - Tiny Cards */}
      <section className="bg-black text-white py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Music size={20}/>, title: "Pro Sound" },
            { icon: <ShieldCheck size={20}/>, title: "Secure" },
            { icon: <Truck size={20}/>, title: "Fast Shipping" },
            { icon: <Sparkles size={20}/>, title: "Support" },
          ].map((val, i) => (
            <div key={i} className="border border-stone-800 p-6 flex flex-col items-center text-center">
              <div className="mb-2">{val.icon}</div>
              <h3 className="text-[10px] font-black uppercase tracking-widest">{val.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Small CTA */}
      <section className="py-16 text-center">
        <Link to="/collection" className="border-b-2 border-black pb-1 text-sm font-black uppercase tracking-widest">
          Browse Shop
        </Link>
      </section>
    </div>
  );
};

export default About;