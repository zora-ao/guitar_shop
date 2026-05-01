
export interface User {
    id: string;
    email: string;
    role: 'admin' | 'user';
}

export interface LoginResponse {
    user: User;
    token?: string; 
    message?: string;
}