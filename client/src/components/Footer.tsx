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
            <h3 className="font-bold text-2xl font-serif mb-4">Guitar</h3>
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
          <div className="md:justify-self-end">
            <h4 className="font-bold text-sm mb-4">Get in touch</h4>
            <p className="text-stone-500 text-xs">+1-212-456-7890</p>
            <p className="text-stone-500 text-xs mb-4">contact@guitar.com</p>
            <div className="flex gap-4 text-stone-700">
              <span className="cursor-pointer hover:text-black text-sm font-bold">FB</span>
              <span className="cursor-pointer hover:text-black text-sm font-bold">IG</span>
              <span className="cursor-pointer hover:text-black text-sm font-bold">TT</span>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-stone-400 mt-12">
          Copyright 2024@ forever.com - All Right Reserved.
        </div>
      </div>
    </footer>
  );
}