import React, { createContext, useContext, useEffect, useState } from "react";
import { type Product } from "../components/CollectionContent";

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('vibe-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('vibe-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product, quantity: number) => {
        setCart((prevCart: CartItem[]): CartItem[] => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) => 
                    item.id === product.id ? {...item, quantity: item.quantity + quantity} : item
                );
            }

            return [...prevCart, {...product, quantity}];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId: number, newQty: number) => {
        if (newQty < 1) return;

        setCart((prev): CartItem[] => {
            return prev.map((item) => 
                item.id === productId ? {...item, quantity: newQty} : item);
        });
    };


    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);


    return (
        <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal}}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};