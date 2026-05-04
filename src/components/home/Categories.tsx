import { Guitar, Speaker, Disc, Mic2, Cable } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'Acoustic', icon: <Guitar size={32} />, path: '/collection/acoustic' },
    { name: 'Electric', icon: <Guitar size={32} className="rotate-45" />, path: '/collection/electric' },
    { name: 'Amps', icon: <Speaker size={32} />, path: '/collection/amps' },
    { name: 'Pedals', icon: <Disc size={32} />, path: '/collection/pedals' },
    { name: 'Audio', icon: <Mic2 size={32} />, path: '/collection/audio' },
    { name: 'Accessories', icon: <Cable size={32} />, path: '/collection/accessories' },
];

export default function Categories() {
    return (
        <section className="py-4 px-6 md:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black uppercase tracking-widest text-black">
                Browse By Category
            </h2>
            </div>

            {/* Grid of Category Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((item) => (
                <Link
                key={item.name}
                to={item.path}
                className="group flex flex-col items-center justify-center border border-stone-200 rounded-lg p-8 transition-all duration-300 hover:bg-black hover:border-black"
                >
                <div className="text-black group-hover:text-white transition-colors duration-300">
                    {item.icon}
                </div>
                <span className="mt-4 text-xs font-bold uppercase tracking-widest text-black group-hover:text-white transition-colors duration-300 text-center">
                    {item.name}
                </span>
                </Link>
            ))}
            </div>
        </div>
        </section>
    );
}

