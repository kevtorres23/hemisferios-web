import Image, { StaticImageData } from "next/image";
import NormalButton from "@/website-components/NormalButton";
import patient from "../public/patient.png";
import SectionBadge from "@/website-components/SectionBadge";

function TherapyAreas() {
    return (
        <main className={`relative overflow-hidden w-full flex lg:flex-row flex-col sm:gap-20 gap-14 justify-center items-center lg:px-0 sm:px-16 px-8 lg:pt-24 lg:pb-36 md:py-20 py-16 h-auto`}>

            {/* Content */}
            <div className="info flex flex-col lg:gap-6 sm:gap-4 gap-7 lg:items-start items-center xl:max-w-125 lg:max-w-md md:max-w-xl xl:mr-20 mr-0">

                <SectionBadge name="ÁREAS DE TERAPIA" />

                <h1 className="md:text-4xl/12 text-3xl/10 lg:text-start text-center font-semibold text-slate-950 tracking-tighter w-full">
                    Nos especializamos en la terapia <span className="text-teal-500">de lenguaje</span> y <span className="text-sky-500">cognitiva</span>.
                </h1>

                <p className="text-base font-normal/7 lg:text-start text-center text-slate-600 w-full">
                    Tratamos casos de dificultades en los trastornos de la comunicación, y usamos procesos especializados que ayudan a niños a mejorar su capacidad comunicativa.
                </p>

                <NormalButton text="Precios de terapia" />
            </div>

            {/* Illustration */}
            <div className="">
                <Image src={patient} alt="" className="xl:w-105 lg:w-96 sm:w-102 w-80" />
            </div>

        </main>
    )
}

export default TherapyAreas;