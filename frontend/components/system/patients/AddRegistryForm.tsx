import React, { useState, useId } from "react";
import Input from "@/components/website/Input";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import InputWarning from "@/components/website/InputWarning";
import { DayPicker } from "../DayPicker";
import { Label } from '@/components/ui/label';
import { Clock4 } from "lucide-react";
import { hourFormatter } from "@/utils/hour-methods";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { PatientType } from "@/utils/types";
import api from "@/lib/axios";

type FormProps = {
    patientData: PatientType | undefined;
    onSave: () => void;
}

function AddRegistry(props: FormProps) {
    const [formattedDate, setFormattedDate] = useState("");
    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState("");
    const [formattedDateValidation, setFormattedDateValidation] = useState(false);
    const [hourValidation, setHourValidation] = useState(false);
    const id = useId();

    const hours = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]

    function onDateChange(date: Date) {
        setDate(date);
        setFormattedDate(format(date, "PPP", {locale: es}));
    };

    function onHourChange(hour: string) {
        setHour(hour);
    };

    async function onAddRegistry(e: React.SubmitEvent) {
        e.preventDefault();

        if (!props.patientData) {
            return;
        };

        try {
            let registry = props.patientData.visitRegistry;
            registry.push({ date: format(date, "yyyy-MM-dd"), hour: hour });

            const updatedPatient = {
                name: props.patientData.name,
                fatherSurname: props.patientData.fatherSurname,
                motherSurname: props.patientData.motherSurname,
                adultName: props.patientData.adultName,
                contactNumber: props.patientData.contactNumber,
                startingDate: props.patientData.startingDate,
                paymentFrequency: props.patientData.paymentFrequency,
                paymentModality: props.patientData.paymentModality,
                paymentAmount: props.patientData.paymentAmount,
                visitRegistry: registry,
            };

            await api.put("/patients/" + props.patientData._id, updatedPatient);
        } catch (error) {
            console.log("Something ocurred while updating the patient:", error);
        } finally {
            props.onSave();
        };
    };

    return (
        <form action="" id="addRegistry" className="flex flex-col gap-4 w-full" onSubmit={(e: React.SubmitEvent) => onAddRegistry(e)}>
            <div className="label gap-3 flex flex-col w-full">

                <label className="label gap-2 flex flex-col w-full">
                    <div className="flex flex-row gap-2">
                        <p className="text-slate-500 sm:text-sm text-base m-0 p-0">
                            Fecha de la cita <span className="text-red-500 text-lg font-semibold">*</span>
                        </p>
                    </div>
                </label>

                <div className="flex flex-row gap-2">
                    <input className="w-full py-2 px-3 border rounded-md sm:text-sm text-base font-normal slate-800" type="text" placeholder="Escoge una fecha en el calendario" value={formattedDate} onChange={() => onDateChange} />
                    {formattedDateValidation && (
                        <InputWarning message="Por favor, selecciona una fecha." />
                    )}

                    <DayPicker nameVisible={false} onSelectDate={(date: Date) => onDateChange(date)} />
                </div>
            </div>

            <div className='w-full flex flex-col gap-2'>
                <Label className="text-slate-500 font-normal sm:text-sm text-base" htmlFor={id}>Hora de la cita <span className="text-red-500 text-lg font-semibold">*</span></Label>
                <Select value={hour} onValueChange={(val) => onHourChange(val)}>
                    <SelectTrigger id={id} className={`w-full bg-white sm:text-sm text-base cursor-pointer py-5 px-3 ${hourValidation ? "border border-red-500" : ""}`}>
                        <SelectValue className="" placeholder={
                            <div className="flex flex-row gap-2 items-center">
                                <Clock4 size={16} />
                                <p className="sm:text-sm text-base">Selecciona una hora</p>
                            </div>
                        } />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-sm z-999" sideOffset={5} position="popper">
                        <SelectGroup className="h-80 overflow-y-scroll">
                            <SelectLabel className="text-sm">Hora de la cita</SelectLabel>
                            {/* Map the available hours from the database*/}
                            {hours.map((hour, id) =>
                                <SelectItem className="text-sm" key={id} value={hour}>{hourFormatter(hour)}</SelectItem>
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </form>
    )
};

export default AddRegistry;