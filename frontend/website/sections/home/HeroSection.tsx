"use client";

import { useRef } from "react";
import Image from "next/image";
import NormalButton from "@/website/components/NormalButton";
import TextButton from "@/website/components/TextButton";
import BrainTag from "@/website/components/BrainTag";
import brainIllustration from "../../../public/hero-brain.png"
import blob from "../../../public/blob.png";
import { isVisible }  from "@/website/modules/VisibilityDetector";

function HeroSection() {
    const ref1 = useRef(null);
    const isInfoVisible = isVisible(ref1);

    const ref2 = useRef(null);
    const isIllustrationVisible = isVisible(ref2);

    return (
        <main className="relative overflow-hidden w-full flex lg:flex-row flex-col sm:gap-20 gap-14 justify-center items-center lg:px-0 sm:px-16 px-8 lg:pt-24 lg:pb-36 md:py-20 py-16 h-auto">
            
            {/* Decoration Blobs */}
            <div className="absolute xl:-left-52 md:-left-46 sm:-left-48 -left-30 sm:top-32 top-48 z-900">
                <Image src={blob} alt="" className="xl:w-70 sm:w-60 w-40 opacity-15" />
            </div>

            <div className="absolute xl:-right-52 md:-right-46 sm:-right-48 -right-30 xl:bottom-32 md:bottom-56 bottom-128 z-900 scale-x-[-1]">
                <Image src={blob} alt="" className="xl:w-70 sm:w-60 w-40 opacity-15" />
            </div>

            {/* Content */}
            <div ref={ref1} className={`${isInfoVisible ? "opacity-100 top-0" : "opacity-0 top-20"} relative info flex flex-col lg:gap-6 sm:gap-4 gap-7 lg:items-start items-center xl:max-w-125 lg:max-w-md md:max-w-xl xl:mr-20 mr-0 transition-all ease-out duration-1000`}>

                <p className="lg:text-5xl/14 text-4xl/12 lg:text-start text-center font-semibold text-slate-950 tracking-tighter w-full">Estimulación, rehabilitación e integración <span className="text-indigo-500">completa.</span></p>
                <p className="text-base font-normal/7 lg:text-start text-center text-slate-600 w-full">Somos un centro de terapia infantil donde trabajamos para abordar y mejorar diferentes aspectos del funcionamiento cognitivo y comunicativo.</p>

                <div className="flex sm:flex-row flex-col gap-4">
                    <NormalButton text="Nuestros servicios" />
                    <TextButton text="Agendar una cita" />
                </div>
            </div>

            {/* Illustration */}
            <div ref={ref2} className={`${isIllustrationVisible ? "opacity-100" : "opacity-0"} relative transition-all ease-in duration-900`}>
                <div className="sm:hidden w-full flex flex-row items-center justify-between">
                    <BrainTag text="Comunicación" positionStyle="" />
                    <BrainTag text="Cognición" positionStyle="" />
                </div>

                <Image src={brainIllustration} alt="" className="xl:w-105 lg:w-96 sm:w-102 w-80" />

                <div className="sm:hidden w-full flex flex-row items-center justify-between">
                    <BrainTag text="Comunicación" positionStyle="" />
                    <BrainTag text="Cognición" positionStyle="" />
                </div>

                <BrainTag text="Comunicación" positionStyle="sm:top-6 sm:left-[-96px] sm:block hidden" />
                <BrainTag text="Cognición" positionStyle="sm:bottom-14 sm:left-[-32px] sm:block hidden" />
                <BrainTag text="Aprendizaje" positionStyle="sm:top-10 sm:right-[-32px] sm:block hidden" />
                <BrainTag text="Lenguaje" positionStyle="sm:bottom-0 sm:right-[-40px] sm:block hidden" />
            </div>

        </main>
    )
}

export default HeroSection;