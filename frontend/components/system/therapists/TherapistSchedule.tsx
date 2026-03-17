"use client";

import { useState, useContext } from "react";
import { CardActionContext } from "@/app/system/therapists/page";
import { ArrowLeft, CircleX } from "lucide-react";
import IconButton from "../IconButton";
import { currentInterval } from "@/utils/system/calendar/calendar-variables";
import { ScheduleUI } from "./ScheduleElements";
import { SquarePen } from "lucide-react";
import { ScheduleItem } from "@/utils/types";

type ScheduleProps = {
    therapistId: string;
    therapistName: string;
    schedule: ScheduleItem[];
    mode: "view" | "edit";
};

function TherapistSchedule(props: ScheduleProps) {
    // State variables.
    const [scheduleMode, setScheduleMode] = useState<"view" | "edit">("view");
    const setAction = useContext(CardActionContext);

    console.log(props.therapistId);

    return (
        <div className="w-full flex h-full border border-slate-200 bg-white rounded-lg p-6 flex-col gap-6">
            <div className="flex lg:flex-row flex-col gap-6 lg:items-center sm:items-start items-center sm:justify-between justify-center sm:w-auto w-full">
                <div className="flex sm:flex-row sm:w-auto w-full flex-col gap-4 items-center justify-center">
                    <ArrowLeft onClick={() => setAction("", "")} size={24} className="text-slate-500 hover:text-indigo-500 cursor-pointer" />

                    <p className="text-xl font-medium text-slate-900 tracking-tight text-center">
                        Horario de {props.therapistName}
                    </p>

                    <div className="week-indicator px-2.5 py-1 border border-indigo-400 bg-indigo-50 rounded-sm">
                        <p className="text-sm text-indigo-500 font-medium">
                            {currentInterval[0] + " - " + currentInterval[1]}
                        </p>
                    </div>
                </div>

                <div className="mode-buttons">
                    {scheduleMode === "view" ? (
                        <div className="buttons flex lg:flex-row flex-col gap-3 lg:min-w-110 sm:w-auto w-full sm:items-center sm:justify-end">
                            <IconButton onClick={() => setScheduleMode("edit")} isActive={true} icon={<SquarePen size={18} />} text="Editar horario" />
                        </div>
                    ) : (
                        <button onClick={() => setScheduleMode("view")} className="bg-slate-100 border border-slate-300 text-slate-700 tracking-tight flex flex-row items-center justify-center gap-1 px-3 py-2 rounded-lg cursor-pointer font-normal hover:bg-slate-200">
                            <CircleX size={18} />
                            <p className="text-sm font-medium">Cerrar editor</p>
                        </button>
                    )}
                </div>
            </div>

            <ScheduleUI therapistId={props.therapistId} data={props.schedule} mode={scheduleMode} />
        </div>
    );
};

export default TherapistSchedule;