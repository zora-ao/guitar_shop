import { useState } from 'react';
import { ChatBox } from './ChatBox';
import { useChat } from '../hooks/useChat';
import { MessageCircle, X, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getSupportInfo } from '../api/auth';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading: isAuthLoading } = useAuth();

  // TanStack Query replaces useEffect and local state management
  const { 
    data: supportData, 
    isLoading: isSupportLoading, 
    isError 
  } = useQuery({
    queryKey: ['supportInfo'],
    queryFn: getSupportInfo,
    enabled: isOpen && !!user, // Only fetch if widget is opened and user is authenticated
    staleTime: Infinity, // Support ID doesn't change often, keep it cached
  });

  const adminId = supportData?.id ?? null;

  // Connect to your custom chat hook using the safe nullish coalescing operator
  const { messages, sendMessage } = useChat(adminId);

  // Stop the widget from rendering unstyled components while auth resolves
  if (isAuthLoading) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl shadow-stone-900/10 border border-stone-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Premium UI Header */}
          <div className="p-5 bg-white border-b border-stone-100 flex justify-between items-center shadow-sm shadow-stone-100/40">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-widest text-stone-800">Customer Support</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full ring-4 ring-emerald-100 animate-pulse"></span>
                <p className="text-[10px] text-stone-400 font-medium">Online • Typically replies instantly</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1.5 hover:bg-stone-100 text-stone-400 hover:text-stone-700 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Dynamic Content Loading View Area */}
          <div className="flex-1 overflow-hidden relative bg-stone-50/50">
            {!user ? (
              /* State A: User is NOT logged in */
              <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white">
                <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center border border-stone-200/60 shadow-sm mb-4">
                  <Lock size={20} className="text-stone-400/80" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">Authentication Required</h4>
                <p className="text-[11px] text-stone-400/90 mb-6 leading-relaxed max-w-[240px]">
                  Please sign in to secure your account data stream before initializing support.
                </p>
                <a 
                  href="/login" 
                  className="bg-stone-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all active:scale-95 shadow-md shadow-stone-900/10"
                >
                  Go to Login
                </a>
              </div>
            ) : isSupportLoading ? (
              /* State B: User logged in, but TanStack is pulling system data */
              <div className="flex flex-col items-center justify-center h-full text-stone-400 gap-2.5 bg-white/50">
                <Loader2 className="animate-spin text-stone-500" size={20} />
                <span className="text-[11px] font-medium tracking-wide">Connecting securely...</span>
              </div>
            ) : isError ? (
              /* State C: Service retrieval error fallback channel */
              <div className="flex flex-col items-center justify-center h-full p-8 text-center gap-2 bg-white">
                <AlertCircle size={24} className="text-red-400/80" />
                <span className="text-xs font-bold text-stone-700">Connection Interrupted</span>
                <p className="text-[11px] text-stone-400 max-w-[200px]">
                  Unable to establish connection parameters to help desk systems.
                </p>
              </div>
            ) : (
              /* State D: Data ready, rendering standard communication pipeline */
              <ChatBox 
                messages={messages} 
                onSendMessage={sendMessage} 
                currentUserId={user.id} 
              />
            )}
          </div>
        </div>
      )}

      {/* Floating Action Launch Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl shadow-stone-900/20 transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen ? 'bg-stone-900 rotate-90' : 'bg-stone-900 hover:bg-stone-800'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};