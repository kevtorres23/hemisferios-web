"use client";

import MediumModal from "./MediumModal";
import { Appointment } from "@/website/modules/Classes";
import AppointmentForm from "@/website/components/CreateAppointmentForm";
import { useAppointmentStore } from "@/website/modules/StoreAppointment";
import { ModalProps } from "@/system/modules/Types";
import { redirect } from "next/navigation";
import axios from "axios";
import { useState } from "react";

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