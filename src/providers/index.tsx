import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../context/AuthContext'
import { ShopProvider } from '../context/ShopContext'
import { CartProvider } from '../context/CartContext'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient();

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <ShopProvider>
            <CartProvider>
                <BrowserRouter>
                {children}
                </BrowserRouter>
            </CartProvider>
            </ShopProvider>
        </AuthProvider>
        </QueryClientProvider>
    );
};