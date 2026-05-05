import { apiFetch } from "./client";
import { type Order } from "../types/checkout";
import type { Product } from "../types/product";

export interface AdminStats {
    totalProducts: number;
    totalCustomers: number;
    totalOrders: number;
    totalRevenue: number;
    totalSales: number;
}

export const fetchAdminStats = async (): Promise<any> => 
    apiFetch('/admin/dashboard-summary', {
        method: 'GET',
        credentials: 'include' 
    });

export const addProduct = async(formData: FormData): Promise<Product> => 
    apiFetch<Product>('/products/add_products', {
        method: 'POST',
        body: formData,
        credentials: 'include'
    });

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

export const getAdminProducts = (): Promise<Product[]> =>
    apiFetch<Product[]>('/products');

export const deleteProduct = (id: number): Promise<{ message: string }> => 
    apiFetch<{ message: string }>(`/products/${id}`, { method: 'DELETE' });

export const updateProduct = (id: number, formData: FormData): Promise<Product> => 
    apiFetch<Product>(`/products/${id}`, {
        method: 'PUT',
        body: formData,
    });
