"use client";

import { useRef } from "react";
import { isVisible } from "@/website-components/VisibilityDetector";
import WhiteButton from "@/website-components/WhiteButton";
import SectionBadge from "@/website-components/SectionBadge";
import Image from "next/image";
import workTime from "../../public/work-time.png"

function CallToAction() {
    const ref1 = useRef(null);
    const isInfoVisible = isVisible(ref1);

    const ref2 = useRef(null);
    const isIllustrationVisible = isVisible(ref2);

    return (
        <section className="relative bg-indigo-500 overflow-x-hidden overflow-y-hidden w-full flex lg:flex-row flex-col sm:gap-20 gap-14 justify-center items-center lg:px-0 sm:px-16 px-8 lg:py-28 md:py-20 py-16 h-auto">

            {/* Content */}
            <div ref={ref1} className={`${isInfoVisible ? "opacity-100" : "opacity-0"} info flex flex-col lg:gap-6 sm:gap-4 gap-5 lg:items-start items-center xl:max-w-125 lg:max-w-md md:max-w-xl xl:mr-20 mr-0 transition-all ease-in duration-400`}>

                <h1 className="md:text-4xl/12 text-3xl/10 lg:text-start text-center font-semibold text-white tracking-tighter w-full">
                    ¡Agenda ya una cita con nosotros!
                </h1>

                <p className="text-base font-normal/7 lg:text-start text-center text-white w-full">
                    Puedes agendar una cita de una manera fácil y rápida para una entrevista de diagnóstico o una nueva cita, si ya estás registrado en nuestro centro.</p>

                <WhiteButton text="Precios de terapia" />
            </div>

            {/* Illustration */}
            <div ref={ref2} className={`${isIllustrationVisible ? "opacity-100" : "opacity-0"} transition-all ease-in duration-900`}>
                <Image src={workTime} alt="" className="lg:w-96 sm:w-102 w-80" />
            </div>

        </section>
    )
}

export default CallToAction;