import { PatientRegistry, PatientType } from "@/utils/types";
import { Clock, Trash } from "lucide-react";
import { useState } from "react";
import CancelButton from "../CancelButton";
import NormalButton from "@/components/website/NormalButton";
import api from "@/lib/axios";

interface RegistryProps extends PatientRegistry {
    patientId: string;
    onDeleteRegistry: (id: string) => void;
}

function HistoryRegistry(props: RegistryProps) {
    const [onDelete, setOnDelete] = useState(false);

    async function onDeleteRegistry(id: string) {
        try {
            const res = await api.get("/patients/" + props.patientId);
            const foundPatient: PatientType = res.data;
            const registryList: PatientRegistry[] = [];

            foundPatient.visitRegistry.forEach((registry) => {
                if (registry._id === id) {
                    true;
                } else {
                    registryList.push(registry);
                };
            });

            foundPatient.visitRegistry = registryList;
            await api.put("/patients/" + props.patientId, foundPatient);

        } catch (error) {
            console.log("An error ocurred while deleting the registry:", error)
        } finally {
            props.onDeleteRegistry(id);
        }
    }

    return (
        <div className="w-full bg-white border border-slate-200 rounded-md flex flex-col p-4 gap-1.5">
            {onDelete && (
                <>
                    <div className="flex flex-col gap-4 w-full items-center justify-center">
                        <p className="text-base font-medium text-slate-900">¿Estás seguro de eliminar este registro?</p>

                        <div className="buttons flex sm:flex-row flex-col w-full gap-4 items-center justify-end">
                            <div className="flex flex-col w-full">
                                <CancelButton isNormal={true} onClick={() => setOnDelete(false)} text="Cancelar" />
                            </div>

                            <div className="flex flex-col w-full">
                                <NormalButton textSize="small" type="button" onClick={() => onDeleteRegistry(props._id)} text={"Eliminar"} />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {!onDelete && (
                <>
                    <div className="w-full flex flex-row items-center justify-between">
                        <div className="flex flex-row gap-1.5 items-center justify-start w-full">
                            <div className="bullet w-2 h-2 rounded-[50%] bg-indigo-500"></div>

                            <p className="text-base font-medium text-slate-900">
                                {props.date}
                            </p>
                        </div>

                        <Trash onClick={() => setOnDelete(true)} size={18} className="text-slate-500 hover:text-indigo-500 cursor-pointer" />
                    </div>

                    <div className="flex flex-row gap-1 items-center justify-start text-slate-600">
                        <Clock size={14} />

                        <p className="text-sm font-normal">
                            A las {props.hour} horas.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default HistoryRegistry;