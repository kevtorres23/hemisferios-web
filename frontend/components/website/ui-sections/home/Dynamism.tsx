"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import NormalButton from "@/components/website/NormalButton";
import kids from "../../../../public/kids.png";
import SectionBadge from "@/components/website/SectionBadge";
import { isVisible } from "@/utils/website/visibility-detector";

function Dynamism() {
    const ref1 = useRef(null);
    const isInfoVisible = isVisible(ref1);

    const ref2 = useRef(null);
    const isIllustrationVisible = isVisible(ref2);

    return (
        <main className="relative overflow-hidden w-full flex lg:flex-row flex-col-reverse sm:gap-20 gap-12 justify-center items-center lg:px-0 sm:px-16 px-8 lg:py-36 md:py-28 py-16 h-auto">

            {/* Illustration */}
            <div ref={ref2} className={`${isIllustrationVisible ? "opacity-100" : "opacity-0"} transition-all ease-in duration-900`}>
                <Image src={kids} alt="" className="xl:w-105 lg:w-96 sm:w-102 w-80" />
            </div>

            {/* Content */}
            <div ref={ref1} className={`${isInfoVisible ? "opacity-100" : "opacity-0"} info flex flex-col lg:gap-6 gap-4 lg:items-end items-center xl:max-w-125 lg:max-w-md md:max-w-xl xl:mr-20 mr-0 transition-all ease-in duration-400`}>

                <SectionBadge name="DINAMISMO EN LAS SESIONES" />

                <h1 className="md:text-4xl/12 text-3xl/10 lg:text-end text-center font-semibold text-slate-950 tracking-tighter w-full">
                    <span className="text-sky-500">Aprendizaje</span> y <span className="text-teal-500">recreación</span> en cada una de nuestras sesiones de terapia.
                </h1>

                <p className="text-base font-normal/7 lg:text-end text-center text-slate-600 w-full">
                    Te presentamos una descripción completa de los servicios que ofrecemos en nuestro centro, y los precios que tienen las sesiones de terapia.
                </p>

                <Link href={"/about-us"}>
                    <NormalButton text="Conoce más de nosotros" />
                </Link>
            </div>

        </main>
    )
}

export default Dynamism;