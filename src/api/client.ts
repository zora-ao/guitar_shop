const BASE_URL = 'http://localhost:5000/api';

export const apiFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${BASE_URL}${cleanEndpoint}`;

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