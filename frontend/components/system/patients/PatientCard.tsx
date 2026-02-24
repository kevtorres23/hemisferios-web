import { useContext } from "react";
import { PatientHistory } from "@/utils/types";
import { CardActionContext } from "@/app/system/patients/page";
import PaymentTag from "./PaymentTag";
import { Button } from "@/components/ui/button";
import { Ellipsis, SquarePen, Trash, UserRound, Phone, CircleUserRound, History } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type PatientProps = {
    name: string;
    fatherSurname: string;
    motherSurname: string;
    adultName: string;
    contactNumber: string;
    startingDate: string;
    paymentFrequency: string;
    paymentModality: string;
    appointmentHistory: PatientHistory[];
};

function PatientCard(props: PatientProps) {
    const setAction = useContext(CardActionContext);

    return (
        <div className="relative flex flex-col gap-2.5 overflow-y-visible rounded-md border border-slate-200 p-6 items-start justify-center overflow-x-hidden">

            <div className="relative w-full flex flex-row justify-between items-center">
                <div className="user-badge p-1.5 rounded-md bg-[rgb(20,184,166,0.15)]">
                    <CircleUserRound size={24} className="text-teal-500" />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="bg-transparent px-2!" variant="ghost">
                            <Ellipsis size={18} color="black" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-auto" align="start">

                        <DropdownMenuGroup className="">
                            <DropdownMenuItem onClick={() => setAction("history")} className="flex flex-row gap-1.5 items-center">
                                <History size={16} className="text-slate-800" />
                                <p className="text-slate-800">Ver historial de citas</p>
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => setAction("modify")} className="flex flex-row gap-1.5 items-center">
                                <SquarePen size={16} className="text-slate-800" />
                                <p className="text-slate-800">Modificar datos</p>
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => setAction("remove")} className="flex flex-row gap-1.5 items-center">
                                <Trash size={16} className="text-slate-800" />
                                <p className="text-slate-800">Eliminar paciente</p>
                            </DropdownMenuItem>

                        </DropdownMenuGroup>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <p className="text-base font-medium text-slate-900">{props.name} {props.fatherSurname} {props.motherSurname}</p>

            <PaymentTag modality={props.paymentModality} frequency={props.paymentFrequency} />

            <div className="date flex flex-row gap-1 items-center justify-center">
                <UserRound size={16} className="text-slate-400" />
                <p className="text-sm text-slate-900">
                    <span className="text-slate-400 font-medium">Responsable:</span> {props.adultName}
                </p>
            </div>

            <div className="date flex flex-row gap-1 items-center justify-center">
                <Phone size={16} className="text-slate-400" />
                <p className="text-sm text-slate-900">
                    <span className="text-slate-400 font-medium">Contacto:</span> {props.contactNumber}
                </p>
            </div>

            <div className="flex flex-row gap-2">
                <p className="text-sm font-medium text-indigo-500">Próximo pago: </p>
                <p className="text-sm font-normal text-slate-900">10 de abril</p>
            </div>
        </div>
    );
};

export default PatientCard;