import Navbar from "@/website-components/Navbar";
import Footer from "@/website-components/Footer";
import HeroSection from "@/sections/HeroSection";
import WorkingMethod from "@/sections/HomeWorkingMethod";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
      <Navbar activePage="home" />

      <HeroSection />

      <WorkingMethod />

      <Footer />
    </div>
  );
}
