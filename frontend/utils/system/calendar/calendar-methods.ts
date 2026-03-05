// PURPOSE OF THE MODULE: to perform calculations needed for the calendar and the appointment availability.

import { lessThanTen } from "@/utils/format-availability";

// Global scope variables.
const date = new Date();
const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const currentMonth = date.getMonth();

type CreatedWeek = {
    dayName: string,
    dayNum: {
        number: number,
        month: number,
    },
};

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

// Sorts the hours of the calendar in ascending order.
function hourSorter(hoursArray: string[]) {
    const hours = hoursArray;
    const sortedArray = [];

    function compareNums(a: number, b: number) {
        return a - b;
    };

    const getFirstTwo = (index: number) => Number(hours[index][0] + hours[index][1]);

    for (let i = 0; i < hours.length; i++) {
        sortedArray.push(getFirstTwo(i));
    };

    sortedArray.sort(compareNums);

    for (let i = 0; i < hours.length; i++) {
        sortedArray[i] = sortedArray[i] + ":00";
    };

    return sortedArray;
};

// This function returns the difference of days between today and another day, positive por past days, negative for future ones.
function daysDistance(todaysNum: number, comparativeDayNum: number) {
    const days = [1, 2, 3, 4, 5, 6]; // Represents the days with their corresponding number, where Monday is 1.

    return (days.indexOf(todaysNum) - days.indexOf(comparativeDayNum)); // Returns the difference of days between today and another day (second argument).
};

// Pairs the week's day names with their corresponding month number based on today's day-of-the-month and the current month number.
function weekCreator(todayMonthNum: number, monthNum: number) {
    const createdWeek: CreatedWeek[] = []; // Array to save the pairs of the current week's day names and month numbers.
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

        // A normal case, the week is within the month's lower and upper limits.
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
                        number: previousMonthCounter - (distance - 1),
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

// Finds coincidences between the calendar's and the appointment's hour and days to then display them.
function calendarContentGenerator(weekList: CreatedWeek[], hourId: number, dayId: number, calendarHours: (string | number)[], data: AppointmentType[]) {

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

// This function receives a DD/MM/YY date format and returns its day, month and year values.
function stringToDate(date: string) {
    const separatedDate = date.split("/");
    
    return {
        day: Number(separatedDate[0]),
        month: Number(separatedDate[1]),
        year: Number(separatedDate[2]),
    };
};

export { nextWeekNum, calendarHoursCreator, daysDistance, weekCreator, hourSorter, calendarContentGenerator, stringToDate };