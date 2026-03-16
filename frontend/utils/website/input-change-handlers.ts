import { Dispatch, SetStateAction } from "react";

/**
 * Handles an text input's value and validation states.
 * @param e 
 * @param input 
 * @param setInput 
 * @param areValidationsShot 
 * @param setInputValid 
 */

function InputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    input: string | number,
    setInput: Dispatch<SetStateAction<string>>,
    areValidationsShot: boolean,
    setInputValid: Dispatch<SetStateAction<boolean>>) {

    setInput(e.currentTarget.value);

    if (!input && (areValidationsShot === true)) {
        setInputValid(true);
    } else {
        setInputValid(false);
    };
};

function NumberInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    input: number,
    setInput: Dispatch<SetStateAction<number>>,
    areValidationsShot: boolean,
    setInputValid: Dispatch<SetStateAction<boolean>>) {

    setInput(e.currentTarget.valueAsNumber);

    if (!input && (areValidationsShot === true)) {
        setInputValid(true);
    } else {
        setInputValid(false);
    };
};

    /**
     * Handles an select input's value and validation states.
     * @param e 
     * @param input 
     * @param setInput 
     * @param areValidationsShot 
     * @param setInputValid 
     */

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

    export { InputChange, NumberInputChange, SelectChange };