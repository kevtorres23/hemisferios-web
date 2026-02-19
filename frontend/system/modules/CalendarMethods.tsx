// PURPOSE OF THE MODULE: to obtain the hours in which the appointments will take place during the week.

import { AppointmentType } from "@/system/modules/Types";

function calendarHoursCreator(appointments: AppointmentType[]) {
    const calendarHours: string[] = []; // Array where we'll store the hours that the appointments have.

    for (let i = 0; i < appointments.length; i++) {
        if (calendarHours.includes(appointments[i].hour)) { // If the hour has been already added, let's skip this iteration.
            continue;
        } else {
            calendarHours.push(appointments[i].hour); // Add the appointment's hour on this iteration.
        };
    };

    return calendarHours;
};

function daysDistance(todaysNum: number, comparativeDayNum: number) {
    const days = [1, 2, 3, 4, 5, 6]; // This array represents the days with their corresponding number, where Monday is 1.

    return (days.indexOf(todaysNum) - days.indexOf(comparativeDayNum)); // It returns the difference of days between today and another day (second argument).
};

// Soluciones para el calendario: Crear un objeto con toda la info.


export { calendarHoursCreator, daysDistance };