import { AppointmentType } from "@/system/modules/Types";
import { useContext } from "react";
import AppointmentTag from "./AppointmentTag";
import {
    CalendarFold,
    ClockIcon,
    Phone,
    CircleUserRound,
    Trash
} from "lucide-react";
import AppointmentDropdown from "./AppointmentDropdown";
import { CardActionContext, PageContext } from "@/app/system/appointments/page";
type CardProps = {
    status: string;
    patientName: string;
    fatherSurname: string;
    motherSurname: string;
    phoneNumber: string;
    date: string;
    hour: string;
    timestamp: string;
    onActionSelected: (action: string) => void;
}

function AppointmentCard(props: CardProps) {
    const setAction = useContext(CardActionContext);
    const page = useContext(PageContext);

    return (
        <div className="relative flex flex-col gap-1.5 overflow-y-visible rounded-md border border-slate-200 p-6 items-start justify-center overflow-x-hidden">
            <div className={`absolute w-1 h-full ${props.status === "pending" ? "bg-yellow-500" : (props.status === "finished" ? "bg-green-500" : "bg-rose-500")} left-0`}></div>

            <div className="relative w-full flex flex-row justify-between items-center">
                <AppointmentTag type={props.status === "pending" ? "pending" : (props.status === "finished" ? "finished" : "cancelled")} />

                {page === "appointments" && (
                    <AppointmentDropdown appointmentStatus={props.status} />
                )}

                {page === "history" && (
                    <Trash onClick={() => setAction("remove")} size={16} className="text-slate-600"/>
                )}
            </div>

            <p className="text-base font-medium text-slate-900">{props.patientName} {props.fatherSurname} {props.motherSurname}</p>

            <div className="details flex flex-col gap-3 items-start mt-2">
                <div className="date flex flex-row gap-1 items-center justify-center text-slate-500">
                    <CalendarFold size={16} />
                    <p className="text-sm">{props.date}</p>
                </div>

                <div className="hour-phone flex flex-row items-center justify-center gap-5">
                    <div className="date flex flex-row gap-1 items-center justify-center text-slate-500">
                        <ClockIcon size={16} />
                        <p className="text-sm">{props.hour}</p>
                    </div>

                    <div className="date flex flex-row items-center justify-center gap-1 text-slate-500">
                        <Phone size={16} />
                        <p className="text-sm">{props.phoneNumber}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

function AppointmentCardCalendar(props: AppointmentType) {
    return (
        <div className={`w-full flex flex-row cursor-pointer items-center justify-center px-2 py-1 gap-1.5 rounded-sm text-white ${props.status === "pending" ? "bg-yellow-500" : (props.status === "completed" ? "bg-green-500" : "bg-rose-500")}`}>
            <CircleUserRound size={18} className="shrink" />

            <p className="font-medium text-sm truncate">{props.patientName} {props.fatherSurname}</p>
        </div>
    );
};

export { AppointmentCard, AppointmentCardCalendar };