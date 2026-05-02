import { apiFetch } from "./client";
import { type LoginResponse, type User } from "../types/auth";

export const login = (credentials: object): Promise<LoginResponse> => 
    apiFetch<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });

export const getCurrentUser = async(): Promise<User | null> => {
    try {
        const data = await apiFetch<User & { user?: User }>('/auth/me');
        
        return data.user || data;
    } catch (error) {
        return null;
    }
};

export const logoutUser = (): Promise<void> =>
    apiFetch<void>('/auth/logout', {
        method: 'POST',
    });