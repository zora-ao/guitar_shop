import { Link } from "react-router-dom"

const AdminNav = () => {
    return (
        <nav className="flex gap-4 p-4 bg-gray-200">
            <Link to="/admin/add">Add Products</Link>
            <Link to="/admin/products">Product List</Link>
        </nav>
    )
};

export default AdminNav
