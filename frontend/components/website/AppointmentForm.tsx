"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Input from "./Input";
import SelectDateInput from "./SelectDateInput";
import SelectHourInput from "./SelectHourInput";
import { Appointment } from "@/utils/classes";
import InputWarning from "./InputWarning";
import { InputChange, SelectChange } from "@/utils/website/input-change-handlers";
import { dateFormatter } from "@/utils/system/appointments/appointment-formatter";

type FormProps = {
    sendData: (receiptObject: Appointment, databaseOject: Appointment) => void;
    modifyData: (databaseObject: Appointment) => void;
    isOnModify?: boolean;
    editionId: Appointment | any;
    formId: string;
};

function AppointmentForm(props: FormProps) {
    // Variables for the form inputs.
    const [foundAppointment, setFoundAppointment] = useState<any>([]);
    const [status, setStatus] = useState("");
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

    useEffect(() => {
        const getEditableAppointment = async () => {
            try {
                const res = await api.get("/appointments/" + props.editionId);
                setStatus(res.data.status);
                setPatientName(res.data.patientName);
                setFatherSurname(res.data.fatherSurname);
                setMotherSurname(res.data.motherSurname);
                setPhoneNumber(res.data.phoneNumber);
                setDate(res.data.date);
                setHour(res.data.hour);
            } catch (error) {
                console.log("Error detected", error);
            };
        };

        if (props.isOnModify) {
            getEditableAppointment();
        };

    }, []);

    // Name validation.
    function shootValidations(e: React.SubmitEvent) {
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
    };

    function shootData() {
        const time = new Date();
        const appointmentStatus = props.isOnModify ? status : "pending"; // "Pending" is the default status that appointments have when they are created.
        const formattedDate = dateFormatter(date);

        const receiptAppointmentObj = new Appointment(appointmentStatus, patientName, fatherSurname, motherSurname, phoneNumber, formattedDate, hour, time);
        const databaseAppointmentObj = new Appointment(appointmentStatus, patientName, fatherSurname, motherSurname, phoneNumber, date, hour, time);

        if (props.formId === "modifyForm") {
            props.modifyData(databaseAppointmentObj);
        } else {
            props.sendData(receiptAppointmentObj, databaseAppointmentObj);
        };
    };

    return (
        <form id={props.formId} onSubmit={(e) => shootValidations(e)} className="flex flex-col gap-4 w-full">

            <div className="name-field flex flex-col gap-2 w-full">
                <Input type="text" textValue={patientName} label="Nombre(s) del paciente" onInputChange={(e) => InputChange(e, patientName, setPatientName, validationsShot, setNameValidation)} activeValidation={nameValidation} />
                {nameValidation && (
                    <InputWarning message="Por favor, escribe el nombre o los nombres del paciente." />
                )}
            </div>

            <div className="father-surname-field flex flex-col gap-2 w-full">
                <Input type="text" textValue={fatherSurname} label="Apellido paterno del paciente:" onInputChange={(e) => InputChange(e, fatherSurname, setFatherSurname, validationsShot, setFatherSurnameValid)} activeValidation={fatherSurnameValid} />
                {fatherSurnameValid && <InputWarning message="Por favor, escribe el apellido paterno." />}
            </div>

            <div className="mother-surname-field flex flex-col gap-2 w-full">
                <Input type="text" textValue={motherSurname} label="Apellido materno del paciente:" onInputChange={(e) => InputChange(e, motherSurname, setMotherSurname, validationsShot, setMotherSurnameValid)} activeValidation={motherSurnameValid} />
                {motherSurnameValid && <InputWarning message="Por favor, escribe el apellido materno." />}
            </div>

            <div className="phone-field flex flex-col gap-2 w-full">
                <Input type="text" textValue={phoneNumber} label="Número de teléfono del adulto responsable:" onInputChange={(e) => InputChange(e, phoneNumber, setPhoneNumber, validationsShot, setNumberValidation)} activeValidation={numberValidation} />
                {numberValidation && <InputWarning message="Por favor, escribe un número de teléfono válido." />}
            </div>

            <div className="input-row w-full flex md:flex-row flex-col gap-4 items-center justify-center">
                <div className="date-field flex flex-col gap-2 w-full">
                    <SelectDateInput selectType="date" label="Fecha de la cita:" value={date} onInputChange={(val) => SelectChange(val, date, setDate, validationsShot, setDateValidation)} activeValidation={dateValidation} />
                    {dateValidation && <InputWarning message="Por favor, selecciona una fecha." />}
                </div>

                <div className="hour-field flex flex-col gap-2 w-full">
                    <SelectHourInput label="Hora de la cita:" value={hour} isOnModify={props.isOnModify} date={date} onInputChange={(val) => SelectChange(val, hour, setHour, validationsShot, setHourValidation)} activeValidation={hourValidation} appointmentId={props.editionId} />
                    {hourValidation && <InputWarning message="Por favor, selecciona una hora." />}
                </div>
            </div>
        </form>
    )
};

export default AppointmentForm;