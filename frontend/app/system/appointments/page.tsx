"use client";
import SystemLayout from "@/system/components/SystemLayout";
import EmptyState from "@/system/components/EmptyState";
import { NewAppointmentModal } from "@/system/components/appointments/CRUDModals";
import Image from "next/image";
import PageTitle from "@/system/components/PageTitle";
import IconButton from "@/system/components/IconButton";
import AppointmentGrid from "@/system/components/appointments/AppointmentGrid";
import AppointmentCalendar from "@/system/components/appointments/AppointmentCalendar";
import WhiteIconButton from "@/system/components/WhiteIconButton";
import MediumModal from "@/system/components/modals/MediumModal";
import FilterBar from "@/system/components/FilterBar";
import { Plus, SquarePen } from "lucide-react";
import { useState } from "react";
import appointmentsEmpty from "../../../public/appointments-empty.png";
import { AppointmentType } from "@/system/modules/Types";
import { pageSeparator } from "@/system/modules/PageSeparator";

type AppointmentDataset = AppointmentType[];

function AppointmentDashboard() {
    const [view, setView] = useState("cards");
    const [searchValue, setSearchValue] = useState("");
    const [newAppointmentModal, setNewAppointmentModal] = useState(false);

    const data: AppointmentDataset = [
        {
            status: "pending",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "09/02/2026",
            hour: "12:00",
            timestamp: "today"
        },
        {
            status: "finished",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "10/02/2026",
            hour: "15:00",
            timestamp: "today"
        },
        {
            status: "cancelled",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "13/02/2026",
            hour: "16:00",
            timestamp: "today"
        },
        {
            status: "pending",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "14/02/2026",
            hour: "15:00",
            timestamp: "today"
        },
        {
            status: "finished",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "15/02/2026",
            hour: "11:00",
            timestamp: "today"
        },
        {
            status: "cancelled",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "16/02/2026",
            hour: "12:00",
            timestamp: "today"
        },
        {
            status: "pending",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "16/02/2026",
            hour: "15:00",
            timestamp: "today"
        },
    ];

    function onSaveAppointment() {
        // Receives an appointment object from the modal and adds it to the database.
        // We can build a global controller for the API calls and call that controller here.
    };

    let appointmentPages = pageSeparator(data);

    function onViewChange(selectedView: string) {
        setView(selectedView);
    };

    return (
        <SystemLayout sidebarPage="appointments" isAnyModal={newAppointmentModal}
            modals={
                <>
                    <NewAppointmentModal isVisible={newAppointmentModal} onSaveAppointment={onSaveAppointment} onClose={() => setNewAppointmentModal(false)}/>
                </>
            }>

            <div className="header flex sm:flex-row flex-col justify-between items-start sm:gap-10 gap-6 w-full">
                <PageTitle title="Registro de Citas" desc="Consulta y administra las citas agendadas por los usuarios en el sitio." />

                <div className="buttons flex lg:flex-row flex-col gap-3 lg:min-w-110 sm:w-auto w-full sm:items-center sm:justify-end">
                    <IconButton onClick={() => setNewAppointmentModal(true)} isActive={true} icon={<Plus size={18} />} text="Nueva cita manual" />
                    <WhiteIconButton isIndigo={true} icon={<SquarePen size={18} />} text="Editar disponibilidad" />
                </div>
            </div>

            <FilterBar onViewChange={onViewChange} firstElement={<p className="text-lg font-medium text-slate-800">
                Hay <span className="font-semibold text-indigo-500">{data.length}</span> citas pendientes</p>}
            />

            {(data.length === 0) ? (
                <EmptyState
                    header="¡No hay citas registradas aún!"
                    desc="Nuevas citas aparecerán aquí cuando sean creadas por una persona en la página, o por ti, manualmente."
                    image={appointmentsEmpty}
                />
            ) : (view === "cards") ? (
                <AppointmentGrid data={appointmentPages} onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)} />
            ) : (view === "calendar") ? (
                <AppointmentCalendar data={data} />
            ) : <></>
            }
        </ SystemLayout>
    );
};

export default AppointmentDashboard;