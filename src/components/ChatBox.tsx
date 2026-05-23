import React, { useState, useEffect, useRef } from 'react';

// 1. Define the Message interface to match your Flask to_dict()
interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  created_at: string;
}

// 2. Define strict types for the props
interface ChatBoxProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  currentUserId: number | string; // Handle both types just in case
}

export const ChatBox = ({ messages, onSendMessage, currentUserId }: ChatBoxProps) => {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages array updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // Prevent page refresh if used in a form
    
    if (!input.trim()) return;
    
    onSendMessage(input);
    setInput("");
  };

  

  return (
    <div className="flex flex-col h-full bg-stone-50">
      
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-stone-400 text-xs uppercase tracking-widest">
            No messages yet
          </div>
        ) : (
          messages.map((msg) => {
            // FIX: Ensure both are compared as numbers to avoid "never-right" alignment
            const isMe = Number(msg.sender_id) === Number(currentUserId);
            
            return (
              <div 
                key={msg.id} 
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                  isMe 
                  ? 'bg-stone-900 text-white rounded-tr-none' 
                  : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
                }`}>
                  <p className="leading-relaxed break-words">{msg.content}</p>
                  
                  <div className={`text-[10px] mt-1 opacity-50 ${isMe ? 'text-right' : 'text-left'}`}>
                    {new Date(msg.created_at).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-stone-200">
        <form 
          onSubmit={handleSend} 
          className="flex gap-2"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-stone-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-stone-400 outline-none transition-all"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="bg-stone-900 text-white p-2 rounded-full hover:bg-stone-700 disabled:opacity-50 disabled:hover:bg-stone-900 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};