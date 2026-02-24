"use client";

import Navbar from "@/components/website/Navbar"
import Footer from "@/components/website/Footer";
import { useAppointmentStore } from "@/utils/website/store-appointments";
import Image from "next/image";
import music from "../../public/music.png";
import Receipt from "@/components/website/Receipt";
import { Check } from "lucide-react";


function FinishedAppointment() {
    const createdAppointment = useAppointmentStore((state: any) => state.createdAppointment); // Bringing the just-created appointment object.
    console.log(createdAppointment);

    return (
        <>
            <Navbar activePage="none" />

            <div className="relative overflow-x-hidden overflow-y-hidden flex flex-col min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
                <section className="xl:px-20 w-full lg:px-20 md:px-16 px-8 flex lg:flex-row flex-col lg:pt-20 lg:pb-40 sm:py-24 py-12 lg:items-start justify-center items-center xl:gap-30 lg:gap-15 gap-20">
                    <div className={`relative flex flex-col gap-12 lg:items-start lg:justify-start items-center justify-center w-full max-w-lg`}>
                        <div className="flex flex-col gap-4 lg:items-start lg:justify-start items-center justify-center">
                            <div className="rounded-[50%] flex items-center justify-center p-2.5 bg-teal-500">
                                <Check color="white" size={35} />
                            </div>

                            <h1 className={`sm:text-4xl/12 text-3xl font-semibold text-slate-900 tracking-tighter lg:text-start text-center`}>¡Cita agendada <span className="text-teal-500">exitosamente!</span></h1>

                            <p className={`sm:text-base text-sm font-normal text-slate-600 lg:text-start text-center`}>
                                Nos comunicaremos contigo por medio de WhatsApp al número de teléfono que ingresaste en los detalles, un día antes, para confirmar tu asistencia. ¡Nos vemos el día de tu cita!
                            </p>
                        </div>

                        <Image alt="" src={music} className="lg:w-72 sm:w-72 w-56" />
                    </div>

                    <Receipt
                        patientName={createdAppointment.patientName}
                        fatherSurname={createdAppointment.fatherSurname}
                        motherSurname={createdAppointment.motherSurname}
                        phoneNumber={createdAppointment.phoneNumber}
                        date={createdAppointment.date}
                        hour={createdAppointment.hour}
                        timestamp={createdAppointment.timestamp}
                    />

                </section>

                <Footer />
            </div>
        </>
    )
}

export default FinishedAppointment;