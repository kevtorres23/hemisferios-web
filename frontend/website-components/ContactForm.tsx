"use client";

import Input from "./Input";
import { useState } from "react";
import { ArrowRight, CircleAlert } from "lucide-react";
import { ContactMessage } from "@/website-modules/Classes";

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
    const [comment, setComment] = useState("");

    // Input validations.
    const [emailValidation, setEmailValidation] = useState(false);
    const [nameValidation, setNameValidation] = useState(false);
    const [lastNameValidation, setLastNameValidation] = useState(false);
    const [numberValidation, setNumberValidation] = useState(false);
    const [commentValidation, setCommentValidation] = useState(false);


    // Function to save the input's responses in an object.
    function shootData() {
        const messageObject = new ContactMessage(name, lastName, phoneNumber, email, comment);
        sendMessageObject(messageObject);
    }

    // Function to get the inputs through validations before saving the responses.
    function shootValidations(e: any) {
        e.preventDefault();

        // Validate the inputs are not empty.
        if (!name) { setNameValidation(true); };
        if (!lastName) { setLastNameValidation(true); };
        if (!phoneNumber) { setNumberValidation(true); };
        if (!comment) { setCommentValidation(true); };

        let emailRegex = /\w+@\w+.[a-z]+/i

        // Validate the format of the email and the phone number.
        if (emailRegex.test(email) === false) {
            setEmailValidation(true);
        } else if (phoneNumber.length < 10) {
            setNumberValidation(true);
        } else {
            shootData();
        }
    }

    return (
        <div className="lg:max-w-xl w-full flex flex-col items-start lg:p-7 sm:p-5 p-4 border border-slate-200 bg-slate-50 rounded-xl gap-4">
            <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Formulario de Contacto</h1>

            <div className="divisory-line w-full h-px bg-slate-200"></div>

            <form id="contactForm" onSubmit={(e) => shootValidations(e)} className="flex flex-col gap-4 w-full">
                <div className="input-row flex md:flex-row flex-col gap-4 w-full items-center justify-center">
                    <div className="name-field flex flex-col gap-2 w-full">
                        <Input type="text" textValue={name} onInputChange={(e) => setName(e.target.value)} label="Nombre:" />
                        {nameValidation && (
                            <div className="flex flex-row gap-1 items-center">
                                <CircleAlert size={14} className="text-red-500" />
                                <p className="text-xs font-medium text-red-500">Por favor, escribe tu nombre.</p>
                            </div>
                        )}
                    </div>

                    <div className="last-name-field flex flex-col gap-2 w-full">
                        <Input type="text" textValue={lastName} onInputChange={(e) => setLastName(e.target.value)} label="Apellido:" />
                        {lastNameValidation && (
                            <div className="flex flex-row gap-1 items-center">
                                <CircleAlert size={14} className="text-red-500" />
                                <p className="text-xs font-medium text-red-500">Por favor, escribe tu primer apellido.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="phone-number-field last-name-field flex flex-col gap-2 w-full">
                    <Input type="text" textValue={phoneNumber} onInputChange={(e) => setPhoneNumber(e.target.value)} label="Número de teléfono:" />
                    {numberValidation && (
                        <div className="flex flex-row gap-1 items-center">
                            <CircleAlert size={14} className="text-red-500" />
                            <p className="text-xs font-medium text-red-500">Por favor, escribe un número de teléfono válido.</p>
                        </div>
                    )}
                </div>

                <div className="email-field last-name-field flex flex-col gap-2 w-full">
                    <Input type="text" textValue={email} onInputChange={(e) => setEmail(e.target.value)} label="Correo electrónico:" />
                    {emailValidation && (
                        <div className="flex flex-row gap-1 items-center">
                            <CircleAlert size={14} className="text-red-500" />
                            <p className="text-xs font-medium text-red-500">Por favor, escribe un correo electrónico válido.</p>
                        </div>
                    )}
                </div>

                <div className="comment-field last-name-field flex flex-col gap-2 w-full">
                    <Input type="comment" textValue={comment} onInputChange={(e) => setComment(e.target.value)} label="Comentario:" />
                    {commentValidation && (
                        <div className="flex flex-row gap-1 items-center">
                            <CircleAlert size={14} className="text-red-500" />
                            <p className="text-xs font-medium text-red-500">Por favor, escribe tu primer apellido.</p>
                        </div>
                    )}
                </div>

            </form>

            <button form="contactForm" type="submit" className="bg-indigo-500 text-white tracking-tight text-base px-4 py-2 flex flex-row items-center justify-center gap-2 rounded-lg cursor-pointer font-normal hover:bg-indigo-400">
                Enviar comentario
                <ArrowRight size={18} />
            </button>
        </div>
    )
}

export default ContactForm;