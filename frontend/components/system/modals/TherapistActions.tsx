import MediumModal from "./MediumModal";
import { useState } from "react";
import SmallModal from "./SmallModal";
import NewTherapistForm from "../therapists/NewTherapistForm";
import { ActionModalProps, TherapistType } from "@/utils/types";
import { ModalProps } from "@/utils/types";
import { Therapist } from "@/utils/classes";
import Input from "@/components/website/Input";
import InputWarning from "@/components/website/InputWarning";
import { ScheduleItem } from "@/utils/types";
import { ScheduleItemClass } from "@/utils/classes";
import TherapistSchedule from "../therapists/TherapistSchedule";
import api from "@/lib/axios";

function NewTherapistModal(props: ModalProps) {
    async function saveBtnPressed(therapistObject: Therapist) {
        try {
            await api.post("/therapists", therapistObject);
        } catch (error) {
            console.log("An error ocurred while registering the therapist:", error);
        };

        props.onSave();
    };

    return (
        <MediumModal
            isVisible={props.isVisible}
            btnType="submit"
            btnForm="therapistForm"
            onClose={props.onClose}
            title="Registrar un terapeuta"
            confirmationBtnText="Registrar"
        >
            <NewTherapistForm sendData={saveBtnPressed} formId="therapistForm" isOnModify={false} modifyData={() => ""} editionId="" />

        </MediumModal>
    );
};

interface ScheduleModalProps extends ModalProps {
    therapistId: string;
    schedulePatientId: string;
    hour: string;
    day: string;
}

function AddPatientScheduleModal(props: ScheduleModalProps) {
    const [patientName, setPatientName] = useState("");
    const [patientLastName, setPatientLastName] = useState("");
    const [isOnValidation, setIsOnValidation] = useState(false);

    async function onSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        setIsOnValidation(true);

        if (!patientName || !patientLastName) {
            return;
        };

        const newSchedulePatient = new ScheduleItemClass(patientName, patientLastName, props.hour, props.day);

        await api.put("/therapists/" + props.therapistId, );
    };

    return (
        <MediumModal
            isVisible={props.isVisible}
            btnType="submit"
            btnForm="therapistForm"
            onClose={props.onClose}
            title="Registrar un terapeuta"
            confirmationBtnText="Registrar"
        >
            <form id="newScheduleItem" onSubmit={(e: React.SubmitEvent) => onSubmit(e)}>
                <div className="flex flex-col gap-2 w-full">
                    <Input type="text" textValue={patientName} label="Nombre del paciente" onInputChange={(e) => setPatientName(e.target.value)} activeValidation={!patientName && isOnValidation} />
                    {!patientName && isOnValidation && <InputWarning message="Por favor, escribe el nombre del paciente." />}
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <Input type="text" textValue={patientName} label="Apellido del paciente" onInputChange={(e) => setPatientLastName(e.target.value)} activeValidation={!patientLastName && isOnValidation} />
                    {!patientLastName && isOnValidation && <InputWarning message="Por favor, escribe un apellido del paciente." />}
                </div>
            </form>

        </MediumModal>
    );
}

function ModifyTherapistModal(props: ActionModalProps) {
    async function editTherapist(therapistObject: Therapist) {
        try {
            await api.put("/therapists/" + props.updateElementId, therapistObject);
        } catch (error) {
            console.log("There was an error while updating the therapist:", error);
        } finally {
            props.onSave();
        }
    };

    return (
        <MediumModal
            isVisible={props.isVisible}
            btnType="submit"
            btnForm="editTherapistForm"
            onClose={props.onClose}
            title="Modificar datos del terapeuta"
            confirmationBtnText="Guardar datos"
        >

            <NewTherapistForm formId="editTherapistForm" modifyData={editTherapist} isOnModify={true} editionId={props.updateElementId} sendData={() => ""} />

        </MediumModal>
    );
};

function RemoveTherapistModal(props: ModalProps) {
    return (
        <SmallModal
            isVisible={props.isVisible}
            title="Eliminar terapeuta"
            message="¿Estás segur@ de que deseas eliminar este terapeuta?"
            btnType="button"
            onClose={props.onClose}
            onSave={props.onSave}
            confirmationBtnText="Eliminar"
        >

        </SmallModal>
    );
};

function RemoveSchedulePatientModal(props: ActionModalProps) {
    return (
        <SmallModal
            isVisible={props.isVisible}
            title="Eliminar paciente del horario"
            message="¿Estás segur@ de que deseas eliminar este paciente del horario?"
            btnType="button"
            onClose={props.onClose}
            onSave={props.onSave}
            confirmationBtnText="Eliminar"
        >

        </SmallModal>
    );
};

export { NewTherapistModal, ModifyTherapistModal, RemoveTherapistModal, RemoveSchedulePatientModal };