"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { isVisible } from "../modules/VisibilityDetector";
import Input from "./Input";
import SelectDateInput from "./SelectDateInput";
import SelectHourInput from "./SelectHourInput";
import { CircleCheck } from "lucide-react";
import { Appointment } from "@/lib/Classes";
import InputWarning from "./InputWarning";
import { InputChange, SelectChange } from "@/website/modules/InputChangeHandlers";
import { redirect } from 'next/navigation';
import manageAvailability from "../modules/ManageAvailability";

type WeekDayObject = {
    writtenDate: string,
    databaseId: string,
    formattedDate: string,
};

type FormProps = {
    sendData: (receiptObject: Appointment, databaseOject: Appointment) => void;
    isOnModify?: boolean;
};

function AppointmentForm(props: FormProps) {
    // Variables for the form inputs.
    const [patientName, setPatientName] = useState("");
    const [motherSurname, setMotherSurname] = useState("");
    const [fatherSurname, setFatherSurname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [date, setDate] = useState("");
    const [formattedDate, setFormattedDate] = useState("");
    const [writtenDate, setWrittenDate] = useState("");
    const [hour, setHour] = useState("");
    const [availability, setAvailability] = useState([]);
    const [availDays, setAvailDays] = useState<{ currentWeekList: WeekDayObject[], nextWeekList: WeekDayObject[] }>({ currentWeekList: [], nextWeekList: [] });
    const [availHours, setAvailHours] = useState<string[]>();

    // Input validations.
    const [validationsShot, setValidationsShot] = useState(false);
    const [nameValidation, setNameValidation] = useState(false);
    const [motherSurnameValid, setMotherSurnameValid] = useState(false);
    const [fatherSurnameValid, setFatherSurnameValid] = useState(false);
    const [numberValidation, setNumberValidation] = useState(false);
    const [dateValidation, setDateValidation] = useState(false);
    const [hourValidation, setHourValidation] = useState(false);

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                // Variable definition.
                const res = await axios.get("http://localhost:5001/api/availability"); // Getting availability from the backend.
                const day = date; // Create a copy of the 'date' string.
                const dayToArray = day.split(""); // Convert the string into a character-separated array.
                const firstCharacter = dayToArray[0]; // Getting the week mark ('c' or 'n') set in the 'Manage Availability' module.
                dayToArray.splice(0, 1); // Now, we can remove the week mark.

                // Using the backend's response.
                setAvailability(res.data);
                const calculatedDays = manageAvailability(res.data);
                setAvailDays(calculatedDays);

                var finalDayName = "";

                // Rebuilding the day's name by summing the array's items.
                for (let i = 0; i < dayToArray.length; i++) {
                    finalDayName += dayToArray[i];
                };


                if (firstCharacter === "c") {
                    // Searching for the formatted date in the CURRENT week list of days, based on its database ID.
                    for (let i = 0; i < calculatedDays.currentWeekList.length; i++) {
                        if (calculatedDays.currentWeekList[i].databaseId === date) {
                            setFormattedDate(calculatedDays.currentWeekList[i].formattedDate);
                            setWrittenDate(calculatedDays.currentWeekList[i].writtenDate);
                        };
                    };

                    setAvailHours(availability[0][finalDayName]);

                } else if (firstCharacter === "n") {
                    // Searching for the formatted date in the NEXT week list of days, based on its database ID.
                    for (let i = 0; i < calculatedDays.nextWeekList.length; i++) {
                        if (calculatedDays.nextWeekList[i].databaseId === date) {
                            setFormattedDate(calculatedDays.nextWeekList[i].formattedDate);
                            setWrittenDate(calculatedDays.nextWeekList[i].writtenDate);
                        };
                    };

                    setAvailHours(availability[1][finalDayName]);
                }

            } catch (error) {
                console.log("Error fetching notes", error);
            };

        };
        fetchAvailability();
    }, [date]);

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

    function shootData() {
        const time = new Date();
        const status = "pending"; // The default status that appointments have when they are created.

        const receiptAppointmentObj = new Appointment(status, patientName, fatherSurname, motherSurname, phoneNumber, writtenDate, hour, time);
        const databaseAppointmentObj = new Appointment(status, patientName, fatherSurname, motherSurname, phoneNumber, formattedDate, hour, time);

        props.sendData(receiptAppointmentObj, databaseAppointmentObj);
    };

    return (
        <form id="appointmentForm" onSubmit={(e) => shootValidations(e)} className="flex flex-col gap-4 w-full">

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
                    <SelectDateInput selectType="date" label="Fecha de la cita:" value={date} onInputChange={(val) => SelectChange(val, date, setDate, validationsShot, setDateValidation)} activeValidation={dateValidation} items={availDays} />
                    {dateValidation && <InputWarning message="Por favor, selecciona una fecha." />}
                </div>

                <div className="hour-field flex flex-col gap-2 w-full">
                    <SelectHourInput selectType="hour" label="Hora de la cita:" value={hour} onInputChange={(val) => SelectChange(val, hour, setHour, validationsShot, setHourValidation)} activeValidation={hourValidation} items={availHours} />
                    {hourValidation && <InputWarning message="Por favor, selecciona una fecha." />}
                </div>
            </div>
        </form>
    )
}

export default AppointmentForm;