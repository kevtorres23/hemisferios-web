import MediumModal from "./MediumModal";
import SmallModal from "./SmallModal";
import { Patient } from "@/lib/Classes";
import { ModalProps } from "@/lib/Types";
import NewPatientForm from "../patients/NewPatientForm";
import { useState } from "react";

function NewPatientModal(props: ModalProps) {
    function saveBtnPressed(patientObject: Patient) {
        // axios POST controller.
    };

    return (
        <MediumModal
            isVisible={props.isVisible}
            btnType="submit"
            btnForm="patientForm"
            onClose={props.onClose}
            title="Registrar un paciente"
            confirmationBtnText="Registrar"
            onSave={props.onSave}
        >
            <NewPatientForm sendData={saveBtnPressed}/>

        </MediumModal>
    )
};

export { NewPatientModal };