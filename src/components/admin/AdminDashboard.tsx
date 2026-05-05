import { useQuery } from "@tanstack/react-query";
import { 
    ShoppingBag, Users, Package, 
    TrendingUp, ArrowUpRight, ArrowDownRight, 
    type LucideIcon 
} from "lucide-react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { fetchAdminStats } from "../../api/admin";

interface MiniStatProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: number;
}

const MiniStat = ({ title, value, icon: Icon, trend }: MiniStatProps) => (
    <div className="bg-white border border-stone-100 p-4 rounded-[1.5rem] flex flex-col shadow-sm w-full">
        <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-stone-50 rounded-xl text-black border border-stone-100">
                <Icon size={16} />
            </div>
            {trend !== undefined && (
                <span className={`flex items-center text-[9px] font-black ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trend >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {Math.abs(trend)}%
                </span>
            )}
        </div>
        <p className="text-[8px] font-black uppercase tracking-widest text-stone-400">{title}</p>
        <h3 className="text-lg font-black tracking-tighter">{value}</h3>
    </div>
);

export default function AdminDashboard() {
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['dashboard-summary'],
        queryFn: fetchAdminStats,
    });

    if (isLoading) return <div className="p-8 font-black uppercase tracking-widest animate-pulse">Loading Analytics...</div>;
    if (isError) return <div className="p-8 text-red-500 font-black">Failed to load dashboard data.</div>;

    return (
        <div className="w-full space-y-6 p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic">Executive Overview</h2>
                <p className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.2em]">Performance Insights</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* LEFT SIDE: STATS + CHART */}
                <div className="w-full flex-1 space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <MiniStat title="Sales" value={data.stats.sales} icon={ShoppingBag} trend={data.stats.trends.sales} />
                        <MiniStat title="Revenue" value={data.stats.revenue} icon={TrendingUp} trend={data.stats.trends.revenue} />
                        <MiniStat title="Users" value={data.stats.users} icon={Users} trend={data.stats.trends.users} />
                        <MiniStat title="Items" value={data.stats.items} icon={Package} />
                    </div>

                    <div className="bg-white border border-stone-100 p-4 md:p-6 rounded-[2rem] shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Revenue Flow (24h)</h2>
                            <div className="bg-stone-50 text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-stone-100">
                                Hourly Revenue
                            </div>
                        </div>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.graphData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fontSize: 9, fontWeight: 800, fill: '#A8A29E'}}
                                        interval="preserveStartEnd" // This prevents labels from overlapping
                                        minTickGap={20} // Ensures breathing room between timestamps
                                    />
                                    <YAxis hide />
                                    <Tooltip contentStyle={{ borderRadius: '15px', border: 'none' }} />
                                    <Line 
                                        type="monotone" 
                                        dataKey="rev" // This must match the key in your Flask dictionary
                                        stroke="#000" 
                                        strokeWidth={3} 
                                        dot={false} 
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: PAYOUT + ACTIVITY */}
                <div className="w-full lg:w-72 space-y-6 flex-shrink-0">
                    <div className="bg-black text-white p-6 rounded-[2rem] shadow-xl h-48 flex flex-col justify-between">
                        <div>
                            <p className="text-[8px] font-black uppercase tracking-widest text-stone-500 mb-1">Available Payout</p>
                            <h2 className="text-3xl font-black italic tracking-tighter">₱{data.payout?.toLocaleString()}</h2>
                        </div>
                        <button className="w-full bg-white text-black py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-stone-100 transition-all">
                            Withdraw
                        </button>
                    </div>

                    <div className="bg-white border border-stone-100 p-6 rounded-[2rem] shadow-sm">
                        <h2 className="text-[9px] font-black uppercase tracking-widest mb-4 text-stone-400">Activity</h2>
                        <div className="space-y-4">
                            {[
                                { label: 'Orders', val: `+${data.stats.trends.sales}%`, color: 'text-green-500' },
                                { label: 'Users', val: `${data.stats.trends.users}%`, color: data.stats.trends.users >= 0 ? 'text-green-500' : 'text-red-500' },
                                { label: 'Inventory', val: 'Stable', color: 'text-stone-400' },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-stone-50 pb-2 last:border-0">
                                    <span className="text-[9px] font-black uppercase tracking-tight text-stone-600">{item.label}</span>
                                    <span className={`${item.color} font-black text-[10px]`}>{item.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}