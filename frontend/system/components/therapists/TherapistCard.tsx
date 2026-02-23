import { useState, useContext } from "react";
import { CardActionContext } from "@/app/system/therapists/page";
import { Button } from "@/components/ui/button";
import { Ellipsis, SquarePen, Trash, Calendar, Phone, Heart, History } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TherapistSchedule = {
    patient: string;
    hour: string;
    day: string;
};

type TherapistProps = {
    name: string;
    lastName: string;
    startingDate: string;
    contactNumber: string;
    schedule: TherapistSchedule[];
};

function TherapistCard(props: TherapistProps) {
    const setAction = useContext(CardActionContext);
    const [patientNum, setPatientNum] = useState(0);

    return (
        <div className="relative flex flex-col gap-2.5 overflow-y-visible rounded-md border border-slate-200 p-6 items-start justify-center overflow-x-hidden">

            <div className="relative w-full flex flex-row justify-between items-center">
                <div className="user-badge p-1.5 rounded-md bg-[rgb(14,165,233,0.15)]">
                    <Heart size={24} className="text-sky-500" />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="bg-transparent px-2!" variant="ghost">
                            <Ellipsis size={18} color="black" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-auto" align="start">

                        <DropdownMenuGroup className="">
                            <DropdownMenuItem onClick={() => setAction("schedule")} className="flex flex-row gap-1.5 items-center">
                                <History size={16} className="text-slate-800" />
                                <p className="text-slate-800">Ver horario de la semana</p>
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => setAction("modify")} className="flex flex-row gap-1.5 items-center">
                                <SquarePen size={16} className="text-slate-800" />
                                <p className="text-slate-800">Modificar datos</p>
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => setAction("remove")} className="flex flex-row gap-1.5 items-center">
                                <Trash size={16} className="text-slate-800" />
                                <p className="text-slate-800">Eliminar terapeuta</p>
                            </DropdownMenuItem>

                        </DropdownMenuGroup>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <p className="text-base font-medium text-slate-900">{props.name} {props.lastName}</p>

            <div className="date flex flex-row gap-1 items-center justify-center">
                <Calendar size={16} className="text-slate-400" />
                <p className="text-sm text-slate-900">
                    <span className="text-slate-400 font-medium">Inicio:</span> {props.startingDate}
                </p>
            </div>

            <div className="date flex flex-row gap-1 items-center justify-center">
                <Phone size={16} className="text-slate-400" />
                <p className="text-sm text-slate-900">
                    <span className="text-slate-400 font-medium">Teléfono:</span> {props.contactNumber}
                </p>
            </div>

            <p className="text-sm font-medium text-indigo-500">{patientNum} pacientes esta semana</p>
        </div>
    );
};

export default TherapistCard;