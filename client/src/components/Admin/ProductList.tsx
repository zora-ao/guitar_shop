import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react'; // Using Lucide for the delete icon
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image_url: string;
}

const ProductList: React.FC = () => {
    const queryClient = useQueryClient();

    const {data: products = [], isLoading, error} =  useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/api/products");
            if (!res.ok) throw new Error("Failed to fetch products");
            return res.json();
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id:number) => {
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!res.ok){
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to delete product");
            };

            return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']});
            toast.success("Product deleted from the list.");
        },

        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const handleDelete = (id:number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <div className="p-8 text-stone-500">Loading products...</div>;
    if (error) return <div className="p-8 text-red-500">Error loading products.</div>;

    return (
        <div className="p-8 w-full max-w-6xl">
        <h2 className="text-xl font-medium text-stone-600 mb-6">All Products List</h2>

        {/* Table Container */}
        <div className="border border-stone-200 rounded-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[100px_1fr_150px_100px_100px] bg-stone-50 border-b border-stone-200 py-3 px-4">
            <span className="font-bold text-stone-800 text-sm">Image</span>
            <span className="font-bold text-stone-800 text-sm">Name</span>
            <span className="font-bold text-stone-800 text-sm">Category</span>
            <span className="font-bold text-stone-800 text-sm">Price</span>
            <span className="font-bold text-stone-800 text-sm text-center">Action</span>
            </div>

            {/* Table Body */}
            <div className="flex flex-col">
            {products.map((product) => (
                <div 
                key={product.id} 
                className="grid grid-cols-[100px_1fr_150px_100px_100px] items-center py-2 px-4 border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors"
                >
                {/* Product Image */}
                <div className="w-12 h-12 bg-stone-100 rounded-sm overflow-hidden border border-stone-200">
                    <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="w-full h-full object-cover" 
                    />
                </div>

                {/* Product Name */}
                <span className="text-sm text-stone-600 font-medium">
                    {product.name}
                </span>

                {/* Category */}
                <span className="text-sm text-stone-600">
                    {product.category}
                </span>

                {/* Price */}
                <span className="text-sm text-stone-600 font-medium">
                    ${product.price}
                </span>

                {/* Action (Delete) */}
                <div className="flex justify-center">
                    <button 
                    onClick={() => handleDelete(product.id)}
                    disabled={deleteMutation.isPending}
                    className="text-stone-400 hover:text-red-500 transition-colors p-1">
                    <X size={20} />
                    </button>
                </div>
                </div>
            ))}
                {products.length === 0 && (
                    <div className="p-8 text-center text-stone-400 text-sm">No products found.</div>
                )}
            </div>
        </div>
        </div>
    );
};

export default ProductList;