// PURPOSE OF THE MODULE: to perform calculations needed for the calendar or the availability.

import { AppointmentType } from "@/utils/types";

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

// This function returns the difference of days between today and another day (second parameter).
function daysDistance(todaysNum: number, comparativeDayNum: number) {
    const days = [1, 2, 3, 4, 5, 6]; // This array represents the days with their corresponding number, where Monday is 1.

    return (days.indexOf(todaysNum) - days.indexOf(comparativeDayNum)); // It returns the difference of days between today and another day (second argument).
};

// Soluciones para el calendario: Crear un objeto con toda la info.

// This function pairs the week's day names with their corresponding month number, from the current week and from the next one, like "Monday 10".
function weekCreator(todayMonthNum: number, currentMonthNum: number) {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const currentWeek = []; // Array to save the pairs of the current week's day names and month numbers.
    const nextWeek = []; // Array to save the pairs of the next week's day names and month numbers.

    const date = new Date();

    const currentMonth = currentMonthNum;

    const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate(); // Calculate the number of days in a given month.
    const daysInPreviousMonth = getDaysInMonth(2026, currentMonth);
    const daysInCurrentMonth = getDaysInMonth(2026, currentMonth - 1);
    console.log("Días", daysInCurrentMonth);
    const daysInNextMonth = getDaysInMonth(2026, currentMonth + 2);

    const todayWeekNum = date.getDay(); // This is equal to today's day in number, for example, 4 (for Jueves).
    // getDate to obtain the month number.

    let day;
    let num;
    let newMonthCounter = 1;
    let previousMonthCounter = daysInPreviousMonth;
    let distance;

    for (let i = 1; i < days.length; i++) {
        distance = daysDistance(todayWeekNum, i);
        day = days[i];
        num = todayMonthNum - distance;

        if ((num <= daysInCurrentMonth) && (num >= 1)) {
            currentWeek.push(
                {
                    dayName: day,
                    dayNum: num,
                }
            );

            continue;
        };

        if (num < 1) {
            currentWeek.push(
                {
                    dayName: day,
                    dayNum: previousMonthCounter - (distance - 1),
                },
            );
        };

        if (num > daysInCurrentMonth) {
            currentWeek.push(
                {
                    dayName: day,
                    dayNum: newMonthCounter,
                },
            );

            newMonthCounter += 1;
        }
    };

    return (currentWeek);
};

export { calendarHoursCreator, daysDistance, weekCreator };