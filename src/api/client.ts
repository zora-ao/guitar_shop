import { getApiUrl } from "../utils/api";

export const apiFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    
    const url = getApiUrl(endpoint);

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const res = await fetch(url, {
        ...options,
        credentials: options.credentials || 'include',
        headers,
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Network response was not ok');
    }


    return res.json();

};