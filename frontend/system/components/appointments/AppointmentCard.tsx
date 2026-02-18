import { AppointmentType } from "@/system/modules/Types";
import AppointmentTag from "./AppointmentTag";
import { CalendarFold, ClockIcon, Phone, Ellipsis } from "lucide-react";

function AppointmentCard(props: AppointmentType) {
    return (
        <div className="relative flex flex-col gap-3 rounded-md border border-slate-200 p-5 items-start justify-center overflow-y-hidden overflow-x-hidden">

            <div className="absolute w-1 h-full bg-yellow-500 left-0"></div>

            <div className="w-full flex flex-row justify-between items-center">
                <AppointmentTag type="pending" />

                <button className="cursor-pointer">
                    <Ellipsis size={24} className="text-slate-400" />
                </button>
            </div>

            <p className="text-base font-medium text-slate-900">{props.patientName} {props.fatherSurname} {props.motherSurname}</p>

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
    );
};

export default AppointmentCard;