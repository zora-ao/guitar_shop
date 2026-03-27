import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Admin from "./pages/Admin"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/Admin" element={<Admin />} />"
    </Routes>
  )
}

export default App
