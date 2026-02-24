// REUSABLE UI ELEMENTS USED TO BUILD THE APPOINTMENT CALENDAR.

import { calendarHoursCreator, daysDistance } from "../../../utils/system/calendar-methods";
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
    hour: string,
    isLast: boolean,
};

type SpaceProps = {
    content: React.ReactNode;
    isLast: boolean,
};

type CalendarUIProps = {
    data: AppointmentType[],
    page: "history" | "appointments";
};

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
    // Date variables.
    const calendarHours = calendarHoursCreator(props.data); // An array containing hours that the appointments have and that will be displayed in the calendar.
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

                {dayNames.map((_, id) => {
                    return (id === 0 ? null :
                        <CalendarDay
                            dayName={dayNames[id]}
                            dayNum={todayMonthNum - daysDistance(todayNum, id)}
                            isActive={todayNum === id}
                            isFirst={false}
                            isLast={id === 6}
                        />
                    );
                }
                )}
            </div>

            {calendarHours.map((_, id) => {
                var hours = calendarHours;

                return (
                    <div className="flex flex-row w-full">
                        <CalendarHour
                            hour={hours[id]}
                            isLast={id === (hours.length - 1)}
                        />

                        {dayNames.map((_, id) => {
                            return (id === 0 ? null :
                                <CalendarSpace
                                    content={""}
                                    isLast={id === 6}
                                />
                            );
                        }
                        )}
                    </div>
                )
            }
            )}
        </div>
    );
};

export { CalendarUI, CalendarDay, CalendarHour, CalendarSpace };