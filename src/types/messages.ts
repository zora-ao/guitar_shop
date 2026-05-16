export interface ChatContact {
    id: number;
    username: string;
    last_message?: string;
    // Add any other properties your backend sends (e.g., avatar, updated_at)
}

export interface Message {
    id: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    created_at: string;
}