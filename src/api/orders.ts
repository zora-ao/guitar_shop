import { type PaginatedOrders } from "../types/checkout";
import { apiFetch } from "./client";

export const getMyOrders = async(page: number = 1, perPage: number = 10): Promise<PaginatedOrders> => 
    apiFetch(`/orders/my-orders?page=${page}&per_page=${perPage}`, {
        method: 'GET'
    })

export const cancelOrder = async(orderId: number) => 
    apiFetch(`/orders/${orderId}/cancel`, {
        method: 'PATCH'
    });