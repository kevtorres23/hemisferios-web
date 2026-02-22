import { PatientHistory } from "@/lib/Types";
import { Clock } from "lucide-react";

function HistoryRegistry(props: PatientHistory) {
    return (
        <div className="w-full bg-white border border-slate-200 rounded-md flex flex-col p-4 gap-3">
            <div className="bullet w-2 h-2 rounded-[50%] bg-indigo-500"></div>

            <div className="flex flex-col gap-3">
                <p className="text-base font-medium text-slate-900">
                    {props.date}
                </p>

                <div className="flex flex-row gap-2">
                    <div className="bullet w-2 h-2 rounded-[50%] bg-indigo-500"></div>

                    <p className="text-base font-medium text-slate-900">
                        {props.date}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HistoryRegistry;