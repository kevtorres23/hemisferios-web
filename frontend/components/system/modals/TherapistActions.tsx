import MediumModal from "./MediumModal";
import SmallModal from "./SmallModal";
import NewTherapistForm from "../therapists/NewTherapistForm";
import { TherapistType } from "@/utils/types";
import { ModalProps } from "@/utils/types";

function NewTherapistModal(props: ModalProps) {
    function saveBtnPressed() {
        // axios POST controller.
    };

    return (
        <MediumModal
            isVisible={props.isVisible}
            btnType="submit"
            btnForm="therapistForm"
            onClose={props.onClose}
            title="Registrar un terapeuta"
            confirmationBtnText="Registrar"
            onSave={props.onSave}
        >
            <NewTherapistForm sendData={saveBtnPressed} />

        </MediumModal>
    );
};

function ModifyTherapistModal(props: ModalProps) {
    function saveBtnPressed(patientObject: TherapistType) {
        // PUT axios controller to update the therapist.
    };

    return (
        <MediumModal
            isVisible={props.isVisible}
            btnType="submit"
            btnForm="therapisttForm" // It should be "editTherapistForm", find out how to change this dynamically.
            onClose={props.onClose}
            title="Modificar datos del terapeuta"
            confirmationBtnText="Guardar datos"
            onSave={props.onSave}
        >

            <NewTherapistForm isOnModify={true} sendData={saveBtnPressed} />

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

export { NewTherapistModal, ModifyTherapistModal, RemoveTherapistModal };