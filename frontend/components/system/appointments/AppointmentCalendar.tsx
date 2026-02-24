"use client";

import { weekCreator } from "@/utils/system/calendar-methods";
import { useState } from "react";
import PageNavigator from "../PageNavigator";
import { AppointmentType } from "@/utils/types";
import { CalendarUI } from "./CalendarElements";
import StatusDropdown from "./StatusDropdown";

type CalendarProps = {
    data: AppointmentType[];
    page: "history" | "appointments";
};

console.log(weekCreator(30, 5));

function AppointmentCalendar(props: CalendarProps) {
    // State variables.
    const [numberOfWeeks, setNumberOfWeeks] = useState(2);
    const [week, setWeek] = useState(1); // 1 for current, 2 for next.

    return (
        <div className="w-full flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 lg:items-center sm:items-start items-center sm:justify-between justify-center sm:w-auto w-full">
                <div className="flex sm:flex-row sm:w-auto w-full flex-col gap-3 items-center justify-center">
                    {props.page === "appointments" && (
                        <PageNavigator
                            onPreviousClick={() => setWeek(1)}
                            onNextClick={() => setWeek(2)}
                            labelText="Semana actual"
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
                        <p className="text-sm text-indigo-500 font-medium">09/02 - 14/02</p>
                    </div>
                </div>

                <StatusDropdown isOnHistory={props.page === "history"} />
            </div>

            <CalendarUI data={props.data} page={props.page} />
        </div>
    );
}

export default AppointmentCalendar;
