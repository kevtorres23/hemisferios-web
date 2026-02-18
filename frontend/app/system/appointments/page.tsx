"use client";
import SystemLayout from "@/system/components/SystemLayout";
import PageTitle from "@/system/components/appointments/AppointmentPageTitle";
import IconButton from "@/system/components/IconButton";
import AppointmentContainer from "@/system/components/appointments/AppointmentContainer";
import FilterBar from "@/system/components/FilterBar";
import { Plus, SquarePen } from "lucide-react";
import { Main } from "next/document";
import { useState } from "react";
import { AppointmentType } from "@/system/modules/Types";
import App from "next/app";

type AppointmentDataset = AppointmentType[];

function AppointmentDashboard() {
    const [contentType, setContentType] = useState("cards");
    const [searchValue, setSearchValue] = useState("");

    const sampleAppointmentData: AppointmentDataset = [
        {
            status: "pending",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "20/02/2026",
            hour: "12:00",
            timestamp: "today"
        },
        {
            status: "finished",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "20/02/2026",
            hour: "12:00",
            timestamp: "today"
        },
        {
            status: "cancelled",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "20/02/2026",
            hour: "12:00",
            timestamp: "today"
        },
        {
            status: "pending",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "20/02/2026",
            hour: "12:00",
            timestamp: "today"
        },
        {
            status: "finished",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "20/02/2026",
            hour: "12:00",
            timestamp: "today"
        },
        {
            status: "cancelled",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "20/02/2026",
            hour: "12:00",
            timestamp: "today"
        },
        {
            status: "pending",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "20/02/2026",
            hour: "12:00",
            timestamp: "today"
        },
        {
            status: "finished",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "20/02/2026",
            hour: "12:00",
            timestamp: "today"
        },
        {
            status: "cancelled",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "20/02/2026",
            hour: "12:00",
            timestamp: "today"
        },
    ];

    return (
        <SystemLayout sidebarPage="appointments">
            <div className="header flex sm:flex-row flex-col w-full justify-between items-start sm:gap-10 gap-6">
                <PageTitle title="Registro de Citas" desc="Consulta y administra las citas agendadas por los usuarios en la página web." />

                <div className="buttons flex lg:flex-row flex-col gap-3 lg:min-w-md sm:min-w-50 w-full sm:items-center sm:justify-end">
                    <IconButton isActive={true} icon={<Plus size={18} />} text="Nueva cita manual" />
                    <IconButton isActive={false} icon={<SquarePen size={18} />} text="Editar disponibilidad" />
                </div>
            </div>

            <FilterBar firstElement={<p className="text-lg font-medium text-slate-800">
                Hay <span className="font-semibold text-indigo-500">{sampleAppointmentData.length}</span> citas pendientes</p>}
            />

            <AppointmentContainer data={sampleAppointmentData} contentType={contentType} onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)} />
        </ SystemLayout>
    );
};

export default AppointmentDashboard;