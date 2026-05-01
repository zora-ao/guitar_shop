import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import acoustics from '../assets/hero_image.png'
import electrics from '../assets/basses.png'


const Home = () => {
    return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <main>
        <Hero />
        <Features />

      </main>
    </div>
  );
}

export default Home
