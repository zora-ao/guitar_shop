import { apiFetch } from "./client"
import { type OrderData, type CheckoutResponse } from "../types/checkout"

export const placeOrder = (orderData: OrderData): Promise<CheckoutResponse> => 
    apiFetch('/checkout', {
        method: 'POST',
        body: JSON.stringify(orderData),
        credentials: 'include'
    });