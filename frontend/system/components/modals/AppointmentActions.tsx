"use client";

import MediumModal from "./MediumModal";
import SmallModal from "./SmallModal";
import { Appointment } from "@/lib/Classes";
import AppointmentForm from "@/website/components/NewAppointmentForm";
import { ModalProps } from "@/lib/Types";
import axios from "axios";
import { useState } from "react";

function NewAppointmentModal(props: ModalProps) {

    function saveBtnPressed(receiptObject: Appointment, databaseOject: Appointment) {
        axios.post("http://localhost:5001/api/appointments", databaseOject);
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

function CompleteAppointment(props: ModalProps) {
    return (
        <SmallModal
            isVisible={props.isVisible}
            title="Completar cita"
            message="¿Deseas marcar esta cita como completa?"
            btnType="button"
            onClose={props.onClose}
            onSave={props.onSave}
            confirmationBtnText="Completar"
        >

        </SmallModal>
    );
};

function CancelAppointmentModal(props: ModalProps) {
    const [cancellationMsg, setCancellationMsg] = useState("");

    function onSubmitCancellation(e: React.FormEvent) {
        e.preventDefault();

        // Logic here to update the cancellation
    };

    return (
        <SmallModal
            isVisible={props.isVisible}
            title="Cancelar cita"
            message="Escribe a continuación los motivos por los que la cita será cancelada (opcional)."
            btnType="submit"
            btnForm="cancellationForm"
            onClose={props.onClose}
            onSave={props.onSave}
            confirmationBtnText="Terminar"
        >

            <form action="" id="cancellationForm" onSubmit={onSubmitCancellation}>
                <textarea value={cancellationMsg} rows={4} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCancellationMsg(e.target.value)} className="w-full py-2 px-3 min-h-24 h-auto bg-slate-50 border border-slate-200 rounded-md text-sm font-normal slate-800" />
            </form>

        </SmallModal>
    );
};

function PendingAppointment(props: ModalProps) {
    return (
        <SmallModal
            isVisible={props.isVisible}
            title="Marcar cita como pendiente"
            message="Estás segur@ de marcar esta cita como pendiente?"
            btnType="button"
            onClose={props.onClose}
            onSave={props.onSave}
            confirmationBtnText="Aceptar"
        >

        </SmallModal>
    );
};

function ModifyAppointmentModal(props: ModalProps) {
    function saveBtnPressed(receiptObject: Appointment, databaseOject: Appointment) {
        // PUT axios controller to upadte the appointment.
    };

    return (
        <MediumModal
            isVisible={props.isVisible}
            btnType="submit"
            btnForm="appointmentForm"
            onClose={props.onClose}
            title="Modificar datos de la cita"
            confirmationBtnText="Guardar cambios"
            onSave={props.onSave}
        >

            <AppointmentForm sendData={saveBtnPressed} />

        </MediumModal>
    );
};

function RemoveAppointModal(props: ModalProps) {
    return (
        <SmallModal
            isVisible={props.isVisible}
            title="Eliminar cita"
            message="¿Estás segur@ de que deseas eliminar esta cita?"
            btnType="button"
            onClose={props.onClose}
            onSave={props.onSave}
            confirmationBtnText="Eliminar"
        >

        </SmallModal>
    );
};

export { NewAppointmentModal, CompleteAppointment, CancelAppointmentModal, ModifyAppointmentModal, RemoveAppointModal, PendingAppointment }