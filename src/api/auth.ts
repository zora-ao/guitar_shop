import { apiFetch } from "./client";
import { type LoginResponse } from "../types/auth";

export const login = (credentials: object): Promise<LoginResponse> => 
    apiFetch<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
