import { create } from "zustand";
import { currentWeekList, nextWeekList } from "@/utils/system/calendar/calendar-variables";
import { lessThanTen } from "@/utils/website/format-availability";

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

const firstDefault = lessThanTen(fullDays[0].dayNum.number) + "/" + lessThanTen(fullDays[0].dayNum.month) + "/" + year;
const secondDefault = lessThanTen(fullDays[11].dayNum.number) + "/" + lessThanTen(fullDays[11].dayNum.month) + "/" + year;

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
        statusObject: {...newStatusObject}  
    })),
}
));