// PURPOSE OF THE MODULE:
// By using the functions created in the "calendar-methods.ts" module, variables that will be used in the UI are generated here.

import { weekCreator, nextWeekNum } from "@/utils/system/calendar/calendar-methods";

type IntervalValue = {
    day: number | undefined,
    month: string,
};

type WeekInterval = {
    firstValue: IntervalValue,
    secondValue: IntervalValue,
};

// An array that contains the abbreviated month names.
const months = ["0", "ene.", "feb.", "mar.", "abr.", "mayo", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic."];

// Date variables.
const date = new Date();
const currentMonthNum = date.getMonth();
const todayMonthNum = date.getDate();
const nextWeekNumber = nextWeekNum(todayMonthNum);

// Week lists for the calendar.
const currentWeekList = weekCreator(todayMonthNum, currentMonthNum + 1);
const nextWeekList = weekCreator(nextWeekNumber.day, nextWeekNumber.month + 1);

/**
 * An object containing two sub-objects that respectively save the day and month values of the current week's lower and upper limits (Monday and Saturday).
 */
const currentInterval: WeekInterval = {
    firstValue: {
        day: currentWeekList[0].dayNum.number, // This key is equal to the day-of-the-month of the week's monday (start of the interval).
        month: months[currentWeekList[0].dayNum.month], // The month's name abbreviated, indexed from the months's array.
    },
    secondValue: {
        day: currentWeekList[5].dayNum.number, // This key is equal to the day-of-the-month of the week's saturday (end of the interval).
        month: months[currentWeekList[5].dayNum.month],
    }
};

/**
 * An object containing two sub-objects that respectively save the day and month values of the next week's lower and upper limits (Monday and Saturday).
 */

const nextInterval: WeekInterval = {
    firstValue: {
        day: nextWeekList[0].dayNum.number,
        month: months[nextWeekList[0].dayNum.month],
    },
    secondValue: {
        day: nextWeekList[5].dayNum.number,
        month: months[nextWeekList[5].dayNum.month],
    }
};


export { currentWeekList, nextWeekList, currentInterval, nextInterval }


