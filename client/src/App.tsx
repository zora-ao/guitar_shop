import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Products from "./pages/Collection"
import Admin from "./pages/Admin"
import AddProducts from "./components/admin/AdminAddProducts"
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
import Orders from "./pages/Orders"
import ProductDetails from "./components/ProductDetails"

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="collection" element={<CollectionPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<AdminAddProducts />} />
          <Route path="add" element={<AdminAddProducts />} />
          <Route path="list" element={<ProductList />} />
        </Route>

        <Route path="/orders" element={<Orders />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
