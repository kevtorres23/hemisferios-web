"use client";
import SystemLayout from "@/system/components/SystemLayout";
import { NewTherapistModal, ModifyTherapistModal, RemoveTherapistModal } from "@/system/components/modals/TherapistActions";
import EmptyState from "@/system/components/EmptyState";
import TherapistSchedule from "@/system/components/therapists/TherapistSchedule";
import therapistEmpty from "../../../public/therapists-empty.png";
import { pageSeparator } from "@/system/modules/PageSeparator";
import IconButton from "@/system/components/IconButton";
import SuccessModal from "@/system/components/modals/SuccessModal";
import { Plus, SquarePen } from "lucide-react";
import PageTitle from "@/system/components/PageTitle";
import { TherapistType } from "@/lib/Types";
import { useState, createContext } from "react";
import TherapistGrid from "@/system/components/therapists/TherapistGrid";

export const CardActionContext = createContext<(action: string) => void>(() => "");

type TherapistDataset = TherapistType[];

function Therapists() {
    const [successfulAction, setSuccessfulAction] = useState("");

    // Modal variables.
    const [newTherapistModal, setNewTherapistModal] = useState(false);
    const [cardAction, setCardAction] = useState("");
    const [success, setSuccess] = useState(false);

    const data: TherapistDataset = [
        {
            "name": "Arlet",
            "lastName": "Torres",
            "startingDate": "February, 2024",
            "contactNumber": "618-206-8767",
            "schedule": [
                {
                    "patient": "Kevin Torres",
                    "hour": "11:00",
                    "day": "Tuesday",
                },
            ],
        },
    ];

    let therapistPages = pageSeparator(data);


    function onActionSelected(action: string) {
        setCardAction(action);
    };

    function showSuccessModal(successMsg: string) {
        setSuccess(true);
        setSuccessfulAction(successMsg)
        setTimeout(() => setSuccess(false), 3000);
    };


    function saveTherapist() {
        setNewTherapistModal(false);
        showSuccessModal("¡Terapeuta registrado correctamente!");
    };

    function modifyTherapist() {
        setCardAction("");
        showSuccessModal("¡Terapeuta actualizado correctamente!");
    }

    function removeTherapist() {
        // DELETE axios controller.
        setCardAction("");
        showSuccessModal("Terapeuta eliminado correctamente.");
    };

    return (
        <SystemLayout sidebarPage="therapists" isAnyModal={newTherapistModal || cardAction === "cancel" || cardAction === "modify" || cardAction === "history"}
            modals={
                <>
                    <NewTherapistModal onSave={saveTherapist} isVisible={newTherapistModal} onClose={() => setNewTherapistModal(false)} />
                    <RemoveTherapistModal onSave={removeTherapist} isVisible={cardAction === "remove"} onClose={() => setCardAction("")} />
                    <ModifyTherapistModal onSave={modifyTherapist} isVisible={cardAction === "modify"} onClose={() => setCardAction("")} />
                </>
            }
        >

            <div className="header flex sm:flex-row flex-col justify-between items-start sm:gap-10 gap-6 w-full">
                <PageTitle title="Registro de Terapeutas" desc="Consulta un registro de los terapeutas que actualmente trabajan en el centro." />

                <div className="buttons flex lg:flex-row flex-col gap-3 lg:min-w-110 sm:w-auto w-full sm:items-center sm:justify-end">
                    <IconButton onClick={() => setNewTherapistModal(true)} isActive={true} icon={<Plus size={18} />} text="Registrar un terapeuta" />
                </div>
            </div>

            <SuccessModal isVisible={success} text={successfulAction} />

            {(data.length === 0) ? (
                <EmptyState
                    header="¡No hay terapeutas registrados aún!"
                    desc="Empieza registrando un terapeuta para empezar a ver la lista."
                    image={therapistEmpty}
                />
            ) : (cardAction === "schedule") ? (
                <>
                    <CardActionContext.Provider value={onActionSelected}>
                        <TherapistSchedule data={data} mode="view" />
                    </CardActionContext.Provider>
                </>
            ) : (
                <CardActionContext.Provider value={onActionSelected}>
                    <TherapistGrid data={therapistPages} onSearchChange={() => ""} />
                </CardActionContext.Provider>
            )}
        </ SystemLayout>
    );
};

export default Therapists;