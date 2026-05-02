import { useQuery } from "@tanstack/react-query";
import { fetchAdminStats } from "../../api/admin";
import { Bar, CartesianGrid, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


// Example of the Dashboard Stat Card component
const StatCard = ({ title, value }: { title: string; value: string | number }) => (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-gray-900">{value}</h3>
    </div>
);

export default function AdminDashboard() {
    const { data: stats, isLoading } = useQuery({ 
        queryKey: ['adminStats'], 
        queryFn: fetchAdminStats
    });

    // Optional: Placeholder data for the graph 
    // In a real app, you'd fetch this from a separate 'revenue-history' endpoint
    const graphData = [
        { name: 'Total', revenue: stats?.totalRevenue || 0 }
    ];

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;

    return (
        <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800">Store Management</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard title="Total Sales" value={stats?.totalSales ?? 0} />
            <StatCard title="Total Orders" value={stats?.totalOrders ?? 0} />
            <StatCard title="Total Revenue" value={`₱${stats?.totalRevenue?.toLocaleString() ?? 0}`} />
            <StatCard title="Total Customers" value={stats?.totalCustomers ?? 0} />
            <StatCard title="Total Products" value={stats?.totalProducts ?? 0} />
        </div>

        {/* Bar Graph Section */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Revenue Analysis</h2>
            <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₱${val}`} />
                <Tooltip 
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={60} />
                </BarChart>
            </ResponsiveContainer>
            </div>
        </div>
        </div>
    );
}