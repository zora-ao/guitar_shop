export interface Product {
    id: number;
    name: string;
    price: number;
    images: string[];
    category: string;
    stock: number;
    image_url: string;
    isBestSeller?: boolean;
    description: string;
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