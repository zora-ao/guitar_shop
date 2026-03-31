export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-12 py-12 md:py-20 bg-[#FDFCFA] overflow-hidden">
      <div className="max-w-md">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
          Find Your Perfect Sound
        </h1>
        <p className="text-stone-600 mt-4 text-sm leading-relaxed">
          Explore high-quality guitars for beginners and pros. From acoustic to electric—everything you need to start your musical journey.
        </p>
        <div className="mt-8 flex gap-3">
          <button className="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-stone-800 transition">
            Shop Now
          </button>
          <button className="border border-stone-400 text-stone-800 px-8 py-3 rounded-full text-sm font-semibold hover:bg-stone-50 transition">
            Contact
          </button>
        </div>
      </div>
      <div className="mt-10 md:mt-0 flex justify-center relative">
        {/* Placeholder for your guitar abstract image */}
        <div className="w-full max-w-lg aspect-square bg-stone-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 absolute top-0"></div>
        <img 
          src="https://images.unsplash.com/photo-1525201548942-d8b8bb66170c?q=80&w=800&auto=format&fit=crop" 
          alt="Featured Guitar" 
          className="relative z-10 w-full max-w-md object-contain transform rotate-[-15deg]"
        />
      </div>
    </section>
  );
}