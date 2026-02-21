// PURPOSE OF THE MODULE: to perform calculations needed for the calendar or the availability.

import { AppointmentType } from "@/system/modules/Types";

// This function returns the hours in which the appointments will take place during the week.
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

// This fuunction returns the difference of days between today and another day (second parameter).
function daysDistance(todaysNum: number, comparativeDayNum: number) {
    const days = [1, 2, 3, 4, 5, 6]; // This array represents the days with their corresponding number, where Monday is 1.

    return (days.indexOf(todaysNum) - days.indexOf(comparativeDayNum)); // It returns the difference of days between today and another day (second argument).
};

// Soluciones para el calendario: Crear un objeto con toda la info.

// This function pairs the week's day names with their corresponding month number, from the current week and from the next one.
function weekCreator() {
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const currentWeek = []; // Array to save the current week's day name and month number pairs.
    const nextWeek = []; // Array to save the next week's day name and month number pairs.

    const date = new Date();

    const month = date.getMonth();
    const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();
    const daysInMonth = getDaysInMonth(2026, month + 1);

    const todayNum = date.getDay(); // This is equal to today's week number, for example, 4 (for Jueves).
    const todayMonthNum = date.getDate(); // This is equal to the day of the month, for example, 19.

    for (let i = 0; i < dayNames.length; i++) {
        let currentCounter = todayMonthNum - daysDistance(todayNum, i);

        if (currentCounter > daysInMonth) {
            currentCounter = 1;
        }

        currentWeek.push({
            dayName: dayNames[i],
            monthNum: currentCounter
        });
    };

    for (let i = 0; i < dayNames.length; i++) {
        nextWeek.push({
            dayName: dayNames[i],
            monthNum: ( currentWeek[6].monthNum + i + 1),
        });
    };

    return { currentWeekDays: currentWeek, nextWeekDays: nextWeek };

    // Under construction.
};


export { calendarHoursCreator, daysDistance };