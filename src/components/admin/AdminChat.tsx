import { useState } from 'react';
import { ChatBox } from '../ChatBox';
import { MessageSquare, Search, User, Loader2, AlertCircle, ChevronLeft } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../context/AuthContext';
import { getChatContacts } from '../../api/admin';
import { useQuery } from '@tanstack/react-query';
import type { ChatContact } from '../../types/messages';

export default function AdminChat() {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<ChatContact | null>(null);
  
  const { messages, sendMessage } = useChat(selectedUser?.id ?? null);

  const { 
    data: contacts = [], 
    isLoading, 
    isError 
  } = useQuery<ChatContact[]>({
    queryKey: ['chatContacts'],
    queryFn: getChatContacts,
    refetchInterval: 10000, 
  });

  return (
    <div className="w-full max-w-7xl mx-auto h-[calc(100dvh-64px)] md:h-auto">
      
      <div className="flex fixed inset-0 top-16 md:relative md:top-0 md:h-screen bg-stone-50 overflow-hidden shadow-none md:shadow-xl md:shadow-stone-200/40">
        

        <div className={`w-full md:w-85 border-r border-stone-200/60 flex flex-col bg-stone-100/40 backdrop-blur-sm transition-all duration-300 h-full ${
          selectedUser ? 'hidden md:flex' : 'flex'
        }`}>
          {/* Header element wrapper is locked to avoid shrinking */}
          <div className="p-6 pb-4 flex-shrink-0">
            <h2 className="text-xl font-bold tracking-tight text-stone-900 mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={15} />
              <input 
                type="text" 
                placeholder="Search customers..." 
                className="w-full bg-stone-200/40 border border-stone-200/20 focus:bg-white focus:border-stone-300 rounded-xl py-2.5 pl-10 pr-4 text-xs text-stone-800 placeholder:text-stone-400 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 pb-6 space-y-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 text-stone-400 gap-2.5">
                <Loader2 className="animate-spin text-stone-500" size={20} />
                <span className="text-xs font-medium">Loading conversations...</span>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center text-stone-400 gap-2">
                <AlertCircle size={20} className="text-red-400/80" />
                <span className="text-xs font-medium text-stone-500">Failed to refresh threads</span>
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-16 px-4">
                <p className="text-xs font-medium text-stone-400 italic">No incoming requests yet.</p>
              </div>
            ) : (
              contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedUser(contact)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                    selectedUser?.id === contact.id 
                    ? 'bg-white shadow-md shadow-stone-200/60 ring-1 ring-stone-200/40' 
                    : 'hover:bg-stone-200/40'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    selectedUser?.id === contact.id ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    <User size={16} />
                  </div>

                  <div className="text-left overflow-hidden flex-1">
                    <p className="text-xs font-bold text-stone-800 tracking-tight truncate">{contact.username}</p>
                    <p className={`text-[11px] truncate mt-0.5 ${
                      selectedUser?.id === contact.id ? 'text-stone-500 font-medium' : 'text-stone-400'
                    }`}>
                      {contact.last_message || "No history"}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* RIGHT: Chat Window */}
        <div className={`flex-1 flex flex-col bg-white transition-all duration-300 h-full ${
          selectedUser ? 'flex' : 'hidden md:flex'
        }`}>
          {selectedUser ? (
            <>
              {/* Active Conversation Header Layout */}
              <div className="px-4 md:px-8 py-2 border-b border-stone-100 flex items-center justify-between bg-white shadow-sm shadow-stone-100/40 flex-shrink-0">
                <div className="flex items-center gap-2 md:gap-3">
                  
                  <button 
                    onClick={() => setSelectedUser(null)}
                    className="md:hidden p-1.5 -ml-1.5 hover:bg-stone-100 rounded-full text-stone-600 transition-colors"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full ring-4 ring-emerald-100 animate-pulse hidden sm:block" />
                  <span className="font-bold text-xs uppercase tracking-widest text-stone-800">
                    {selectedUser.username}
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 font-medium bg-stone-50 px-2.5 py-1 rounded-md border border-stone-200/50 hidden sm:block">
                  ID: #{selectedUser.id}
                </span>
              </div>

              {/* 3. CHANGED: Forced this pane to cleanly structure full flex height context */}
              <div className="flex-1 overflow-hidden bg-stone-50/30 flex flex-col relative">
                <ChatBox 
                  messages={messages} 
                  onSendMessage={sendMessage} 
                  currentUserId={user?.id || 9} 
                />
              </div>
            </>
          ) : (
            /* Desktop Empty State Display Workspace */
            <div className="flex-1 flex flex-col items-center justify-center text-stone-300 p-12 text-center bg-white/50">
              <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center border border-stone-200/60 shadow-sm mb-4">
                <MessageSquare size={24} className="text-stone-400 opacity-60" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Select a customer thread</p>
              <p className="text-[11px] text-stone-400/70 max-w-xs mt-1.5 leading-relaxed">
                Click on an active discussion on the left panel to begin managing customer inquiries.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}