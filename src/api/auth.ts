import { apiFetch } from "./client";
import { type LoginResponse, type User } from "../types/auth";


// src/api/support.ts
export async function getSupportInfo(): Promise<{ id: number }> {
    const response = await fetch('http://localhost:5000/api/auth/support-info');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

// Added Signup export
export const signup = (userData: object): Promise<LoginResponse> => 
    apiFetch<LoginResponse>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
    });

export const login = (credentials: object): Promise<LoginResponse> => 
    apiFetch<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });

export const getCurrentUser = async(): Promise<User | null> => {
    try {
        const data = await apiFetch<User & { user?: User }>('/auth/me');
        // This handles cases where the backend nests the user object or returns it directly
        return data.user || data;
    } catch (error) {
        return null;
    }
};

export const logoutUser = (): Promise<void> =>
    apiFetch<void>('/auth/logout', {
        method: 'POST',
    });