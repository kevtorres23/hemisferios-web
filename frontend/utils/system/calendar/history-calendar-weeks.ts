import { weekCreator } from "./calendar-methods";
import { daysDistance } from "./calendar-methods";

/**
 * Obtains the days of a specific month in a particular year, contained and separated in four weeks.
 * @param monthNum The month that we want to obtain all its weeks from.
 * @param year The month's year.
 */

function historyCalendarWeeks(monthNum: number, year: number) {
    // Build a date for the first day of the month passed as argument (-1 to match it with the way JavaScript handles month numbers).
    const passedDate = new Date(year, monthNum - 1, 1);

    const todayWeekNum = new Date().getDay(); // Get today's number of the week (0 for Sunday, 6 for Saturday).
    const firstDayWeekNum = passedDate.getDay(); // The number of the week of the passed month's first day - e.g. Wednesday (it is day number 3) 1st.

    const distance = daysDistance(todayWeekNum, firstDayWeekNum); // The distance between the two previous calculated numbers.

    const matchedDay = 1 + distance; // 1 will always be the first day of the month.

    // Obtain the five weeks of the month with the previous calculations.
    const firstWeek = weekCreator(matchedDay, monthNum);
    const secondWeek = weekCreator(matchedDay + 7, monthNum);
    const thirdWeek = weekCreator(matchedDay + 14, monthNum);
    const fourthWeek = weekCreator(matchedDay + 21, monthNum);
    const fifthWeek = weekCreator(matchedDay + 28, monthNum);

    // Finally, return the five weeks of the passed month grouped in an array.
    return [firstWeek, secondWeek, thirdWeek, fourthWeek, fifthWeek];
};

export { historyCalendarWeeks }