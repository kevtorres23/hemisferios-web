import MediumModal from "./MediumModal";
import Input from "@/website/components/Input";
import { ModalProps } from "@/lib/Types";
import { ChevronRight, ChevronLeft } from "lucide-react";
import MultiSelect from "../MultiSelect";
import { useState } from "react";

function AvailabilityModal(props: ModalProps) {
    const [week, setWeek] = useState("current");

    return (
        <MediumModal
            isVisible={props.isVisible}
            btnType="submit"
            btnForm="availabilityForm"
            onClose={props.onClose}
            title="Editar disponibilidad de citas"
            confirmationBtnText="Guardar"
            onSave={props.onSave}
        >
            <p className="text-base text-slate-500 font-normal w-full">
                Las horas que selecciones serán las que las personas puedan seleccionar cuando intenten agendar una cita en la página web.
            </p>

            <div className="flex flex-row items-center justify-center gap-1 week-indicator px-2.5 py-1 border border-indigo-400 bg-indigo-50 rounded-sm self-start">
                {week === "current" ? (
                    <>
                        <p className="text-sm text-indigo-500 font-medium">Semana actual (09/02 - 16/02)</p>
                        <ChevronRight size={16} strokeWidth={2.5} className="cursor-pointer text-indigo-500" onClick={() => setWeek("next")} />
                    </>
                ) : (
                    <>
                        <ChevronLeft size={16} strokeWidth={2.5} className="cursor-pointer text-indigo-500" onClick={() => setWeek("current")} />
                        <p className="text-sm text-indigo-500 font-medium">Semana próxima (16/02 - 21/02)</p>
                    </>
                )}
            </div>

            <form id="appointmentForm" onSubmit={() => ""} className="flex flex-col sm:gap-10 gap-6 w-full">
                <div className="multiselect-row flex sm:flex-row flex-col sm:gap-4 gap-6 items-start justify-center w-full">
                    <MultiSelect label="Lunes XX" />

                    <MultiSelect label="Martes XX" />
                </div>

                <div className="multiselect-row flex sm:flex-row flex-col sm:gap-4 gap-6 items-start justify-center w-full">
                    <MultiSelect label="Miércoles XX" />

                    <MultiSelect label="Jueves XX" />
                </div>

                <div className="multiselect-row flex sm:flex-row flex-col sm:gap-4 gap-6 items-start h-full justify-center w-full">
                    <MultiSelect label="Viernes XX" />

                    <MultiSelect label="Sábado XX" />
                </div>
            </form>
        </MediumModal>
    );
};

export default AvailabilityModal;