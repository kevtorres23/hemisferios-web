"use client";
import SystemLayout from "@/components/system/SystemLayout";
import EmptyState from "@/components/system/EmptyState";
import { updateStatus } from "@/lib/update-appointment-status";
import toast, { Toaster } from 'react-hot-toast';
import { NewAppointmentModal, CancelAppointmentModal, ModifyAppointmentModal, RemoveAppointModal, CompleteAppointment, PendingAppointment } from "@/components/system/modals/AppointmentActions";
import AvailabilityModal from "@/components/system/modals/AvailabilityModal";
import PageTitle from "@/components/system/PageTitle";
import IconButton from "@/components/system/IconButton";
import AppointmentGrid from "@/components/system/appointments/AppointmentGrid";
import AppointmentCalendar from "@/components/system/appointments/AppointmentCalendar";
import WhiteIconButton from "@/components/system/WhiteIconButton";
import FilterBar from "@/components/system/FilterBar";
import { Plus, SquarePen } from "lucide-react";
import { useState, createContext, useEffect } from "react";
import appointmentsEmpty from "../../../public/appointments-empty.png";
import { AppointmentType } from "@/utils/types";
import { pageSeparator } from "@/utils/system/page-separator";
import { formatAvailability } from "@/utils/website/format-availability";
import api from "@/lib/axios";

export const CardActionContext = createContext<(action: string, id: string) => void>(() => "");
export const AppointmentPageContext = createContext("");

type AppointmentDataset = AppointmentType[];

