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
import api from "@/lib/axios";
import { intervalFilter, statusFilter } from "@/utils/system/appointments/appointment-filters";
import { stringToDate } from "@/utils/system/calendar/calendar-methods";

export const CardActionContext = createContext<(action: string, id: string) => void>(() => "");
export const AppointmentPageContext = createContext("");
export const ActiveFilterContext = createContext<(filterName: string) => void>(() => "");

function AppointmentDashboard() {
    const [view, setView] = useState("cards");
    const [searchValue, setSearchValue] = useState("");
    const [appointmentsData, setAppointmentsData] = useState<AppointmentType[]>([]);
    const [appointmentPages, setAppointmentPages] = useState<any[]>([]);

    // Modal variables.
    const [newAppointmentModal, setNewAppointmentModal] = useState(false);
    const [availabilityModal, setAvailabilityModal] = useState(false);
    const [appointmentId, setAppointmentId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [cardAction, setCardAction] = useState("");
    const [activeFilters, setActiveFilters] = useState<string[]>([]);


    useEffect(() => {
        const getAllAppointments = async () => {
            try {
                const res = await api.get("/appointments");
                setAppointmentsData(res.data);
                const filter = intervalFilter(res.data, "04/03/2026", "14/03/2026");
                console.log(statusFilter(res.data, {pending: true, finished: true, cancelled: true}))

                const separatedPages = pageSeparator(res.data); // Separate the obtained data from the database in pages.
                setAppointmentPages(separatedPages);

            } catch (error) {
                console.log("Error while fetching the appointments", error);
            } finally {
                setIsLoading(false);
            };
        };

        getAllAppointments();

        if ((cardAction === "closed") || (cardAction === "")) {
            console.log("change");
            getAllAppointments();
        };

    }, [cardAction]);

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
        if (action === "finished") {
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

    function onFilterSelected(filterName: string) {
        setActiveFilters([...activeFilters, filterName])
    }

    return (
        <SystemLayout sidebarPage="appointments" isAnyModal={newAppointmentModal || availabilityModal || cardAction === "cancel" || cardAction === "finished" || cardAction === "modify" || cardAction === "remove" || cardAction === "pending"}
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

                    {cardAction === "finished" && (
                        <CompleteAppointment onSave={() => onUpdateStatus("finished")} isVisible={cardAction === "finished"} onClose={() => setCardAction("")} />
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
                    <ActiveFilterContext.Provider value={onFilterSelected} >
                        <AppointmentGrid page="appointments" data={appointmentPages} onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)} />
                    </ActiveFilterContext.Provider>
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