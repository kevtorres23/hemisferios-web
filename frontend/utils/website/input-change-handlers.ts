import { Dispatch, SetStateAction } from "react";

// The following two functions manipulate an input's value and validation state.

function InputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    input: string,
    setInput: Dispatch<SetStateAction<string>>,
    areValidationsShot: boolean,
    setInputValid: Dispatch<SetStateAction<boolean>>) {

    setInput(e.currentTarget.value);

    if (!input && (areValidationsShot === true)) {
        setInputValid(true);
    } else {
        setInputValid(false);
    };
}

// This function manipulates a select's value and validation state.

function SelectChange(
    value: string,
    input: string,
    setInput: Dispatch<SetStateAction<string>>,
    areValidationsShot: boolean,
    setInputValid: Dispatch<SetStateAction<boolean>>) {

    setInput(value);

    if (!input && (areValidationsShot === true)) {
        setInputValid(true);
    } else {
        setInputValid(false);
    };
}

export { InputChange, SelectChange };