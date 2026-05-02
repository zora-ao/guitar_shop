import { Music, ShieldCheck, Truck, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#FDFCFA] text-stone-800">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop" 
          alt="Luthier workshop" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 text-center px-4">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-500 mb-4 block">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-serif tracking-tighter">VibeStrings</h1>
          <p className="mt-6 text-lg font-light max-w-2xl mx-auto text-stone-600 leading-relaxed">
            Founded with a passion for resonance and craftsmanship, we bridge the gap between world-class luthiers and aspiring musicians.
          </p>
        </div>
      </section>

      {/* Philosophy Section - Split Layout */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <div className="aspect-[4/5] bg-stone-100 rounded-2xl overflow-hidden shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1516924912317-7342d05f3048?q=80&w=1974&auto=format&fit=crop" 
              alt="Guitar craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="order-1 md:order-2 space-y-6">
          <h2 className="text-4xl font-serif">Uncompromising Quality</h2>
          <p className="text-stone-600 leading-relaxed font-light">
            Every instrument in our collection undergoes a rigorous multi-point inspection. From the humidity-controlled vault to the final setup, we ensure that your "Vibe" is perfect from the moment you unbox it.
          </p>
          <div className="pt-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Curated</h4>
              <p className="text-xs text-stone-500">Only the finest tonewoods and electronics make the cut.</p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Professional</h4>
              <p className="text-xs text-stone-500">Setup by expert luthiers before every shipment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Grid Layout */}
      <section className="bg-stone-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif">Why VibeStrings?</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { icon: <Music size={24} />, title: "Premium Sound", desc: "Hand-picked for exceptional tonal quality." },
              { icon: <ShieldCheck size={24} />, title: "Secure Checkout", desc: "Your data is protected with industry-standard encryption." },
              { icon: <Truck size={24} />, title: "Safe Delivery", desc: "Specialized instrument packaging for global shipping." },
              { icon: <Sparkles size={24} />, title: "Lifetime Support", desc: "Expert advice for the life of your instrument." },
            ].map((value, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-4">
                <div className="text-stone-400 mb-2">{value.icon}</div>
                <h3 className="font-bold text-sm uppercase tracking-widest">{value.title}</h3>
                <p className="text-sm text-stone-500 font-light leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-serif mb-8">Ready to find your sound?</h2>
        <a 
          href="/shop" 
          className="inline-block bg-black text-white px-12 py-4 rounded-xl text-xs font-bold tracking-widest hover:bg-stone-800 transition-all shadow-lg shadow-stone-200"
        >
          EXPLORE COLLECTIONS
        </a>
      </section>
    </div>
  );
};

export default About;