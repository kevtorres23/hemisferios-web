import { PatientType } from "@/utils/types";
import { format } from "date-fns"
import { es } from "date-fns/locale";
import Input from "@/components/website/Input";
import InputWarning from "@/components/website/InputWarning";
import { InputChange, SelectChange } from "@/utils/website/input-change-handlers";
import { SelectFrequency, SelectModality } from "./PaymentSelects";
import { DayPicker } from "../DayPicker";
import { useEffect, useState } from "react";
import { Patient } from "@/utils/classes";
import { lessThanTen } from "@/utils/format-availability";
import { formattedToWrittenDate, stringToDate } from "@/utils/date-methods";
import api from "@/lib/axios";

type FormProps = {
    sendData: (patientObject: Patient) => void;
    isOnModify?: boolean;
    formId: string;
    modifyData: (patientObject: Patient) => void;
    editionId: string;
};

const todayDate = new Date();

function NewPatientForm(props: FormProps) {
    // Variables for the input values.
    const [patientName, setPatientName] = useState("");
    const [motherSurname, setMotherSurname] = useState("");
    const [fatherSurname, setFatherSurname] = useState("");
    const [adultName, setAdultName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [startingDate, setStartingDate] = useState<Date>(todayDate);
    const [formattedStartingDate, setFormattedStartingDate] = useState("");
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

    useEffect(() => {
        const getEditablePatient = async () => {

            try {
                const res = await api.get("/patients/" + props.editionId);
                setPatientName(res.data.name);
                setMotherSurname(res.data.motherSurname);
                setFatherSurname(res.data.fatherSurname);
                setAdultName(res.data.adultName);
                setContactNumber(res.data.contactNumber);
                setFormattedStartingDate(formattedToWrittenDate(res.data.startingDate));
                setPaymentFrequency(res.data.paymentFrequency);
                setPaymentModality(res.data.paymentModality);

            } catch (error) {
                console.log("Error while fetching the patient's info:", error);
            };
        };

        if (props.isOnModify) {
            getEditablePatient();
        };

    }, []);

    function onStartingDateChange(date: Date) {
        setStartingDate(date);
        setFormattedStartingDate(format(date, "PPP", { locale: es }));
    }

    function shootValidations(e: React.SubmitEvent) {
        setValidationsShot(true);
        e.preventDefault();

        if (!patientName) { setNameValidation(true); };
        if (!motherSurname) { setMotherSurnameValid(true); };
        if (!fatherSurname) { setFatherSurnameValid(true); };
        if (!adultName) { setAdultValidation(true); };
        if (!contactNumber) { setNumberValidation(true); };
        if (!startingDate) { setStartingDateValidation(true); };
        if (!paymentFrequency) { setFrequencyValidation(true); };
        if (!paymentModality) { setModalityValidation(true); };

        if (contactNumber.length < 10) {
            setNumberValidation(true);
        } else if (patientName && motherSurname && fatherSurname && adultName && contactNumber && startingDate && paymentFrequency && paymentModality) {
            shootData();
        };

        setValidationsShot(false);
    };

    function shootData() {
        const formattedStartingDate = lessThanTen(startingDate.getFullYear()) + "-" + lessThanTen(startingDate.getMonth() + 1) + "-" + startingDate.getDate();

        const newPatientObject = new Patient
            (
                patientName,
                fatherSurname,
                motherSurname,
                adultName,
                contactNumber,
                formattedStartingDate,
                paymentFrequency,
                paymentModality
            );

        if (props.formId === "patientForm") {
            props.sendData(newPatientObject);
        } else {
            props.modifyData(newPatientObject);
        };
    };

    return (
        <form id={props.formId} onSubmit={(e) => shootValidations(e)} className="flex flex-col gap-4 w-full">
            <Input type="text" textValue={patientName} label="Nombre(s) del paciente" onInputChange={(e) => InputChange(e, patientName, setPatientName, validationsShot, setNameValidation)} activeValidation={nameValidation} />
            {nameValidation && <InputWarning message="Por favor, escribe el nombre o los nombres del paciente." />}

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

            <div className="label gap-3 flex flex-row w-full items-end justify-center">

                <Input type="text" placeholder="Escoge una fecha en el calendario" textValue={formattedStartingDate} label="Fecha de inicio" onInputChange={onStartingDateChange} activeValidation={startingDateValidation} />
                {startingDateValidation && (
                    <InputWarning message="Por favor, selecciona una fecha." />
                )}

                <DayPicker onSelectDate={(date: Date) => onStartingDateChange(date)} />
            </div>

            <div className="flex md:flex-row flex-col gap-4 items-center justify-center">
                <div className="father-surname-field flex flex-col gap-2 w-full">
                    <SelectFrequency label="Frecuencia de terapia:" value={paymentFrequency} onInputChange={(val) => SelectChange(val, paymentFrequency, setPaymentFrequency, validationsShot, setFrequencyValidation)} activeValidation={frequencyValidation} />
                    {frequencyValidation && <InputWarning message="Por favor, selecciona un tipo." />}
                </div>

                <div className="mother-surname-field flex flex-col gap-2 w-full">
                    <SelectModality label="Tipo de pago:" value={paymentModality} onInputChange={(val) => SelectChange(val, paymentModality, setPaymentModality, validationsShot, setModalityValidation)} activeValidation={modalityValidation} />
                    {modalityValidation && <InputWarning message="Por favor, selecciona un tipo." />}
                </div>
            </div>
        </form>
    );
};

export default NewPatientForm;