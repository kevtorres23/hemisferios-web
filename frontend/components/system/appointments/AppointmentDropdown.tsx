import { useContext } from "react";
import { CardActionContext } from "@/app/system/appointments/page";
import {
    Ellipsis,
    CircleX,
    SquarePen,
    Trash,
    CheckCircle,
    CircleDotDashed
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DropdownProps = {
    appointmentStatus: string,
    appointmentId: number,
}

function AppointmentDropdown(props: DropdownProps) {
    const setAction = useContext(CardActionContext);
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="bg-transparent px-2!" variant="ghost">
                    <Ellipsis size={18} color="black" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-auto" align="start">

                <DropdownMenuGroup className="">

                    {props.appointmentStatus === "pending" && (
                        <>
                            <DropdownMenuItem onClick={() => setAction("complete", props.appointmentId)} className="flex flex-row gap-1.5 items-center">
                                <CheckCircle size={16} className="text-slate-800" />
                                <p className="text-slate-800">Marcar como completa</p>
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => setAction("cancel", props.appointmentId)} className="flex flex-row gap-1.5 items-center">
                                <CircleX size={16} className="text-slate-800" />
                                <p className="text-slate-800">Cancelar cita</p>
                            </DropdownMenuItem>
                        </>
                    )}

                    {props.appointmentStatus === "finished" && (
                        <>
                            <DropdownMenuItem onClick={() => setAction("pending", props.appointmentId)} className="flex flex-row gap-1.5 items-center">
                                <CircleDotDashed size={16} className="text-slate-800" />
                                <p className="text-slate-800">Marcar como pendiente</p>
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => setAction("cancel", props.appointmentId)} className="flex flex-row gap-1.5 items-center">
                                <CircleX size={16} className="text-slate-800" />
                                <p className="text-slate-800">Cancelar cita</p>
                            </DropdownMenuItem>
                        </>
                    )}

                    {props.appointmentStatus === "cancelled" && (
                        <>
                            <DropdownMenuItem onClick={() => setAction("complete", props.appointmentId)} className="flex flex-row gap-1.5 items-center">
                                <CheckCircle size={16} className="text-slate-800" />
                                <p className="text-slate-800">Marcar como completa</p>
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => setAction("pending", props.appointmentId)} className="flex flex-row gap-1.5 items-center">
                                <CircleDotDashed size={16} className="text-slate-800" />
                                <p className="text-slate-800">Marcar como pendiente</p>
                            </DropdownMenuItem>
                        </>
                    )}

                    <DropdownMenuItem onClick={() => setAction("modify", props.appointmentId)} className="flex flex-row gap-1.5 items-center">
                        <SquarePen size={16} className="text-slate-800" />
                        <p className="text-slate-800">Modificar datos</p>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setAction("remove", props.appointmentId)} className="flex flex-row gap-1.5 items-center">
                        <Trash size={16} className="text-slate-800" />
                        <p className="text-slate-800">Eliminar cita</p>
                    </DropdownMenuItem>

                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default AppointmentDropdown;