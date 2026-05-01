import React, { createContext, useContext, useState } from "react";
import type { Product, ShopContextType } from "../types/product";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../utils/api";

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const {data: products = [], isLoading, isError} = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async() => {
            const res = await fetch(`${API_BASE_URL}/api/products`);
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        }, 
        staleTime: 1000 * 60 * 5,
    });

    const value = {
        products,
        isLoading,
        isError,
        search,
        setSearch,
        showSearch,
        setShowSearch,
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) throw new Error("useShop must be used within a ShopProvider");
    return context;
};