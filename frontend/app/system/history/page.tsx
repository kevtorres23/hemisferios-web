"use client";

import SystemLayout from "@/components/system/SystemLayout";
import { format } from "date-fns";
import toast, { Toaster } from 'react-hot-toast';
import EmptyState from "@/components/system/EmptyState";
import { historyAvailability } from "@/utils/system/history/history-registry";
import { calculateMonthRegistries, calculateYearRegistries } from "@/utils/system/history/history-records";
import { useHistoryFilters } from "@/utils/system/history/filter-store";
import { FilterStore, HistoryFilterStore, HistoryRegistry } from "@/utils/subtypes";
import api from "@/lib/axios";
import { RemoveAppointModal } from "@/components/system/modals/AppointmentActions";
import { useAppointmentFilters } from "@/utils/system/appointments/filter-store";
import { useId } from "react";
import PageTitle from "@/components/system/PageTitle";
import AppointmentGrid from "@/components/system/appointments/AppointmentGrid";
import AppointmentCalendar from "@/components/system/appointments/AppointmentCalendar";
import FilterBar from "@/components/system/FilterBar";
import { useState, createContext, useEffect } from "react";
import historyEmpty from "../../../public/history-empty.png";
import { AppointmentType } from "@/utils/types";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { lessThanTen } from "@/utils/format-availability";
import monthLimits from "@/utils/system/history/month-limits";
import LoadingState from "@/components/system/LoadingState";

export const HistoryActionContext = createContext<(action: string, id: string) => void>(() => "");

const date = new Date();
const currentMonthNum = lessThanTen(date.getMonth() + 1).toString();
const currentYear = date.getFullYear().toString();

