import Navbar from "@/website-components/Navbar";
import Footer from "@/website-components/Footer";
import HeroSection from "@/website-sections/home/HeroSection";
import WorkingMethod from "@/website-sections/home/WorkingMethod";
import TherapyAreas from "@/website-sections/home/TherapyAreas";
import ConstantGrowth from "@/website-sections/home/ConstantGrowth";
import Dynamism from "@/website-sections/home/Dynamism";
import blob from "../public/blob2.png";
import Image from "next/image";
import Testimonials from "@/website-sections/home/Testimonials";
import CallToAction from "@/website-sections/home/CallToAction";

export default function Home() {

  return (
    <>
      <Navbar activePage="home" />
      <div className="relative overflow-x-hidden overflow-y-hidden flex flex-col min-h-screen items-center justify-center bg-white font-sans dark:bg-black">

        <HeroSection />

        <WorkingMethod />

        <TherapyAreas />

        <ConstantGrowth />

        <Dynamism />

        <Testimonials />

        <CallToAction />

        <Footer />

        {/* Decoration blobs */}
        <div className="absolute xl:-right-48 md:-right-46 sm:-right-48 -right-30 sm:top-520 top-960 z-900">
          <Image src={blob} alt="" className="xl:w-70 sm:w-60 w-40 opacity-15" />
        </div>

        <div className="absolute xl:-left-48 md:-left-46 sm:-left-48 -left-30 sm:top-620 top-1190 z-900">
          <Image src={blob} alt="" className="xl:w-70 sm:w-60 w-40 opacity-15 scale-x-[-1]" />
        </div>

        <div className="absolute xl:-right-48 md:-right-46 sm:-right-48 -right-30 bottom-390 z-900">
          <Image src={blob} alt="" className="xl:w-70 sm:w-60 w-40 opacity-15" />
        </div>
      </div>
    </>
  );
}
