import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Admin from "./pages/Admin"
import AddProducts from "./components/Admin/AddProducts"
import ProductList from "./components/Admin/ProductList"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login"
import Signup from "./components/Signup"

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/admin" element={<Admin/>}>
          <Route path="add" element={<AddProducts />} />
          <Route path="products" element={<ProductList />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
