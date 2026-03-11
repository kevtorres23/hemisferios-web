import { TherapistType } from "@/utils/types";
import Input from "@/components/website/Input";
import InputWarning from "@/components/website/InputWarning";
import { InputChange, SelectChange } from "@/utils/website/input-change-handlers";
import { useState } from "react";
import { DayPicker } from "../DayPicker";

type FormProps = {
    sendData: (therapistObject: TherapistType) => void;
    isOnModify?: boolean;
};

function NewTherapistForm(props: FormProps) {
    // Variables for the input values.
    const [therapistName, setTherapistName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [startingDate, setStartingDate] = useState("");

    // Input validations.
    const [validationsShot, setValidationsShot] = useState(false);
    const [nameValidation, setNameValidation] = useState(false);
    const [lastNameValidation, setLastNameValidation] = useState(false);
    const [numberValidation, setNumberValidation] = useState(false);
    const [startingDateValidation, setStartingDateValidation] = useState(false);

    function shootValidations(e: React.FormEvent) {
        e.preventDefault();
    };

    return (
        <form id="therapistForm" action="" onSubmit={(e) => shootValidations(e)} className="flex flex-col gap-4 w-full">
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

            <div className="label gap-3 flex flex-row w-full">

                <Input type="text" textValue={startingDate} label="Fecha de inicio" onInputChange={(e) => InputChange(e, startingDate, setStartingDate, validationsShot, setStartingDateValidation)} activeValidation={startingDateValidation} />
                {startingDateValidation && (
                    <InputWarning message="Por favor, selecciona una fecha." />
                )}

                <DayPicker />
                {startingDateValidation && (
                    <InputWarning message="Por favor, selecciona una fecha." />
                )}
            </div>
        </form>
    );
};

export default NewTherapistForm;