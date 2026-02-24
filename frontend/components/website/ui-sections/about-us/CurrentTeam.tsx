"use client";

import TeamMember from "@/components/website/TeamMember";
import ArletPicture from "../../../public/person2.png";
import Image from "next/image";
import blob from "../../../public/blob3.png";
import { isVisible } from "@/utils/website/visibility-detector";
import { useRef } from "react";

function CurrentTeam() {
    const ref1 = useRef(null);
    const isTitleVisible = isVisible(ref1);

    const ref2 = useRef(null);
    const isRow1Visible = isVisible(ref2);

    const ref3 = useRef(null);
    const isRow2Visible = isVisible(ref3);

    return (
        <section className={`relative w-full lg:py-36 md:py-28 py-24 lg:px-20 sm:px-14 px-8 flex flex-col lg:gap-20 sm:gap-15 gap-10 items-center justify-center`}>

            {/* Decoration Blobs */}
            <div className="absolute xl:-left-45 md:-left-40 sm:-left-48 -left-30 sm:top-70 top-48 z-900">
                <Image src={blob} alt="" className="xl:w-70 sm:w-60 w-40 opacity-20" />
            </div>

            <div className="absolute xl:-right-45 md:-right-40 sm:-right-48 -right-30 xl:bottom-70 md:bottom-56 bottom-128 z-900 scale-x-[-1]">
                <Image src={blob} alt="" className="xl:w-70 sm:w-60 w-40 opacity-20" />
            </div>

            {/* Content */}
            <div ref={ref1} className={`${isTitleVisible ? "opacity-100 top-0" : "opacity-0 top-20"} relative flex flex-col gap-4 items-center justify-center w-full transition-all ease-out duration-800`}>
                <h1 className="text-slate-900 font-semibold tracking-tighter text-center lg:text-5xl sm:text-4xl text-3xl">¡Conoce a nuestro equipo actual!</h1>
                <p className="text-slate-600 font-normal text-center text-base max-w-xl">Todos nosotros trabajamos en conjunto para hacer que Hemisferios funcione y continúe siendo el lugar que es.</p>
            </div>

            <div ref={ref2} className={`${isRow1Visible ? "opacity-100 top-0" : "opacity-0 top-20"} relative row1 flex sm:flex-row flex-col md:gap-20 sm:gap-15 gap-10 items-center justify-center transition-all ease-out duration-800`}>
                <TeamMember name="Arlet Torres" role="COFUNDADORA/TERAPEUTA" picture={ArletPicture} />

                <TeamMember name="Asriel Campuzano" role="COFUNDADOR" picture={ArletPicture} />
            </div>

            <div ref={ref3} className={`${isRow2Visible ? "opacity-100 top-0" : "opacity-0 top-20"} relative row1 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-20 sm:gap-15 gap-10 items-center justify-center transition-all ease-out duration-800`}>
                <TeamMember name="Assiria West" role="TERAPEUTA DE LENGUAJE" picture={ArletPicture} />

                <TeamMember name="Hortencia Calleros" role="TERAPEUTA DE LENGUAJE" picture={ArletPicture} />

                <TeamMember name="Jaqueline Coronado" role="RECEPCIONISTA" picture={ArletPicture} />
            </div>

        </section>
    )
}

export default CurrentTeam;