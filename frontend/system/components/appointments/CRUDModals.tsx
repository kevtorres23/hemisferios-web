"use client";

import MediumModal from "../modals/MediumModal";
import { Appointment } from "@/website/modules/Classes";
import AppointmentForm from "@/website/components/CreateAppointmentForm";
import { useAppointmentStore } from "@/website/modules/StoreAppointment";
import { redirect } from "next/navigation";
import axios from "axios";
import { useState } from "react";

type ModalProps = {
    onSaveAppointment: () => void;
    isVisible: boolean;
    onClose: () => void;
    onSave: () => void;
};

function NewAppointmentModal(props: ModalProps) {
    const saveAppointment = useAppointmentStore((state: any) => state.saveAppointment);

    function saveBtnPressed(receiptObject: Appointment, databaseOject: Appointment) {
        axios.post("http://localhost:5001/api/appointments", receiptObject);
        saveAppointment(databaseOject);
    };

    return (
        <MediumModal
            isVisible={props.isVisible}
            btnType="submit"
            btnForm="appointmentForm"
            onClose={props.onClose}
            title="Agendar una cita manualmente"
            confirmationBtnText="Guardar cita"
            onSave={props.onSave}
        >

            <AppointmentForm sendData={saveBtnPressed} />

        </MediumModal>
    );
};

export { NewAppointmentModal }