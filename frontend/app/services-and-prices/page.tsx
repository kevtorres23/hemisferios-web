import Navbar from "@/website-components/Navbar";
import Footer from "@/website-components/Footer";
import InitialSection from "@/sections/services-and-prices/InitialSection";
import Dynamism from "@/sections/home/Dynamism";
import blob from "../../public/blob2.png";
import Image from "next/image";

export default function ServicesAndPrices() {
  return (
    <div className="relative overflow-x-hidden overflow-y-hidden flex flex-col min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
      <Navbar activePage="services" />

      <InitialSection />

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
  );
}