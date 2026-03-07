// PURPOSE OF THE MODULE:
// By using the functions created in the "calendar-methods.ts" module, variables that will be used in the UI are generated here.

import { weekCreator, nextWeekNum } from "@/utils/system/calendar/calendar-methods";
import { intervalCreator } from "@/utils/system/calendar/calendar-methods";

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

// Build variables of the current week that the 'intervalCreator' function needs.
let firstIntervalP1 = currentWeekList[0].dayNum.number;
let firstIntervalMonth1 = Number(currentWeekList[0].dayNum.month);

let firstIntervalP2 = currentWeekList[5].dayNum.number;
let firstIntervalMont2 = Number(currentWeekList[5].dayNum.month);

const currentInterval = intervalCreator(firstIntervalP1, firstIntervalMonth1, firstIntervalP2, firstIntervalMont2);

// Build variables of the next week that the 'intervalCreator' function needs.
let secondIntervalP1 = nextWeekList[0].dayNum.number;
let secondIntervalMonth1 = Number(nextWeekList[0].dayNum.month);

let secondIntervalP2 = nextWeekList[5].dayNum.number;
let secondIntervalMonth2 = Number(nextWeekList[5].dayNum.month);

const nextInterval = intervalCreator(secondIntervalP1, secondIntervalMonth1, secondIntervalP2, secondIntervalMonth2);

export { currentWeekList, nextWeekList, currentInterval, nextInterval }


