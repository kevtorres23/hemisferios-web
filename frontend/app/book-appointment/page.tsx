"use client";

import Navbar from "@/components/website/Navbar";
import axios from "axios";
import { Appointment } from "@/utils/classes";
import Footer from "@/components/website/Footer";
import { CircleCheck } from "lucide-react";
import AppointmentForm from "@/components/website/NewAppointmentForm";
import ChannelBox from "@/components/website/ChannelBox";
import { useRef } from "react";
import { isVisible } from "@/utils/website/visibility-detector";
import { useAppointmentStore } from "@/utils/website/store-appointments";
import { redirect } from "next/navigation";

function BookAppointment() {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const isFormVisible = isVisible(ref2);
    const isContentVisible = isVisible(ref1);

    const saveAppointment = useAppointmentStore((state: any) => state.saveAppointment);

    function sendAppointmentData(receiptObject: Appointment, databaseOject: Appointment) {
        axios.post("http://localhost:5001/api/appointments", databaseOject);
        saveAppointment(receiptObject);

        redirect('/finished-appointment');
    }

    return (
        <>
            <Navbar activePage="none" />

            <div className="relative overflow-x-hidden overflow-y-hidden flex flex-col min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
                <section className="xl:px-25 lg:px-20 md:px-16 px-8 flex lg:flex-row flex-col lg:pt-24 lg:pb-40 sm:py-24 py-12 xl:gap-40 sm:gap-15 gap-10 w-full items-start justify-center">
                    <div ref={ref1} className={`${isContentVisible ? "top-0 opacity-100" : "top-20 opacity-0"} relative flex flex-col md:items-start items-center justify-between gap-20 transition-all ease-out duration-1200`}>
                        <div className="relative flex flex-col gap-4 md:items-start md:justify-start items-center justify-center w-full">
                            <h1 className={`sm:text-4xl/12 text-3xl font-semibold text-slate-900 tracking-tighter md:text-start text-center`}>Agendar una cita</h1>

                            <p className={`text-base font-normal text-slate-700 md:text-start text-center w-full`}>
                                El siguiente es el proceso para agendar una cita en nuestro centro.
                            </p>

                            <div className="flex flex-col gap-3 items-center lg:justify-start justify-center">
                                <div className="flex flex-row gap-3 w-full">
                                    <CircleCheck size={24} className="text-indigo-500" />
                                    <p className="text-base text-slate-800 font-normal">Llena y envía el <span className="font-semibold">formulario de registro.</span></p>
                                </div>

                                <div className="flex flex-row gap-3 w-full">
                                    <CircleCheck size={24} className="text-indigo-500" />
                                    <p className="text-base text-slate-800 font-normal">Recibe un <span className="font-semibold">comprobante</span> que puedes descargar.</p>
                                </div>

                                <div className="flex flex-row gap-3 w-full">
                                    <CircleCheck size={24} className="text-indigo-500" />
                                    <p className="text-base text-slate-800 font-normal">¡Listo! Acude a nuestro centro el <span className="font-semibold">día</span> que agendaste.</p>
                                </div>
                            </div>
                        </div>

                        <div className="xl:block hidden w-full">
                            <ChannelBox showContainer={false} title="¿Quieres contactarnos?" areChannelsGray={true} />
                        </div>
                    </div>

                    <div ref={ref2} className={`${isFormVisible ? 'opacity-100' : 'opacity-0'} lg:max-w-xl w-full flex flex-col items-start lg:p-7 sm:p-5 p-4 border border-slate-200 bg-slate-50 rounded-xl gap-4 transition-opacity duration-700 ease-in`}>
                        <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Formulario de Citas</h1>

                        <AppointmentForm sendData={sendAppointmentData} />

                        <button form="appointmentForm" type="submit" className="bg-indigo-500 text-white tracking-tight text-base px-4 py-2 flex flex-row items-center justify-center gap-2 rounded-lg cursor-pointer font-normal hover:bg-indigo-400 sm:w-auto w-full">
                            Agendar cita
                            <CircleCheck size={18} />
                        </button>
                    </div>

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