export default function AdminHeader() {
  return (
    <header className="flex items-center justify-between px-10 py-5 bg-white border-b border-stone-200">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="border border-black p-1 rounded-sm">
          <span className="font-serif font-bold text-xs">VibeStrings</span>
        </div>
      </div>
      
      {/* Logout Button */}
      <button className="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-stone-800 transition">
        LOGOUT
      </button>
    </header>
  );
}