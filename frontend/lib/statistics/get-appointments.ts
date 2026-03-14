import api from "../axios";
import { format } from "date-fns";
import { getDaysInMonth } from "@/utils/system/calendar/calendar-methods";
import { lessThanTen } from "@/utils/format-availability";
import { AppointmentType } from "@/utils/types";

async function getStatusCount(status: "pending" | "finished" | "cancelled") {
    try {
        const res = await api.get("/appointments/byStatus/" + status);
        const appointments = res.data;
        return appointments.length;
    } catch (error) {
        console.log("An error ocurred while fetching the appointments:", error);
    };
};

async function getAppointmentsOfMonth(month: number) {
    try {
        const currentDate = new Date;
        const lastDay = getDaysInMonth(currentDate.getFullYear(), month);

        const rangeDate1 = currentDate.getFullYear() + "-" + lessThanTen(month) + "-01";
        const rangeDate2 = currentDate.getFullYear() + "-" + lessThanTen(month) + "-" + lastDay;

        const res = await api.get("/appointments/dateRange/" + rangeDate1 + "/" + rangeDate2);
        const appointmentsOfMonth: AppointmentType[] = res.data;
        return appointmentsOfMonth;
        
    } catch (error) {
        console.log("An error ocurred while fetching the appointments:", error);
    };
};

export { getStatusCount, getAppointmentsOfMonth };