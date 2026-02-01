import SectionBadge from "@/website-components/SectionBadge";
import Image from "next/image";
import blob from "../../public/blob.png";

function LocationMap() {
    return (
        <section className="relative w-full lg:pt-10 lg:pb-40 md:pt-10 md:pb-30 py-12 lg:px-20 sm:px-14 px-8 flex flex-col lg:gap-20 sm:gap-15 gap-10 items-center justify-center">
            {/* Decoration Blobs */}
            <div className="absolute xl:-left-50 md:-left-45 sm:-left-40 -left-28 lg:bottom-180 sm:bottom-170 bottom-195 z-900">
                <Image src={blob} alt="" className="lg:w-70 md:w-60 sm:w-50 w-35 opacity-20" />
            </div>

            <div className="absolute xl:-right-50 md:-right-45 sm:-right-40 -right-28 lg:bottom-180 sm:bottom-170 bottom-195 z-900 scale-x-[-1]">
                <Image src={blob} alt="" className="lg:w-70 md:w-60 sm:w-50 w-35 opacity-20" />
            </div>

            <div className="flex flex-col gap-5 items-center justify-center">
                <SectionBadge name="MAPA DE UBICACIÓN" />

                <h1 className="text-slate-900 font-semibold tracking-tighter text-center lg:text-5xl sm:text-4xl text-3xl">Acude a nuestras instalaciones</h1>

                <p className="text-slate-600 font-normal text-center sm:text-base text-sm max-w-xl">Si te gustaría resolver una cuestión presencialmente, o tienes una cita programada, por favor, acude a nuestras oficinas. ¡Te atenderemos con mucho gusto!</p>
            </div>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d531.1313227433435!2d-104.65295524025055!3d24.034475088367735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bb7da2ca425f9%3A0xac8aaeccf362c068!2sValle%20Florido%2010%2C%20La%20Esperanza%2C%2034080%20Durango%2C%20Dgo.!5e0!3m2!1ses-419!2smx!4v1769908041760!5m2!1ses-419!2smx" className="w-full h-128 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]"></iframe>
        </section>
    )
}

export default LocationMap;