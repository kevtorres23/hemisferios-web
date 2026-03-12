"use client";

import { useState, useContext, useEffect } from "react";
import { CardActionContext } from "@/app/system/therapists/page";
import { ArrowLeft, X, Check } from "lucide-react";
import IconButton from "../IconButton";
import CancelButton from "../CancelButton";
import { TherapistType } from "@/utils/types";
import { ScheduleUI } from "./ScheduleElements";
import { SquarePen } from "lucide-react";
import LoadingState from "../LoadingState";
import { ScheduleItem } from "@/utils/types";
import api from "@/lib/axios";

type ScheduleProps = {
    therapistId: string;
    mode: "view" | "edit";
};

function TherapistSchedule(props: ScheduleProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

    // State variables.
    const [therapistName, setTherapistName] = useState("");
    const [scheduleMode, setScheduleMode] = useState<"view" | "edit">("view");
    const setAction = useContext(CardActionContext);

    useEffect(() => {
        const getTherapistById = async () => {
            try {
                const res = await api.get("/therapists/" + props.therapistId);
                const therapistInfo: TherapistType = res.data;
                setTherapistName(therapistInfo.name + " " + therapistInfo.lastName);
                setSchedule(therapistInfo.schedule);
            } catch (error) {
                console.log("An error ocurred while getting the therapist info:", error);
            } finally {
                setIsLoading(false);
            };
        };

        getTherapistById();
    }, []);

    return (
        <div className="w-full flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 lg:items-center sm:items-start items-center sm:justify-between justify-center sm:w-auto w-full">
                <div className="flex sm:flex-row sm:w-auto w-full flex-col gap-3 items-center justify-center">
                    <ArrowLeft onClick={() => setAction("", props.therapistId)} size={24} className="text-slate-500 hover:text-indigo-500 cursor-pointer" />

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

            {isLoading && <LoadingState message="Cargando horario..." />}

            {!isLoading && <ScheduleUI therapistId={props.therapistId} data={schedule} mode={scheduleMode} />}
        </div>
    );
};

export default TherapistSchedule;