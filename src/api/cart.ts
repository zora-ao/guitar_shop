import { apiFetch } from "./client";
import { type AddToCartResponse, type CartItem } from "../types/cart";

export const addItemToCart = async(productId: number, quantity: number): Promise<AddToCartResponse> => 
    apiFetch('/cart/add', {
        method: 'POST',
        body: JSON.stringify({
            product_id: productId,
            quantity: quantity
        }) 
    }) as Promise<AddToCartResponse>;

export const syncCart = (localCart: CartItem[]) => 
    apiFetch('/cart/sync', {
        method: 'POST',
        body: JSON.stringify(localCart)
    });

export const getCart = (): Promise<CartItem[]> => apiFetch('/cart');

export const updateCartItemQuantity = (itemId: number, quantity: number) => 
    apiFetch(`/cart/update/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity })
    });

export const deleteCartItem = (itemId: number) => 
    apiFetch(`/cart/delete/${itemId}`, {
        method: 'DELETE'
    });