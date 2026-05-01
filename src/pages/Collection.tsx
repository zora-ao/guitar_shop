import CollectionContent from "../components/collection/CollectionContent";
import FilterSidebar from "../components/collection/FilterSidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


export default function CollectionPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Side: Filters */}
          <FilterSidebar />
          
          {/* Right Side: Products */}
          <CollectionContent />
        </div>
      </main>
    </div>
  );
}