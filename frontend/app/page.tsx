import Navbar from "@/website-components/Navbar";
import Footer from "@/website-components/Footer";
import HeroSection from "@/sections/HomeHeroSection";
import WorkingMethod from "@/sections/HomeWorkingMethod";
import TherapyAreas from "@/sections/HomeTherapyAreas";
import ConstantGrowth from "@/sections/HomeConstantGrowth";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
      <Navbar activePage="home" />

      <HeroSection />

      <WorkingMethod />

      <TherapyAreas />

      <ConstantGrowth />

      <Footer />
    </div>
  );
}
