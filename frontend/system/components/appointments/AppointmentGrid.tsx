import SearchBar from "../SearchBar";
import AppointmentCalendar from "./AppointmentCalendar";
import PageNavigator from "../PageNavigator";
import FilterDropdown from "./FilterDropdown";
import StatusDropdown from "./StatusDropdown";
import { AppointmentCard } from "./AppointmentCard";
import { AppointmentType } from "@/system/modules/Types";
import { dateFormatter, hourFormatter } from "@/system/modules/AppointmentFormatter";
import { useState } from "react";

type GridProps = {
    data: AppointmentType[][]; // A list of a list of appointment objects.
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onActionSelected: (action: string) => void;
    page: "history" | "appointments";
}

function AppointmentGrid(props: GridProps) {
    const [pages, setPages] = useState(props.data?.length);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter variables.
    const [intervalValue, setIntervalValue] = useState("two-weeks");

    function onIntervalChange(val: string) {
        setIntervalValue(val);
    };

    return (
        <div className="w-full flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 lg:items-center items-start justify-between sm:w-auto w-full">
                <SearchBar onInputChange={props.onSearchChange} placeholder="Buscar cita por nombre del paciente" />

                <div className="filters flex sm:flex-row flex-col gap-5 sm:w-auto w-full">
                    {props.page === "appointments" && (
                        <FilterDropdown intervalValue={intervalValue} onIntervalChange={onIntervalChange} />
                    )}

                    {props.page === "history" && (
                        <StatusDropdown isOnHistory={true} />
                    )}

                    <div className="flex flex-row gap-3 items-center justify-center">
                        <p className="text-sm font-medium text-slate-500">Página:</p>

                        <PageNavigator labelText={`${currentPage} de ${pages}`} labelStyles="text-sm" onPreviousClick={() => setCurrentPage(currentPage - 1)} onNextClick={() => setCurrentPage(currentPage + 1)} currentPage={currentPage} finalPage={pages} />
                    </div>
                </div>
            </div>

            <div className="grid w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-6">
                {props.data[currentPage - 1].map((item, id) =>
                    <AppointmentCard
                        key={id}
                        status={item.status}
                        patientName={item.patientName}
                        fatherSurname={item.fatherSurname}
                        motherSurname={item.motherSurname}
                        phoneNumber={item.phoneNumber}
                        date={dateFormatter(item.date)} // We pass item.date first by AppointmentFormatter().
                        hour={hourFormatter(item.hour)} // We pass item.date first by AppointmentFormatter().
                        timestamp={item.timestamp}
                        onActionSelected={props.onActionSelected}
                        page={props.page}
                    />
                )}
            </div>
        </div>
    )
}

export default AppointmentGrid;