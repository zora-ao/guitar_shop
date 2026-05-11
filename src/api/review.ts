import { apiFetch } from "./client";
import { type Review } from "../types/product";

// Typing the response from your Flask backend
interface ReviewResponse {
    msg: string;
    review: Review;
}

interface ReviewStats {
    total_reviews: number;
    average_rating: number;
    distribution: Record<string, number>;
}

export const reviewApi = {
    // 1. GET: Fetch the list of reviews for a product
    getReviews: async (productId: number): Promise<Review[]> => {
        return await apiFetch<Review[]>(`/reviews/${productId}`, {
            method: 'GET'
        });
    },

    // 2. GET: Fetch aggregated stats (Total, Average, Bars)
    getStats: async (productId: number): Promise<ReviewStats> => {
        return await apiFetch<ReviewStats>(`/reviews/stats/${productId}`, {
            method: 'GET'
        });
    },

    // 3. POST: Add a new review (Already implemented, just cleaned up)
    addReview: async (productId: number, rating: number, comment: string): Promise<ReviewResponse> => {
        return await apiFetch<ReviewResponse>(`/reviews/${productId}`, {
            method: 'POST',
            body: JSON.stringify({ rating, comment }),
        });
    }
};