import { Dispatch, SetStateAction } from "react";

// Function that manipulates an input's value and validation state.
function AppointmentInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    input: string,
    setInput: Dispatch<SetStateAction<string>>,
    areValidationsShot: boolean,
    setInputValid: Dispatch<SetStateAction<boolean>>) {

    console.log("change detected");

    setInput(e.currentTarget.value);

    if (!input && (areValidationsShot === true)) {
        setInputValid(true);
    } else {
        setInputValid(false);
    };
}

function AppointmentSelectChange(
    value: string,
    input: string,
    setInput: Dispatch<SetStateAction<string>>,
    areValidationsShot: boolean,
    setInputValid: Dispatch<SetStateAction<boolean>>) {

    console.log("select detected");

    setInput(value);

    if (!input && (areValidationsShot === true)) {
        setInputValid(true);
    } else {
        setInputValid(false);
    };
}

export { AppointmentInputChange, AppointmentSelectChange };