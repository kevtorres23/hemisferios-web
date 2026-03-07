import { create } from "zustand";
import monthLimits from "./month-limits";
import { lessThanTen } from "@/utils/format-availability";

type Status = {
    finished: boolean,
    cancelled: boolean
}

type FilterStore = {
    interval: [string, string],
    statusObject: Status,
    updateInterval: (newIntervalArray: [string, string]) => void, // When "position" is 0, it updates the first parameter of the interval, or the second one, when it is 1.
    updateStatus: (statusObject: Status) => void,
};

const date = new Date();
const year = date.getFullYear();

const currentMonthLimits = monthLimits(year, date.getMonth() + 1);

const firstDefault = currentMonthLimits.first + "/" + lessThanTen(date.getMonth() + 1) + "/" + year;
const secondDefault = currentMonthLimits.last + "/" + lessThanTen(date.getMonth() + 1) + "/" + year;

function littleEnesian(day: string, month: string, year: string) {
    
}

/**
 * Globally stores the history page's filters, which are described as it follows:
 * - **interval:** A two-value array representing the interval's upper and lower date limits.
 * - **statusObject:** An object that saves the booleans of the finished and cancelled statuses.
 * 
 * It also allows to update these variables with the *updateInterval* and *updateStatus* functions, respectively.
 */

export const useHistoryFilters = create<FilterStore>()((set) => ({
    interval: [firstDefault, secondDefault],
    statusObject: {
        pending: false,
        finished: true,
        cancelled: true
    },
    updateInterval: (newArray: [string, string]) => set(() => ({
        interval: [...newArray]
    })),
    updateStatus: (newStatusObject: Status) => set(() => ({
        statusObject: { ...newStatusObject }
    })),
}
));