function AppointmentHistory() {
    const id = useId();
    const [appointmentsData, setAppointmentsData] = useState<AppointmentType[]>([]);
    const [view, setView] = useState("cards");
    const [cardAction, setCardAction] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [displayedMonth, setDisplayedMonth] = useState(currentMonthNum);
    const [displayedYear, setDisplayedYear] = useState(currentYear);
    const [appointmentId, setAppointmentId] = useState("");

    const interval = useAppointmentFilters((state: FilterStore) => state.interval)
    const historyInterval = useHistoryFilters((state: HistoryFilterStore) => state.interval);
    const updateHistoryInterval = useHistoryFilters((state: HistoryFilterStore) => state.updateInterval);

    useEffect(() => {
        const fetchAllAppointments = async () => {
            try {
                const res = await api.get("/appointments/dateRange/" + historyInterval[0] + "/" + historyInterval[1]);
                setAppointmentsData(res.data);
            } catch (error) {
                console.log("Error while fetching the appointments", error);
            } finally {
                setIsLoading(false);
            };
        };

        fetchAllAppointments();
    }, [historyInterval]);

    function showSuccessModal(successMsg: string) {
        toast.success(<p className="font-medium">{successMsg}</p>, { duration: 2000 });
    };

    function onRemoveAppointment() {
        api.delete("/appointments/" + appointmentId);
        setCardAction(""); // Close the action modal.
        setAppointmentsData((prev: AppointmentType[]) => prev.filter(appointment => appointment._id !== appointmentId));
        showSuccessModal("¡Cita eliminada correctamente!");
    };

    function onViewChange(selectedView: string) {
        setView(selectedView);
    };

    function onActionSelected(action: string, id: string) {
        setCardAction(action);
        setAppointmentId(id);
    };

    function onMonthChange(val: string) {
        setDisplayedMonth(val);

        let newMonthLimits = monthLimits(Number(displayedYear), Number(val));

        const newIntervalFirst = format(new Date(Number(displayedYear), Number(val) - 1, Number(newMonthLimits.first)), "yyyy-MM-dd");
        const newIntervalSecond = format(new Date(Number(displayedYear), Number(val) - 1, Number(newMonthLimits.last)), "yyyy-MM-dd");

        updateHistoryInterval([newIntervalFirst, newIntervalSecond]);
    };

    function onYearChange(val: string) {
        setDisplayedYear(val);

        let newMonthLimits = monthLimits(Number(displayedYear), Number(val));

        const newIntervalFirst = format(new Date(Number(displayedYear), Number(val) - 1, Number(newMonthLimits.first)), "yyyy-MM-dd");
        const newIntervalSecond = format(new Date(Number(displayedYear), Number(val) - 1, Number(newMonthLimits.last)), "yyyy-MM-dd");

        updateHistoryInterval([newIntervalFirst, newIntervalSecond]);
    };

    const monthRegistries = calculateMonthRegistries(Number(displayedYear));
    const yearRegistries = calculateYearRegistries();

    return (
        <SystemLayout sidebarPage="history" isAnyModal={cardAction === "remove"}
            modals={
                <>
                    {cardAction === "remove" && (
                        <RemoveAppointModal updateElementId={appointmentId} onSave={onRemoveAppointment} isVisible={cardAction === "remove"} onClose={() => setCardAction("")} />
                    )}

                </>
            }>

            <Toaster />

            <div className="header flex sm:flex-row flex-col justify-between items-start sm:gap-10 gap-6 w-full">
                <PageTitle title="Historial de Citas" desc="Consulta y administra las citas agendadas por los usuarios en el sitio." />
            </div>

            <FilterBar onViewChange={onViewChange} firstElement={
                <div className="flex sm:flex-row flex-col gap-2 sm:items-center sm:justify-center sm:w-auto w-full">
                    <p className="text-lg text-nowrap font-medium text-slate-800">Registro de</p>

                    <div className="flex flex-row gap-2 items-center justify-center">
                        <Select value={displayedMonth} onValueChange={onMonthChange}>
                            <SelectTrigger id={id} className={`w-full bg-white sm:text-sm text-base cursor-pointer py-2 px-3`}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-sm z-999" sideOffset={5} position="popper">
                                <SelectGroup className="h-80 overflow-y-scroll">
                                    <SelectLabel className="text-sm">Mes del registro:</SelectLabel>
                                    {/* Map the available record months */}
                                    {monthRegistries.map((item, id) => {
                                        console.log("id del mes:", item.monthNum, "nombre del mes:", item.monthName)
                                        return <SelectItem className="text-sm" key={id} value={item.monthNum}>{item.monthName}</SelectItem>
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select value={displayedYear} onValueChange={onYearChange}>
                            <SelectTrigger id={id} className={`w-full bg-white sm:text-sm text-base cursor-pointer py-2 px-3`}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-sm z-999" sideOffset={5} position="popper">
                                <SelectGroup className="h-80 overflow-y-scroll">
                                    <SelectLabel className="text-sm">Año del registro:</SelectLabel>
                                    {/* Map the available record months */}
                                    {yearRegistries.map((item, id) =>
                                        <SelectItem className="text-sm" key={id} value={item.toString()}>{item}</SelectItem>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            }
            />

            {isLoading && <LoadingState message="Cargando historial..." />}

            {!isLoading && appointmentsData.length === 0 && (
                <EmptyState
                    header="¡No hay citas en el historial aún!"
                    desc="Las citas aparecerán aquí automáticamente cuando hayan sido completadas o canceladas."
                    image={historyEmpty}
                />
            )}

            {appointmentsData.length > 0 && view === "cards" && (
                <HistoryActionContext.Provider value={onActionSelected}>
                    <AppointmentGrid page="history" data={appointmentsData} isLoading={isLoading} />
                </HistoryActionContext.Provider>
            )}

            {appointmentsData.length > 0 && view === "calendar" && (
                <HistoryActionContext.Provider value={onActionSelected}>
                    <AppointmentCalendar page="history" data={appointmentsData} month={displayedMonth} year={displayedYear} />
                </HistoryActionContext.Provider>
            )}
        </ SystemLayout>
    );
};

export default AppointmentHistory;