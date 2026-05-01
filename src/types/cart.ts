import { type Product } from "./product";

export interface CartItem {
    id: number;
    quantity: number;
    product: Product;
}

export interface AddToCartResponse {
    message: string;
    item: CartItem;
}