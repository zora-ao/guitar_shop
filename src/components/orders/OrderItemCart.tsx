import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface OrderItemCardProps {
    order: any;
    onCancel: (id: number) => void;
    isCancelling: boolean;
}

export const OrderItemCard: React.FC<OrderItemCardProps> = ({ 
    order, onCancel, isCancelling 
    }) => {
    const isPending = order.status.toLowerCase() === 'pending';

    return (
        <div className="py-6 border-b border-gray-100 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Product Info */}
        <div className="md:col-span-5 flex gap-4">
            <img src={order.image_url || '/placeholder.png'} className="w-20 h-24 object-cover" alt="" />
            <div className="flex flex-col justify-center">
            <h3 className="font-semibold text-gray-700 text-lg">{order.product_name}</h3>
            <p className="text-gray-600">${order.price} x {order.quantity}</p>
            <p className="text-gray-400 text-sm">{order.date}</p>
            </div>
        </div>
        
        {/* Status */}
        <div className="md:col-span-4">
            <Badge status={order.status} />
        </div>

        {/* Actions */}
        <div className="md:col-span-3 flex flex-col items-end gap-2">
            <Button variant="outline" className="w-full md:w-auto">Track Order</Button>
            
            {isPending && (
            <Button 
                variant="danger" 
                onClick={() => onCancel(order.order_id)}
                isLoading={isCancelling}
            >
                Cancel Order
            </Button>
            )}
        </div>
        </div>
    );
};