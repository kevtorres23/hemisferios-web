"use client";

import { useRef } from "react";
import Image from "next/image";
import NormalButton from "@/components/website/NormalButton";
import patient from "../../../../public/patient.png";
import SectionBadge from "@/components/website/SectionBadge";
import { isVisible } from "@/utils/website/visibility-detector";

function TherapyAreas() {
    const ref1 = useRef(null);
    const isInfoVisible = isVisible(ref1);

    const ref2 = useRef(null);
    const isIllustrationVisible = isVisible(ref2);

    return (
        <section className="relative overflow-x-hidden overflow-y-hidden w-full flex lg:flex-row flex-col sm:gap-20 gap-14 justify-center items-center lg:px-0 sm:px-16 px-8 lg:py-36 md:py-28 py-16 h-auto">

            {/* Content */}
            <div ref={ref1} className={`${isInfoVisible ? "opacity-100" : "opacity-0"} relative info flex flex-col lg:gap-6 sm:gap-4 gap-5 lg:items-start items-center xl:max-w-125 lg:max-w-md md:max-w-xl xl:mr-20 mr-0 transition-all ease-in duration-800`}>

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
            <div ref={ref2} className={`${isIllustrationVisible ? "opacity-100" : "opacity-0"} transition-all ease-in duration-900`}>
                <Image src={patient} alt="" className="xl:w-105 lg:w-96 sm:w-102 w-80" />
            </div>

        </section>
    )
}

export default TherapyAreas;