import { getApiUrl } from "../utils/api";

export const apiFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const url = getApiUrl(endpoint);

    // 1. Create a dynamic headers object
    const headers: Record<string, string> = { ...options.headers as Record<string, string> };

    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(url, {
        ...options,
        credentials: options.credentials || 'include',
        headers,
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Network response was not ok');
    }

    if (res.status === 204) return {} as T;

    return res.json();
};