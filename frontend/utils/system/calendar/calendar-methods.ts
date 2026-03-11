// PURPOSE OF THE MODULE: to perform calculations needed for the calendar and the appointment availability.

import { lessThanTen } from "@/utils/format-availability";
import { AppointmentType } from "@/utils/types";

// Global scope variables.
const date = new Date();
const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const currentMonth = date.getMonth();

type weekDayObject = {
    dayName: string,
    dayNum: {
        number: number,
        month: number,
    },
};

const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate(); // Calculate the number of days in a given month.

/**
 * Calculates the day-of-the-month of today's day from the next week.
 * 
 * e.g. Today is 25 (Wednesday, Feb). **Calculation**: 4 (Wednesday, March).
 * @param todayMonthNum 
 * @returns An object containing the day-of-the-month and month number of seven days from today.
 */

function nextWeekNum(todayMonthNum: number) {
    const daysInCurrentMonth = getDaysInMonth(2026, currentMonth + 1);
    const nextWeekNum = todayMonthNum + 7; // Seven days from today.
    let nextMondayObj;

    // Checks if the next week's day is from the next month.
    if (nextWeekNum > daysInCurrentMonth) {
        nextMondayObj = {
            day: nextWeekNum - daysInCurrentMonth, // The difference of days between the exceeded day and the last day of the month, e.g. 30 - 28 = 2
            month: currentMonth + 1, // Increase the month number.
        };
    } else {
        nextMondayObj = {
            day: nextWeekNum,
            month: currentMonth,
        };
    };

    return nextMondayObj;
};

/**
 * Obtains all the different hours that the appointments of an array have.
 * @param appointments 
 * @returns An array containing all the obtained hours, e.g. `['10:00', '11:00', '12:00', ...]`
 */

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

/**
 * Sorts a list of hours in ascending order.
 * @param hoursArray 
 * @returns An array with the passed hours in ascending order.
 */

function hourSorter(hoursArray: string[]) {
    const hours = hoursArray;
    const sortedArray = [];

    function compareNums(a: number, b: number) {
        return a - b; // False if the operation's result is negative, true if it is positive.
    };

    // Get the first two digits of an hour and convert them into a number, e.g. 10 from '10:00'.
    const getFirstTwo = (index: number) => Number(hours[index][0] + hours[index][1]);

    for (let i = 0; i < hours.length; i++) {
        sortedArray.push(getFirstTwo(i));
    };

    sortedArray.sort(compareNums);

    // Finally, convert each number in the sorted array into an hour string, e.g. 10 -> 10:00, 11 -> 11:00.
    for (let i = 0; i < hours.length; i++) {
        sortedArray[i] = sortedArray[i] + ":00";
    };

    return sortedArray;
};

/**
 * Calculates the difference of days between today and another day, **positive** por past days, **negative** for future ones.
 * @returns A positive or negative number indicating the difference between the two numbers passed as arguments.
 *  */

function daysDistance(todaysNum: number, comparativeDayNum: number) {
    const days = [1, 2, 3, 4, 5, 6]; // Represents the days with their corresponding number, where Monday is 1.

    return (days.indexOf(todaysNum) - days.indexOf(comparativeDayNum));
};

/**
 * Creates an object for each day of the week with its corresponding name, day-of-the-month and month number, based on today's day-of-the month and month number.
 * @param todayMonthNum 
 * @param monthNum 
 * @returns An array containing the created objects.
 */

