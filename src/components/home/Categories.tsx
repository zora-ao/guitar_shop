import { Guitar, Sliders, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'Acoustic', icon: <Guitar size={28} />, query: 'acoustic' },
    { name: 'Electric', icon: <Guitar size={28} className="rotate-45" />, query: 'electric' },
    { name: 'Bass Guitars', icon: <Sliders size={26} />, query: 'bass' },
    { name: 'Hollowbody', icon: <ShieldCheck size={26} />, query: 'hollowbody' },
    { name: 'Classical', icon: <Award size={26} />, query: 'classical' },
    { name: 'Custom Shop', icon: <Sparkles size={26} />, query: 'custom-shop' },
];

export default function Categories() {
    
    /* Global handler to reset the scroll view before the router fully mounts the content */
    const handleCategoryClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'instant' /* 'instant' prevents jarring, sluggish scrolling transitions between views */
        });
    };

    return (
        <section className="py-12 px-6 md:px-16 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8 border-b border-stone-100 pb-4">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-black">
                        Browse Collections
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((item) => (
                        <Link
                            key={item.name}
                            to={`/collection?type=${item.query}`}
                            /* Fires the global reset whenever a user initiates a click */
                            onClick={handleCategoryClick}
                            className="group flex flex-col items-center justify-center border border-stone-200 rounded-xl p-8 transition-all duration-300 hover:bg-black hover:border-black shadow-xs"
                        >
                            <div className="text-black group-hover:text-white transition-colors duration-300">
                                {item.icon}
                            </div>
                            <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-stone-800 group-hover:text-white transition-colors duration-300 text-center">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}