export interface Product {
    id: number;
    name: string;
    price: number;
    image_url: string;
    category?: string;
    isBestSeller?: boolean;
    description: string;
}