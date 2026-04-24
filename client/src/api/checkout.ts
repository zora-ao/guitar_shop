import { apiFetch } from "./client"
import { type Order } from "../types/checkout"

export const placeOrder = (orderData: Order) => 
    apiFetch('/checkout', {
        method: 'POST',
        body: JSON.stringify(orderData),
        credentials: 'include'
    });