// Set of functions that are used to filter the appointments.

import { AppointmentType } from "@/utils/types";
import { useAppointmentFilters } from "./filter-store";
import { stringToDate } from "../calendar/calendar-methods";

type Status = {
    pending: boolean,
    finished: boolean,
    cancelled: boolean
};

type FilterStore = {
    interval: [string, string],
    statusObject: Status,
    updateInterval: (newIntervalArray: [string, string]) => void, // When "position" is 0, it updates the first parameter of the interval, or the second one, when it is 1.
    updateStatus: (statusObject: Status) => void,
};

function intervalFilter(array: AppointmentType[], point1: string, point2: string) {
    const point1Values = stringToDate(point1);
    const point2Values = stringToDate(point2);

    let filteredData = array.filter((appointment) => {
        const separatedDate = stringToDate(appointment.date);

        // Filter conditions (in boolean).
        let condition1 = separatedDate.day >= point1Values.day; // If the day number of the appointment is greater or equal than the one in the interval's first point.
        let condition2 = separatedDate.day <= point2Values.day; // If the day of number the appointment is less or equal than the one in the interval's second point.
        let condition3 = separatedDate.month <= point2Values.month; // If the month of the appointment is less or equal than the one in the interval's second point.
        let condition4 = separatedDate.year <= point2Values.year; // If the year of the appointment is less or equal than the one interval's second point.

        return condition1 && condition2 && condition3 && condition4;
    })

    return filteredData;
};

function statusFilter(array: AppointmentType[], activeStatuses: Status) {
    const cancelled = activeStatuses.cancelled;
    const pending = activeStatuses.pending;
    const finished = activeStatuses.finished;

    let filteredData = array.filter((appointment) => {
        return ((pending ? appointment.status === "pending" : false) ||
                (cancelled ? appointment.status === "cancelled" : false) ||
                (finished ? appointment.status === "finished" : false));
    });

    return filteredData;
};

export { intervalFilter, statusFilter };

// Creo que podríamos aplicar primero una función. Después, al nuevo array, le aplicamos la siguiente función de filtrado.
// Y así hasta usar todas las funciones de filtrado.

