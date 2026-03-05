import { AppointmentType } from "@/utils/types";
import api from "../axios";

async function getAllAppointments() {
    try {
        const res = await api.get("/appointments");
        const foundAppointment: AppointmentType = res.data;
        return foundAppointment;

    } catch (error) {
        console.log("An error ocurred:", error)
    }
};

export { getAllAppointments };