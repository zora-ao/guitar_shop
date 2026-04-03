import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { ProductSection } from "../components/ProductCard";



const Home = () => {
    return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <main>
        <Hero />
        {/* <ProductSection products={Products} /> */}
        <Features />
      </main>
    </div>
  );
}

export default Home
