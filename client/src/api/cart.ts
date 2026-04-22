import { apiFetch } from "./client";
import { type CartItem } from "../types/cart";

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