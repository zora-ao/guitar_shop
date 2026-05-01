import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { type Product } from "../types/product";
import { useAuth } from "./AuthContext";
import { addItemToCart, deleteCartItem, getCart, updateCartItemQuantity } from "../api/cart";
import { type CartItem } from "../types/cart";


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
    const { user } = useAuth();
    const [cart, setCart] = useState<CartItem[]>([]);

    const debounceTimer = useRef<{ [key: number]: any }>({});

    useEffect(() => {
        const fetchDB = async () => {
            if (user) {
                try {
                    const data = await getCart();
                    setCart(Array.isArray(data) ? data : []);
                    console.log("Data from API:", data);
                } catch (error) {
                    console.error("Failed to fetch cart from DB", error);
                    setCart([]);
                }
            } else {
                // Fallback to local storage for guests
                const saved = localStorage.getItem('vibe-cart');
                if (saved) {
                    try {
                        setCart(JSON.parse(saved));
                    } catch {
                        setCart([]);
                    }
                }
            }
        };
        fetchDB();
    }, [user]);

    useEffect(() => {
        if (!user) {
            localStorage.setItem('vibe-cart', JSON.stringify(cart));
        }
    }, [cart, user]);

    

    const addToCart = async (product: Product, quantity: number) => {
            if (user){
                try {
                    const res = await addItemToCart(product.id, quantity);
                    const serverItem = res.item;

                    setCart((prevCart) => {
                        const existingItem = prevCart.find((item) => item.product.id === product.id);
                        if (existingItem){
                            return prevCart.map((item) => 
                                item.product.id === product.id ? serverItem : item
                            );
                        }
                        return [...prevCart, serverItem];
                    });

                    return;

                } catch (error){
                    console.error("Failed to add to DB cart", error);
                    return;
                }
            }

            setCart((prevCart) => {
                const existingItem = prevCart.find((item) => item.product.id === product.id);
                if (existingItem) {
                    return prevCart.map((item) =>
                        item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                    );
                }
                return [...prevCart, { product, quantity, id: Date.now() }];
            });
        };

    const removeFromCart = async (productId: number) => {
        const item = cart.find(i => i.product.id == productId);

        if (user && item){
            try {
                await deleteCartItem(item.id);
            } catch (error) {
                console.error("Failed to delete item fro db", error);
                return;
            }
        }

        setCart((prev) => prev.filter((item) => item.product?.id !== productId));
    };

    const updateQuantity = async (productId: number, newQty: number) => {
        if (newQty < 1) return;

        setCart((prev) => 
            prev.map((item) => 
                item.product?.id === productId ? {...item, quantity: newQty} : item
            )
        );

        if (user){
            const currentItem = cart.find(i => i.product.id === productId);
            if (!currentItem) return;

            if (debounceTimer.current[productId]){
                clearTimeout(debounceTimer.current[productId]);
            }

            debounceTimer.current[productId] = setTimeout(async () => {
                try {
                    const itemToUpdate = cart.find(i => i.product.id === productId);

                    if (itemToUpdate && itemToUpdate.id){
                        await updateCartItemQuantity(itemToUpdate.id, newQty);
                        console.log("Database updated successfully");
                    }

                } catch (error) {
                    console.error("Sync failed", error);
                }
            }, 500);
        }
    };


    const cartCount = cart.reduce((total, item) => total + (item?.quantity || 0), 0);

    const cartTotal = cart.reduce((total, item) => {
        // Safety check: if product doesn't exist, price is 0
        const price = Number(item.product?.price) || 0;
        const qty = item.quantity || 0;
        return total + (price * qty);
    }, 0);


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