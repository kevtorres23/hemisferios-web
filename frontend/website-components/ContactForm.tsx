"use client";

import Input from "./Input";
import { useState } from "react";
import IconButton from "./IconButton";
import { ArrowRight, Icon } from "lucide-react";

function ContactForm() {
    const [name, setName] = useState("");
    const [apellido, setApellido] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");

    return (
        <div className="lg:max-w-xl w-full flex flex-col items-start lg:p-7 sm:p-5 p-4 border border-slate-200 bg-slate-50 rounded-xl gap-4">
            <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Formulario de Contacto</h1>

            <div className="divisory-line w-full h-px bg-slate-200"></div>

            <form action="" id="contactForm" className="flex flex-col gap-4 w-full">
                <div className="input-row flex md:flex-row flex-col gap-4 w-full items-center justify-center">
                    <Input type="text" textValue={name} onInputChange={(e) => setName(e.target.value)} label="Nombre:" />
                    <Input type="text" textValue={apellido} onInputChange={(e) => setApellido(e.target.value)} label="Apellido:" />
                </div>

                <Input type="text" textValue={phoneNumber} onInputChange={(e) => setPhoneNumber(e.target.value)} label="Número de teléfono:" />

                <Input type="email" textValue={email} onInputChange={(e) => setEmail(e.target.value)} label="Correo electrónico:" />

                <Input type="comment" textValue={comment} onInputChange={(e) => setComment(e.target.value)} label="Comentario:" />

            </form>

            <button form="contactForm" type="submit" className="bg-indigo-500 text-white tracking-tight text-base px-4 py-2 flex flex-row items-center justify-center gap-2 rounded-lg cursor-pointer font-normal hover:bg-indigo-400">
                Enviar comentario
                <ArrowRight size={18}/>
            </button>
        </div>
    )
}

export default ContactForm;