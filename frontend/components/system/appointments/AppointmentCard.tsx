import { AppointmentType } from "@/utils/types";
import { dateFormatter, hourFormatter } from "@/utils/system/appointment-formatter";
import { useContext, useEffect } from "react";
import { CardActionContext } from "@/app/system/appointments/page";
import AppointmentTag from "./AppointmentTag";
import {
    CalendarFold,
    ClockIcon,
    Phone,
    CircleUserRound,
    Trash,
    MessageCircleMore
} from "lucide-react";
import AppointmentDropdown from "./AppointmentDropdown";
import { HistoryActionContext } from "@/app/system/history/page";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import OptionCheckbox from "../OptionCheckbox";

type CardProps = {
    _id: string;
    status: string;
    patientName: string;
    fatherSurname: string;
    motherSurname: string;
    phoneNumber: string;
    date: string;
    hour: string;
    timestamp?: string;
    cancellationComment?: string;
    page: "history" | "appointments";
}

function AppointmentCard(props: CardProps) {
    const setHistoryAction = useContext(HistoryActionContext);

    return (
        <div className="relative flex flex-col gap-1.5 overflow-y-visible rounded-md border border-slate-200 p-6 items-start justify-center overflow-x-hidden">
            <div className={`absolute w-1 h-full ${props.status === "pending" ? "bg-yellow-500" : (props.status === "finished" ? "bg-green-500" : "bg-rose-500")} left-0`}></div>

            <div className="relative w-full flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 w-auto items-center justify-center">
                    <AppointmentTag type={props.status === "pending" ? "pending" : (props.status === "finished" ? "finished" : "cancelled")} />

                    {props.status === "cancelled" && props.cancellationComment != "placeholder" && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="px-0! py-0!" variant="ghost">
                                    <div className={`gap-1 flex flex-row cursor-pointer items-center justify-center text-slate-500 px-2.5 py-1 bg-slate-100 border border-slate-300 rounded-full`}>
                                        <MessageCircleMore size={14} className="shrink" />
                                        <p className="font-medium text-xs">Comentarios</p>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="p-4 flex flex-col gap-2 max-w-70">
                                <p className="text-sm font-medium text-slate-800">Motivos de cancelación:</p>
                                <div className="comment-content p-2.5 bg-slate-100 border border-slate-200 rounded-sm">
                                    <p className="text-sm">{props.cancellationComment}</p>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>

                {props.page === "appointments" && (
                    <AppointmentDropdown appointmentStatus={props.status} appointmentId={props._id} />
                )}

                {props.page === "history" && (
                    <Trash onClick={() => setHistoryAction("remove")} size={16} className="text-slate-600 cursor-pointer" />
                )}
            </div>

            <p className="text-base font-medium text-slate-900">{props.patientName} {props.fatherSurname} {props.motherSurname}</p>

            <div className="details flex flex-col gap-3 items-start mt-2">
                <div className="date flex flex-row gap-1 items-center justify-center text-slate-500">
                    <CalendarFold size={16} />
                    <p className="text-sm">{dateFormatter(props.date)}</p>
                </div>

                <div className="hour-phone flex flex-row items-center justify-center gap-5">
                    <div className="date flex flex-row gap-1 items-center justify-center text-slate-500">
                        <ClockIcon size={16} />
                        <p className="text-sm">{hourFormatter(props.hour)}</p>
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

function AppointmentCardCalendar(props: CardProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="px-0! py-0!" variant="ghost">
                    <div className={`w-full flex flex-row cursor-pointer items-center justify-center px-2 py-1 gap-1.5 rounded-sm text-white ${props.status === "pending" ? "bg-yellow-500" : (props.status === "finished" ? "bg-green-500" : "bg-rose-500")}`}>
                        <CircleUserRound size={18} className="shrink" />

                        <p className="font-medium text-sm truncate">{props.patientName} {props.fatherSurname}</p>
                    </div>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-0!">
                <DropdownMenuGroup className="w-auto">
                    <AppointmentCard
                        patientName={props.patientName}
                        fatherSurname={props.fatherSurname}
                        motherSurname={props.motherSurname}
                        phoneNumber={props.phoneNumber}
                        date={props.date}
                        hour={props.hour}
                        status={props.status}
                        page={props.page}
                        cancellationComment={props.cancellationComment}
                        _id={props._id}

                    />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { AppointmentCard, AppointmentCardCalendar };