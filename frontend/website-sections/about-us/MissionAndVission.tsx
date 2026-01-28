import Image, { StaticImageData } from "next/image";
import SectionBadge from "@/website-components/SectionBadge";

type SectionProps = {
    type: "mission" | "vission";
    title: string,
    description: string,
    image: StaticImageData;
}

function MissionAndVission(props: SectionProps) {
    return (
        <section className={`w-full bg-white lg:pt-36 pb-12 px-20 flex ${props.type === "mission" ? "lg:flex-row-reverse" : "lg:flex-row"} flex-col md:gap-28 gap-10 items-center justify-center`}>
            <div className={`text flex flex-col gap-6 ${props.type === "mission" ? "lg:items-end" : "lg:items-start"} items-center justify-center lg:max-w-lg`}>
                <SectionBadge name={props.type === "mission" ? "NUESTRA MISIÓN" : "NUESTRA VISIÓN"} />

                <h1 className={`sm:text-4xl text-3xl font-semibold text-slate-900 tracking-tighter ${props.type === "mission" ? "lg:text-end" : "lg:text-start"} text-center`}>{props.title}</h1>

                <p className={`sm:text-base text-sm font-normal text-slate-600 ${props.type === "mission" ? "lg:text-end" : "lg:text-start"} text-center`}>{props.description}</p>
            </div>

            <div>
                <Image src={props.image} className="lg:max-w-sm md:max-w-96 sm:max-w-72 max-w-60" alt="" />
            </div>
        </section>
    )
};

export default MissionAndVission;