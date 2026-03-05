"use client";

import { hourSorter } from "@/utils/system/calendar/calendar-methods";
import { currentInterval, nextInterval } from "@/utils/system/calendar/calendar-variables";
import { useState } from "react";
import PageNavigator from "../PageNavigator";
import { AppointmentType } from "@/utils/types";
import { CalendarUI } from "./CalendarElements";
import FilterDropdown from "./FilterDropdown";
import { useAppointmentFilters } from "@/utils/system/appointments/filter-store";
import { applyFilters } from "@/utils/system/appointments/appointment-filters";
import EmptyState from "../EmptyState";
import appointmentsEmpty from "../../../public/appointments-empty.png";

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

type CalendarProps = {
    data: AppointmentType[];
    page: "history" | "appointments";
};

function AppointmentCalendar(props: CalendarProps) {
    // State variables.
    const [numberOfWeeks, setNumberOfWeeks] = useState(2);
    const [week, setWeek] = useState(1); // 1 for current, 2 for next.

    const interval = useAppointmentFilters((state: FilterStore) => state.interval)
    const checkedStatuses = useAppointmentFilters((state: FilterStore) => state.statusObject);

    const filteredData = applyFilters(props.data, interval, checkedStatuses);

    return (
        <div className="w-full flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 lg:items-center sm:items-start items-center sm:justify-between justify-center sm:w-auto w-full">
                <div className="flex sm:flex-row sm:w-auto w-full flex-col gap-3 items-center justify-center">
                    {props.page === "appointments" && (
                        <PageNavigator
                            onPreviousClick={() => setWeek(1)}
                            onNextClick={() => setWeek(2)}
                            labelText={week === 1 ? "Semana actual" : "Semana siguiente"}
                            currentPage={week}
                            finalPage={numberOfWeeks}
                            labelStyles="text-2xl font-medium text-slate-900 tracking-tight text-center"
                        />
                    )}

                    {props.page === "history" && (
                        <PageNavigator
                            onPreviousClick={() => setWeek(1)}
                            onNextClick={() => setWeek(2)}
                            labelText="Semana 2 de febrero"
                            currentPage={week}
                            finalPage={numberOfWeeks}
                            labelStyles="text-2xl font-medium text-slate-900 tracking-tight text-center"
                        />
                    )}

                    <div className="week-indicator px-2.5 py-1 border border-indigo-400 bg-indigo-50 rounded-sm">
                        <p className="text-sm text-indigo-500 font-medium">
                            {week === 1 ? (
                                // Build the current or next week interval, like: "23 de feb. - 28 de feb."
                                currentInterval.firstValue.day + " de " + currentInterval.firstValue.month + " - " +
                                currentInterval.secondValue.day + " de " + currentInterval.secondValue.month
                            ) : (
                                nextInterval.firstValue.day + " de " + nextInterval.firstValue.month + " - " +
                                nextInterval.secondValue.day + " de " + nextInterval.secondValue.month
                            )
                            }
                        </p>
                    </div>
                </div>

                <FilterDropdown view="calendar" onIntervalChange={() => ""} />
            </div>

            {filteredData.length === 0 && (
                <EmptyState
                    header="¡No hay citas que mostrar!"
                    desc="Intenta activar o desactivar algunos filtros para hacer que la información cambie."
                    image={appointmentsEmpty}
                />
            )}


            {filteredData.length > 0 && (
                <CalendarUI week={week} data={filteredData} page={props.page} />
            )}
        </div>
    );
};

export default AppointmentCalendar;
