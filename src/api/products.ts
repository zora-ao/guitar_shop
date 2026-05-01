import { apiFetch } from "./client";
import { type Product } from "../types/product";

export const getProducts = async(sort?: string): Promise<Product[]> => {
    const url = sort ? `/products?sort=${sort}` : `/products`;
    const res = await apiFetch(url);
    return res as Product[];
}