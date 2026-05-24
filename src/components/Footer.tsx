import logo from '../assets/logo.png'
import { Phone, Mail, ArrowRight } from "lucide-react"
import { SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  /* Helper to snap page positions seamlessly back to top on redirection */
  const handleFooterLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer className="bg-white border-t border-stone-100 pt-24">
      {/* Newsletter Section */}
      <div className="text-center px-6 max-w-2xl mx-auto mb-24">
        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-black mb-3">
          Join the Registry
        </h2>
        <p className="text-stone-400 text-xs mb-8 max-w-sm mx-auto leading-relaxed">
          Subscribe to receive private drops, custom workshop archives, and priority access to limited guitar allocations.
        </p>
        
        {/* Sleek Minimalist Linear Input Bar */}
        <form 
          onSubmit={(e) => e.preventDefault()} 
          className="flex items-center border-b border-stone-200 pb-2 max-w-md mx-auto focus-within:border-black transition-colors"
        >
          <input 
            type="email" 
            placeholder="ENTER YOUR EMAIL" 
            required
            className="flex-1 bg-transparent border-0 outline-none text-xs font-medium tracking-wider text-black placeholder-stone-300 uppercase py-1"
          />
          <button 
            type="submit"
            aria-label="Subscribe to newsletter"
            className="text-stone-400 hover:text-black transition-colors px-2 py-1"
          >
            <ArrowRight size={16} />
          </button>
        </form>
      </div>

      {/* Main Structural Info Directory */}
      <div className="border-t border-stone-100 px-6 md:px-12 lg:px-16 py-16 bg-stone-50/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Brand Space (Takes up 5 grid spans for breathing room) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center">
              <img 
                src={logo} 
                alt="Aura Guitars Logo" 
                className="h-24 -my-10 w-auto object-contain" 
              />
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-xs font-normal">
              Architectural precision meets legendary acoustic resonance. Crafting high-performance instruments for the modern virtuoso.
            </p>
          </div>

          {/* Column 2: Internal Directory (Takes up 3 grid spans) */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-[10px] uppercase tracking-widest text-black mb-5">
              Company
            </h4>
            <ul className="text-stone-500 text-xs space-y-3 font-medium">
              <li>
                <Link to="/" onClick={handleFooterLinkClick} className="hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={handleFooterLinkClick} className="hover:text-black transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/collection" onClick={handleFooterLinkClick} className="hover:text-black transition-colors">
                  Vault Collection
                </Link>
              </li>
              <li>
                <Link to="/privacy" onClick={handleFooterLinkClick} className="hover:text-black transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contacts & Social Hubs (Takes up 4 grid spans) */}
          <div className="md:col-span-4 space-y-6 md:justify-self-end w-full max-w-xs md:max-w-none">
            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-widest text-black mb-5">
                Get in touch
              </h4>
              
              <div className="space-y-2.5">
                <a 
                  href="tel:+18882872866" 
                  className="flex items-center gap-3 text-stone-500 hover:text-black text-xs font-medium transition-colors group"
                >
                  <Phone size={13} className="text-stone-400 group-hover:text-black transition-colors" />
                  <span>+1 (888) AURA-TONE</span>
                </a>
                
                <a 
                  href="mailto:concierge@auraguitars.com" 
                  className="flex items-center gap-3 text-stone-500 hover:text-black text-xs font-medium transition-colors group"
                >
                  <Mail size={13} className="text-stone-400 group-hover:text-black transition-colors" />
                  <span className="border-b border-transparent group-hover:border-black pb-0.5 transition-all">
                    concierge@auraguitars.com
                  </span>
                </a>
              </div>
            </div>

            {/* Social Media Containers */}
            <div className="flex gap-2.5 pt-1">
              {[
                { href: "https://instagram.com", icon: <SiInstagram size={15} />, label: "Instagram" },
                { href: "https://facebook.com", icon: <SiFacebook size={15} />, label: "Facebook" },
                { href: "https://tiktok.com", icon: <SiTiktok size={15} />, label: "TikTok" }
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer"
                  aria-label={social.label}
                  className="p-2.5 bg-white border border-stone-200 text-stone-400 rounded-xl hover:text-black hover:border-black hover:shadow-xs transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Metadata Bar */}
        <div className="mt-16 pt-8 border-t border-stone-200/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-medium uppercase tracking-widest text-stone-400">
          <div>
            &copy; {currentYear} Aura Guitars. All Rights Reserved.
          </div>
          <div className="flex gap-6 text-[9px]">
            <span className="hover:text-black cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}