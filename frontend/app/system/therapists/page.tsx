"use client";

import toast, { Toaster } from 'react-hot-toast';
import SystemLayout from "@/components/system/SystemLayout";
import { NewTherapistModal, ModifyTherapistModal, RemoveTherapistModal } from "@/components/system/modals/TherapistActions";
import { AddPatientScheduleModal } from '@/components/system/modals/ScheduleActions';
import EmptyState from "@/components/system/EmptyState";
import TherapistSchedule from "@/components/system/therapists/TherapistSchedule";
import therapistEmpty from "../../../public/therapists-empty.png";
import IconButton from "@/components/system/IconButton";
import { Plus } from "lucide-react";
import PageTitle from "@/components/system/PageTitle";
import { TherapistType } from "@/utils/types";
import { useState, createContext, useEffect } from "react";
import TherapistGrid from "@/components/system/therapists/TherapistGrid";
import api from '@/lib/axios';
import LoadingState from '@/components/system/LoadingState';

export const CardActionContext = createContext<(action: string, id: string) => void>(() => "");
export const ScheduleActionContext = createContext<(
    action: string,
    therapistId: string,
    hour: string,
    day: string,
    patientId: string,
    patientName: string,
    patientLastName: string) => void>(() => "");

function Therapists() {

    // Modal variables.
    const [newTherapistModal, setNewTherapistModal] = useState(false);
    const [cardAction, setCardAction] = useState("");
    const [therapistData, setTherapistData] = useState<TherapistType[]>([]);
    const [scheduleHour, setScheduleHour] = useState("");
    const [scheduleDay, setScheduleDay] = useState("");
    const [schedulePatientName, setSchedulePatientName] = useState("");
    const [schedulePatientLastName, setSchedulePatientLastName] = useState("");
    const [schedulePatientId, setSchedulePatientId] = useState("");
    const [therapistId, setTherapistId] = useState("");
    const [completedAction, setCompletedAction] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllTherapists = async () => {
            try {
                const res = await api.get("/therapists");
                setTherapistData(res.data);
            } catch (error) {
                console.log("Error while fetching the therapists:", error);
            } finally {
                setIsLoading(false);
            };
        };

        fetchAllTherapists();
    }, [completedAction])

    function onActionSelected(action: string, id: string) {
        setCardAction(action);
        setTherapistId(id);
    };

    function onScheduleActionSelected(action: string, therapistId: string, hour: string, day: string, patientId: string, patientName: string, patientLastName: string) {
        setCardAction(action);
        setTherapistId(therapistId);
        setScheduleHour(hour);
        setScheduleDay(day);
        setSchedulePatientId(patientId);
        setSchedulePatientName(patientName);
        setSchedulePatientLastName(patientLastName);
    };

    function showSuccessModal(successMsg: string) {
        toast.success(<p className="font-medium">{successMsg}</p>, { duration: 2000 });
    };

    function saveTherapist() {
        setNewTherapistModal(false);
        setCardAction("");
        showSuccessModal("¡Terapeuta registrado!");
        setCompletedAction((completedAction) => completedAction += 1);
    };

    function modifyTherapist() {
        setCardAction("");
        showSuccessModal("¡Terapeuta actualizado!");
        setCompletedAction((completedAction) => completedAction += 1);
    }

    function removeTherapist() {
        api.delete("/therapists/" + therapistId);
        setCardAction("");
        setTherapistData((prev: TherapistType[]) => prev.filter((therapist) => therapist._id != therapistId))
        showSuccessModal("Terapeuta eliminado.");
    };

    function saveSchedulePatient() {
        setCardAction("schedule");
        showSuccessModal("¡Se agregó el paciente!");
        setCompletedAction((completedAction) => completedAction += 1);
    };

    return (
        <SystemLayout sidebarPage="therapists" isAnyModal={newTherapistModal || cardAction === "modify" || cardAction === "remove" || cardAction === "add-to-schedule"}
            modals={
                <>
                    {newTherapistModal && (<NewTherapistModal onSave={saveTherapist} isVisible={newTherapistModal} onClose={() => setNewTherapistModal(false)} />)}

                    {cardAction === "remove" && (<RemoveTherapistModal onSave={removeTherapist} isVisible={cardAction === "remove"} onClose={() => setCardAction("")} />)}

                    {cardAction === "modify" && (<ModifyTherapistModal onSave={modifyTherapist} updateElementId={therapistId} isVisible={cardAction === "modify"} onClose={() => setCardAction("")} />)}

                    {cardAction === "add-to-schedule" && (<AddPatientScheduleModal onSave={saveSchedulePatient} isVisible={cardAction === "add-to-schedule"} therapistId={therapistId} hour={scheduleHour} day={scheduleDay} onClose={() => setCardAction("schedule")} />)}
                </>
            }
        >

            <div className="header flex sm:flex-row flex-col justify-between items-start sm:gap-10 gap-6 w-full">
                <PageTitle title="Registro de Terapeutas" desc="Consulta un registro de los terapeutas que actualmente trabajan en el centro." />

                <div className="buttons flex lg:flex-row flex-col gap-3 lg:min-w-110 sm:w-auto w-full sm:items-center sm:justify-end">
                    <IconButton onClick={() => setNewTherapistModal(true)} isActive={true} icon={<Plus size={18} />} text="Registrar un terapeuta" />
                </div>
            </div>

            <Toaster />

            {isLoading && <LoadingState message="Cargando terapeutas..." />}

            {!isLoading && therapistData.length === 0 && (
                <EmptyState
                    header="¡No hay terapeutas registrados aún!"
                    desc="Empieza registrando un terapeuta para empezar a ver la lista."
                    image={therapistEmpty}
                />
            )}

            {!isLoading && cardAction != "schedule" && cardAction != "add-to-schedule" && (
                <CardActionContext.Provider value={onActionSelected}>
                    <TherapistGrid data={therapistData} onSearchChange={() => ""} />
                </CardActionContext.Provider>
            )}

            {!isLoading && (cardAction === "schedule" || cardAction === "add-to-schedule") && (
                <ScheduleActionContext.Provider value={onScheduleActionSelected}>
                    <TherapistSchedule therapistId={therapistId} mode="view" />
                </ScheduleActionContext.Provider>
            )}
        </ SystemLayout>
    );
};

export default Therapists;