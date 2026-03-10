import MediumModal from "./MediumModal";
import SmallModal from "./SmallModal";
import { Patient } from "@/utils/classes";
import { ActionModalProps, ModalProps, PatientType } from "@/utils/types";
import NewPatientForm from "../patients/NewPatientForm";
import api from "@/lib/axios";
import { useState } from "react";

function NewPatientModal(props: ModalProps) {
    async function saveBtnPressed(patientObject: Patient) {
        try {
            await api.post("/patients", patientObject);
        } catch (error) {
            console.log("There was an error while adding the patient:", error);
        };

        props.onSave();
    };

    return (
        <MediumModal
            isVisible={props.isVisible}
            btnType="submit"
            btnForm="patientForm"
            onClose={props.onClose}
            title="Registrar un paciente"
            confirmationBtnText="Registrar"

        >
            <NewPatientForm sendData={saveBtnPressed} formId="patientForm" isOnModify={false} modifyData={() => ""} editionId="" />

        </MediumModal>
    )
};

function ModifyPatientModal(props: ActionModalProps) {
    async function editPatient(databaseObject: Patient) {
        try {
            await api.put("/patients/" + props.updateElementId, databaseObject);
        } catch (error) {
            console.log("There was an error while updating the patient:", error)
        } finally {
            props.onSave();
        }
    };

    return (
        <MediumModal
            isVisible={props.isVisible}
            btnType="submit"
            btnForm="modifyPatientForm" // It should be "editPatientForm", find out how to change this dynamically.
            onClose={props.onClose}
            title="Modificar datos del paciente"
            confirmationBtnText="Guardar datos"
            onSave={props.onSave}
        >

            <NewPatientForm formId="modifyPatientForm" modifyData={editPatient} isOnModify={true} editionId={props.updateElementId} sendData={() => ""} />

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