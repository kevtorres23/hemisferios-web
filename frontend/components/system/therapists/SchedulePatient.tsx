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
import { CardActionContext } from "@/app/system/therapists/page";

type CardProps = {
    patientName: string;
    patientLastName: string;
    scheduleMode: string;
    id: string;
}

function SchedulePatient(props: CardProps) {
    const setAction = useContext(CardActionContext);
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
                        <DropdownMenuItem onClick={() => setAction("editScheduleItem", props.id)} className="flex flex-row gap-1.5 items-center">
                            <SquarePen size={16} className="text-slate-800" />
                            <p className="text-slate-800">Modificar paciente</p>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setAction("removeScheduleItem", props.id)} className="flex flex-row gap-1.5 items-center">
                            <Trash size={16} className="text-slate-800" />
                            <p className="text-slate-800">Eliminar paciente</p>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    )
};

export default SchedulePatient;