import Navbar from "@/website-components/Navbar"
import Footer from "@/website-components/Footer"
import InitialSection from "@/website-sections/about-us/InitialSection";

function AboutUs() {
    return (
        <>
            <Navbar activePage="about-us" />

            <div className="relative overflow-x-hidden overflow-y-hidden flex flex-col min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
                <InitialSection />

                <Footer />
            </div>
        </>
    )
}

export default AboutUs;