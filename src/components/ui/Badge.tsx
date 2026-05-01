interface BadgeProps {
    status: string;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
    const s = status.toLowerCase();
    
    const dotColor = 
        s === 'delivered' ? 'bg-green-500' : 
        s === 'cancelled' ? 'bg-red-500' : 
        s === 'best seller' ? 'bg-stone-500' : 'bg-green-400';

    return (
        <div className="flex items-center gap-2">
        <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></div>
        <span className="text-gray-700 font-medium capitalize">{status}</span>
        </div>
    );
};