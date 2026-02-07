"use client";

import Navbar from "@/website-components/Navbar"
import Footer from "@/website-components/Footer";
import { CircleCheck } from "lucide-react";
import AppointmentForm from "@/website-components/AppointmentForm";
import ChannelBox from "@/website-components/ChannelBox";

type AppointmentType = {
    patientName: string;
    motherSurname: string;
    fatherSurname: string;
    phoneNumber: string;
    date: string;
    hour: string;
}

function BookAppointment() {

    return (
        <>
            <Navbar activePage="none" />

            <div className="relative overflow-x-hidden overflow-y-hidden flex flex-col min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
                <section className="xl:px-25 lg:px-20 md:px-16 px-8 flex lg:flex-row flex-col lg:pt-24 lg:pb-40 sm:py-24 py-12 xl:gap-40 sm:gap-15 gap-10 w-full items-start justify-center">
                    <div className="flex flex-col md:items-start items-center justify-between gap-20">
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

                        <div className="xl:block hidden w-full">
                            <ChannelBox showContainer={false} title="¿Quieres contactarnos?" areChannelsGray={true} />
                        </div>
                    </div>

                    <AppointmentForm />

                    <div className="lg:hidden block w-full">
                        <ChannelBox showContainer={false} title="¿Quieres contactarnos?" areChannelsGray={true} />
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}

export default BookAppointment;