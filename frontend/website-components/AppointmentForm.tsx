"use client";

import { useRef, useState } from "react";
import { isVisible } from "../website-modules/VisibilityDetector";
import Input from "./Input";
import SelectInput from "./SelectInput";
import { CircleCheck } from "lucide-react";
import { Appointment } from "@/website-modules/Classes";
import InputWarning from "./InputWarning";
import { AppointmentInputChange, AppointmentSelectChange } from "@/website-modules/InputChangeHandlers";
import { useAppointmentStore } from "@/website-modules/StoreAppointment";
import { redirect } from 'next/navigation';

type AppointmentType = {
    patientName: string;
    motherSurname: string;
    fatherSurname: string;
    phoneNumber: string;
    date: string;
    hour: string;
}

function AppointmentForm() {
    // Variables of the form inputs.
    const [patientName, setPatientName] = useState("");
    const [motherSurname, setMotherSurname] = useState("");
    const [fatherSurname, setFatherSurname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");

    // Input validations.
    const [validationsShot, setValidationsShot] = useState(false);
    const [nameValidation, setNameValidation] = useState(false);
    const [motherSurnameValid, setMotherSurnameValid] = useState(false);
    const [fatherSurnameValid, setFatherSurnameValid] = useState(false);
    const [numberValidation, setNumberValidation] = useState(false);
    const [dateValidation, setDateValidation] = useState(false);
    const [hourValidation, setHourValidation] = useState(false);

    const dateItems = ["Lunes 14", "Martes 15", "Miércoles 16", "Jueves 17", "Viernes 18", "Sábado 19", "Domingo 20", "Lunes 14", "Martes 15", "Miércoles 16", "Jueves 17", "Viernes 18", "Sábado 19", "Domingo 20"];

    // Name validation.
    function shootValidations(e: React.FormEvent) {
        setValidationsShot(true);
        e.preventDefault();

        // Validate the inputs are not empty.
        if (!patientName) { setNameValidation(true); };
        if (!motherSurname) { setMotherSurnameValid(true); };
        if (!fatherSurname) { setFatherSurnameValid(true); };
        if (!phoneNumber) { setNumberValidation(true); };
        if (!date) { setDateValidation(true); };
        if (!hour) { setHourValidation(true); };

        if (phoneNumber.length < 10) {
            setNumberValidation(true);
        } else {
            shootData();
        }

        setValidationsShot(false);
    }

    const saveAppointment = useAppointmentStore((state: any) => state.saveAppointment);

    function shootData() {
        const appointmentObject = new Appointment(patientName, motherSurname, fatherSurname, phoneNumber, date, hour);
        saveAppointment(appointmentObject);
        
        redirect('/finished-appointment');
    }

    const ref1 = useRef(null);
    const isFormVisible = isVisible(ref1);

    return (
        <div ref={ref1} className={`${isFormVisible ? 'opacity-100' : 'opacity-0'} lg:max-w-xl w-full flex flex-col items-start lg:p-7 sm:p-5 p-4 border border-slate-200 bg-slate-50 rounded-xl gap-4 transition-opacity duration-700 ease-in`}>
            <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Formulario de Citas</h1>

            <form id="appointmentForm" onSubmit={(e) => shootValidations(e)} className="flex flex-col gap-4 w-full">

                <div className="name-field flex flex-col gap-2 w-full">
                    <Input type="text" textValue={patientName} label="Nombre(s) del paciente" onInputChange={(e) => AppointmentInputChange(e, patientName, setPatientName, validationsShot, setNameValidation)} activeValidation={nameValidation} />
                    {nameValidation && (
                        <InputWarning message="Por favor, escribe el nombre o los nombres del paciente." />
                    )}
                </div>

                <div className="father-surname-field flex flex-col gap-2 w-full">
                    <Input type="text" textValue={fatherSurname} label="Apellido paterno del paciente:" onInputChange={(e) => AppointmentInputChange(e, fatherSurname, setFatherSurname, validationsShot, setFatherSurnameValid)} activeValidation={fatherSurnameValid} />
                    {fatherSurnameValid && <InputWarning message="Por favor, escribe el apellido paterno." />}
                </div>

                <div className="mother-surname-field flex flex-col gap-2 w-full">
                    <Input type="text" textValue={motherSurname} label="Apellido materno del paciente:" onInputChange={(e) => AppointmentInputChange(e, motherSurname, setMotherSurname, validationsShot, setMotherSurnameValid)} activeValidation={motherSurnameValid} />
                    {motherSurnameValid && <InputWarning message="Por favor, escribe el apellido materno." />}
                </div>

                <div className="phone-field flex flex-col gap-2 w-full">
                    <Input type="text" textValue={phoneNumber} label="Número de teléfono del adulto responsable:" onInputChange={(e) => AppointmentInputChange(e, phoneNumber, setPhoneNumber, validationsShot, setNumberValidation)} activeValidation={numberValidation} />
                    {numberValidation && <InputWarning message="Por favor, escribe un número de teléfono válido." />}
                </div>

                <div className="input-row flex md:flex-row flex-col gap-4 w-full items-center justify-center">
                    <div className="date-field flex flex-col gap-2 w-full">
                        <SelectInput label="Fecha de la cita:" value={date} onInputChange={(val) => AppointmentSelectChange(val, date, setDate, validationsShot, setDateValidation)} activeValidation={dateValidation} items={dateItems} />
                        {dateValidation && <InputWarning message="Por favor, selecciona una fecha." />}
                    </div>

                    <div className="date-field flex flex-col gap-2 w-full">
                        <SelectInput label="Hora de la cita:" value={hour} onInputChange={(val) => AppointmentSelectChange(val, hour, setHour, validationsShot, setHourValidation)} activeValidation={hourValidation} items={dateItems} />
                        {hourValidation && <InputWarning message="Por favor, selecciona una fecha." />}
                    </div>
                </div>

            </form>

            <button form="appointmentForm" type="submit" className="bg-indigo-500 text-white tracking-tight text-base px-4 py-2 flex flex-row items-center justify-center gap-2 rounded-lg cursor-pointer font-normal hover:bg-indigo-400 sm:w-auto w-full">
                Agendar cita
                <CircleCheck size={18} />
            </button>
        </div>
    )
}

export default AppointmentForm;