function AppointmentDashboard() {
    const [view, setView] = useState("cards");
    const [searchValue, setSearchValue] = useState("");
    const [appointmentsData, setAppointmentsData] = useState<any>([]);
    const [appointmentPages, setAppointmentPages] = useState<any[]>([]);

    // Modal variables.
    const [newAppointmentModal, setNewAppointmentModal] = useState(false);
    const [availabilityModal, setAvailabilityModal] = useState(false);
    const [cardAction, setCardAction] = useState("");
    const [appointmentId, setAppointmentId] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("Cambio detectado");

        const getAllAppointments = async () => {
            try {
                const res = await api.get("/appointments");
                setAppointmentsData(res.data);

                const separatedPages = pageSeparator(res.data); // Separate the obtained data from the database in pages.
                setAppointmentPages(separatedPages);
            } catch (error) {
                console.log("Error while fetching the appointments", error);
            } finally {
                setIsLoading(false);
            }
        };

        getAllAppointments();

        if (cardAction === "closed") {
            getAllAppointments();
        };

    }, [cardAction, success]);

    function showSuccessModal(successMsg: string) {
        toast.success(successMsg, { duration: 3500 });
    };

    function onSaveAppointment() {
        setNewAppointmentModal(false);
        setCardAction("created");
        showSuccessModal("¡Cita creada correctamente!");
    };

    function onSaveAvailability() {
        setAvailabilityModal(false);
        showSuccessModal("¡Disponibilidad actualizada correctamente!");
    };

    function onUpdateStatus(action: string) {
        if (action === "complete") {
            updateStatus(appointmentId, "finished");
            showSuccessModal("¡Estatus de la cita actualizado!");
        } else if (action === "pending") {
            updateStatus(appointmentId, "pending");
            showSuccessModal("¡Estatus de la cita actualizado!");
        }

        setCardAction("closed");
    };

    function onCancelStatus() {
        setCardAction("closed");
        showSuccessModal("¡Cita cancelada correctamente!")
    }

    function onModifyAppointment() {
        setCardAction("closed"); // Close the action modal.
        showSuccessModal("¡Cita actualizada correctamente!");
    };

    function onRemoveAppointment() {
        api.delete("/appointments/" + appointmentId);
        setCardAction("closed"); // Close the action modal.
        setAppointmentsData((prev: AppointmentType[]) => prev.filter(appointment => appointment._id !== appointmentId));
        showSuccessModal("¡Cita eliminada correctamente!");
    };

    function onActionSelected(action: string, id: string) {
        setCardAction(action);
        setAppointmentId(id);
    };

    return (
        <SystemLayout sidebarPage="appointments" isAnyModal={newAppointmentModal || availabilityModal || cardAction === "cancel" || cardAction === "complete" || cardAction === "modify" || cardAction === "remove" || cardAction === "pending"}
            modals={
                <>
                    {newAppointmentModal && (
                        <NewAppointmentModal onSave={onSaveAppointment} isVisible={newAppointmentModal} onClose={() => setNewAppointmentModal(false)} />
                    )}

                    {availabilityModal && (
                        <AvailabilityModal onSave={onSaveAvailability} isVisible={availabilityModal} onClose={() => setAvailabilityModal(false)} />
                    )}

                    {cardAction === "cancel" && (
                        <CancelAppointmentModal updateElementId={appointmentId} onSave={onCancelStatus} isVisible={cardAction === "cancel"} onClose={() => setCardAction("")} />
                    )}

                    {cardAction === "complete" && (
                        <CompleteAppointment onSave={() => onUpdateStatus("complete")} isVisible={cardAction === "complete"} onClose={() => setCardAction("")} />
                    )}

                    {cardAction === "pending" && (
                        <PendingAppointment updateElementId={appointmentId} onSave={() => onUpdateStatus("pending")} isVisible={cardAction === "pending"} onClose={() => setCardAction("")} />
                    )}

                    {cardAction === "modify" && (
                        <ModifyAppointmentModal updateElementId={appointmentId} onSave={onModifyAppointment} isVisible={cardAction === "modify"} onClose={() => setCardAction("")} />
                    )}

                    {cardAction === "remove" && (
                        <RemoveAppointModal updateElementId={appointmentId} onSave={onRemoveAppointment} isVisible={cardAction === "remove"} onClose={() => setCardAction("")} />
                    )}

                </>
            }>

            <Toaster />

            <div className="header flex sm:flex-row flex-col justify-between items-start sm:gap-10 gap-6 w-full">
                <PageTitle title="Registro de Citas" desc="Consulta y administra las citas agendadas por los usuarios en el sitio." />

                <div className="buttons flex lg:flex-row flex-col gap-3 lg:min-w-110 sm:w-auto w-full sm:items-center sm:justify-end">
                    <IconButton onClick={() => setNewAppointmentModal(true)} isActive={true} icon={<Plus size={18} />} text="Nueva cita manual" />
                    <WhiteIconButton onClick={() => setAvailabilityModal(true)} isIndigo={true} icon={<SquarePen size={18} />} text="Editar disponibilidad" />
                </div>
            </div>

            <FilterBar onViewChange={(selectedView: string) => setView(selectedView)} firstElement={
                <>
                    {appointmentsData.length === 1 && (
                        <p className="text-lg font-medium text-slate-800">
                            Hay <span className="font-semibold text-indigo-500">1</span> cita pendiente
                        </p>
                    )}

                    {appointmentsData.length > 1 && (
                        <p className="text-lg font-medium text-slate-800">
                            Hay <span className="font-semibold text-indigo-500">{appointmentsData.length}</span> citas pendientes
                        </p>
                    )}
                </>
            }
            />

            {isLoading && (
                <div className="w-full h-full flex items-center justify-center">
                    <p className="text-xl font-semibold text-slate-800">Cargando citas...</p>
                </div>
            )}

            {!isLoading && appointmentsData.length === 0 && (
                <EmptyState
                    header="¡No hay citas registradas aún!"
                    desc="Nuevas citas aparecerán aquí cuando sean creadas por una persona en la página, o por ti, manualmente."
                    image={appointmentsEmpty}
                />
            )}

            {appointmentsData.length > 0 && view === "cards" && (
                <CardActionContext.Provider value={onActionSelected}>
                    <AppointmentGrid page="appointments" data={appointmentPages} onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)} />
                </CardActionContext.Provider>
            )}

            {appointmentsData.length > 0 && view === "calendar" && (
                <CardActionContext.Provider value={onActionSelected}>
                    <AppointmentCalendar page="appointments" data={appointmentsData} />
                </CardActionContext.Provider>
            )}
        </ SystemLayout>
    );
};

export default AppointmentDashboard;