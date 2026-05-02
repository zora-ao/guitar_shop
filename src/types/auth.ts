export interface User {
    id: number;
    email: string;
    role: string;
}

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    logout: () =>  void;
}

export interface LoginResponse {
    user: User;
    token?: string; 
    message?: string;
}

