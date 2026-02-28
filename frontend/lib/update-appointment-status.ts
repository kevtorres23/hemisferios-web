import { AppointmentType } from "@/utils/types";
import api from "./axios";

async function updateStatus(appointmentId: string, newStatus: "pending" | "finished" | "cancelled") {
    try {
        const res = await api.get("/appointments/" + appointmentId);
        const foundAppointment: AppointmentType = res.data;

        if (foundAppointment != undefined) {
            foundAppointment.status = newStatus;
        };

        await api.put("/appointments/" + appointmentId, foundAppointment);

    } catch (error) {
        console.log("An error ocurred:", error)
    }
}

export { updateStatus };