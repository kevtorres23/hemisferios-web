import SectionBadge from "@/components/website/SectionBadge"

export default function Prices() {
    return (
        <section className="w-full flex lg:flex-row flex-col lg:gap-20 md:gap-12 gap-8 sm:px-20 px-8 pt-12 pb-28 items-center justify-center">

            <div className="flex flex-col gap-4 lg:items-start items-center">
                <SectionBadge name="NUESTROS PRECIOS" />

                <h1 className="md:text-4xl/12 text-3xl/10 lg:text-start text-center font-semibold text-slate-950 tracking-tighter w-full">
                    Nos esforzamos por que nuestros precios sean <span className="text-indigo-500">accesibles</span>.
                </h1>

                <p className="text-base font-normal/7 lg:text-start text-center text-slate-600 w-full">
                    Nos esforzamos por mantener un ambiente divertido en cada una de nuestras sesiones de terapia, con el objetivo de reforzar el aprendizaje del paciente.
                </p>
            </div>

            <div className="flex flex-col gap-4 w-full">

                <div className="card1 flex flex-col md:gap-3 gap-4 items-start w-full md:p-6 p-5 rounded-xl bg-indigo-500 text-white">
                    <div className="tag bg-white rounded-full px-3 py-1.5">
                        <p className="text-slate-900 text-xs font-semibold">SESIÓN INDIVIDUAL</p>
                    </div>

                    <h1 className="price md:text-5xl text-5xl font-medium tracking-tighter">$350</h1>

                    <p className="description text-base font-normal">Este es el precio por cada una de nuestras sesiones cuando se toman en días escogidos por el adulto responsable.</p>
                </div>

                <div className="card2 flex flex-col md:gap-3 gap-4 items-start w-full md:p-6 p-5 rounded-xl bg-white border-2 border-indigo-500">
                    <div className="tag bg-indigo-100 rounded-full px-3 py-1.5">
                        <p className="text-indigo-500 text-xs font-semibold">SESIÓN MENSUAL</p>
                    </div>

                    <h1 className="price text-5xl text-slate-900 font-medium tracking-tighter">$5000</h1>

                    <p className="description text-base text-slate-600 font-normal">Este es el precio por cada una de nuestras sesiones cuando se toman un día escogido.</p>
                </div>
            </div>

        </section>
    )
}