import { apiFetch } from "./client";
import { type Order } from "../types/checkout";

export const getAdminOrders = async(): Promise<Order[]> => 
    apiFetch('/admin/orders', {
        method: 'GET'
    });

export const updateOrderStatus = async(orderId: number, status: string) => 
    apiFetch(`/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
    });