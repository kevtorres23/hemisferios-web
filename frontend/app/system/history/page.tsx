"use client";
import SystemLayout from "@/system/components/SystemLayout";
import EmptyState from "@/system/components/EmptyState";
import { NewAppointmentModal, CancelAppointmentModal, ModifyAppointmentModal, RemoveAppointModal, CompleteAppointment, PendingAppointment } from "@/system/components/modals/AppointmentActions";
import SuccessModal from "@/system/components/modals/SuccessModal";
import { useId } from "react";
import PageTitle from "@/system/components/PageTitle";
import AppointmentGrid from "@/system/components/appointments/AppointmentGrid";
import AppointmentCalendar from "@/system/components/appointments/AppointmentCalendar";
import FilterBar from "@/system/components/FilterBar";
import { useState, createContext } from "react";
import historyEmpty from "../../../public/history-empty.png";
import { AppointmentType } from "@/system/modules/Types";
import { pageSeparator } from "@/system/modules/PageSeparator";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'


export const HistoryActionContext = createContext<(action: string) => void>(() => "");


type AppointmentDataset = AppointmentType[];

function AppointmentHistory() {
    const id = useId();
    const [view, setView] = useState("cards");
    const [searchValue, setSearchValue] = useState("");
    const [cardAction, setCardAction] = useState("");
    const [success, setSuccess] = useState(false);
    const [successfulAction, setSuccessfulAction] = useState("");
    const [displayedMonth, setDisplayedMonth] = useState("Febrero");
    const [displayedYear, setDisplayedYear] = useState("2026");

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

    const recordMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const recordYears = ["2026", "2025"];

    return (
        <SystemLayout sidebarPage="history" isAnyModal={cardAction === "cancel" || cardAction === "complete" || cardAction === "modify" || cardAction === "remove" || cardAction === "pending"}
            modals={
                <>
                    <RemoveAppointModal onSave={onRemoveAppointment} isVisible={cardAction === "remove"} onClose={() => setCardAction("")} />
                </>
            }>

            <SuccessModal isVisible={success} text={successfulAction} />

            <div className="header flex sm:flex-row flex-col justify-between items-start sm:gap-10 gap-6 w-full">
                <PageTitle title="Historial de Citas" desc="Consulta las citas que han tenido lugar en Hemisferios." />
            </div>

            <FilterBar onViewChange={onViewChange} firstElement={
                <div className="flex sm:flex-row flex-col gap-2 items-center justify-center">
                    <p className="text-lg text-nowrap font-medium text-slate-800">Registro de</p>

                    <Select defaultValue="01" value={displayedMonth} onValueChange={(val) => setDisplayedMonth(val)}>
                        <SelectTrigger id={id} className={`w-full bg-white sm:text-sm text-base cursor-pointer py-5 px-3`}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-sm z-999" sideOffset={5} position="popper">
                            <SelectGroup className="h-80 overflow-y-scroll">
                                <SelectLabel className="text-sm">Mes del registro:</SelectLabel>
                                {/* Map the available record months */}
                                {recordMonths.map((item, id) =>
                                    <SelectItem className="text-sm" key={id} value={item}>{item}</SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <p className="text-lg font-medium text-slate-800">de</p>

                    <Select defaultValue="01" value={displayedYear} onValueChange={(val) => setDisplayedYear(val)}>
                        <SelectTrigger id={id} className={`w-full bg-white sm:text-sm text-base cursor-pointer py-2 px-3`}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-sm z-999" sideOffset={5} position="popper">
                            <SelectGroup className="h-80 overflow-y-scroll">
                                <SelectLabel className="text-sm">Año del registro:</SelectLabel>
                                {/* Map the available record months */}
                                {recordYears.map((item, id) =>
                                    <SelectItem className="text-sm" key={id} value={item}>{item}</SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            }
            />

            {(data.length === 0) ? (
                <EmptyState
                    header="¡No hay nada en el historial aún!"
                    desc="Las citas aparecerán aquí cuando su fecha y hora establecidas hayan pasado."
                    image={historyEmpty}
                />
            ) : (view === "cards") ? (
                <HistoryActionContext.Provider value={onActionSelected}>
                    <AppointmentGrid page="history" onActionSelected={onActionSelected} data={appointmentPages} onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)} />
                </HistoryActionContext.Provider>
            ) : (view === "calendar") ? (
                <AppointmentCalendar page="history" data={data} />
            ) : <></>
            }
        </ SystemLayout>
    );
};

export default AppointmentHistory;