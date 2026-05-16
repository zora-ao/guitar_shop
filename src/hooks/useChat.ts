import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchChatHistory, sendChatMessage } from '../api/messages';
import type { Message } from '../types/messages';


export const useChat = (receiverId: number | null) => {
    const queryClient = useQueryClient();
    const queryKey = ['chatHistory', receiverId];

    // 1. Automatically fetch and poll data every 3 seconds
    const { data: messages = [] } = useQuery<Message[]>({
        queryKey: queryKey,
        queryFn: () => fetchChatHistory(receiverId!),
        enabled: !!receiverId, // Only run query if we actually have a selected user ID
        refetchInterval: 3000, // Replaces your old manual setInterval
    });

    // 2. Handle sending messages cleanly
    const { mutateAsync: sendMessageMutation } = useMutation({
        // We pass an object with content because mutationFn prefers a single argument
        mutationFn: ({ content }: { content: string }) => sendChatMessage(receiverId!, content),
        
        // Optimistic cache update: puts the message on screen instantly without layout lag
        onSuccess: (newMessage) => {
        queryClient.setQueryData<Message[]>(queryKey, (prev = []) => [
            ...prev,
            newMessage,
        ]);
        },
    });

    // 3. Keep the exact same signature so your UI components don't change
    const sendMessage = async (content: string) => {
        if (!receiverId || !content.trim()) return;

        try {
        await sendMessageMutation({ content });
        } catch (err) {
        console.error('Error sending message via TanStack:', err);
        }
    };

    return { messages, sendMessage };
};