function weekCreator(todayMonthNum: number, monthNum: number) {
    const createdWeek: weekDayObject[] = []; // Array to save the objects that contain the day's name, day-of-the-month and month number.
    const todayWeekNum = date.getDay(); // This is equal to today's day in number, for example, 4 (for Jueves).
    const daysInCurrentMonth = getDaysInMonth(2026, monthNum);
    const daysInPreviousMonth = getDaysInMonth(2026, monthNum - 1);

    const month = monthNum;

    // Loop variables.
    let day;
    let num;
    let newMonthCounter = 1; // For when the calculated day starts a new month.
    let previousMonthCounter = daysInPreviousMonth;
    let distance;

    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    for (let i = 1; i < days.length; i++) {
        distance = daysDistance(todayWeekNum, i);
        day = days[i];
        num = todayMonthNum - distance;

        // A normal case, where the week is within the month's lower and upper limits.
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

        // If part of the week belongs to the previous month, we'll use the previousMonthCounter minus the calculated distance of days.
        if (num < 1) {
            createdWeek.push(
                {
                    dayName: day,
                    dayNum: {
                        number: previousMonthCounter + (num),
                        month: month - 1,
                    },
                },
            );
        };

        // Once the num counter exceeds the month's number of days, we'll use the newMonthCounter, to start on day 1 of the next month.
        if (num > daysInCurrentMonth) {
            createdWeek.push(
                {
                    dayName: day,
                    dayNum: {
                        number: newMonthCounter,
                        month: month + 1,
                    },
                },
            );

            newMonthCounter += 1;
        }
    };

    return (createdWeek);
};

/**
 * Finds coincidences between the calendar's and the appointment's date and hour to display them in the calendar layout.
 * @param weekList 
 * @param hourId 
 * @param dayId 
 * @param calendarHours 
 * @param data 
 * @returns An appointment object that matched the date and hour coincidence.
 */

function calendarContentGenerator(weekList: weekDayObject[], hourId: number, dayId: number, calendarHours: (string | number)[], data: AppointmentType[]) {

    // Get the hour and day values that are currently being mapped in the calendar.
    let calendarHour = calendarHours[hourId];
    let calendarDay = lessThanTen(weekList[dayId].dayNum.number);

    let coincidence: AppointmentType[] = []; // Initializing the coincidence.

    // The "data" parameter is the array of appointment objects brought from the database. We'll iterate over it.
    for (let i = 0; i < data.length; i++) {
        let dataDay = data[i].date[0] + data[i].date[1];
        let dataHour = data[i].hour;

        // If the hour and date of the current calendar's position is equal to the hour and date of the indexed appointment, it's a match.
        if ((dataDay === calendarDay.toString()) && (dataHour === calendarHour)) {
            coincidence.push(data[i]);
        } else {
            continue;
        }
    };

    return coincidence; // Return the matched appointment object.
};

/**
 * Obtains the day, month, and year values from a DD/MM/YYY-written date.
 * @param date 
 * @returns An object containing the day, month, and year values from the passed date.
 */

function stringToDate(date: string) {
    const separatedDate = date.split("/");

    return {
        day: Number(separatedDate[0]),
        month: Number(separatedDate[1]),
        year: Number(separatedDate[2]),
    };
};

/**
 * Builds a string-based interval of two points in a time period.
 * @param firstPointDay The day-of-the-month of the interval's first point.
 * @param firstPointMonth The month's number of the interval's first point (Where January is 1).
 * @param secondPointDay The day-of-the-month of the interval's second point.
 * @param secondPointMonth The month's number of the interval's second point (Where January is 1).
 * @returns An array containing two sub-arrays, one representing the interval's first point and another representing the second point.
 */

function intervalCreator(firstPointDay: number, firstPointMonth: number, secondPointDay: number, secondPointMonth: number) {
    // Month abbreviations. '0' is added to match the actual number of each month.
    const months = ["0", "ene.", "feb.", "mar.", "abr.", "mayo", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic."];

    return [[firstPointDay + " de " + months[firstPointMonth]], [secondPointDay + " de " + months[secondPointMonth]]];
};

export { 
    nextWeekNum,
    calendarHoursCreator, 
    daysDistance, 
    weekCreator, 
    hourSorter, 
    calendarContentGenerator, 
    stringToDate, 
    getDaysInMonth, 
    intervalCreator
};