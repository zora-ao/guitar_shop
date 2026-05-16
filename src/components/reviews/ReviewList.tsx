import React, { useMemo } from 'react';
import { Star } from 'lucide-react';
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { type Review } from '../../types/product';

interface ReviewListProps {
    reviews: Review[];
}

// --- SUB-COMPONENT: This solves the "Hook in Loop" error ---
const ReviewItem = ({ review }: { review: Review }) => {
    const name = review.username || "Guest User";

    // useMemo is now called at the top level of this sub-component
    const avatar = useMemo(() => {
    // Generate the SVG string
    const svg = createAvatar(lorelei, {
            seed: name,
            size: 128,
        }).toString();

        // Convert the SVG string to a Base64 Data URI
        return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    }, [name]);

    return (
        <div className="flex gap-6 p-6 bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300">
            {/* DiceBear Avatar */}
            <div className="shrink-0">
                <img 
                    src={avatar} 
                    alt={name} 
                    className="w-14 h-14 rounded-xl border border-stone-100 bg-stone-50"
                />
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="font-bold text-stone-900 text-sm leading-none mb-1.5">
                            {name}
                        </h4>
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={12}
                                    className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-stone-200"}
                                />
                            ))}
                        </div>
                    </div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest bg-stone-50 px-2 py-1 rounded border border-stone-100">
                        {review.created_at}
                    </span>
                </div>

                <p className="text-stone-600 text-sm leading-relaxed max-w-2xl font-medium">
                    {review.comment || "The user rated this product without leaving a written review."}
                </p>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
    if (reviews.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-stone-400 text-sm italic">No feedback yet for this instrument.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5">
            {reviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
            ))}
        </div>
    );
};