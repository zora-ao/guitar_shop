import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ProductList from "./components/admin/ProductList"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login"
import Signup from "./components/Signup"
import CollectionPage from "./pages/Collection"
import MainLayout from "./pages/MainLayout"
import About from "./pages/About"
import Contact  from "./pages/Contact"
import AdminLayout from "./components/admin/AdminLayout"
import AdminAddProducts from "./components/admin/AdminAddProducts"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import AdminOrders from "./components/admin/AdminOrders"
import Orders from "./pages/Orders"
import OrderSuccess from "./pages/OrderSuccess"
import AdminDashboard from "./components/admin/AdminDashboard";
import { ChatWidget } from "./components/ChatWidget";
import AdminChat from "./components/admin/AdminChat";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <ToastContainer position="bottom-right" />
      {user?.role === 'customer' && <ChatWidget />}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="collection" element={<CollectionPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add" element={<AdminAddProducts />} />
          <Route path="list" element={<ProductList />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="messages" element={<AdminChat />} />
        </Route>

        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
