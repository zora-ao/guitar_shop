import { Link } from 'react-router-dom';
import hero_img from '../../assets/hero_image.png'

export default function Hero() {
  return (
    <section className="px-6 py-8 md:px-16 md:py-4 bg-white">
      {/* 
          Container mimics the "card" feel from Screenshot 2026-05-04 112746.png 
          but with a strict Black & White / Minimalist theme.
      */}
      <div className="max-w-6xl mx-auto bg-[#F6F6F6] rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center min-h-[400px] md:min-h-[450px]">
        
        {/* Left Content Side */}
        <div className="p-8 md:p-10">
          <h1 className="text-3xl md:text-5xl font-black text-black leading-tight uppercase tracking-tighter">
            Grab Up To <span className="text-red-400">50% Off</span> <br />
            On Selected Guitars
          </h1>
          <p className="text-stone-600 mt-4 text-sm md:text-base font-medium max-w-sm">
            Premium sound meets minimalist design. Explore our curated collection of professional-grade instruments.
          </p>
          
          <div className="mt-8 flex items-center gap-4">
            <Link
              to='/collection' 
              className="bg-black text-white px-8 py-3 rounded-full text-xs font-bold hover:bg-stone-800 transition uppercase tracking-widest">
              Buy Now
            </Link>
          </div>
        </div>

        {/* Right Image Side */}
        <div className="relative flex justify-center items-end h-full bg-[#EBEBEB] md:bg-transparent">
          <img 
            src={hero_img}
            alt="Featured Guitar" 
            className="w-full max-w-[280px] md:max-w-[350px] object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-500"
          />
        </div>
      </div>
    </section>
  );
}