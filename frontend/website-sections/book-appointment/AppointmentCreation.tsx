import { CircleCheck } from "lucide-react";
import AppointmentForm from "@/website-components/AppointmentForm";
import ContactChannel from "@/website-components/ContactChannel";
import { Phone, Mail, MapPin } from "lucide-react";

type AppointmentType = {
    patientName: string;
    motherSurname: string;
    fatherSurname: string;
    phoneNumber: string;
    date: string;
    hour: string;
}

function AppointmentCreation() {

    function receiveAppointmentObject(appointmentObject: AppointmentType) {
        console.log(appointmentObject);
    }

    return (
        <section className="xl:px-25 lg:px-20 md:px-16 px-8 flex lg:flex-row flex-col lg:pt-24 lg:pb-40 sm:py-24 py-12 xl:gap-30 sm:gap-15 gap-10 w-full">
            <div className="flex flex-col gap-12 md:items-start items-center justify-between w-full">
                <div className="relative flex flex-col gap-4 md:items-start md:justify-start items-center justify-center w-full">
                    <h1 className={`sm:text-4xl/12 text-3xl font-semibold text-slate-900 tracking-tighter md:text-start text-center`}>Agendar una cita</h1>

                    <p className={`sm:text-base text-sm font-normal text-slate-600 md:text-start text-center w-full`}>
                        El siguiente es el proceso para agendar una cita en nuestro centro.
                    </p>

                    <div className="flex flex-col gap-3 items-center lg:justify-start justify-center">
                        <div className="flex flex-row gap-3 w-full">
                            <CircleCheck size={24} className="text-indigo-500" />
                            <p className="sm:text-base text-sm text-slate-800 font-normal">Llena y envía el <span className="font-semibold">formulario de registro.</span></p>
                        </div>

                        <div className="flex flex-row gap-3 w-full">
                            <CircleCheck size={24} className="text-indigo-500" />
                            <p className="sm:text-base text-sm text-slate-800 font-normal">Recibe un <span className="font-semibold">comprobante</span> que puedes descargar.</p>
                        </div>

                        <div className="flex flex-row gap-3 w-full">
                            <CircleCheck size={24} className="text-indigo-500" />
                            <p className="sm:text-base text-sm text-slate-800 font-normal">¡Listo! Acude a nuestro centro el <span className="font-semibold">día</span> que agendaste.</p>
                        </div>
                    </div>
                </div>

                <div className={`relative lg:flex lg:max-w-xl w-full hidden flex-col items-center justify-center md:p-6 sm:p-4 p-3 border border-slate-200 bg-slate-50 rounded-xl gap-5 transition-opacity duration-900 ease-in`}>
                    <h1 className="text-xl font-semibold text-slate-800 tracking-tight self-start">¿Quieres contactarnos?</h1>

                    <div className="w-full flex xl:flex-row lg:flex-col sm:flex-row flex-col gap-5">
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
                        description="Valle Florido S/N, Colonia La Esperanza, Durango, Durango."
                    />
                </div>
            </div>

            <AppointmentForm sendAppointmentObject={receiveAppointmentObject} />

            <div className={`relative lg:hidden lg:max-w-xl w-full flex flex-col items-center justify-center md:p-6 p-4 border border-slate-200 bg-slate-50 rounded-xl gap-5 transition-opacity duration-900 ease-in`}>
                <h1 className="text-xl font-semibold text-slate-800 tracking-tight self-start">¿Quieres contactarnos?</h1>

                <div className="w-full flex xl:flex-row lg:flex-col sm:flex-row flex-col gap-5">
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
                    description="Valle Florido S/N, Colonia La Esperanza, Durango, Durango."
                />
            </div>
        </section>
    )
};

export default AppointmentCreation;