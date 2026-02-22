"use client";
import SystemLayout from "@/system/components/SystemLayout";
import { NewPatientModal, ModifyPatientModal, RemovePatientModal } from "@/system/components/modals/PatientActions";
import { pageSeparator } from "@/system/modules/PageSeparator";
import IconButton from "@/system/components/IconButton";
import SuccessModal from "@/system/components/modals/SuccessModal";
import WhiteIconButton from "@/system/components/WhiteIconButton";
import { Plus, SquarePen } from "lucide-react";
import PageTitle from "@/system/components/PageTitle";
import { PatientType } from "@/lib/Types";
import PatientGrid from "@/system/components/patients/PatientGrid";
import { useState, createContext } from "react";

export const CardActionContext = createContext<(action: string) => void>(() => "");

type PatientDataset = PatientType[];

function Patients() {
    const [successfulAction, setSuccessfulAction] = useState("");

    // Modal variables.
    const [newPatientModal, setNewPatientModal] = useState(false);
    const [cardAction, setCardAction] = useState("");
    const [success, setSuccess] = useState(false);

    const data: PatientDataset = [
        {
            "name": "Kevin",
            "fatherSurname": "Torres",
            "motherSurname": "Urbina",
            "adultName": "María Urbina",
            "contactNumber": "61818899026",
            "startingDate": "10-10-2026",
            "paymentFrequency": "mensual",
            "paymentModality": "tarjeta",
            "appointmentHistory": [
                {
                    "date": "10-10-2025",
                    "hour": "09:00",
                }
            ],
        }
    ];

    function onActionSelected(action: string) {
        setCardAction(action);
    };

    let patientPages = pageSeparator(data);

    function showSuccessModal(successMsg: string) {
        setSuccess(true);
        setSuccessfulAction(successMsg)
        setTimeout(() => setSuccess(false), 3000);
    };


    function savePatient() {
        setNewPatientModal(false);
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
        <SystemLayout sidebarPage="patients" isAnyModal={newPatientModal || cardAction === "cancel" || cardAction === "modify"}
            modals={
                <>
                    <NewPatientModal onSave={savePatient} isVisible={newPatientModal} onClose={() => setNewPatientModal(false)} />
                    <RemovePatientModal onSave={removePatient} isVisible={cardAction === "remove"} onClose={() => setCardAction("")} />
                    <ModifyPatientModal onSave={modifyPatient} isVisible={cardAction === "modify"} onClose={() => setCardAction("")} />
                </>
            }
        >

            <div className="header flex sm:flex-row flex-col justify-between items-start sm:gap-10 gap-6 w-full">
                <PageTitle title="Registro de Pacientes" desc="Consulta un registro de los pacientes que están acudiendo actualmente al centro." />

                <div className="buttons flex lg:flex-row flex-col gap-3 lg:min-w-110 sm:w-auto w-full sm:items-center sm:justify-end">
                    <IconButton onClick={() => setNewPatientModal(true)} isActive={true} icon={<Plus size={18} />} text="Registrar un paciente" />
                </div>
            </div>

            <SuccessModal isVisible={success} text={successfulAction} />

            <CardActionContext.Provider value={onActionSelected}>
                <PatientGrid data={patientPages} onSearchChange={() => ""} onActionSelected={() => ""} />
            </CardActionContext.Provider>
        </ SystemLayout>
    );
};

export default Patients;