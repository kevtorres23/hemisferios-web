// Set of functions that are used to filter the appointments.

import { AppointmentType } from "@/utils/types";
import { useAppointmentFilters } from "./filter-store";
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

function intervalFilter(array: AppointmentType[], point1: string, point2: string) {
    // Obtain the date values of the passed interval's points.
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
    });

    return filteredData;
};

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

function applyFilters(data: AppointmentType[], interval: [string, string], activeStatuses: Status) {
    let filter1 = intervalFilter(data, interval[0], interval[1]);
    let filteredData = statusFilter(filter1, activeStatuses);

    return filteredData;
}

export { intervalFilter, statusFilter, applyFilters };

