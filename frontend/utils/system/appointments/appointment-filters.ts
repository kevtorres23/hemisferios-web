// Set of functions that are used to filter the appointments.

import { AppointmentType } from "@/utils/types";
import { stringToDate } from "../calendar/calendar-methods";

type Status = {
    pending: boolean,
    finished: boolean,
    cancelled: boolean
};

/**
 * A function that filters an array of appointments based on two date points:
 * one for the upper limit's date, and other for the lower limit's one.
 * @param array 
 * @param point1 
 * @param point2 
 * @returns An array of appointments filtered with the interval points passed as arguments.
 */

/**
 * A function that filters an array of appointments based on their status.
 * @param array
 * @param activeStatuses
 * @returns An array of filtered appointments with the passed active status(es).
 */

function statusFilter(array: AppointmentType[], activeStatuses: Status) {
    const cancelled = activeStatuses.cancelled;
    const pending = activeStatuses.pending;
    const finished = activeStatuses.finished;

    let filteredData = array.filter((appointment) => {
        // Filter all the appointments whose status is true in the activeStatuses object.
        return ((pending ? appointment.status === "pending" : false) ||
            (cancelled ? appointment.status === "cancelled" : false) ||
            (finished ? appointment.status === "finished" : false));
    });

    return filteredData;
};

/**
 * Joins the interval and status filter into a single one to make them work in the Appointments page.
 * @param data 
 * @param interval 
 * @param activeStatuses 
 * @returns An array of filtered appointments with both the interval and status filters.
 */

function applyFilters(data: AppointmentType[], activeStatuses: Status) {
    let filteredData = statusFilter(data, activeStatuses);

    return filteredData;
};

export { statusFilter, applyFilters };

