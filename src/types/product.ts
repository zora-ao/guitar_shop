export interface Review {
    id: number;
    rating: number;
    comment: string;
    username: string;
    user_id: number;
    created_at: string; // ISO string from Flask
}

export interface Product {
    id: number;
    name: string;
    price: number;
    images: string[];
    category: string;
    stock: number;
    image_url: string;
    is_best_seller?: boolean;
    description: string;
    reviews: Review[]; // Nested array from your Product.to_dict()
    average_rating: number;
}

export interface ShopContextType {
    products: Product[];
    isLoading: boolean;
    isError: boolean;
    search: string;
    setSearch: (value: string) => void;
    showSearch: boolean;
    setShowSearch: (value: boolean) => void;
    selectedCategories: string[]; 
    setSelectedCategories: (categories: string[]) => void;
    toggleCategory: (value: string) => void;
}