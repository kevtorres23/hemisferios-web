"use client";

import { useRef } from "react";
import TestimonialCard from "@/components/website/TestimonialCard";
import { isVisible } from "@/utils/website/visibility-detector";
import person1 from "../../../public/person1.png";
import person2 from "../../../public/person2.png";
import person3 from "../../../public/person3.png";
import person4 from "../../../public/person4.png";
import SectionBadge from "@/components/website/SectionBadge";

function Testimonials() {
    const ref1 = useRef(null);
    const titleVisible = isVisible(ref1);

    const ref2 = useRef(null);
    const cardsVisible = isVisible(ref2);

    return (
        <section className="relative w-full h-auto pt-12 sm:pb-36 pb-16 sm:px-20 px-8 bg-white flex items-center justify-center flex-col sm:gap-20 gap-12">

            <div ref={ref1} className={`${titleVisible ? "opacity-100 top-0" : "opacity-0 top-10"} relative max-w-3xl flex flex-col items-center justify-center gap-6 transition-all ease-in duration-700`}>
                <SectionBadge name="TESTIMONIOS" />

                <h1 className="sm:text-4xl/12 text-3xl/10 text-center font-semibold text-slate-900 tracking-tighter w-full">
                    ¡Conoce lo que algunas personas han dicho de nuestros servicios!
                </h1>

                <p className="text-base font-normal/7 text-center text-slate-600 w-full">Hemos recolectado los testimonios de algunas personas que han confiado en nosotros previamente. ¡Puedes leerlos a continuación!</p>
            </div>

            <div ref={ref2} className={`${cardsVisible ? "opacity-100 top-0" : "opacity-0 top-16"} relative w-full h-auto grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 transition-all ease-out duration-1500`}>
                <TestimonialCard personName="Tomás Gutiérrez"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    picture={person1}
                />

                <TestimonialCard personName="Lucía Méndez"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    picture={person2}
                />

                <TestimonialCard personName="Eduardo Herrera"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    picture={person3}
                />

                <TestimonialCard personName="Carolina López"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    picture={person4}
                />
            </div>
        </section>
    )
}

export default Testimonials;