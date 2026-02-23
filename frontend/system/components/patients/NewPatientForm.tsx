import { PatientType } from "@/lib/Types";
import Input from "@/website/components/Input";
import InputWarning from "@/website/components/InputWarning";
import { InputChange, SelectChange } from "@/website/modules/InputChangeHandlers";
import { SelectFrequency, SelectModality } from "./PaymentSelects";
import { SelectStartingDate } from "../SelectStartingDate";
import { useState } from "react";

type FormProps = {
    sendData: (patientObject: PatientType) => void;
    isOnModify?: boolean;
};

function NewPatientForm(props: FormProps) {
    // Variables for the input values.
    const [patientName, setPatientName] = useState("");
    const [motherSurname, setMotherSurname] = useState("");
    const [fatherSurname, setFatherSurname] = useState("");
    const [adultName, setAdultName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [startingDate, setStartingDate] = useState("");
    const [paymentFrequency, setPaymentFrequency] = useState("");
    const [paymentModality, setPaymentModality] = useState("");

    // Input validations.
    const [validationsShot, setValidationsShot] = useState(false);
    const [nameValidation, setNameValidation] = useState(false);
    const [motherSurnameValid, setMotherSurnameValid] = useState(false);
    const [fatherSurnameValid, setFatherSurnameValid] = useState(false);
    const [adultValidation, setAdultValidation] = useState(false);
    const [numberValidation, setNumberValidation] = useState(false);
    const [startingDateValidation, setStartingDateValidation] = useState(false);
    const [frequencyValidation, setFrequencyValidation] = useState(false);
    const [modalityValidation, setModalityValidation] = useState(false);

    function shootValidations(e: React.FormEvent) {
        e.preventDefault();
    };

    return (
        <form id="patientForm" action="" onSubmit={(e) => shootValidations(e)} className="flex flex-col gap-4 w-full">
            <Input type="text" textValue={patientName} label="Nombre(s) del paciente" onInputChange={(e) => InputChange(e, patientName, setPatientName, validationsShot, setNameValidation)} activeValidation={nameValidation} />
            {nameValidation && (
                <InputWarning message="Por favor, escribe el nombre o los nombres del paciente." />
            )}

            <div className="flex md:flex-row flex-col gap-4 items-center justify-center">
                <div className="father-surname-field flex flex-col gap-2 w-full">
                    <Input type="text" textValue={fatherSurname} label="Apellido paterno del paciente" onInputChange={(e) => InputChange(e, fatherSurname, setFatherSurname, validationsShot, setFatherSurnameValid)} activeValidation={fatherSurnameValid} />
                    {fatherSurnameValid && <InputWarning message="Por favor, escribe el apellido paterno." />}
                </div>

                <div className="mother-surname-field flex flex-col gap-2 w-full">
                    <Input type="text" textValue={motherSurname} label="Apellido materno del paciente" onInputChange={(e) => InputChange(e, motherSurname, setMotherSurname, validationsShot, setMotherSurnameValid)} activeValidation={motherSurnameValid} />
                    {motherSurnameValid && <InputWarning message="Por favor, escribe el apellido materno." />}
                </div>
            </div>

            <Input type="text" textValue={adultName} label="Nombre y apellido del adulto responsable" onInputChange={(e) => InputChange(e, adultName, setAdultName, validationsShot, setAdultValidation)} activeValidation={adultValidation} />
            {adultValidation && (
                <InputWarning message="Por favor, escribe el nombre del adulto responsable." />
            )}

            <Input type="text" textValue={contactNumber} label="Número de contacto" onInputChange={(e) => InputChange(e, contactNumber, setContactNumber, validationsShot, setNumberValidation)} activeValidation={numberValidation} />
            {numberValidation && (
                <InputWarning message="Por favor, ingresa un número de teléfono válido." />
            )}

            <label className="label gap-3 flex flex-col w-full">
                <div className="flex flex-row gap-2">
                    <p className="text-slate-500 sm:text-sm text-base m-0 p-0">
                        Fecha de inicio: <span className="text-red-500 text-lg font-semibold">*</span>
                    </p>
                </div>

                <SelectStartingDate />
                {startingDateValidation && (
                    <InputWarning message="Por favor, selecciona una fecha." />
                )}
            </label>

            <div className="flex md:flex-row flex-col gap-4 items-center justify-center">
                <div className="father-surname-field flex flex-col gap-2 w-full">
                    <SelectFrequency label="Frecuencia de terapia:" value={paymentFrequency} onInputChange={(val) => SelectChange(val, paymentFrequency, setPaymentFrequency, validationsShot, setFrequencyValidation)} activeValidation={frequencyValidation} />
                    {frequencyValidation && <InputWarning message="Por favor, selecciona un tipo." />}
                </div>

                <div className="mother-surname-field flex flex-col gap-2 w-full">
                    <SelectModality label="Tipo de pago:" value={paymentFrequency} onInputChange={(val) => SelectChange(val, paymentModality, setPaymentModality, validationsShot, setModalityValidation)} activeValidation={modalityValidation} />
                    {modalityValidation && <InputWarning message="Por favor, selecciona un tipo." />}
                </div>
            </div>
        </form>
    );
};

export default NewPatientForm;