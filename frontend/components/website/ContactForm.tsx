"use client";

import Input from "./Input";
import { useState } from "react";
import { ArrowRight, CircleAlert } from "lucide-react";
import { ContactMessage } from "@/utils/classes";
import { useRef } from "react";
import { isVisible } from "@/utils/website/visibility-detector";
import { InputChange } from "@/utils/website/input-change-handlers";
import axios from "axios";


type MessageType = {
    name: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    message: string;
}

function ContactForm({ sendMessageObject }: { sendMessageObject: (messageObject: MessageType) => void; }) {

    // Variables of the form inputs.
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // Input validations.
    const [validationsShot, setValidationsShot] = useState(false);
    const [emailValidation, setEmailValidation] = useState(false);
    const [nameValidation, setNameValidation] = useState(false);
    const [lastNameValidation, setLastNameValidation] = useState(false);
    const [numberValidation, setNumberValidation] = useState(false);
    const [messageValidation, setMessageValidation] = useState(false);

    const ref1 = useRef(null);
    const isFormVisible = isVisible(ref1);

    // Function to save the input's responses in an object.
    function shootData() {
        const messageObject = new ContactMessage(name, lastName, phoneNumber, email, message);
        sendMessageObject(messageObject);
        axios.post("http://localhost:5001/api/messages", messageObject);
    }

    // Function to get the inputs through validations before saving the responses.
    function shootValidations(e: React.FormEvent) {
        setValidationsShot(true);
        e.preventDefault();

        // Validate the inputs are not empty.
        if (!name) { setNameValidation(true); };
        if (!lastName) { setLastNameValidation(true); };
        if (!phoneNumber) { setNumberValidation(true); };
        if (!message) { setMessageValidation(true); };

        let emailRegex = /\w+@\w+.[a-z]+/i

        // Validate the format of the email and the phone number.
        if (emailRegex.test(email) === false) {
            setEmailValidation(true);
        } else if (phoneNumber.length < 10) {
            setNumberValidation(true);
        } else {
            shootData();
        }

        setValidationsShot(false);
    }

    return (
        <div ref={ref1} className={`${isFormVisible ? 'opacity-100' : 'opacity-0'} lg:max-w-xl w-full flex flex-col items-start lg:p-7 sm:p-5 p-4 border border-slate-200 bg-slate-50 rounded-xl gap-4 transition-opacity duration-700 ease-in`}>
            <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Formulario de Contacto</h1>

            <div className="divisory-line w-full h-px bg-slate-200"></div>

            <form id="contactForm" onSubmit={(e) => shootValidations(e)} className="flex flex-col gap-4 w-full">

                <div className="input-row flex md:flex-row flex-col gap-4 w-full items-center justify-center">
                    <div className="name-field flex flex-col gap-2 w-full">
                        <Input type="text" textValue={name} onInputChange={(e) => InputChange(e, name, setName, validationsShot, setNameValidation)} label="Nombre:" activeValidation={nameValidation} />
                        {nameValidation && (
                            <div className="flex flex-row gap-1 items-center">
                                <CircleAlert size={14} className="text-red-500" />
                                <p className="text-xs font-medium text-red-500">Por favor, escribe tu nombre.</p>
                            </div>
                        )}
                    </div>

                    <div className="last-name-field flex flex-col gap-2 w-full">
                        <Input type="text" textValue={lastName} onInputChange={(e) => InputChange(e, lastName, setLastName, validationsShot, setLastNameValidation)} label="Apellido:" activeValidation={lastNameValidation} />
                        {lastNameValidation && (
                            <div className="flex flex-row gap-1 items-center">
                                <CircleAlert size={14} className="text-red-500" />
                                <p className="text-xs font-medium text-red-500">Por favor, escribe tu primer apellido.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="phone-number-field last-name-field flex flex-col gap-2 w-full">
                    <Input type="text" textValue={phoneNumber} onInputChange={(e) => InputChange(e, phoneNumber, setPhoneNumber, validationsShot, setNumberValidation)} label="Número de teléfono:" activeValidation={numberValidation} />
                    {numberValidation && (
                        <div className="flex flex-row gap-1 items-center">
                            <CircleAlert size={14} className="text-red-500" />
                            <p className="text-xs font-medium text-red-500">Por favor, escribe un número de teléfono válido.</p>
                        </div>
                    )}
                </div>

                <div className="email-field last-name-field flex flex-col gap-2 w-full">
                    <Input type="text" textValue={email} onInputChange={(e) => InputChange(e, email, setEmail, validationsShot, setEmailValidation)} label="Correo electrónico:" activeValidation={emailValidation} />
                    {emailValidation && (
                        <div className="flex flex-row gap-1 items-center">
                            <CircleAlert size={14} className="text-red-500" />
                            <p className="text-xs font-medium text-red-500">Por favor, escribe un correo electrónico válido.</p>
                        </div>
                    )}
                </div>

                <div className="comment-field last-name-field flex flex-col gap-2 w-full">
                    <Input type="comment" textValue={message} onInputChange={(e) => InputChange(e, message, setMessage, validationsShot, setMessageValidation)} label="Comentario:" activeValidation={messageValidation} />
                    {messageValidation && (
                        <div className="flex flex-row gap-1 items-center">
                            <CircleAlert size={14} className="text-red-500" />
                            <p className="text-xs font-medium text-red-500">Por favor, escribe tu primer apellido.</p>
                        </div>
                    )}
                </div>

            </form>

            <button form="contactForm" type="submit" className="bg-indigo-500 text-white tracking-tight text-base px-4 py-2 flex flex-row items-center justify-center gap-2 rounded-lg cursor-pointer font-normal hover:bg-indigo-400 sm:w-auto w-full">
                Enviar comentario
                <ArrowRight size={18} />
            </button>
        </div>
    )
}

export default ContactForm;