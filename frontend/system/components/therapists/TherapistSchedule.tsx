"use client";

import { useState, useContext } from "react";
import { CardActionContext } from "@/app/system/therapists/page";
import { ArrowLeft, X, Check } from "lucide-react";
import IconButton from "../IconButton";
import CancelButton from "../CancelButton";
import PageNavigator from "../PageNavigator";
import { PatientType, TherapistType } from "@/lib/Types";
import { ScheduleUI } from "./ScheduleElements";
import { SquarePen } from "lucide-react";

type ScheduleProps = {
    data: TherapistType[];
    mode: "view" | "edit";
};

function TherapistSchedule(props: ScheduleProps) {
    // State variables.
    const [numberOfWeeks, setNumberOfWeeks] = useState(2);
    const [therapistName, setTherapistName] = useState("Arlet Torres");
    const [scheduleMode, setScheduleMode] = useState<"view" | "edit">("view");
    const setAction = useContext(CardActionContext);

    return (
        <div className="w-full flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 lg:items-center sm:items-start items-center sm:justify-between justify-center sm:w-auto w-full">
                <div className="flex sm:flex-row sm:w-auto w-full flex-col gap-3 items-center justify-center">
                    <ArrowLeft onClick={() => setAction("")} size={24} className="text-slate-500 hover:text-indigo-500 cursor-pointer" />

                    <p className="text-2xl font-medium text-slate-900 tracking-tight text-center">
                        Horario de {therapistName}
                    </p>
                </div>

                <div className="mode-buttons">
                    {scheduleMode === "view" ? (
                        <div className="buttons flex lg:flex-row flex-col gap-3 lg:min-w-110 sm:w-auto w-full sm:items-center sm:justify-end">
                            <IconButton onClick={() => setScheduleMode("edit")} isActive={true} icon={<SquarePen size={18} />} text="Editar horario" />
                        </div>
                    ) : (
                        <div className="buttons flex lg:flex-row flex-col gap-3 lg:min-w-110 sm:w-auto w-full sm:items-center sm:justify-end">
                            <CancelButton onClick={() => setScheduleMode("view")} text="Cancelar" icon={<X size={18} />} />
                            <IconButton onClick={() => setScheduleMode("view")} isActive={true} icon={<Check size={18} />} text="Guardar cambios" />
                        </div>
                    )}
                </div>
            </div>

            <ScheduleUI data={props.data} mode={scheduleMode} />
        </div>
    );
};

export default TherapistSchedule;