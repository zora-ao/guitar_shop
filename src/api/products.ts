import { apiFetch } from "./client";
import { type Product } from "../types/product";

export const getProducts = async(category?: string, limit?: number): Promise<Product[]> => {
    let url = `/products`;
    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (limit) params.append("limit", limit.toString());

    const queryString = params.toString();
    return apiFetch(queryString ? `${url}?${queryString}` : url) as Promise<Product[]>;
}

export const getProductsById = async(id: string): Promise<Product> => {
    return apiFetch(`/products/${id}`) as Promise<Product>;
}

export const getAllProducts = async (): Promise<Product[]> => {
    const res = await apiFetch('/products');
    return res as Product[];
};