// REUSABLE UI ELEMENTS USED TO BUILD THE THERAPISTS' SCHEDULE.

import { calendarHoursCreator, daysDistance } from "../../../utils/system/calendar/calendar-methods";
import { PatientType, TherapistType, ScheduleItem } from "../../../utils/types";
import SchedulePatient from "./SchedulePatient";

type DayProps = {
    dayName?: string,
    isFirst: boolean,
    isLast: boolean,
    mode: "view" | "edit";
};

type HourProps = {
    hour: string,
    isLast: boolean,
    mode: "view" | "edit";
};

type SpaceProps = {
    content: React.ReactNode;
    isLast: boolean,
    mode: "view" | "edit";
};

type ScheduleUIProps = {
    data: ScheduleItem[],
    mode: "view" | "edit";
};

function ScheduleDay(props: DayProps) {
    return (
        <div className={`min-w-40 w-full items-center justify-center ${props.mode === "view" ? "bg-slate-100" : "bg-white"} border-t border-l border-b border-slate-200 flex flex-row gap-1 px-3 py-2 text-sm ${props.isLast ? "rounded-tr-lg border-r" : (props.isFirst ? "rounded-tl-lg" : "rounded-none")}`}>
            <p className="font-medium uppercase tracking-wide">{props.dayName}</p>
        </div>
    );
};

function ScheduleHour(props: HourProps) {
    return (
        <div className={`min-w-16 min-h-20 items-center justify-center ${props.mode === "view" ? "bg-slate-100" : "bg-white"} border-b border-l text-slate-600 border-slate-200 flex flex-row gap-1.5 px-3 py-2 text-sm ${props.isLast ? "rounded-bl-lg" : "rounded-none"}`}>
            <p className="font-medium uppercase tracking-wide">{props.hour}</p>
        </div>
    );
};

function ScheduleSpace(props: SpaceProps) {
    return (
        <div className={`min-w-40 w-full items-center justify-center ${props.mode === "view" ? "bg-white" : "bg-slate-100"} border-b border-l border-slate-200 flex flex-row gap-1.5 px-3 py-2 ${props.isLast ? "border-r" : ""}`}>
            {props.content}
        </div>
    );
};

function scheduleContentGenerator(hourList: string[], dayList: string[], hourId: number, dayId: number, data: ScheduleItem[]) {
    let scheduleHour = hourList[hourId];
    let scheduleDay = dayId;

    let coincidence: ScheduleItem = {
        patientName: "",
        patientLastName: "",
        hour: "",
        day: "",
        _id: "",
    };

    for (let i = 0; i < data.length; i++) {
        if ((data[i].hour === scheduleHour) && (Number(data[i].day) === scheduleDay)) {
            coincidence = {
                patientName: data[i].patientName,
                patientLastName: data[i].patientLastName,
                hour: data[i].hour,
                day: data[i].day,
                _id: data[i]._id
            };
        } else {
            continue;
        };
    };

    return coincidence;
};

function ScheduleUI(props: ScheduleUIProps) {
    // Date variables.
    console.log(props.data);

    const scheduleHours = ["10:00", "11:00", "12:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00"]; // An array containing hours that the appointments have and that will be displayed in the schedule.
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    return (
        <div className="schedule w-full overflow-x-auto flex flex-col">
            <div className="schedule-head items-start flex flex-row w-full">
                <div className={`min-w-16 h-full items-center justify-center bg-slate-100 border-t border-b border-l flex flex-row gap-1 border-slate-200 px-3 py-2 text-sm rounded-tl-lg`}>
                    <p className="opacity-0"> - </p>
                </div>

                {dayNames.map((_, id) => {
                    return (id === 0 ? null :
                        <ScheduleDay
                            dayName={dayNames[id]}
                            isFirst={false}
                            isLast={id === 6}
                            mode={props.mode}
                        />
                    );
                }
                )}
            </div>

            {scheduleHours.map((_, id) => {
                var hours = scheduleHours;
                var hourId = id;

                return (
                    <div className="flex flex-row w-full">
                        <ScheduleHour
                            hour={hours[id]}
                            isLast={id === (hours.length - 1)}
                            mode={props.mode}
                        />

                        {dayNames.map((_, id) => {
                            var dayId = id;

                            var foundPatient = scheduleContentGenerator(scheduleHours, dayNames, hourId, dayId, props.data);

                            return (id === 0 ? null :
                                <ScheduleSpace
                                    content={ foundPatient.patientName === "" ? "" :
                                        <SchedulePatient
                                            patientName={foundPatient.patientName}
                                            patientLastName={foundPatient.patientLastName}
                                            scheduleMode={props.mode}
                                            id={foundPatient._id}
                                        />
                                    }
                                    isLast={id === 6}
                                    mode={props.mode}
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

export { ScheduleUI, ScheduleDay, ScheduleHour, ScheduleSpace };