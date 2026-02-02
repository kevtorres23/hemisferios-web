"use client";

import { useRef, useState } from "react";
import { isVisible } from "../modules/VisibilityDetector";
import Input from "./Input";
import { CircleCheck, CircleAlert } from "lucide-react";
import { Appointment } from "@/modules/Classes";

type AppointmentType = {
    patientName: string;
    motherSurname: string;
    fatherSurname: string;
    phoneNumber: string;
    date: string;
    hour: string;
}

function AppointmentForm({ sendAppointmentObject }: { sendAppointmentObject: (appointmentObject: AppointmentType) => void; }) {
    // Variables of the form inputs.
    const [patientName, setPatientName] = useState("");
    const [motherSurname, setMotherSurname] = useState("");
    const [fatherSurname, setFatherSurname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");

    // Input validations.
    const [nameValidation, setNameValidation] = useState(false);
    const [motherSurnameValid, setMotherSurnameValid] = useState(false);
    const [fatherSurnameValid, setFatherSurnameValid] = useState(false);
    const [numberValidation, setNumberValidation] = useState(false);
    const [dateValidation, setDateValidation] = useState(false);
    const [hourValidation, setHourValidation] = useState(false);

    const ref1 = useRef(null);
    const isFormVisible = isVisible(ref1);

    function handleDateChange(e: string) {
        setDate(e);
    }

    function shootValidations(e: React.FormEvent) {
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
    }

    function shootData() {
        const appointmentObject = new Appointment(patientName, motherSurname, fatherSurname, phoneNumber, date, hour);
        sendAppointmentObject(appointmentObject);
    }

    return (
        <div ref={ref1} className={`${isFormVisible ? 'opacity-100' : 'opacity-0'} lg:max-w-xl w-full flex flex-col items-start lg:p-7 sm:p-5 p-4 border border-slate-200 bg-slate-50 rounded-xl gap-4 transition-opacity duration-700 ease-in`}>
            <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Formulario de Citas</h1>

            <form id="appointmentForm" onSubmit={(e) => shootValidations(e)} className="flex flex-col gap-4 w-full">

                <div className="name-field flex flex-col gap-2 w-full">
                    <Input type="text" textValue={patientName} label="Nombre(s) del paciente" onInputChange={(e) => setPatientName(e.target.value)} />
                    {nameValidation && (
                        <div className="flex flex-row gap-1 items-center">
                            <CircleAlert size={14} className="text-red-500" />
                            <p className="text-xs font-medium text-red-500">Por favor, escribe el nombre o los nombres del paciente.</p>
                        </div>
                    )}
                </div>

                <div className="father-surname-field flex flex-col gap-2 w-full">
                    <Input type="text" textValue={fatherSurname} label="Apellido paterno del paciente:" onInputChange={(e) => setFatherSurname(e.target.value)} />
                    {fatherSurnameValid && (
                        <div className="flex flex-row gap-1 items-center">
                            <CircleAlert size={14} className="text-red-500" />
                            <p className="text-xs font-medium text-red-500">Por favor, escribe el apellido paterno del paciente.</p>
                        </div>
                    )}
                </div>

                <div className="mother-surname-field flex flex-col gap-2 w-full">
                    <Input type="text" textValue={motherSurname} label="Apellido materno del paciente:" onInputChange={(e) => setMotherSurname(e.target.value)} />
                    {motherSurnameValid && (
                        <div className="flex flex-row gap-1 items-center">
                            <CircleAlert size={14} className="text-red-500" />
                            <p className="text-xs font-medium text-red-500">Por favor, escribe el apellido materno del paciente.</p>
                        </div>
                    )}
                </div>

                <div className="phone-field flex flex-col gap-2 w-full">
                    <Input type="text" textValue={phoneNumber} label="Número de teléfono del adulto responsable:" onInputChange={(e) => setPhoneNumber(e.target.value)} />
                    {numberValidation && (
                        <div className="flex flex-row gap-1 items-center">
                            <CircleAlert size={14} className="text-red-500" />
                            <p className="text-xs font-medium text-red-500">Por favor, escribe un número de teléfono válido.</p>
                        </div>
                    )}
                </div>

                <div className="input-row flex md:flex-row flex-col gap-4 w-full items-center justify-center">
                    <div className="date-field flex flex-col gap-2 w-full">
                        <Input type="date" textValue={date} label="Fecha de la cita:" onInputChange={(val) => setDate(val)} />
                        {dateValidation && (
                            <div className="flex flex-row gap-1 items-center">
                                <CircleAlert size={14} className="text-red-500" />
                                <p className="text-xs font-medium text-red-500">Por favor, selecciona una fecha.</p>
                            </div>
                        )}
                    </div>

                    <div className="hour-field flex flex-col gap-2 w-full">
                        <Input type="hour" textValue={hour} label="Hora de la cita:" onInputChange={(val) => setHour(val)} />
                        {hourValidation && (
                            <div className="flex flex-row gap-1 items-center">
                                <CircleAlert size={14} className="text-red-500" />
                                <p className="text-xs font-medium text-red-500">Por favor, selecciona una hora.</p>
                            </div>
                        )}
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