"use client";
import SystemLayout from "@/system/components/SystemLayout";
import PageTitle from "@/system/components/PageTitle";
import IconButton from "@/system/components/IconButton";
import AppointmentGrid from "@/system/components/appointments/AppointmentGrid";
import AppointmentCalendar from "@/system/components/appointments/AppointmentCalendar";
import FilterBar from "@/system/components/FilterBar";
import { Plus, SquarePen } from "lucide-react";
import { useState } from "react";
import { AppointmentType } from "@/system/modules/Types";
import { pageSeparator } from "@/system/modules/PageSeparator";

type AppointmentDataset = AppointmentType[];

function AppointmentDashboard() {
    const [view, setView] = useState("cards");
    const [searchValue, setSearchValue] = useState("");

    const sampleAppointmentData: AppointmentDataset = [
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

    const appointmentPages = pageSeparator(sampleAppointmentData);

    function onViewChange(selectedView: string) {
        setView(selectedView);
    };

    return (
        <SystemLayout sidebarPage="appointments">
            <div className="header flex sm:flex-row flex-col justify-between items-start sm:gap-10 gap-6 w-full">
                <PageTitle title="Registro de Citas" desc="Consulta y administra las citas agendadas por los usuarios en el sitio." />

                <div className="buttons flex lg:flex-row flex-col gap-3 lg:min-w-110 sm:items-center sm:justify-end">
                    <IconButton isActive={true} icon={<Plus size={18} />} text="Nueva cita manual" />
                    <IconButton isActive={false} icon={<SquarePen size={18} />} text="Editar disponibilidad" />
                </div>
            </div>

            <FilterBar onViewChange={onViewChange} firstElement={<p className="text-lg font-medium text-slate-800">
                Hay <span className="font-semibold text-indigo-500">{sampleAppointmentData.length}</span> citas pendientes</p>}
            />

            {view === "cards" && (
                <AppointmentGrid data={appointmentPages} onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)} />
            )}

            {view === "calendar" && (
                <AppointmentCalendar data={sampleAppointmentData} />
            )}
        </ SystemLayout>
    );
};

export default AppointmentDashboard;