import TherapyType from "@/website-components/TherapyType";
import TherapyDefinition from "@/website-components/TherapyDefinition";
import TherapySigns from "@/website-components/TherapySigns";
import SignCard from "@/website-components/SignCard";
import { Speech, BrainCog } from "lucide-react";

function Services() {
    return (
        <section className="flex flex-col lg:gap-20 md:gap-12 gap-8 sm:px-20 px-8 pt-12 pb-28">
            <TherapyType>
                <TherapyDefinition
                    therapyName="Terapia de Lenguaje"
                    therapyDef="Consiste en la evaluación, diagnóstico y tratamiento de las alteraciones en voz, habla, audición, lenguaje, aprendizaje y los aspectos de la motricidad oral que afectan durante el desarrollo del niño."
                    color="bg-sky-500"
                    icon={<Speech color="white" size={24} />}
                />
                <TherapySigns bgColor="bg-sky-500">
                    <SignCard content="Es notorio que habla como otros niños de su edad." />
                    <SignCard content="Le es difícil comprender el significado instrucciones sencillas." />
                    <SignCard content="Usa señas o gestos para comunicar sus necesidades." />
                    <SignCard content="Hay una dificultad para producir uno o varios sonidos." />
                </TherapySigns>
            </TherapyType>

            <TherapyType secondRow={true}>
                <TherapySigns bgColor="bg-teal-500">
                    <SignCard content="Hay dificultades para poner atención en varias situaciones." />
                    <SignCard content="Le es complicado recordar información o detalles." />
                    <SignCard content="Le es complicado seguir o atender instrucciones de diversos tipos." />
                    <SignCard content="Proceso la información más lento que otros niños de su edad." />
                </TherapySigns>
                <TherapyDefinition
                    therapyName="Terapia Cognitiva"
                    therapyDef="Se enfoca en la mejora continua de las funciones cognitivas del paciente, tales como la atención, la memoria, resolución de problemas y ejecución de tareas diarias o cotidianas."
                    color="bg-teal-500"
                    icon={<BrainCog color="white" size={24} />}
                />
            </TherapyType>
        </section>
    )
}

export default Services;