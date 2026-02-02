"use client";

import { useRef } from "react";
import TechniqueCard from "@/website-components/TechniqueCard";
import { Brain, Settings, Smile, Sparkles } from "lucide-react";
import { isVisible } from "@/modules/VisibilityDetector";

function WorkingMethod() {
    const ref1 = useRef(null);
    const titleVisible = isVisible(ref1);
    
    const ref2 = useRef(null);
    const cardsVisible = isVisible(ref2);

    return (
        <section className="relative w-full h-auto sm:py-32 py-16 sm:px-20 px-8 bg-indigo-500 flex items-center justify-center flex-col sm:gap-20 gap-12">

            <div ref={ref1} className={`${titleVisible ? "opacity-100 top-0" : "opacity-0 top-15" } relative max-w-3xl flex flex-col items-center justify-center gap-6 transition-all ease-out duration-800`}>
                <h1 className="lg:text-5xl/14 sm:text-4xl/12 text-3xl/10 text-center font-semibold text-white tracking-tighter w-full">
                    Mantenemos un enfoque cien por ciento orientado al paciente.
                </h1>
                <p className="sm:text-base text-sm font-normal/7 text-center text-white sm:w-8/12 w-full">Ofrecemos terapia de comunicación y lenguaje enfocada en atender y trabajar las áreas de mejora del paciente, mediante el uso de las siguientes técnicas.</p>
            </div>

            <div ref={ref2} className={`${cardsVisible ? "opacity-100 top-0" : "opacity-0 top-16"} relative w-full h-auto grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 transition-all ease-out duration-1500`}>
                <TechniqueCard title="Conocer las necesidades del paciente."
                    description="El proceso comienza con una entrevista para realizar una historia clínica y saber qué evaluaciones específicas necesita."
                    icon={<Brain className="w-6 text-white" />}
                    iconBgColor="bg-orange-500"
                />

                <TechniqueCard title="Evaluación y creación de estrategias de trabajo."
                    description="Realizamos una evaluación específica para crear una serie de estrategias con la cual podemos trabajar en cada sesión."
                    icon={<Settings className="w-6 text-white" />}
                    iconBgColor="bg-pink-500"
                />

                <TechniqueCard title="Actividades y dinámicas recreativas en las sesiones."
                    description="Acompañamos el proceso del paciente con actividades y dinámicas que le permitan explorar su creatividad y divertirse en el proceso."
                    icon={<Smile className="w-6 text-white" />}
                    iconBgColor="bg-green-500"
                />

                <TechniqueCard title="Mejora continua de los procesos en cada sesión."
                    description="Realizamos los ajustes necesarios a nuestros procesos para mejorar el servicio en beneficio del paciente."
                    icon={<Sparkles className="w-6 text-white" />}
                    iconBgColor="bg-blue-500"
                />
            </div>
        </section>
    )
}

export default WorkingMethod;