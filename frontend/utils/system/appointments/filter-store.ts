import { create } from "zustand";
import { currentWeekList, nextWeekList } from "@/utils/system/calendar/calendar-variables";
import { formatISO, format } from "date-fns";
import { lessThanTen } from "@/utils/format-availability";
import { stringToDate } from "@/utils/date-methods";
import { es } from "date-fns/locale";

type Status = {
    pending: boolean,
    finished: boolean,
    cancelled: boolean
}

type FilterStore = {
    interval: [string, string],
    statusObject: Status,
    updateInterval: (newIntervalArray: [string, string]) => void, // When "position" is 0, it updates the first parameter of the interval, or the second one, when it is 1.
    updateStatus: (statusObject: Status) => void,
};

const year = new Date().getFullYear();
const fullDays = [...currentWeekList, ...nextWeekList];

const firstDefault = format(new Date(year, fullDays[0].dayNum.month - 1, fullDays[0].dayNum.number), "yyyy-MM-dd");
const secondDefault = format(new Date(year, fullDays[11].dayNum.month - 1, fullDays[11].dayNum.number), "yyyy-MM-dd");

/**
 * Globally stores the appointments' filters, which are described as it follows:
 * - **interval:** A two-value array representing the interval's upper and lower date limits.
 * - **statusObject:** An object that saves the booleans of the pending, finished, and cancelled statuses.
 * 
 * It also allows to update these variables with the *updateInterval* and *updateStatus* functions, respectively.
 */

export const useAppointmentFilters = create<FilterStore>()((set) => ({
    interval: [firstDefault, secondDefault],
    statusObject: {
        pending: true,
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