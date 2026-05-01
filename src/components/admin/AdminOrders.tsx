import React, { useEffect, useState } from 'react';
import { Package } from 'lucide-react'; // Optional icon library
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type Order } from '../../types/checkout';
import { getAdminOrders, updateOrderStatus } from '../../api/admin';

const AdminOrders: React.FC = () => {
    const queryClient = useQueryClient();

    const { data: orders = [], isLoading, isError } = useQuery({
        queryKey: ['admin-orders'],
        queryFn: getAdminOrders,
        refetchInterval: 30000,
    });

    const mutation = useMutation({
        mutationFn: ({ id, status }: {id: number, status: string}) => 
            updateOrderStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
        },
        onError: (error) => {
            alert("Failed to update status: " + error);
        }
    });

    const handleStatusChange = (orderId: number, newStatus: string) => {
        mutation.mutate({ id: orderId, status: newStatus });
    };

    if (isLoading) return <div className="p-10 text-center text-gray-500">Loading...</div>;
    if (isError) return <div className="p-10 text-center text-red-500">Error loading orders.</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 font-sans">
        <h1 className="text-xl font-bold mb-6 text-gray-700">Order Page</h1>

        <div className="flex flex-col gap-4">
            {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-sm p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-start text-sm text-gray-600">
                
                {/* Column 1: Icon and Product Info */}
                <div className="flex gap-4 col-span-1">
                <div className="bg-gray-100 p-3 rounded h-fit">
                    <Package className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex flex-col gap-1">
                    {order.items.map((item, idx) => (
                    <p key={idx} className="font-semibold text-gray-800">
                        {item.product_name} x {item.quantity}
                    </p>
                    ))}
                    <div className="mt-2 text-gray-900 font-medium">
                    <p>{order.first_name} {order.last_name}</p>
                    </div>
                    <p>{order.address},</p>
                    <p>{order.city}, {order.state}, {order.zip_code}</p>
                    <p>{order.phone}</p>
                </div>
                </div>

                {/* Column 2: Order Metadata */}
                <div className="flex flex-col gap-1">
                <p>Items : {order.items.length}</p>
                <p>Method : {order.payment_method}</p>
                <p>Payment : <span className="text-gray-500 italic font-medium">Pending</span></p>
                <p>Date : {new Date(order.created_at).toLocaleDateString()}</p>
                </div>

                {/* Column 3: Total Price */}
                <div className="text-lg font-bold text-gray-800 self-center">
                ${order.total_amount.toFixed(2)}
                </div>

                {/* Column 4: Status Dropdown */}
                <div className="self-center">
                <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded outline-none bg-white font-medium"
                >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                </select>
                </div>

            </div>
            ))}
        </div>
        </div>
    );
};

export default AdminOrders;