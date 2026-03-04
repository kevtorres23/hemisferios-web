import { AppointmentType } from "@/utils/types";
import api from "./axios";

async function updateStatus(appointmentId: string, newStatus: "pending" | "finished" | "cancelled") {
    try {
        const res = await api.get("/appointments/" + appointmentId);
        const foundAppointment: AppointmentType = res.data;

        const newAppointment: AppointmentType = {
                _id: foundAppointment._id,
                patientName: foundAppointment.patientName,
                fatherSurname: foundAppointment.fatherSurname,
                motherSurname: foundAppointment.motherSurname,
                phoneNumber: foundAppointment.phoneNumber,
                status: newStatus,
                date: foundAppointment.date,
                hour: foundAppointment.hour
            };

        await api.put("/appointments/" + appointmentId, newAppointment);

    } catch (error) {
        console.log("An error ocurred:", error)
    }
}

export { updateStatus };