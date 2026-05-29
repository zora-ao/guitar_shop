import React from 'react';
import { Star } from 'lucide-react';
import Avatar from 'boring-avatars'; // Import Boring Avatars
import { type Review } from '../../types/product';

interface ReviewListProps {
    reviews: Review[];
}

// --- SUB-COMPONENT ---
const ReviewItem = ({ review }: { review: Review }) => {
    const name = review.username || "Guest User";

    const formattedDate = new Date(review.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="flex gap-6 p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
            {/* Boring Avatar replaces DiceBear */}
            <div className="shrink-0 rounded-xl overflow-hidden border border-stone-100 bg-stone-50">
                <Avatar
                    size={56} // 56px matches your original w-14 h-14 dimensions
                    name={name}
                    variant="beam" // Options: "beam", "marble", "pixel", "sunset", "bauhaus", "ring"
                    colors={['#1c1917', '#44403c', '#78716c', '#a8a29e', '#d6d3d1']} // Aesthetic stone palette
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
                        {formattedDate}
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
        <div className="flex flex-col gap-0">
            {reviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
            ))}
        </div>
    );
};