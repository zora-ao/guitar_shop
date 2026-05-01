// For displaying in the Admin Dashboard
export interface OrderDisplayItem {
    product_id: number;
    product_name: string; // New: Needed for the UI
    image_url?: string;   // New: To show the thumbnail icon
    quantity: number;
    price: number;
}

export interface Order {
    id: number; // The database ID for the order
    user_id: number | null;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip_code: string; // Ensure this matches your Flask column name
    payment_method: string;
    subtotal: number;
    shipping_fee: number;
    total_amount: number;
    status: string;
    created_at: string;
    items: OrderDisplayItem[]; 
}

export type OrderData = Omit<Order, 'id' | 'status' | 'created_at'>;

export interface CheckoutResponse {
    message: string;
    order_id: number;
}

export interface CustomerOrder {
    order_id: number;
    product_name: string;
    price: number;
    quantity: number;
    image_url: string;
    status: string;
    payment_method: string;
    date: string;
}

export interface PaginatedOrders {
    orders: CustomerOrder[];
    total_pages: number;
    current_page: number;
    total_items: number;
    has_next: boolean;
    has_prev: boolean;
}