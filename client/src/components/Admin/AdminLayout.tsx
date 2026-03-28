import { Outlet } from "react-router-dom"
import AdminNav from "./AdminNav"


const AdminLayout = () => {
    return (
        <div>
            <AdminNav />
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout
