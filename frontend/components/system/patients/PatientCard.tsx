import { useContext, useState } from "react";
import { PatientRegistry } from "@/utils/types";
import { CardActionContext } from "@/app/system/patients/page";
import { ModalityTag } from "./PaymentTag";
import { Button } from "@/components/ui/button";
import { establishPaymentDate } from "@/utils/system/patients/next-payments";
import { Ellipsis, SquarePen, Trash, UserRound, Phone, CircleUserRound, HandCoins, CalendarClock, HouseHeart, CircleDollarSign, History } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { stringToDate } from "@/utils/date-methods";
import { es } from "date-fns/locale";
import { format } from "date-fns";

type PatientProps = {
    _id: string;
    name: string;
    fatherSurname: string;
    motherSurname: string;
    adultName: string;
    contactNumber: string;
    startingDate: string;
    paymentFrequency: string;
    paymentModality: string;
    paymentAmount: number;
    appointmentHistory: PatientRegistry[];
};

function PatientCard(props: PatientProps) {
    const setAction = useContext(CardActionContext);

    const dateConversion = stringToDate(props.startingDate);
    const startingDate = new Date(dateConversion.getFullYear(), dateConversion.getMonth(), dateConversion.getDate());
    const formattedDate = format(startingDate, "PP", { locale: es });

    let paymentDate;
    let formattedPayment;

    if (props.paymentFrequency != "session") {
        paymentDate = establishPaymentDate(props.paymentFrequency, props.startingDate);
        const paymentDateConversion = stringToDate(paymentDate ? paymentDate : "");
        const newPaymentDate = new Date(paymentDateConversion.getFullYear(), paymentDateConversion.getMonth() - 1, paymentDateConversion.getDate());
        formattedPayment = format(newPaymentDate, "PP", { locale: es });
    };

    return (
        <div className="relative flex flex-col gap-2 overflow-y-visible rounded-md border border-slate-200 p-6 items-start justify-center overflow-x-hidden">

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
                            <DropdownMenuItem onClick={() => setAction("modify", props._id)} className="flex flex-row gap-1.5 items-center">
                                <SquarePen size={16} className="text-slate-800" />
                                <p className="text-slate-800">Modificar datos</p>
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => setAction("remove", props._id)} className="flex flex-row gap-1.5 items-center">
                                <Trash size={16} className="text-slate-800" />
                                <p className="text-slate-800">Eliminar paciente</p>
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => setAction("registry", props._id)} className="flex flex-row gap-1.5 items-center">
                                <History size={16} className="text-slate-800" />
                                <p className="text-slate-800">Registro de asistencias</p>
                            </DropdownMenuItem>

                        </DropdownMenuGroup>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <p className="text-base font-medium text-slate-900">{props.name} {props.fatherSurname} {props.motherSurname}</p>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="px-0! py-0! cursor-pointer" variant={null}>
                        <ModalityTag modality={props.paymentModality} />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="p-4 flex flex-col gap-3 items-start w-auto">
                    <p className="text-base font-medium text-slate-900">Datos del pago</p>

                    <div className="date flex flex-row gap-1 items-center justify-center">
                        <CalendarClock size={18} className="text-slate-400" />
                        <p className="text-sm text-slate-950">
                            <span className="text-slate-400 font-normal">Frecuencia de pago: </span>
                            {props.paymentFrequency === "weekly" ? "Semanal" : (props.paymentFrequency === "monthly" ? "Mensual" : (props.paymentFrequency === "weekly" ? "Semanal" : "Por sesión"))}
                        </p>
                    </div>

                    <div className="date flex flex-row gap-1 items-center justify-center">
                        <CircleDollarSign size={18} className="text-slate-400" />
                        <p className="text-sm text-slate-950">
                            <span className="text-slate-400 font-normal">Cantidad: </span>
                            ${props.paymentAmount}
                        </p>
                    </div>

                    <div className="date flex flex-row gap-1 items-center justify-center">
                        <HouseHeart size={18} className="text-slate-400" />
                        <p className="text-sm text-slate-950">
                            <span className="text-slate-400 font-normal">Fecha de inicio:</span> {formattedDate}
                        </p>
                    </div>

                    <div className="date flex flex-row gap-1 items-center justify-center">
                        <HandCoins size={18} className="text-slate-400" />
                        <p className="text-sm text-slate-950">
                            <span className="text-slate-400 font-normal">Próximo pago:</span> {props.paymentFrequency != "session" ? formattedPayment : "Próxima visita"}
                        </p>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex flex-col gap-3 w-full items-start">
                <div className="date flex flex-row gap-1 items-center justify-center">
                    <UserRound size={16} className="text-slate-400" />
                    <p className="text-sm text-slate-950">
                        <span className="text-slate-400 font-normal">Responsable:</span> {props.adultName}
                    </p>
                </div>

                <div className="date flex flex-row gap-1 items-center justify-center">
                    <Phone size={16} className="text-slate-400" />
                    <p className="text-sm text-slate-900">
                        <span className="text-slate-400 font-normal">Contacto:</span> {props.contactNumber}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PatientCard;