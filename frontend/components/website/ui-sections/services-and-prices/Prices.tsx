import SectionBadge from "@/components/website/SectionBadge"
import PriceCard from "../../PriceCard"

export default function Prices() {
    return (
        <section id="prices" className="w-full flex flex-col lg:gap-16 md:gap-12 gap-8 sm:px-20 px-8 pt-12 pb-28 items-center justify-center">

            <div className="flex flex-col gap-4 items-center">
                <SectionBadge name="NUESTROS PRECIOS" />

                <h1 className="lg:max-w-7/12 md:max-w-3/4 w-full md:text-4xl/12 text-3xl/10 text-center font-semibold text-slate-950 tracking-tighter">
                    Nos esforzamos por que nuestros precios sean <span className="text-indigo-500">accesibles</span>.
                </h1>

                <p className="lg:max-w-8/12 md:max-w-10/12 w-full sm:text-lg text-base font-normal/7 text-center text-slate-600">
                    Conoce los planes de terapia que te ofrecemos y selecciona el que mejor se ajuste a tus preferencias y posibilidades.
                </p>
            </div>

            <div className="flex md:flex-row flex-col lg:gap-6 gap-4 w-full">

                <PriceCard isIndigo={true}
                    planType="SESIÓN INDIVIDUAL"
                    price="350"
                    description="Este es el precio por cada una de nuestras sesiones cuando se toman en días escogidos por el adulto responsable."
                />

                <PriceCard isIndigo={false}
                    planType="8 SESIONES AL MES"
                    price="3500"
                    description="Este plan le ofrece al paciente dos sesiones por semana, resultando en un total de ocho sesiones al mes."
                />

                <PriceCard isIndigo={false}
                    planType="4 SESIONES AL MES"
                    price="3500"
                    description="Este plan le ofrece al paciente una sesión por semana, resultando en un total de cuatro sesiones al mes."
                />
            </div>

        </section>
    )
}