"use client";

import { hourSorter, intervalCreator } from "@/utils/system/calendar/calendar-methods";
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
import HistoryFilterDropdown from "./HistoryFilterDropdown";
import { useHistoryFilters } from "@/utils/system/history/filter-store";
import historyEmpty from "../../../public/history-empty.png";
import { historyCalendarWeeks } from "@/utils/system/calendar/history-calendar-weeks";
import HistoryCalendarUI from "./HistoryCalendarUI";

type Status = {
    pending: boolean,
    finished: boolean,
    cancelled: boolean
};

type HistoryStatus = {
    finished: boolean,
    cancelled: boolean
};

type FilterStore = {
    interval: [string, string],
    statusObject: Status,
    updateInterval: (newIntervalArray: [string, string]) => void, // When "position" is 0, it updates the first parameter of the interval, or the second one, when it is 1.
    updateStatus: (statusObject: Status) => void,
};

type HistoryFilterStore = {
    interval: [string, string],
    statusObject: HistoryStatus,
    updateInterval: (newIntervalArray: [string, string]) => void, // When "position" is 0, it updates the first parameter of the interval, or the second one, when it is 1.
    updateStatus: (statusObject: Status) => void,
};

type CalendarProps = {
    data: AppointmentType[];
    page: "history" | "appointments";
    month?: string;
    year?: string;
};

type weekDayObject = {
    dayName: string,
    dayNum: {
        number: number,
        month: number,
    },
};

const monthNames = ["0", "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function AppointmentCalendar(props: CalendarProps) {
    // State variables.
    const [week, setWeek] = useState(1); // 1 for current, 2 for next.
    const [historyWeek, setHistoryWeek] = useState(1);

    // Appointments Page filter variables.
    const interval = useAppointmentFilters((state: FilterStore) => state.interval)
    const checkedStatuses = useAppointmentFilters((state: FilterStore) => state.statusObject);

    // History Page filter variables.
    const historyInterval = useHistoryFilters((state: HistoryFilterStore) => state.interval);
    const historyCheckedStatuses = useHistoryFilters((state: HistoryFilterStore) => state.statusObject);

    // Filter the data according to the page of the calendar (Appointments or History).
    const filteredData = applyFilters(props.data, interval, checkedStatuses);
    const historyFilteredData = applyFilters(props.data, historyInterval, { pending: false, finished: historyCheckedStatuses.finished, cancelled: historyCheckedStatuses.cancelled });

    const fiveWeeks: weekDayObject[][] = historyCalendarWeeks(Number(props.month), Number(props.year));
    const week1Interval = intervalCreator(fiveWeeks[0][0].dayNum.number, fiveWeeks[0][0].dayNum.month, fiveWeeks[0][5].dayNum.number, fiveWeeks[0][5].dayNum.month);
    const week2Interval = intervalCreator(fiveWeeks[1][0].dayNum.number, fiveWeeks[1][0].dayNum.month, fiveWeeks[1][5].dayNum.number, fiveWeeks[1][5].dayNum.month);
    const week3Interval = intervalCreator(fiveWeeks[2][0].dayNum.number, fiveWeeks[2][0].dayNum.month, fiveWeeks[2][5].dayNum.number, fiveWeeks[2][5].dayNum.month);
    const week4Interval = intervalCreator(fiveWeeks[3][0].dayNum.number, fiveWeeks[3][0].dayNum.month, fiveWeeks[3][5].dayNum.number, fiveWeeks[3][5].dayNum.month);
    const week5Interval = intervalCreator(fiveWeeks[4][0].dayNum.number, fiveWeeks[4][0].dayNum.month, fiveWeeks[4][5].dayNum.number, fiveWeeks[4][5].dayNum.month);

    const historyWeekIntervals = [week1Interval, week2Interval, week3Interval, week4Interval, week5Interval];

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
                            finalPage={2}
                            labelStyles="text-2xl font-medium text-slate-900 tracking-tight text-center"
                        />
                    )}

                    {props.page === "history" && (
                        <PageNavigator
                            onPreviousClick={() => setHistoryWeek(historyWeek - 1)}
                            onNextClick={() => setHistoryWeek(historyWeek + 1)}
                            labelText={`Semana ${historyWeek} de ${monthNames[Number(props.month)]}`}
                            currentPage={historyWeek}
                            finalPage={5}
                            labelStyles="text-2xl font-medium text-slate-900 tracking-tight text-center"
                        />
                    )}

                    {props.page === "appointments" && (
                        <div className="week-indicator px-2.5 py-1 border border-indigo-400 bg-indigo-50 rounded-sm">
                            <p className="text-sm text-indigo-500 font-medium">
                                {week === 1 ? (currentInterval[0] + " - " + currentInterval[1]) : (nextInterval[0] + " - " + nextInterval[1])}
                            </p>
                        </div>
                    )}

                    {props.page === "history" && (
                        <div className="week-indicator px-2.5 py-1 border border-indigo-400 bg-indigo-50 rounded-sm">
                            <p className="text-sm text-indigo-500 font-medium">
                                {historyWeekIntervals[historyWeek - 1][0]} - {historyWeekIntervals[historyWeek - 1][1]}
                            </p>
                        </div>
                    )}
                </div>

                {props.page === "appointments" && (
                    <FilterDropdown view="calendar" onIntervalChange={() => ""} />
                )}

                {props.page === "history" && (
                    <HistoryFilterDropdown />
                )}
            </div>

            {props.page === "appointments" && filteredData.length === 0 && (
                <EmptyState
                    header="¡No hay citas que mostrar!"
                    desc="Intenta activar o desactivar algunos filtros para hacer que la información cambie."
                    image={appointmentsEmpty}
                />
            )}

            {props.page === "history" && historyFilteredData.length === 0 && (
                <EmptyState
                    header="¡No hay citas que mostrar!"
                    desc="Intenta activar o desactivar algunos filtros para hacer que la información cambie."
                    image={historyEmpty}
                />
            )}

            {props.page === "appointments" && filteredData.length > 0 && (
                <CalendarUI week={week} data={filteredData} page={props.page} />
            )}

            {props.page === "history" && historyFilteredData.length > 0 && (
                <HistoryCalendarUI week={historyWeek} fiveWeeks={fiveWeeks} data={historyFilteredData} page={props.page} />
            )}
        </div>
    );
};

export default AppointmentCalendar;
