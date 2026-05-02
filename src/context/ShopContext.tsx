import React, { createContext, useContext, useState } from "react";
import type { Product, ShopContextType } from "../types/product";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/products";

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
            ? prev.filter(c => c !== category) 
            : [...prev, category]
        );
    };

    const {data: products = [], isLoading, isError} = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: getAllProducts, 
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
        selectedCategories,
        setSelectedCategories,
        toggleCategory
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) throw new Error("useShop must be used within a ShopProvider");
    return context;
};