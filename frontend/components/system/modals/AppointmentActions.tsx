"use client";

import MediumModal from "./MediumModal";
import { updateStatus } from "@/lib/update-appointment-status";
import { AppointmentType } from "@/utils/types";
import api from "@/lib/axios";
import SmallModal from "./SmallModal";
import { Appointment } from "@/utils/classes";
import AppointmentForm from "@/components/website/AppointmentForm";
import { ModalProps, ActionModalProps, UpdateStatusModal } from "@/utils/types";
import { useState, useEffect } from "react";

function NewAppointmentModal(props: ModalProps) {
    async function saveBtnPressed(receiptObject: Appointment, databaseObject: Appointment) {
        await api.post("/appointments", databaseObject);
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

            <AppointmentForm formId="creationForm" isOnModify={false} sendData={saveBtnPressed} modifyData={() => ""} editionId={""} />

        </MediumModal>
    );
};

function ModifyAppointmentModal(props: ActionModalProps) {
    async function editAppointment(databaseObject: Appointment) {
        await api.put("/appointments/" + props.updateElementId, databaseObject);
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
        >

            <AppointmentForm formId="modifyForm" isOnModify={true} editionId={props.updateElementId} modifyData={editAppointment} sendData={() => ""} />

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

function CancelAppointmentModal(props: ActionModalProps) {
    const [cancellationMsg, setCancellationMsg] = useState("");

    async function onSubmitCancellation(e: React.FormEvent) {
        e.preventDefault();

        try {
            const res = await api.get("/appointments/" + props.updateElementId);
            const foundAppointment: AppointmentType = res.data;

            if (!cancellationMsg) {
                foundAppointment.cancellationComment = "placeholder";
                foundAppointment.status = "cancelled";
                api.put("/appointments/" + props.updateElementId, foundAppointment);
                
            } else if (foundAppointment != undefined) {
                foundAppointment.cancellationComment = cancellationMsg;
                foundAppointment.status = "cancelled";
                api.put("/appointments/" + props.updateElementId, foundAppointment);
            };

            props.onSave();

        } catch (error) {
            console.log("An error ocurred:", error)
        };
    };

    return (
        <SmallModal
            isVisible={props.isVisible}
            title="Cancelar cita"
            message="Escribe a continuación los motivos por los que la cita será cancelada (opcional)."
            btnType="submit"
            btnForm="cancellationForm"
            onClose={props.onClose}
            confirmationBtnText="Terminar"
        >

            <form action="" id="cancellationForm" onSubmit={onSubmitCancellation}>
                <textarea value={cancellationMsg} rows={4} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCancellationMsg(e.target.value)} className="w-full py-2 px-3 min-h-24 h-auto bg-slate-50 border border-slate-200 rounded-md text-sm font-normal slate-800" />
            </form>

        </SmallModal>
    );
};

function PendingAppointment(props: ActionModalProps) {

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

function RemoveAppointModal(props: ActionModalProps) {
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