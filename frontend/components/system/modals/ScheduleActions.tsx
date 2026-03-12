import { useState } from "react";
import { ScheduleItemClass, Therapist } from "@/utils/classes";
import { TherapistType } from "@/utils/types";
import MediumModal from "./MediumModal";
import api from "@/lib/axios";
import Input from "@/components/website/Input";
import InputWarning from "@/components/website/InputWarning";
import { ModalProps } from "@/utils/types";

interface ScheduleModalProps extends ModalProps {
    therapistId: string;
    hour: string;
    day: string;
};

interface UpdateScheduleModalProps extends ModalProps {
    therapistId: string;
    schedulePatientId: string;
    hour: string;
    day: string;
};

function AddPatientScheduleModal(props: ScheduleModalProps) {
    const [patientName, setPatientName] = useState("");
    const [patientLastName, setPatientLastName] = useState("");
    const [isOnValidation, setIsOnValidation] = useState(false);

    async function onSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        setIsOnValidation(true);

        // Validating the inputs are not empty.
        if (!patientName || !patientLastName) {
            return;
        };

        try {
            const res = await api.get("/therapists/" + props.therapistId);
            const foundTherapist: TherapistType = res.data; // The data of the found therapist.
            const therapistSchedule: ScheduleItemClass[] = []; // An array where we'll save the therapist's schedule patients.

            foundTherapist.schedule.forEach((scheduleItem) => {
                /*if (scheduleItem._id === props.schedulePatientId) {
                    const 
                } Esto es para cuando queramos editar ese espacio.*/
                therapistSchedule.push(scheduleItem);
            });

            const newSchedulePatient = new ScheduleItemClass(patientName, patientLastName, props.hour, props.day);
            therapistSchedule.push(newSchedulePatient);

            const updatedTherapist = new Therapist(foundTherapist.name, foundTherapist.lastName, foundTherapist.startingDate, foundTherapist.contactNumber, therapistSchedule);

            await api.put("/therapists/" + props.therapistId, updatedTherapist);
        } catch (error) {
            console.log("An error ocurred while updating the therapist's schedule:", error);
        } finally {
            props.onSave();
        }
    };

    return (
        // Agregar en una descripción de la modal el día y la hora seleccionados.
        <MediumModal
            isVisible={props.isVisible}
            btnType="submit"
            btnForm="newScheduleItem"
            onClose={props.onClose}
            title="Registrar un terapeuta"
            confirmationBtnText="Registrar"
        >
            <form id="newScheduleItem" className="flex flex-col gap-4" onSubmit={(e: React.SubmitEvent) => onSubmit(e)}>
                <div className="flex flex-col gap-2 w-full">
                    <Input type="text" textValue={patientName} label="Nombre del paciente" onInputChange={(e) => setPatientName(e.target.value)} activeValidation={!patientName && isOnValidation} />
                    {!patientName && isOnValidation && <InputWarning message="Por favor, escribe el nombre del paciente." />}
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <Input type="text" textValue={patientLastName} label="Apellido del paciente" onInputChange={(e) => setPatientLastName(e.target.value)} activeValidation={!patientLastName && isOnValidation} />
                    {!patientLastName && isOnValidation && <InputWarning message="Por favor, escribe un apellido del paciente." />}
                </div>
            </form>

        </MediumModal>
    );
};

export { AddPatientScheduleModal };