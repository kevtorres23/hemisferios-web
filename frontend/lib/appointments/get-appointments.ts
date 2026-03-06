import { AppointmentType } from "@/utils/types";
import api from "../axios";

/**
 *  A reusable function that gets all the appointments from the database.
 * @returns Fetched appointments from the database.
 */

async function getAllAppointments() {
    try {
        const res = await api.get("/appointments");
        const foundAppointments: AppointmentType = res.data;
        return foundAppointments;

    } catch (error) {
        console.log("An error ocurred while fetching the appointments:", error)
    }
};

export { getAllAppointments };