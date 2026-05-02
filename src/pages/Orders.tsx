import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyOrders, cancelOrder } from "../api/orders"; // Added hideOrder
import { useState } from "react";
import { toast } from "react-toastify";
import { OrderItemCard } from "../components/orders/OrderItemCart";
import { Button } from "../components/ui/Button";
import LoadingSpinner from "../utils/LoadingSpinner";

const Orders = () => {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();

    // 1. Fetching logic
    const { data, isLoading } = useQuery({
        queryKey: ['my-orders', page],
        queryFn: () => getMyOrders(page, 10),
        placeholderData: (previousData) => previousData,
    });

    // 2. Cancellation Mutation
    const cancelMutation = useMutation({
        mutationFn: (orderId: number) => cancelOrder(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-orders'] });
            toast.success("Order cancelled successfully.");
        },
        onError: (error: any) => toast.error(error.message || "Failed to cancel")
    });

    const handleCancel = (orderId: number) => {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            cancelMutation.mutate(orderId);
        }
    };

    const orders = data?.orders || [];
    const totalPages = data?.total_pages || 1;

    if (isLoading && !data) return <LoadingSpinner message="Loading orders..." />

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Header section remains simple */}
            <div className="flex items-center gap-4 mb-8">
                <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">My Orders</h1>
                <div className="h-[2px] w-16 bg-gray-800"></div>
            </div>

            {/* List Section - Now very clean! */}
            <div className="flex flex-col border-t border-gray-100">
                {orders.map((order, index) => (
                    <OrderItemCard 
                        key={index} 
                        order={order} 
                        onCancel={handleCancel}
                        isCancelling={cancelMutation.isPending}
                    />
                ))}

                {orders.length === 0 && (
                    <p className="text-center py-20 text-gray-400">You haven't placed any orders yet.</p>
                )}
            </div>

            {/* Pagination Controls using the new Button component */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 mt-12">
                    <Button 
                        variant="outline"
                        onClick={() => { setPage(old => Math.max(old - 1, 1)); window.scrollTo(0, 0); }}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    
                    <span className="text-sm font-medium text-gray-500">
                        Page <span className="text-black">{page}</span> of {totalPages}
                    </span>

                    <Button 
                        variant="outline"
                        onClick={() => { if (data?.has_next) { setPage(old => old + 1); window.scrollTo(0, 0); } }}
                        disabled={!data?.has_next}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Orders;