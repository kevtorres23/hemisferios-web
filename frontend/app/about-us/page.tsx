import Navbar from "@/website-components/Navbar"
import Footer from "@/website-components/Footer"
import InitialSection from "@/website-sections/about-us/InitialSection";
import MissionAndVission from "@/website-sections/about-us/MissionAndVission";
import missionImage from "../../public/about-us-2.svg";
import vissionImage from "../../public/about-us-3.svg";

function AboutUs() {
    return (
        <>
            <Navbar activePage="about-us" />

            <div className="relative overflow-x-hidden overflow-y-hidden flex flex-col min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
                <InitialSection />

                <MissionAndVission
                    type="mission"
                    title="Ofrecer un servicio terapéutico de calidad para todos y todas."
                    description="Hemisferios es un centro de terapia creado con el propósito de poder ayudar a niñas y niños del estado de Durango."
                    image={missionImage}
                />

                <MissionAndVission
                    type="vission"
                    title="Llegar a ser un espacio líder en la ciudad en el área del desarrollo cognitivo."
                    description="Hemisferios es un centro de terapia creado con el propósito de poder ayudar a niñas y niños del estado de Durango."
                    image={vissionImage}
                />

                <Footer />
            </div>
        </>
    )
}

export default AboutUs;