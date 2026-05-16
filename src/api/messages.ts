import type { Message } from '../types/messages';
import { apiFetch } from './client';

export const fetchChatHistory = async (receiverId: number): Promise<Message[]> => {
    return apiFetch<Message[]>(`/chat/history/${receiverId}`);
};

export const sendChatMessage = async (receiverId: number, content: string): Promise<Message> => {
    return apiFetch<Message>('/chat/send', {
        method: 'POST',
        body: JSON.stringify({
        receiver_id: receiverId,
        content,
        }),
    });
};