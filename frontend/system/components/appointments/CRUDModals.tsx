import MediumModal from "../modals/MediumModal";
import { useState } from "react";

type ModalProps = {
    onSaveAppointment: () => void;
    isVisible: boolean;
    onClose: () => void;
}

function NewAppointmentModal(props: ModalProps) {
    function saveBtnPressed() {
        // Logic here to save the input's info in an object.

        props.onSaveAppointment(); // Pass here the created object.
    }

    return (
        <MediumModal
            isVisible={props.isVisible}
            onClose={props.onClose}
            title="Create"
            confirmationBtnText="Registrar cita"
            onSave={saveBtnPressed}
        >

        </MediumModal>
    );
};

export { NewAppointmentModal }