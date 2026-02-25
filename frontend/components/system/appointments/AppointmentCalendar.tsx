"use client";

import { weekCreator, nextWeekNum, daysDistance } from "@/utils/system/calendar-methods";
import { useState } from "react";
import PageNavigator from "../PageNavigator";
import { AppointmentType } from "@/utils/types";
import { CalendarUI } from "./CalendarElements";
import StatusDropdown from "./StatusDropdown";

type CalendarProps = {
    data: AppointmentType[];
    page: "history" | "appointments";
};

type IntervalValue = {
    day: number | undefined,
    month: string,
};

type WeekInterval = {
    firstValue: IntervalValue,
    secondValue: IntervalValue,
};

const months = ["ene.", "feb.", "mar.", "abr.", "mayo", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic."]

// Date variables.
const date = new Date();
const currentMonthNum = date.getMonth();
const todayMonthNum = date.getDate();
const nextWeekNumber = nextWeekNum(todayMonthNum);

// Week lists for the calendar.
const currentWeekList = weekCreator(todayMonthNum, currentMonthNum);
const nextWeekList = weekCreator(nextWeekNumber.day, nextWeekNumber.month);

// Interval values for the calendar.
const currentInterval: WeekInterval = {
    firstValue: {
        day: currentWeekList[0].dayNum.number, // This key is equal to the day-of-the-month of the week's monday (start of the interval).
        month: months[currentWeekList[0].dayNum.month], // The month's name abbreviated, indexed from the months's array.
    },
    secondValue: {
        day: currentWeekList[5].dayNum.number, // This key is equal to the day-of-the-month of the week's saturday (end of the interval).
        month: months[currentWeekList[5].dayNum.month], 
    }
};

const nextInterval: WeekInterval = {
    firstValue: {
        day: nextWeekList[0].dayNum.number,
        month: months[nextWeekList[0].dayNum.month],
    },
    secondValue: {
        day: nextWeekList[5].dayNum.number,
        month: months[nextWeekList[5].dayNum.month],
    }
};


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

                <StatusDropdown isOnHistory={props.page === "history"} />
            </div>

            <CalendarUI data={props.data} page={props.page} />
        </div>
    );
};

export default AppointmentCalendar;
