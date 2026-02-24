"use client";

import Image from "next/image";
import SectionBadge from "@/components/website/SectionBadge";
import notebook from "../../../public/notebook.png";
import ContactForm from "@/components/website/ContactForm";
import NormalButton from "@/components/website/NormalButton";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useRef } from "react";
import { isVisible } from "@/utils/website/visibility-detector";

type MessageType = {
    name: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    message: string;
}

function WrittenMessage() {
    const [isFormSent, setIsFormSent] = useState(false);

    const ref1 = useRef(null);
    const isContentVisible = isVisible(ref1);

    function receiveMessageObject(messageObject: MessageType) {
        console.log(messageObject);

        // Add the logic to send the comment to the database.

        setIsFormSent(true);
    }

    return (
        <section className="xl:px-25 lg:px-20 md:px-16 px-8 flex lg:flex-row flex-col lg:pt-24 lg:pb-40 sm:py-24 py-12 xl:gap-30 gap-15">
            <div ref={ref1} className={`${isContentVisible ? 'top-0 opacity-100' : 'top-20 opacity-0'} relative flex flex-col gap-12 items-center justify-center transition-all ease-out duration-1200`}>
                <div className="flex flex-col gap-4 items-center justify-center">
                    <SectionBadge name="¡CONTÁCTANOS!" />

                    <h1 className={`sm:text-4xl/12 text-3xl font-semibold text-slate-900 tracking-tighter text-center`}>¿Tienes alguna duda, sugerencia o comentario?</h1>

                    <p className={`text-base font-normal text-slate-600 text-center w-10/12`}>
                        ¡Envíanos lo que quieras decirnos! Llena el siguiente formulario y envíanos tu comentario. Nos pondremos en contacto contigo en cuanto lo recibamos.
                    </p>
                </div>

                <Image alt="" src={notebook} className="lg:w-60 sm:w-72 w-56" />
            </div>

            {isFormSent === false && (
                <ContactForm sendMessageObject={receiveMessageObject} />
            )}

            {isFormSent === true && (
                <div className="lg:max-w-xl w-full flex flex-col items-center justify-center lg:p-7 sm:p-5 p-4 border border-slate-200 bg-slate-50 rounded-xl gap-5">
                    <CheckCircle size={64} className="text-indigo-500" />

                    <div className="flex flex-col gap-2 items-center justify-center">
                        <h1 className="text-2xl text-slate-900 font-semibold tracking-tighter text-center">¡Mensaje enviado correctamente!</h1>
                        <p className="text-base text-slate-500 font-normal text-center">Pronto nos contactaremos contigo para darte una respuesta.</p>
                    </div>

                    <NormalButton text="Enviar otro mensaje" onClick={() => setIsFormSent(false)} />
                </div>
            )}
        </section>
    )
}

export default WrittenMessage;