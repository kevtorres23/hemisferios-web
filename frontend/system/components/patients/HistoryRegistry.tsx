import { PatientHistory } from "@/lib/Types";
import { Clock } from "lucide-react";

function HistoryRegistry(props: PatientHistory) {
    return (
        <div className="w-full bg-white border border-slate-200 rounded-md flex flex-col p-4 gap-1.5">
            <div className="flex flex-row gap-1.5 items-center justify-start">
                <div className="bullet w-2 h-2 rounded-[50%] bg-indigo-500"></div>

                <p className="text-base font-medium text-slate-900">
                    {props.date}
                </p>
            </div>

            <div className="flex flex-row gap-1 items-center justify-start text-slate-600">
                <Clock size={14} />

                <p className="text-sm font-normal">
                    A las {props.hour} horas.
                </p>
            </div>
        </div>
    );
};

export default HistoryRegistry;