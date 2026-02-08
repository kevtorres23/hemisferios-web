"use client";

import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import SectionBadge from "@/website-components/SectionBadge";
import { isVisible } from "@/website-modules/VisibilityDetector";

type SectionProps = {
    type: "mission" | "vission";
    title: string,
    description: string,
    image: StaticImageData;
}

function MissionAndVission(props: SectionProps) {
    const ref1 = useRef(null);
    const isInfoVisible = isVisible(ref1);

    const ref2 = useRef(null);
    const isIllustrationVisible = isVisible(ref2);

    return (
        <section className={`w-full bg-white lg:py-36 md:py-28 py-24 lg:px-20 sm:px-14 px-8 flex ${props.type === "mission" ? "lg:flex-row-reverse" : "lg:flex-row"} flex-col md:gap-28 gap-10 items-center justify-center`}>
            <div ref={ref1} className={`${isInfoVisible ? "opacity-100 top-0" : "opacity-0 top-20"} relative text flex flex-col gap-6 ${props.type === "mission" ? "lg:items-end" : "lg:items-start"} items-center justify-center lg:max-w-lg transition-all ease-out duration-800`}>
                <SectionBadge name={props.type === "mission" ? "NUESTRA MISIÓN" : "NUESTRA VISIÓN"} />

                <h1 className={`sm:text-4xl text-3xl font-semibold text-slate-900 tracking-tighter ${props.type === "mission" ? "lg:text-end" : "lg:text-start"} text-center`}>{props.title}</h1>

                <p className={`text-base font-normal text-slate-600 ${props.type === "mission" ? "lg:text-end" : "lg:text-start"} text-center`}>{props.description}</p>
            </div>

            <div ref={ref2} className={`${isIllustrationVisible ? "opacity-100" : "opacity-0"} transition-opacity ease-in duration-1000`}>
                <Image src={props.image} className="lg:max-w-sm md:max-w-96 sm:max-w-72 max-w-60" alt="" />
            </div>
        </section>
    )
};

export default MissionAndVission;