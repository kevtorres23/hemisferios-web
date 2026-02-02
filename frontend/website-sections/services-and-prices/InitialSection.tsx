"use client";

import { useRef } from "react";
import SectionBadge from "@/website-components/SectionBadge";
import { isVisible } from "@/modules/VisibilityDetector";
import Image from "next/image";
import kidsHighFive from "../../public/kids-high-five.png";
import blob from "../../public/blob.png";

function InitialSection() {
    const ref1 = useRef(null);
    const visibility = isVisible(ref1);

    const ref2 = useRef(null);
    const isIllustrationVisible = isVisible(ref2);

    return (
        <div className={`flex flex-col gap-10 relative items-center justify-center lg:px-20 sm:px-16 px-8 lg:py-16 md:py-10 py-14 h-auto`}>
            {/* Decoration Blobs */}
            <div className="absolute xl:-left-74 md:-left-46 sm:-left-48 -left-24 sm:top-32 top-48 z-900">
                <Image src={blob} alt="" className="xl:w-70 sm:w-60 w-32 opacity-15" />
            </div>

            <div className="absolute xl:-right-74 md:-right-46 sm:-right-48 -right-24 xl:bottom-64 md:bottom-56 bottom-96 z-900 scale-x-[-1]">
                <Image src={blob} alt="" className="xl:w-70 sm:w-60 w-32 opacity-15" />
            </div>

            <div ref={ref1} className={`${visibility ? "opacity-100 top-0" : "opacity-0 top-12"} relative flex flex-col w-full items-center justify-center gap-4 transition-all ease-in-out duration-900`}>
                <SectionBadge name="NUESTROS SERVICIOS" />

                <h1 className="lg:text-5xl/14 md:text-4xl/12 text-3xl/10 text-center font-semibold text-slate-950 tracking-tighter md:max-w-3/5 max-w-full">
                    Servicios de terapia altamente <span className="text-indigo-500">profesionales.</span>
                </h1>

                <p className="text-base font-normal/7 text-center text-slate-600 md:w-8/12 max-w-full">
                    Te presentamos una descripción completa de los servicios que ofrecemos en nuestro centro, y los precios que tienen las sesiones de terapia.</p>
            </div>

            <div ref={ref2} className={`${isIllustrationVisible ? "opacity-100 top-0" : "opacity-0 top-12"} relative transition-all ease-in-out duration-900`}>
                <Image src={kidsHighFive} alt="" className="xl:w-96 lg:w-80 sm:w-64 w-56" />
            </div>
        </div>
    )
}

export default InitialSection;