// src/utils/api.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getApiUrl = (endpoint: string) => {
    // If the variable is missing, this will log a clear error in your browser F12 console
    if (!API_BASE_URL) {
        console.error("CRITICAL: VITE_API_BASE_URL is missing. Check Vercel Dashboard.");
        return `/error-missing-config/${endpoint}`; 
    }

    const cleanBase = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    
    return `${cleanBase}/${cleanEndpoint}`;
};