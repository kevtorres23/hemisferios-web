"use client";
import SystemLayout from "@/system/components/SystemLayout";
import PageTitle from "@/system/components/AppointmentPageTitle";

function AppointmentDashboard() {
    return (
        <SystemLayout sidebarPage="appointments">
            <div className="header flex flex-row w-full justify-between items-start">
                <PageTitle title="Historial de Citas" desc="Consulta y administra las citas agendadas por los usuarios en la página web."/>
            </div>
        </ SystemLayout>
    );
};

export default AppointmentDashboard;