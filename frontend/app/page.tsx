import Navbar from "@/website-components/Navbar";
import Footer from "@/website-components/Footer";
import HeroSection from "@/sections/home/HeroSection";
import WorkingMethod from "@/sections/home/WorkingMethod";
import TherapyAreas from "@/sections/home/TherapyAreas";
import ConstantGrowth from "@/sections/home/ConstantGrowth";
import Dynamism from "@/sections/home/Dynamism";
import blob from "../public/blob2.png";
import Image from "next/image";

export default function Home() {

  return (
    <div className="relative overflow-x-hidden overflow-y-hidden flex flex-col min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
      <Navbar activePage="home" />

      <HeroSection />

      <WorkingMethod />

      <TherapyAreas />

      <div className="absolute xl:-right-48 md:-right-46 sm:-right-48 -right-30 top-520 z-900">
        <Image src={blob} alt="" className="xl:w-70 sm:w-60 w-40 opacity-15" />
      </div>

      <div className="absolute xl:-left-48 md:-left-46 sm:-left-48 -left-30 top-620 z-900">
        <Image src={blob} alt="" className="xl:w-70 sm:w-60 w-40 opacity-15 scale-x-[-1]"/>
      </div>

      <ConstantGrowth />

      <Dynamism />

      <Footer />
    </div>
  );
}
