// PURPOSE OF THE MODULE: to perform calculations needed for the calendar and the appointment availability.

// Global scope variables.
const date = new Date();
const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const currentMonth = date.getMonth();

// Global scope arrow functions.
const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate(); // Calculate the number of days in a given month.

// Calculates the day-of-the-month of today's day from the next week. Ex. Today: 25 (Wednesday, Feb), Next week: 4 (Wednesday, March).
function nextWeekNum(todayMonthNum: number) {
    const daysInCurrentMonth = getDaysInMonth(2026, currentMonth + 1);
    const nextWeekNum = todayMonthNum + 7;
    let nextMondayObj;

    if (nextWeekNum > daysInCurrentMonth) {
        nextMondayObj = {
            day: nextWeekNum - daysInCurrentMonth, // The difference of days, example: 30 - 28 = 2
            month: currentMonth + 1,
        };
    } else {
        nextMondayObj = {
            day: nextWeekNum,
            month: currentMonth,
        };
    };

    return nextMondayObj;
};

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

// This function returns the difference of days between today and another day, positive por past days, negative for future ones.
function daysDistance(todaysNum: number, comparativeDayNum: number) {
    const days = [1, 2, 3, 4, 5, 6]; // This array represents the days with their corresponding number, where Monday is 1.

    return (days.indexOf(todaysNum) - days.indexOf(comparativeDayNum)); // Return the difference of days between today and another day (second argument).
};

// Pairs the week's day names with their corresponding month number.
function weekCreator(todayMonthNum: number, monthNum: number) {
    const createdWeek = []; // Array to save the pairs of the current week's day names and month numbers.
    const todayWeekNum = date.getDay(); // This is equal to today's day in number, for example, 4 (for Jueves).
    const daysInCurrentMonth = getDaysInMonth(2026, monthNum + 1);
    const daysInPreviousMonth = getDaysInMonth(2026, monthNum);

    const month = monthNum;

    // Loop variables.
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
            createdWeek.push(
                {
                    dayName: day,
                    dayNum: {
                        number: num,
                        month: month,
                    },
                }
            );

            continue;
        };

        if (num < 1) {
            createdWeek.push(
                {
                    dayName: day,
                    dayNum: {
                        number: previousMonthCounter - (distance - 1),
                        month: month - 1,
                    },
                },
            );
        };

        if (num > daysInCurrentMonth) {
            createdWeek.push(
                {
                    dayName: day,
                    dayNum: {
                        newMonthCounter,
                        month: month + 1,
                    },
                },
            );

            newMonthCounter += 1;
        }
    };

    return (createdWeek);
};

export { nextWeekNum, calendarHoursCreator, daysDistance, weekCreator };