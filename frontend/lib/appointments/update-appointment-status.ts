import { AppointmentType } from "@/utils/types";
import api from "../axios";
import { useAppointmentFilters } from "@/utils/system/appointments/filter-store";
import { FilterStore } from "@/utils/subtypes";

/**
 * This function updates the status of an appointment for one of the different three that it can have:
 * "pending", "finished", or "cancelled".
 * @param appointmentId 
 * @param newStatus 
 * @returns The refetched appointments from the database.
 */

async function updateStatus(appointmentId: string, newStatus: "pending" | "finished" | "cancelled", interval1: string, interval2: string) {
    try {
        // Get the data of the appointment with the given 'appointmentId' argument.
        const res = await api.get("/appointments/" + appointmentId);
        const foundAppointment: AppointmentType = res.data;

        // Create a new appointment object with the data of the fetched appointment.
        const newAppointment: AppointmentType = {
            _id: foundAppointment._id,
            patientName: foundAppointment.patientName,
            fatherSurname: foundAppointment.fatherSurname,
            motherSurname: foundAppointment.motherSurname,
            phoneNumber: foundAppointment.phoneNumber,
            status: newStatus, // Here, we change its status to the given 'newStatus' argument.
            date: foundAppointment.date,
            hour: foundAppointment.hour
        };

        // We update the appointment with the newly created appointment object.
        await api.put("/appointments/" + appointmentId, newAppointment);

        const newResponse = await api.get("/appointments/dateRange/" + interval1 + "/" + interval2);
        const updatedAppointments: AppointmentType[] = newResponse.data;
        return updatedAppointments; // Finally, we return the refetched the data from the database with the updated set of appointments.

    } catch (error) {
        console.log("An error ocurred:", error)
    }
}

export { updateStatus };