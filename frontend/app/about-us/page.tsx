import Navbar from "@/website-components/Navbar"
import Footer from "@/website-components/Footer"
import InitialSection from "@/website-sections/about-us/InitialSection";
import MissionAndVission from "@/website-sections/about-us/MissionAndVission";
import missionImage from "../../public/about-us-2.svg";
import vissionImage from "../../public/about-us-3.svg";
import ValuesAndAdvantages from "@/website-sections/about-us/Values&Advantages";
import ValueBox from "@/website-components/ValueBox";
import { UserLock, ShieldCheck, Heart } from "lucide-react";

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

                <ValuesAndAdvantages type="values" title="Estos valores son clave para nosotros">
                    <ValueBox title="Profesionalismo"
                        desc="En nuestros servicios."
                        icon={<UserLock size={30} />}
                    />

                    <ValueBox title="Calidad de Servicio"
                        desc="En todo lo que hacemos."
                        icon={<ShieldCheck size={30} />}
                    />

                    <ValueBox title="Respeto y Tolerancia"
                        desc="Para todos nuestros clientes."
                        icon={<Heart size={30} />}
                    />
                </ValuesAndAdvantages>

                <MissionAndVission
                    type="vission"
                    title="Llegar a ser un espacio líder en la ciudad en el área del desarrollo cognitivo."
                    description="Hemisferios es un centro de terapia creado con el propósito de poder ayudar a niñas y niños del estado de Durango."
                    image={vissionImage}
                />

                <ValuesAndAdvantages type="advantages" title="¿Por qué escogernos?">
                    <ValueBox title="Resultados Reales"
                        desc="En los procesos de los pacientes."
                        icon={<UserLock size={30} />}
                    />

                    <ValueBox title="Personal Preparado"
                        desc="Y capacitado para brindar terapia."
                        icon={<ShieldCheck size={30} />}
                    />

                    <ValueBox title="Evolución Constante"
                        desc="En búsqueda de darte lo mejor."
                        icon={<Heart size={30} />}
                    />
                </ValuesAndAdvantages>

                <Footer />
            </div>
        </>
    )
}

export default AboutUs;