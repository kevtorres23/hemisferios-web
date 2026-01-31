import Image from "next/image";
import SectionBadge from "@/website-components/SectionBadge";
import notebook from "../../public/notebook.png";
import ContactForm from "@/website-components/ContactForm";

function WrittenMessage() {
    return (
        <section className="lg:px-25 md:px-16 px-8 flex lg:flex-row flex-col lg:pt-24 lg:pb-40 sm:py-24 py-20 gap-30">
            <div className="flex flex-col md:gap-4 items-center justify-center">
                <SectionBadge name="¡CONTÁCTANOS!"/>

                <h1 className={`sm:text-4xl text-3xl font-semibold text-slate-900 tracking-tighter text-center`}>¿Tienes alguna duda o comentarios?</h1>
                
                <p className={`sm:text-base text-sm font-normal text-slate-600 text-center`}>
                    ¡Envíanos lo que quieras decirnos! Llena el siguiente formulario y envíanos tu comentario. Nos pondremos en contacto contigo en cuanto lo recibamos.
                </p>

                <Image alt="" src={notebook} className="w-96"/>
            </div>

            <ContactForm />
        </section>
    )
}

export default WrittenMessage;