import api from "../axios";
import { AppointmentType } from "@/utils/types";

/**
 * Checks if there are no more than two appointments with the same day and hour,
 * since two is the maximum number of appointments the center can currently handle on the same day, at the same hour.
 * @param day 
 * @param hour 
 * @returns A `boolean` that indicates if there are already two appointments with the same day and hour in the database. 
 */

async function isAvailabilityFull(day: string, hour: string) {
    try {
        const res = await api.get("/appointments");
        const appointments: AppointmentType[] = res.data;

        // Get all the pending appointments.
        const pendingAppointments = appointments.filter((appointment) => appointment.status === "pending");

        let counter = 0;

        pendingAppointments.forEach((appointment) => {
            if ((appointment.date === day) && (appointment.hour === hour)) {
                counter += 1; // We increment the counter by one if it finds a match with the given day and hour passed as arguments.
            };
        });

        return counter === 2; // If it is true, no more appointments can be created with this date and hour (it is full).

    } catch (error) {
        console.log(error);
    }
};

export default isAvailabilityFull;