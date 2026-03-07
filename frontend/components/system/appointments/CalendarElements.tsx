// REUSABLE UI ELEMENTS USED TO BUILD THE APPOINTMENT CALENDAR.
import { calendarHoursCreator, hourSorter, calendarContentGenerator } from "../../../utils/system/calendar/calendar-methods";
import { currentWeekList, nextWeekList } from "@/utils/system/calendar/calendar-variables";
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
        <div className={`min-w-40 w-full items-center justify-center bg-white border-b border-l border-slate-200 flex flex-col gap-2 px-4 py-4 ${props.isLast ? "border-r" : ""}`}>
            {props.content}
        </div>
    );
};

function CalendarUI(props: CalendarUIProps) {

    // Date variables.
    const hours = calendarHoursCreator(props.data);
    const calendarHours = hourSorter(hours); // A sorted array containing hours that the appointments have and that will be displayed in the calendar.

    const date = new Date();
    const todayNum = date.getDay(); // This is equal to today's week number, for example, 4 (for Jueves).

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
                            isActive={todayNum === id + 1}
                            isFirst={false}
                            isLast={id === 5}
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
                                var foundAppointments = calendarContentGenerator(currentWeekList, hourId, dayId, calendarHours, props.data);
                                return (
                                    <>
                                        <CalendarSpace
                                            key={id}
                                            content={
                                                foundAppointments.length > 0 ? foundAppointments.map((appointment, id) =>
                                                    <AppointmentCardCalendar
                                                        key={id}
                                                        _id={appointment._id}
                                                        cancellationComment={appointment.cancellationComment}
                                                        patientName={appointment.patientName}
                                                        motherSurname={appointment.motherSurname}
                                                        fatherSurname={appointment.fatherSurname}
                                                        phoneNumber={appointment.phoneNumber}
                                                        date={appointment.date}
                                                        hour={appointment.hour}
                                                        status={appointment.status}
                                                        page={props.page}
                                                    />
                                                ) : ""}
                                            isLast={id === 5}
                                        />
                                    </>
                                );
                            })
                        ) : (
                            nextWeekList.map((_, id) => {
                                var dayId = id;
                                var foundAppointments = calendarContentGenerator(nextWeekList, hourId, dayId, calendarHours, props.data);
                                return (
                                    <CalendarSpace
                                        content={
                                            foundAppointments.length > 0 ? foundAppointments.map((appointment) =>
                                                <AppointmentCardCalendar
                                                    _id={appointment._id}
                                                    cancellationComment={appointment.cancellationComment}
                                                    patientName={appointment.patientName}
                                                    motherSurname={appointment.motherSurname}
                                                    fatherSurname={appointment.fatherSurname}
                                                    phoneNumber={appointment.phoneNumber}
                                                    date={appointment.date}
                                                    hour={appointment.hour}
                                                    status={appointment.status}
                                                    page={props.page}
                                                />
                                            ) : ("")}
                                        isLast={id === 5}
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