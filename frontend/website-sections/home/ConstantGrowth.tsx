"use client";

import { useRef } from "react";
import SectionBadge from "@/website-components/SectionBadge";
import { isVisible } from "@/website-modules/VisibilityDetector";

function ConstantGrowth() {
    const ref1 = useRef(null);
    const visibility = isVisible(ref1);

    return (
        <div ref={ref1} className={`${visibility ? "opacity-100 top-0" : "opacity-0 top-20"} relative items-center justify-center lg:px-20 sm:px-16 px-8 lg:py-12 md:py-10 py-14 h-auto transition-all ease-out duration-700`}>

            <div className="flex flex-col w-full items-center justify-center gap-4">
                <SectionBadge name="CRECIMIENTO CONSTANTE" />

                <h1 className="md:text-4xl/12 text-3xl/10 text-center font-semibold text-slate-950 tracking-tighter md:max-w-3/5 max-w-full">
                    Cada vez son más las personas que deciden confiar en nosotros.
                </h1>

                <p className="text-base font-normal/7 text-center text-slate-600 md:w-1/2 max-w-full">
                    Estamos en constante crecimiento desde que fundamos el centro, hace un año y medio. Por ello, nos tomamos muy en serio los servicios de terapia que ofrecemos, dando siempre lo mejor de nosotros.
                </p>
            </div>
        </div>
    )
}

export default ConstantGrowth;