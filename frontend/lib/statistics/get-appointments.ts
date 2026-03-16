import api from "../axios";
import { differenceInMonths } from "date-fns";
import { getDaysInMonth } from "@/utils/system/calendar/calendar-methods";
import { lessThanTen } from "@/utils/format-availability";
import { AppointmentType } from "@/utils/types";

/**
 * Gets all the appointments for a specific range of months.
 * E.g. From January first to April 31st.
 * @param month 
 * @returns An array containing all the arrays found to be within the limits of the month.
 */

async function getAppointmentsByRange(month1: number, month2: number) {
    try {
        const currentDate = new Date;
        const lastDay = getDaysInMonth(currentDate.getFullYear(), month2);

        const rangeDate1 = currentDate.getFullYear() + "-" + lessThanTen(month1) + "-01";
        const rangeDate2 = currentDate.getFullYear() + "-" + lessThanTen(month2) + "-" + lastDay;

        const res = await api.get("/appointments/dateRange/" + rangeDate1 + "/" + rangeDate2);
        const appointmentsOfMonth: AppointmentType[] = res.data;
        return appointmentsOfMonth;

    } catch (error) {
        console.log("An error ocurred while fetching the appointments:", error);
    };
};

export { getAppointmentsByRange };