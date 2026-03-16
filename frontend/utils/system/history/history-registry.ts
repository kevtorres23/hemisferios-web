import { getAllAppointments } from "@/lib/appointments/get-appointments";
import { AppointmentType } from "@/utils/types";
import api from "@/lib/axios";

/**
 * Obtains the months and years available for the appointments' history.
 * @returns An object containing the month and year string values that are available for the history.
 */

type MonthRegistry = {
    monthNum: string;
    monthName: string;
}

type HistoryRegistry = {
    months: MonthRegistry[],
    years: string[],
}

async function historyAvailability() {
    const availableMonths: MonthRegistry[] = [];
    const availableYears: string[] = [];
    const addedMonths: string[] = [];

    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    try {

        // Get all the appointments from the database and store them in the 'appointments' variable.
        const res = await api.get("/appointments");
        const foundAppointments: AppointmentType[] = res.data;

        foundAppointments?.forEach((appointment) => {
            // Build the numeric and written value for the iterated appointment's month.
            const monthName = months[Number(appointment.date[5] + appointment.date[6]) - 1];
            const monthValue = appointment.date[5] + appointment.date[6]
            // Build the string value for the iterated appointment's year.
            const yearValue = appointment.date[0] + appointment.date[1] + appointment.date[2] + appointment.date[3];

            // Add the month to its corresponding array if it is not included already on it.
            if (addedMonths.includes(monthValue)) {
                return;
            } else {
                addedMonths.push(monthValue);
                availableMonths.push({
                    monthName: monthName,
                    monthNum: monthValue
                });
            };

            // Add the year to its corresponding array if it is not included already on it.
            if (availableYears.includes(yearValue)) {
                true;
            } else {
                availableYears.push(yearValue);
            };
        });

        const registryObject: HistoryRegistry = {
            months: availableMonths,
            years: availableYears,
        }

        return registryObject;

    } catch (error) {
        console.log("An error ocurred while fetching the appointments:", error)
    };
};

export { historyAvailability };