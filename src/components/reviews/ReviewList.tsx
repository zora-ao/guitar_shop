import React from 'react';
import { Star, MessageSquare, Globe, Heart } from 'lucide-react';
import { type Review } from '../../types/product';

interface ReviewListProps {
    reviews: Review[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
    if (reviews.length === 0) {
        return (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-200">
            <p className="text-stone-400 text-sm font-medium">No feedback yet for this instrument.</p>
        </div>
        );
    }

    return (
        <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
        {reviews.map((review) => {
            // FIX: Defensive check to prevent "Cannot read properties of undefined (reading '0')"
            const name = review.username || "Guest User";
            const initial = name.charAt(0).toUpperCase();

            return (
            <div 
                key={review.id} 
                className="flex flex-col md:flex-row gap-8 p-8 border-b border-stone-100 last:border-b-0 hover:bg-stone-50/50 transition-all duration-300"
            >
                {/* Left Column: Profile (The "Dashboard" Sidebar look) */}
                <div className="w-full md:w-40 flex flex-col items-center md:items-start text-center md:text-left shrink-0">
                <div className="w-14 h-14 bg-stone-100 rounded-2xl mb-4 flex items-center justify-center text-stone-400 font-black text-lg border border-stone-200/50 shadow-inner">
                    {initial}
                </div>
                <h4 className="font-bold text-stone-900 text-[11px] uppercase tracking-[0.15em] mb-1">
                    {name}
                </h4>
                <div className="space-y-1">
                    <p className="text-[10px] text-stone-400 font-medium">Total Review: <span className="text-stone-600">1</span></p>
                    <span className="inline-block px-2 py-0.5 bg-green-50 text-green-600 text-[9px] font-black rounded uppercase tracking-tighter">
                        Verified Buyer
                    </span>
                </div>
                </div>

                {/* Right Column: Review Content */}
                <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                    {/* Rating Stars */}
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={12}
                            className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-stone-200"}
                        />
                        ))}
                    </div>
                    <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">
                        {review.created_at}
                    </span>
                    </div>
                </div>

                {/* The Comment */}
                <p className="text-stone-600 text-sm leading-relaxed mb-8 max-w-2xl font-medium">
                    {review.comment || "The user didn't leave a written description, but rated this product."}
                </p>

                {/* Action Buttons (Dashboard Style) */}
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-xl text-[10px] font-bold uppercase tracking-wider text-stone-500 hover:border-stone-400 hover:text-stone-700 transition-all shadow-sm">
                    <Globe size={12} className="text-stone-300" />
                    Public Comment
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-xl text-[10px] font-bold uppercase tracking-wider text-stone-500 hover:border-stone-400 hover:text-stone-700 transition-all shadow-sm">
                    <MessageSquare size={12} className="text-stone-300" />
                    Direct Message
                    </button>
                    <button className="ml-2 p-2 text-stone-200 hover:text-red-400 transition-colors">
                        <Heart size={18} />
                    </button>
                </div>
                </div>
            </div>
            );
        })}
        </div>
    );
};