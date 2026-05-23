import logo from '../assets/logo.png'
import { Phone, Mail } from "lucide-react"
import { SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#FDFCFA] pt-16">
      {/* Newsletter */}
      <div className="text-center px-6 mb-20">
        <h2 className="text-3xl font-bold font-serif mb-3">Sign Up To Our Newsletter</h2>
        <p className="text-stone-500 text-sm mb-6 max-w-md mx-auto">
          Lorem ipsum dolor sit amet consectetur. Tempus neque a vestibulum arcu mi et.
        </p>
        <div className="flex max-w-md mx-auto border border-stone-300 rounded-full overflow-hidden p-1">
          <input 
            type="email" 
            placeholder="Your email" 
            className="flex-1 px-4 py-2 outline-none text-sm bg-transparent"
          />
          <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-stone-800">
            Subscribe
          </button>
        </div>
      </div>

      <div className="border-t border-stone-200 px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="Vibe Logo" 
                className="h-32 -my-8 w-auto object-contain transition-transform duration-300 hover:scale-105" 
              />
            </div>
            <p className="text-stone-500 text-xs leading-relaxed max-w-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>

          {/* Links */}
          <div className="md:justify-self-center">
            <h4 className="font-bold text-sm mb-4">Company</h4>
            <ul className="text-stone-500 text-xs space-y-2">
              <li><a href="#" className="hover:text-black">Home</a></li>
              <li><a href="#" className="hover:text-black">About Us</a></li>
              <li><a href="#" className="hover:text-black">Delivery</a></li>
              <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:justify-self-end space-y-5">
            <div>
              <h4 className="font-bold text-sm mb-4">
                Get in touch
              </h4>
              
              {/* Contact Links with Micro-Icons */}
              <div className="space-y-1.5">
                <a 
                  href="tel:+18882872866" 
                  className="flex items-center gap-2 text-stone-500 hover:text-stone-900 text-xs font-light transition-colors group"
                >
                  <Phone size={12} className="text-stone-400 group-hover:text-stone-900 transition-colors" />
                  <span>+1 (888) AURA-TONE</span>
                </a>
                
                <a 
                  href="mailto:concierge@auraguitars.com" 
                  className="flex items-center gap-2 text-stone-500 hover:text-stone-900 text-xs font-light transition-colors group"
                >
                  <Mail size={12} className="text-stone-400 group-hover:text-stone-900 transition-colors" />
                  <span className="border-b border-transparent group-hover:border-stone-900 pb-0.5">
                    concierge@auraguitars.com
                  </span>
                </a>
              </div>
            </div>

            {/* Social Media Premium Icons Container */}
            <div className="flex gap-3.5 text-stone-400 pt-1">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2 bg-stone-50 border border-stone-100 rounded-xl hover:bg-white hover:text-stone-900 hover:border-stone-200 hover:shadow-sm transition-all duration-200"
              >
                <SiInstagram size={20} color="currentColor" />
              </a>
              
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Facebook"
                className="p-2 bg-stone-50 border border-stone-100 rounded-xl hover:bg-white hover:text-stone-900 hover:border-stone-200 hover:shadow-sm transition-all duration-200"
              >
                <SiFacebook size={20} color="currentColor" />
              </a>

              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="TikTok"
                className="p-2 bg-stone-50 border border-stone-100 rounded-xl hover:bg-white hover:text-stone-900 hover:border-stone-200 hover:shadow-sm transition-all duration-200 flex items-center justify-center font-bold text-[10px] leading-none tracking-tighter"
              >
                {/* Lucide doesn't have a TikTok icon by default, so we use a clean stylized vector-text box that scales beautifully with the other 15px icons */}
                <SiTiktok size={20} color="currentColor" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-stone-400 mt-12">
          Copyright 2026@ guitar.com - All Right Reserved.
        </div>
      </div>
    </footer>
  );
}