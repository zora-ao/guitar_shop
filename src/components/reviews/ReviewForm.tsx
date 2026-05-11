import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { reviewApi } from '../../api/review';
import { Send } from 'lucide-react';
import { toast } from 'react-toastify';

export const ReviewForm = ({ productId, onReviewAdded }: { productId: number, onReviewAdded: () => void }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) return toast.warn("Please select a rating");

        setIsSubmitting(true);
        try {
            await reviewApi.addReview(productId, rating, comment);
            setRating(0);
            setComment("");
            onReviewAdded(); 
        } catch (err: any) {
            setError(err.message);
            toast.error(err.message || "Failed to submit review");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm transition-all duration-300">
            {/* Header Section */}
            <div className="mb-8 border-b border-stone-100 pb-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-1">
                    Feedback
                </h3>
                <p className="text-xl font-serif text-stone-900 italic">Write a Review</p>
            </div>

            {/* Rating Section */}
            <div className="mb-8">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-800 mb-3">
                    Rating
                </label>
                <div className="flex items-center gap-4 bg-stone-50 w-fit p-3 rounded-xl border border-stone-100">
                    <Rating 
                        onClick={(rate) => setRating(rate)} 
                        initialValue={rating} 
                        size={22} 
                        transition 
                        allowFraction={false}
                        fillColor="#facc15" 
                        emptyColor="#e7e5e4"
                        SVGclassName="inline-block"
                    />
                    <span className="text-xs font-bold text-stone-400 border-l pl-4 border-stone-200">
                        {rating > 0 ? `${rating}.0` : "Select"}
                    </span>
                </div>
            </div>

            {/* Comment Section */}
            <div className="mb-8">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-800 mb-3">
                    Your Review
                </label>
                <textarea 
                    className="w-full p-5 text-sm bg-stone-50 border border-stone-100 rounded-2xl focus:bg-white focus:ring-1 focus:ring-stone-300 outline-none transition-all placeholder:text-stone-300 min-h-[160px] resize-none leading-relaxed"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about the sound, the neck feel, and the finish..."
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 text-[11px] font-bold text-red-500 flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                    <div className="w-1 h-1 bg-red-500 rounded-full" />
                    {error}
                </div>
            )}

            {/* Submit Button */}
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="group w-full bg-stone-900 text-white text-[10px] font-bold uppercase tracking-[0.25em] py-5 rounded-2xl hover:bg-stone-800 transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-stone-100"
            >
                {isSubmitting ? (
                    "Posting..."
                ) : (
                    <>
                        Submit Review
                        <Send size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                )}
            </button>
        </form>
    );
};