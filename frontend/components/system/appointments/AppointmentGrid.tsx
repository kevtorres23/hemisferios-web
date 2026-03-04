import SearchBar from "../SearchBar";
import PageNavigator from "../PageNavigator";
import FilterDropdown from "./FilterDropdown";
import StatusDropdown from "./StatusDropdown";
import { AppointmentCard } from "./AppointmentCard";
import { AppointmentType } from "@/utils/types";
import { useState, useEffect } from "react";
import EmptyState from "../EmptyState";
import appointmentsEmpty from "../../../public/appointments-empty.png";
import { useAppointmentFilters } from "@/utils/system/appointments/filter-store";
import { applyFilters } from "@/utils/system/appointments/appointment-filters";
import { pageSeparator } from "@/utils/system/page-separator";

type GridProps = {
    data: AppointmentType[]; // A list of a list of appointment objects.
    page: "history" | "appointments";
};

type Status = {
    pending: boolean,
    finished: boolean,
    cancelled: boolean
};

type FilterStore = {
    interval: [string, string],
    statusObject: Status,
    updateInterval: (newIntervalArray: [string, string]) => void, // When "position" is 0, it updates the first parameter of the interval, or the second one, when it is 1.
    updateStatus: (statusObject: Status) => void,
};

function AppointmentGrid(props: GridProps) {
    const [currentPage, setCurrentPage] = useState(props.data.length === 0 ? 0 : 1);
    const [search, setSearch] = useState("");

    // State variables.
    const [intervalValue, setIntervalValue] = useState("two-weeks");
    const interval = useAppointmentFilters((state: FilterStore) => state.interval)
    const checkedStatuses = useAppointmentFilters((state: FilterStore) => state.statusObject);

    // Intialization of filter variables.
    let filteredData = applyFilters(props.data, interval, checkedStatuses);
    let appointmentPages = pageSeparator(filteredData);
    let pages = 1;

    useEffect(() => {
        filteredData = applyFilters(props.data, interval, checkedStatuses);
        appointmentPages = pageSeparator(filteredData);
        pages = appointmentPages.length;
    }, [interval, checkedStatuses])

    function onIntervalChange(val: string) {
        setIntervalValue(val);
    };

    function onSearchChange(e:React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.currentTarget.value);
    };

    return (
        <div className="w-full flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 lg:items-center items-start justify-between sm:w-auto w-full">
                <SearchBar onInputChange={(e) => onSearchChange(e)} placeholder="Buscar cita por nombre del paciente" />

                <div className="filters flex sm:flex-row flex-col gap-5 sm:w-auto w-full">
                    {props.page === "appointments" && (
                        <FilterDropdown view="cards" intervalValue={intervalValue} onIntervalChange={onIntervalChange} />
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

            {appointmentPages.length === 0 && (
                <EmptyState
                    header="¡No hay citas que mostrar!"
                    desc="Intenta activar o desactivar algunos filtros para hacer que la información cambie."
                    image={appointmentsEmpty}
                />
            )}

            {appointmentPages.length > 0 && (
                <div className="grid w-full xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-6">
                    {appointmentPages[currentPage - 1].filter((item: AppointmentType) => {
                        return search.toLowerCase() === ""
                        ? item
                        : item.patientName.toLowerCase().includes(search.toLowerCase());
                    }).map((item, id) =>
                        <AppointmentCard
                            _id={item._id}
                            key={id}
                            status={item.status}
                            patientName={item.patientName}
                            fatherSurname={item.fatherSurname}
                            motherSurname={item.motherSurname}
                            phoneNumber={item.phoneNumber}
                            date={item.date} // We pass item.date first by AppointmentFormatter().
                            hour={item.hour} // We pass item.date first by AppointmentFormatter().
                            cancellationComment={item.cancellationComment}
                            timestamp={item.timestamp}
                            page={props.page}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default AppointmentGrid;