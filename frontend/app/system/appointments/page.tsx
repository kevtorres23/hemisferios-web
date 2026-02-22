"use client";
import SystemLayout from "@/system/components/SystemLayout";
import EmptyState from "@/system/components/EmptyState";
import { NewAppointmentModal, CancelAppointmentModal, ModifyAppointmentModal, RemoveAppointModal, CompleteAppointment, PendingAppointment } from "@/system/components/modals/AppointmentActions";
import AvailabilityModal from "@/system/components/modals/AvailabilityModal";
import SuccessModal from "@/system/components/modals/SuccessModal";
import PageTitle from "@/system/components/PageTitle";
import IconButton from "@/system/components/IconButton";
import AppointmentGrid from "@/system/components/appointments/AppointmentGrid";
import AppointmentCalendar from "@/system/components/appointments/AppointmentCalendar";
import WhiteIconButton from "@/system/components/WhiteIconButton";
import FilterBar from "@/system/components/FilterBar";
import { Plus, SquarePen } from "lucide-react";
import { useState, createContext } from "react";
import appointmentsEmpty from "../../../public/appointments-empty.png";
import { AppointmentType } from "@/lib/Types";
import { pageSeparator } from "@/system/modules/PageSeparator";

export const CardActionContext = createContext<(action: string) => void>(() => "");
export const AppointmentPageContext = createContext("");

type AppointmentDataset = AppointmentType[];

function AppointmentDashboard() {
    const [view, setView] = useState("cards");
    const [searchValue, setSearchValue] = useState("");
    const [successfulAction, setSuccessfulAction] = useState("");

    // Modal variables.
    const [newAppointmentModal, setNewAppointmentModal] = useState(false);
    const [availabilityModal, setAvailabilityModal] = useState(false);
    const [cardAction, setCardAction] = useState("");
    const [success, setSuccess] = useState(false);

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

    let appointmentPages = pageSeparator(data);

    function showSuccessModal(successMsg: string) {
        setSuccess(true);
        setSuccessfulAction(successMsg)
        setTimeout(() => setSuccess(false), 3000);
    };

    function onSaveAppointment() {
        setNewAppointmentModal(false);
        showSuccessModal("¡Cita creada correctamente!");
    };

    function onSaveAvailability() {
        setAvailabilityModal(false);
        showSuccessModal("¡Disponibilidad actualizada correctamente!");
    };

    function onUpdateStatus(action: string) {
        setCardAction("");

        if (action === "complete") {
            // Include the PUT controller to update the appointment's status.
            showSuccessModal("¡Cita marcada como completa correctamente!");
        } else if (action === "pending") {
            // Include the PUT controller to update the appointment's status.
            showSuccessModal("¡Cita marcada como pendiente correctamente!");
        } else if (action === "cancel") {
            // Include the PUT controller to update the appointment's status.
            showSuccessModal("¡Cita cancelada correctamente!");
        };
    };

    function onModifyAppointment() {
        setCardAction(""); // Close the action modal.
        // Include the PUT controller to update the appointment.
        showSuccessModal("¡Cita actualizada correctamente!");
    };

    function onRemoveAppointment() {
        setCardAction(""); // Close the action modal.
        // Include the DELETE controller to remove the appointment.
        showSuccessModal("Cita eliminada correctamente.");
    };

    function onViewChange(selectedView: string) {
        setView(selectedView);
    };

    function onActionSelected(action: string) {
        setCardAction(action);
    };

    return (
        <SystemLayout sidebarPage="appointments" isAnyModal={newAppointmentModal || availabilityModal || cardAction === "cancel" || cardAction === "complete" || cardAction === "modify" || cardAction === "remove" || cardAction === "pending"}
            modals={
                <>
                    <NewAppointmentModal onSave={onSaveAppointment} isVisible={newAppointmentModal} onClose={() => setNewAppointmentModal(false)} />
                    <AvailabilityModal onSave={onSaveAvailability} isVisible={availabilityModal} onClose={() => setAvailabilityModal(false)} />
                    <CancelAppointmentModal onSave={() => onUpdateStatus("cancel")} isVisible={cardAction === "cancel"} onClose={() => setCardAction("")} />
                    <CompleteAppointment onSave={() => onUpdateStatus("complete")} isVisible={cardAction === "complete"} onClose={() => setCardAction("")} />
                    <PendingAppointment onSave={() => onUpdateStatus("pending")} isVisible={cardAction === "pending"} onClose={() => setCardAction("")} />
                    <ModifyAppointmentModal onSave={onModifyAppointment} isVisible={cardAction === "modify"} onClose={() => setCardAction("")} />
                    <RemoveAppointModal onSave={onRemoveAppointment} isVisible={cardAction === "remove"} onClose={() => setCardAction("")} />
                </>
            }>

            <SuccessModal isVisible={success} text={successfulAction} />

            <div className="header flex sm:flex-row flex-col justify-between items-start sm:gap-10 gap-6 w-full">
                <PageTitle title="Registro de Citas" desc="Consulta y administra las citas agendadas por los usuarios en el sitio." />

                <div className="buttons flex lg:flex-row flex-col gap-3 lg:min-w-110 sm:w-auto w-full sm:items-center sm:justify-end">
                    <IconButton onClick={() => setNewAppointmentModal(true)} isActive={true} icon={<Plus size={18} />} text="Nueva cita manual" />
                    <WhiteIconButton onClick={() => setAvailabilityModal(true)} isIndigo={true} icon={<SquarePen size={18} />} text="Editar disponibilidad" />
                </div>
            </div>

            <FilterBar onViewChange={onViewChange} firstElement={
                <p className="text-lg font-medium text-slate-800">
                    Hay <span className="font-semibold text-indigo-500">{data.length}</span> citas pendientes
                </p>
            }
            />

            {(data.length === 0) ? (
                <EmptyState
                    header="¡No hay citas registradas aún!"
                    desc="Nuevas citas aparecerán aquí cuando sean creadas por una persona en la página, o por ti, manualmente."
                    image={appointmentsEmpty}
                />
            ) : (view === "cards") ? (
                <CardActionContext.Provider value={onActionSelected}>
                    <AppointmentGrid page="appointments" onActionSelected={onActionSelected} data={appointmentPages} onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)} />
                </CardActionContext.Provider>
            ) : (view === "calendar") ? (
                <AppointmentCalendar page="appointments" data={data} />
            ) : <></>
            }
        </ SystemLayout>
    );
};

export default AppointmentDashboard;