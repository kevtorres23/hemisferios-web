"use client";
import SystemLayout from "@/components/system/SystemLayout";
import { NewPatientModal, ModifyPatientModal, RemovePatientModal } from "@/components/system/modals/PatientActions";
import toast, { Toaster } from 'react-hot-toast';
import EmptyState from "@/components/system/EmptyState";
import patientsEmpty from "../../../public/patients-empty.png";
import IconButton from "@/components/system/IconButton";
import { Plus } from "lucide-react";
import PageTitle from "@/components/system/PageTitle";
import { PatientType } from "@/utils/types";
import PatientGrid from "@/components/system/patients/PatientGrid";
import { useState, createContext, useEffect } from "react";
import api from "@/lib/axios";

export const CardActionContext = createContext<(action: string, id: string) => void>(() => "");

function Patients() {
    // Modal variables.
    const [newPatientModal, setNewPatientModal] = useState(false);
    const [cardAction, setCardAction] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [patientData, setPatientData] = useState<PatientType[]>([]);
    const [completedAction, setCompletedAction] = useState(0);
    const [patientId, setPatientId] = useState("");

    useEffect(() => {
        const fetchAllPatients = async () => {
            try {
                const res = await api.get("/patients");
                setPatientData(res.data);
            } catch (error) {
                console.log("Error while fetching the patients:", error);
            } finally {
                setIsLoading(false);
            };
        };

        fetchAllPatients();
    }, [completedAction]);

    function onActionSelected(action: string, id: string) {
        setCardAction(action);
        setPatientId(id);
    };

    function showSuccessModal(successMsg: string) {
        toast.success(<p className="font-medium">{successMsg}</p>, { duration: 2000 });
    };


    function savePatient() {
        setNewPatientModal(false);
        setCardAction("");
        setCompletedAction((completedAction) => completedAction += 1);
        showSuccessModal("¡Paciente registrado correctamente!");
    };

    function modifyPatient() {
        setCardAction("");
        showSuccessModal("¡Paciente actualizado correctamente!");
    }

    function removePatient() {
        // DELETE axios controller.
        setCardAction("");
        showSuccessModal("Paciente eliminado correctamente.");
    };

    return (
        <SystemLayout sidebarPage="patients" isAnyModal={newPatientModal || cardAction === "cancel" || cardAction === "modify" || cardAction === "history"}
            modals={
                <>
                    <NewPatientModal onSave={savePatient} isVisible={newPatientModal} onClose={() => setNewPatientModal(false)} />
                    <RemovePatientModal onSave={removePatient} isVisible={cardAction === "remove"} onClose={() => setCardAction("")} />
                    <ModifyPatientModal updateElementId={patientId} onSave={modifyPatient} isVisible={cardAction === "modify"} onClose={() => setCardAction("")} />
                </>
            }
        >

            <div className="header flex sm:flex-row flex-col justify-between items-start sm:gap-10 gap-6 w-full">
                <PageTitle title="Registro de Pacientes" desc="Consulta un registro de los pacientes que están acudiendo actualmente al centro." />

                <div className="buttons flex lg:flex-row flex-col gap-3 lg:min-w-110 sm:w-auto w-full sm:items-center sm:justify-end">
                    <IconButton onClick={() => setNewPatientModal(true)} isActive={true} icon={<Plus size={18} />} text="Registrar un paciente" />
                </div>
            </div>

            <Toaster />

            {isLoading && (
                <div className="w-full h-full flex items-center justify-center">
                    <p className="text-xl font-semibold text-slate-800">Cargando citas...</p>
                </div>
            )}

            {!isLoading && patientData.length === 0 && (
                <EmptyState
                    header="¡No hay pacientes registrados aún!"
                    desc="Empieza registrando un paciente para empezar a ver la lista."
                    image={patientsEmpty}
                />
            )}

            {patientData.length > 0 && (
                <CardActionContext.Provider value={onActionSelected}>
                    <PatientGrid data={patientData} onSearchChange={() => ""} onActionSelected={() => ""} />
                </CardActionContext.Provider>
            )}

        </ SystemLayout >
    );
};

export default Patients;