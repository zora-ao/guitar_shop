import Categories from "../components/home/Categories";
import Features from "../components/home/Features";
import Hero from "../components/home/Hero";


const Home = () => {
    return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <main>
        <Hero />
        <Categories />
        <Features />

      </main>
    </div>
  );
}

export default Home
