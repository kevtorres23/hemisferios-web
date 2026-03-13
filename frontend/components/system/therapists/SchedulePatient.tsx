import { CircleUserRound, SquarePen, Trash } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { ScheduleActionContext } from "@/app/system/therapists/page";

type CardProps = {
    patientName: string;
    patientLastName: string;
    scheduleMode: string;
    hour: string;
    day: string;
    therapistId: string;
    patientId: string;
}

function SchedulePatient(props: CardProps) {
    const setAction = useContext(ScheduleActionContext);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="px-0! py-0! w-full" variant="ghost">
                    <div className={`w-full flex flex-row ${props.scheduleMode === "view" ? "" : "cursor-pointer"} items-center justify-center px-2 py-1 gap-1.5 bg-white border-2 border-indigo-500 rounded-sm`}>
                        <CircleUserRound size={18} className="shrink" />
                        <p className="font-medium text-sm truncate text-slate-900">{props.patientName} {props.patientLastName}</p>
                    </div>
                </Button>
            </DropdownMenuTrigger>

            {props.scheduleMode === "edit" && (
                <DropdownMenuContent className="p-1.5">
                    <DropdownMenuGroup className="w-auto">
                        <DropdownMenuItem onClick={() => setAction("edit-schedule-item", props.therapistId, props.hour, props.day, props.patientId, props.patientName, props.patientLastName)} className="flex flex-row gap-1.5 items-center">
                            <SquarePen size={16} className="text-slate-800" />
                            <p className="text-slate-800">Modificar nombre</p>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setAction("remove-schedule-item", props.therapistId, props.hour, props.day, props.patientId, props.patientName, props.patientLastName)} className="flex flex-row gap-1.5 items-center">
                            <Trash size={16} className="text-slate-800" />
                            <p className="text-slate-800">Eliminar del horario</p>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    )
};

export default SchedulePatient;