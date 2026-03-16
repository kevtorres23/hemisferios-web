import { calendarHoursCreator } from "@/utils/system/calendar/calendar-methods";
import { hourSorter } from "@/utils/system/calendar/calendar-methods";
import { AppointmentType } from "@/utils/types";
import { CalendarSpace } from "./CalendarElements";
import { CalendarDay } from "./CalendarElements";
import { CalendarHour } from "./CalendarElements";
import { AppointmentCardCalendar } from "./AppointmentCard";
import { calendarContentGenerator } from "@/utils/system/calendar/calendar-methods";

type weekDayObject = {
    dayName: string,
    dayNum: {
        number: number,
        month: number,
    },
};

type CalendarUIProps = {
    data: AppointmentType[],
    page: "history" | "appointments";
    week: number;
    fiveWeeks: weekDayObject[][]
};

function HistoryCalendarUI(props: CalendarUIProps) {
    const fiveWeeks = props.fiveWeeks;
    const week = props.week;

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

                {fiveWeeks[week - 1].map((_, id) => {
                    return (
                        <CalendarDay
                            key={id}
                            dayName={fiveWeeks[week - 1][id].dayName}
                            dayNum={fiveWeeks[week - 1][id].dayNum.number}
                            isActive={todayNum === id + 1}
                            isFirst={false}
                            isLast={id === 5}
                        />
                    )
                }
                )}
            </div>

            {calendarHours.map((_, id) => {
                var hourId = id;

                return (
                    <div key={id} className="calendar-content flex flex-row w-full">
                        <CalendarHour
                            key={id}
                            hour={calendarHours[id]}
                            isLast={id === (hours.length - 1)}
                        />

                        {fiveWeeks[week - 1].map((_, id) => {
                            var dayId = id;
                            var foundAppointments = calendarContentGenerator(fiveWeeks[week - 1], hourId, dayId, calendarHours, props.data);
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
                        })}
                    </div>
                )
            }
            )}
        </div>
    );
};

export default HistoryCalendarUI;