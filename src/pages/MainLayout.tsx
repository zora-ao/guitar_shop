import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
import SearchBar from "../components/collection/SearchBar"


const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#FDFCFA]">
            <SearchBar />
            <Navbar />
            <main className="grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout
