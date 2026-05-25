import { useEffect, useState } from "react";
import { Bell, Package, Info, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { apiFetch } from "../../api/client";

interface Notification {
    id: number;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
    type: string;
}

export const NotificationDropdown = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const fetchNotifications = async () => {
        try {
            const data = await apiFetch<Notification[]>("/notifications/get_notif");
            setNotifications(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    const markAsRead = async () => {
        if (unreadCount === 0) return;

        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));

        try {
            await apiFetch("/notifications/read-all", { 
                method: "POST" 
            });
            console.log("Database updated successfully");
        } catch (err) {
            console.error("Failed to sync with server:", err);
            fetchNotifications(); 
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

    const unreadCount = notifications.filter((n) => !n.is_read).length;

    // Clean Helper to isolate Month, Day, and Year formatted out cleanly
    const formatDateOnly = (dateStr: string) => {
        if (!dateStr) return "";
        // Safely force UTC rendering interpretation just like the chat fix
        const safeString = dateStr.endsWith('Z') || dateStr.includes('+') ? dateStr : `${dateStr}Z`;
        
        return new Date(safeString).toLocaleDateString("en-US", {
            month: "short", // Changes to 'short' (May) or 'long' (May) depending on your brand preference
            day: "numeric",
            year: "numeric"
        });
    };

    return (
        <div className="relative">
        <button
            onClick={() => {
                setIsOpen(!isOpen);
                if (!isOpen) markAsRead();
            }}
            className="p-2 hover:bg-stone-100 rounded-full relative transition-colors"
        >
            <Bell size={20} className={unreadCount > 0 ? "text-stone-900" : "text-stone-400"} />
            {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#FDFCFA]">
                    {unreadCount}
                </span>
            )}
        </button>

        <AnimatePresence>
            {isOpen && (
            <>
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute -right-10 mt-2 w-80 bg-white border border-stone-200 shadow-2xl rounded-2xl z-50 overflow-hidden"
                >
                <div className="p-4 border-b border-stone-100 bg-stone-50/50 flex justify-between items-center">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-900">
                        Notifications
                    </h4>
                    {unreadCount > 0 && <span className="text-[9px] font-bold text-blue-500">New</span>}
                </div>

                <div className="max-h-[350px] overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map((n) => (
                            <div
                                key={n.id}
                                className={`p-4 border-b border-stone-50 last:border-0 transition-colors ${
                                    !n.is_read ? "bg-blue-50/30" : "hover:bg-stone-50"
                                }`}
                            >
                                <div className="flex gap-3">
                                    <div className="mt-1">
                                        {n.type === "shipping" ? (
                                            <Package size={14} className="text-blue-500" />
                                        ) : (
                                            <Info size={14} className="text-stone-400" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[11px] font-bold text-stone-900 leading-tight">
                                            {n.title}
                                        </p>
                                        <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                                            {n.message}
                                        </p>
                                        {/* FIXED TIME DISPLAY WINDOW */}
                                        <p className="text-[9px] text-stone-400 font-medium uppercase mt-2 tracking-wider">
                                            {formatDateOnly(n.created_at)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-12 text-center">
                            <CheckCircle2 size={24} className="mx-auto text-stone-200 mb-2" />
                            <p className="text-xs text-stone-400 font-medium">All caught up!</p>
                        </div>
                    )}
                </div>

                <Link
                    to="/orders"
                    onClick={() => setIsOpen(false)}
                    className="block p-3 text-center text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 border-t border-stone-100 transition-colors"
                >
                    View All Orders
                </Link>
                </motion.div>
            </>
            )}
        </AnimatePresence>
        </div>
    );
};