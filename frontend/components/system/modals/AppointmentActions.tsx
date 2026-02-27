"use client";

import MediumModal from "./MediumModal";
import SmallModal from "./SmallModal";
import { Appointment } from "@/utils/classes";
import AppointmentForm from "@/components/website/AppointmentForm";
import { ModalProps, UpdateModalProps } from "@/utils/types";
import axios from "axios";
import { useState, useEffect } from "react";

function NewAppointmentModal(props: ModalProps) {

    function saveBtnPressed(receiptObject: Appointment, databaseObject: Appointment) {
        axios.post("http://localhost:5001/api/appointments", databaseObject);

        props.onSave();
    };

    return (
        <MediumModal
            isVisible={props.isVisible}
            btnType="submit"
            btnForm="creationForm"
            onClose={props.onClose}
            title="Agendar una cita manualmente"
            confirmationBtnText="Guardar cita"
        >

            <AppointmentForm formId="creationForm" isOnModify={false} sendData={saveBtnPressed} editionId={""} />

        </MediumModal>
    );
};

function ModifyAppointmentModal(props: UpdateModalProps) {

    function saveBtnPressed(receiptObject: Appointment, databaseObject: Appointment) {
        console.log("dbObject", databaseObject);

        axios.put("http://localhost:5001/api/appointments/" + props.updateElementId, databaseObject);
        props.onSave();
    };

    return (
        <MediumModal
            isVisible={props.isVisible}
            btnType="submit"
            btnForm="modifyForm"
            onClose={props.onClose}
            title="Modificar datos de la cita"
            confirmationBtnText="Guardar cambios"
            onSave={props.onSave}
        >

            <AppointmentForm formId="modifyForm" isOnModify={true} editionId={props.updateElementId} sendData={saveBtnPressed} />

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

function PendingAppointment(props: UpdateModalProps) {

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