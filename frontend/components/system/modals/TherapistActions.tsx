import MediumModal from "./MediumModal";
import SmallModal from "./SmallModal";
import NewTherapistForm from "../therapists/NewTherapistForm";
import { ActionModalProps, ScheduleItem, TherapistType } from "@/utils/types";
import { ModalProps } from "@/utils/types";
import { Therapist } from "@/utils/classes";
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

function RemoveSchedulePatientModal(props: ModalProps) {
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