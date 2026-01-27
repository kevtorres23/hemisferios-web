import Navbar from "@/website-components/Navbar";
import Footer from "@/website-components/Footer";
import InitialSection from "@/website-sections/services-and-prices/InitialSection";
import Services from "@/website-sections/services-and-prices/Services";

export default function ServicesAndPrices() {
  return (
    <>
      <Navbar activePage="services" />

      <div className="relative overflow-x-hidden overflow-y-hidden flex flex-col min-h-screen items-center justify-center bg-white font-sans dark:bg-black">

        <InitialSection />

        <Services />

        <Footer />
      </div>
    </>
  );
}