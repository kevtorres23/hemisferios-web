import SectionBadge from "@/website-components/SectionBadge";
import Image from "next/image";
import notification from "../../public/notification.png";
import ContactChannel from "@/website-components/ContactChannel";
import { Phone, Mail, MapPin } from "lucide-react";

function OtherChannels() {
    return (
        <section className="xl:px-25 lg:px-20 md:px-16 px-8 flex lg:flex-row flex-col lg:pt-0 lg:pb-40 sm:py-24 py-12 xl:gap-30 gap-15 items-center justify-center">
            <div className="lg:max-w-xl w-full flex flex-col items-center justify-center md:p-8 p-5 border border-slate-200 bg-slate-50 rounded-xl gap-5">

                <h1 className="text-xl font-semibold text-slate-800 tracking-tight self-start">Medios de Contacto</h1>

                <div className="w-full flex sm:flex-row flex-col gap-5">
                    <ContactChannel
                        color="bg-green-500"
                        icon={<Phone size={18} color="white" />}
                        name="Número de teléfono"
                        description="618-206-8767"
                    />

                    <ContactChannel
                        color="bg-orange-500"
                        icon={<Mail size={18} color="white" />}
                        name="Correo electrónico"
                        description="arlet28torres@gmail.com"
                    />
                </div>

                <ContactChannel
                    color="bg-pink-500"
                    icon={<MapPin size={18} color="white" />}
                    name="Dirección del centro"
                    description="Valle Verde S/N, Colonia La Esperanza, Durango, Durango."
                />
            </div>

            <div className="flex flex-col gap-12 items-center justify-center">

                <div className="flex flex-col gap-4 items-center justify-center">
                    <SectionBadge name="OTROS MEDIOS" />

                    <h1 className={`sm:text-4xl/12 text-3xl font-semibold text-slate-900 tracking-tighter text-center`}>También puedes contactarnos por los siguientes medios.</h1>

                    <p className={`sm:text-base text-sm font-normal text-slate-600 text-center w-10/12`}>
                        Ponemos a tu disposición diversas maneras para que puedas comunicarte con nosotros fácilmente.
                    </p>
                </div>

                <Image alt="" src={notification} className="sm:w-60 w-56" />
            </div>

        </section>
    )
}

export default OtherChannels;