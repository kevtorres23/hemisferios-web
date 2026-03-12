import Input from "@/components/website/Input";
import InputWarning from "@/components/website/InputWarning";
import { InputChange } from "@/utils/website/input-change-handlers";
import { dateFormatter } from "@/utils/system/appointments/appointment-formatter";
import { useEffect, useState } from "react";
import { DayPicker } from "../DayPicker";
import { format } from "date-fns"
import { es } from "date-fns/locale";
import { Therapist } from "@/utils/classes";
import api from "@/lib/axios";

type FormProps = {
    sendData: (therapistObject: Therapist) => void;
    modifyData: (therapistObject: Therapist) => void;
    isOnModify?: boolean;
    formId: string;
    editionId: string;
};

interface TherapistSchedule {
    patient: string;
    hour: string;
    day: string;
};

function NewTherapistForm(props: FormProps) {
    const todayDate = new Date();

    // Variables for the input values.
    const [therapistName, setTherapistName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [startingDate, setStartingDate] = useState<Date>(todayDate);
    const [formattedStartingDate, setFormattedStartingDate] = useState("");
    const [schedule, setSchedule] = useState<TherapistSchedule[]>([]);

    // Input validations.
    const [validationsShot, setValidationsShot] = useState(false);
    const [nameValidation, setNameValidation] = useState(false);
    const [lastNameValidation, setLastNameValidation] = useState(false);
    const [numberValidation, setNumberValidation] = useState(false);
    const [startingDateValidation, setStartingDateValidation] = useState(false);

    useEffect(() => {
        const getEditableTherapist = async () => {
            try {
                const res = await api.get("/therapists/" + props.editionId);
                setTherapistName(res.data.name);
                setLastName(res.data.lastName);
                setContactNumber(res.data.contactNumber);
                setFormattedStartingDate(dateFormatter(res.data.startingDate));
                
            } catch (error) {
                console.log("Error while fetching the therapist's info:", error);
            };
        };

        if (props.isOnModify) {
            getEditableTherapist();
        };
    }, []);

    function shootValidations(e: React.SubmitEvent) {
        setValidationsShot(true);
        e.preventDefault();

        if (!therapistName) { setNameValidation(true); };
        if (!lastName) { setLastNameValidation(true); };
        if (!contactNumber) { setNumberValidation(true); };
        if (!startingDate) { setStartingDateValidation(true); };

        if (contactNumber.length < 10) {
            setNumberValidation(true);
        } else if (therapistName && lastName && contactNumber && startingDate) {
            shootData();
        };
    };

    function shootData() {
        const formattedStartingDate = format(startingDate, "dd-MM-yyyy");
        if (props.formId === "editTherapistForm") {
            const newTherapistObject = new Therapist(therapistName, lastName, formattedStartingDate, contactNumber, schedule);
            props.modifyData(newTherapistObject);
        } else {
            const newTherapistObject = new Therapist(therapistName, lastName, formattedStartingDate, contactNumber);
            props.sendData(newTherapistObject);
        };
    };

    function onStartingDateChange(date: Date) {
        setStartingDate(date);
        setFormattedStartingDate(format(date, "PPP", { locale: es }));
    };

    return (
        <form id={props.formId} onSubmit={(e) => shootValidations(e)} className="flex flex-col gap-4 w-full">
            <Input type="text" textValue={therapistName} label="Nombre de el/de la terapeuta" onInputChange={(e) => InputChange(e, therapistName, setTherapistName, validationsShot, setNameValidation)} activeValidation={nameValidation} />
            {nameValidation && (
                <InputWarning message="Por favor, escribe el nombre del terapeuta." />
            )}

            <Input type="text" textValue={lastName} label="Apellido del terapeuta" onInputChange={(e) => InputChange(e, lastName, setLastName, validationsShot, setLastNameValidation)} activeValidation={lastNameValidation} />
            {lastNameValidation && (
                <InputWarning message="Por favor, escribe el primer apellido." />
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
        </form>
    );
};

export default NewTherapistForm;