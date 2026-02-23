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
            <NewPatientForm sendData={saveBtnPressed} />

        </MediumModal>
    )
};

function ModifyPatientModal(props: ModalProps) {
    function saveBtnPressed(patientObject: Patient) {
        // PUT axios controller to update the patient.
    };

    return (
        <MediumModal
            isVisible={props.isVisible}
            btnType="submit"
            btnForm="patientForm" // It should be "editPatientForm", find out how to change this dynamically.
            onClose={props.onClose}
            title="Modificar datos del paciente"
            confirmationBtnText="Guardar datos"
            onSave={props.onSave}
        >

            <NewPatientForm isOnModify={true} sendData={saveBtnPressed} />

        </MediumModal>
    );
};

function RemovePatientModal(props: ModalProps) {
    return (
        <SmallModal
            isVisible={props.isVisible}
            title="Eliminar paciente"
            message="¿Estás segur@ de que deseas eliminar este paciente?"
            btnType="button"
            onClose={props.onClose}
            onSave={props.onSave}
            confirmationBtnText="Eliminar"
        >

        </SmallModal>
    );
};

export { NewPatientModal, ModifyPatientModal, RemovePatientModal };