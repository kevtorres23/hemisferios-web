// REUSABLE UI ELEMENTS USED TO BUILD THE APPOINTMENT CALENDAR.

import { useState } from "react";
import { calendarHoursCreator, hourSorter, calendarContentGenerator } from "../../../utils/system/calendar/calendar-methods";
import { currentWeekList, nextWeekList } from "@/utils/system/calendar/calendar-variables-generation";
import { AppointmentCardCalendar } from "./AppointmentCard";
import { AppointmentType } from "../../../utils/types";

type DayProps = {
    dayName?: string,
    dayNum?: number,
    isActive: boolean,
    isFirst: boolean,
    isLast: boolean,
};

type HourProps = {
    hour: string | number,
    isLast: boolean,
};

type SpaceProps = {
    content: React.ReactNode;
    isLast: boolean,
};

type CalendarUIProps = {
    data: AppointmentType[],
    page: "history" | "appointments";
    week: number;
};

const date = new Date();
const currentYear = date.getFullYear();

function CalendarDay(props: DayProps) {
    return (
        <div className={`min-w-40 w-full items-center justify-center bg-slate-100 border-t border-l border-b border-slate-200 flex flex-row gap-1 px-3 py-2 text-sm ${props.isLast ? "rounded-tr-lg border-r" : (props.isFirst ? "rounded-tl-lg" : "rounded-none")} ${props.isActive ? "text-indigo-500" : "text-slate-600"}`}>
            <p className="font-medium uppercase tracking-wide">{props.dayName}</p>
            <p className="font-medium uppercase tracking-wide">{props.dayNum}</p>
        </div>
    );
};

function CalendarHour(props: HourProps) {
    return (
        <div className={`min-w-16 min-h-20 items-center justify-center bg-slate-100 border-b border-l text-slate-600 border-slate-200 flex flex-row gap-1.5 px-3 py-2 text-sm ${props.isLast ? "rounded-bl-lg" : "rounded-none"}`}>
            <p className="font-medium uppercase tracking-wide">{props.hour}</p>
        </div>
    );
};

function CalendarSpace(props: SpaceProps) {
    return (
        <div className={`min-w-40 w-full items-center justify-center bg-white border-b border-l border-slate-200 flex flex-row gap-1.5 px-3 py-2 ${props.isLast ? "border-r" : ""}`}>
            {props.content}
        </div>
    );
};

function CalendarUI(props: CalendarUIProps) {
    const [appointmentFound, setAppointmentFound] = useState(false);
    const [foundAppointment, setFoundAppointment] = useState<AppointmentType>();

    // Date variables.
    const hours = calendarHoursCreator(props.data);
    const calendarHours = hourSorter(hours); // A sorted array containing hours that the appointments have and that will be displayed in the calendar.
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    const date = new Date();
    const todayNum = date.getDay(); // This is equal to today's week number, for example, 4 (for Jueves).
    const todayName = dayNames[todayNum]; // This is equal to today's name, for example, "Jueves".
    const todayMonthNum = date.getDate(); // This is equal to the day of the month, for example, 19.

    return (
        <div className="calendar w-full overflow-x-auto flex flex-col">
            <div className="calendar-head items-start flex flex-row w-full">
                <div className={`min-w-16 h-full items-center justify-center bg-slate-100 border-t border-b border-l flex flex-row gap-1 border-slate-200 px-3 py-2 text-sm rounded-tl-lg`}>
                    <p className="opacity-0"> - </p>
                </div>

                {currentWeekList.map((_, id) => {
                    return (
                        <CalendarDay
                            key={id}
                            dayName={props.week === 1 ? (
                                currentWeekList[id].dayName
                            ) : (
                                nextWeekList[id].dayName
                            )}
                            dayNum={props.week === 1 ? (
                                currentWeekList[id].dayNum.number
                            ) : (
                                nextWeekList[id].dayNum.number
                            )}
                            isActive={todayNum === id}
                            isFirst={false}
                            isLast={id === 6}
                        />
                    );
                }
                )}
            </div>

            {calendarHours.map((_, id) => {
                var hourId = id;

                return (
                    <div className="calendar-content flex flex-row w-full">
                        <CalendarHour
                            key={id}
                            hour={calendarHours[id]}
                            isLast={id === (hours.length - 1)}
                        />

                        {props.week === 1 ? (
                            currentWeekList.map((_, id) => {
                                var dayId = id;
                                var foundAppointment = calendarContentGenerator(currentWeekList, hourId, dayId, calendarHours, props.data);
                                return (
                                    <>
                                        <CalendarSpace
                                            key={id}
                                            content={
                                                foundAppointment != "" ? <AppointmentCardCalendar 
                                                                        patientName={foundAppointment.patientName}
                                                                        motherSurname={foundAppointment.motherSurname}
                                                                        fatherSurname={foundAppointment.fatherSurname}
                                                                        phoneNumber={foundAppointment.phoneNumber}
                                                                        date={foundAppointment.date}
                                                                        hour={foundAppointment.hour}
                                                                        status={foundAppointment.status}/> 
                                            : ""}
                                            isLast={id === 5}
                                        />
                                    </>
                                );
                            })
                        ) : (
                            nextWeekList.map((_, id) => {
                                return (
                                    <CalendarSpace
                                        content={""}
                                        isLast={id === 6}
                                        key={id}
                                    />
                                );
                            })
                        )}
                    </div>
                )
            }
            )}
        </div>
    );
};

export { CalendarUI, CalendarDay, CalendarHour, CalendarSpace };