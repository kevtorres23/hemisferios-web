"use client";

import { useRef } from "react";
import SectionBadge from "@/website-components/SectionBadge";
import { isVisible } from "@/website-components/VisibilityDetector";
import Image from "next/image";
import kidsHighFive from "../../public/kids-high-five.png";

function InitialSection() {
    const ref1 = useRef(null);
    const visibility = isVisible(ref1);

    return (
        <div ref={ref1} className={`${visibility ? "opacity-100 top-0" : "opacity-0 top-12"} flex flex-col gap-10 relative items-center justify-center lg:px-20 sm:px-16 px-8 lg:py-12 md:py-10 py-14 h-auto transition-all ease-in duration-700`}>

            <div className="flex flex-col w-full items-center justify-center gap-4">
                <SectionBadge name="NUESTROS SERVICIOS" />

                <h1 className="lg:text-5xl/14 md:text-4xl/12 text-3xl/10 text-center font-semibold text-slate-950 tracking-tighter md:max-w-3/5 max-w-full">
                    Servicios de terapia altamente <span className="text-indigo-500">profesionales.</span>
                </h1>

                <p className="text-base font-normal/7 text-center text-slate-600 md:w-8/12 max-w-full">
                    Te presentamos una descripción completa de los servicios que ofrecemos en nuestro centro, y los precios que tienen las sesiones de terapia.</p>
            </div>

            <div>
                <Image src={kidsHighFive} alt="" className="xl:w-96 lg:w-80 sm:w-64 w-56" />
            </div>
        </div>
    )
}

export default InitialSection;