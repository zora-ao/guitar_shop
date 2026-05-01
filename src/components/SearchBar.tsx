import { useEffect, useRef } from 'react'
import { useShop } from '../context/ShopContext'
import { useLocation } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
    const {search, setSearch, showSearch, setShowSearch} = useShop();
    const location = useLocation();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (showSearch && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showSearch])

    useEffect(() => {
        if (!location.pathname.includes('collection')) {
            setShowSearch(false);
        }
    }, [location, setShowSearch]);

    if (!showSearch) return null;

    return (
        <div className="bg-stone-50 border-b border-stone-200 animate-in fade-in slide-in-from-top duration-300">
            <div className="max-w-3xl mx-auto py-4 px-6 flex items-center gap-4">
                <div className="flex-1 flex items-center bg-white border border-stone-200 rounded-full px-5 py-2 shadow-sm focus-within:border-stone-400 transition-colors">
                    <Search size={18} className="text-stone-400" />
                    <input 
                        ref={inputRef}
                        type="text"
                        placeholder="Search instruments..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none px-4 text-sm text-stone-800"
                    />
                </div>
                <button 
                    onClick={() => {
                        setSearch("");
                        setShowSearch(false);
                    }} 
                    className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
}

export default SearchBar
