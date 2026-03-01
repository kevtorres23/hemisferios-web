import { create } from "zustand";
import { currentWeekList, nextWeekList } from "@/utils/system/calendar/calendar-variables-generation";
import { lessThanTen } from "@/utils/website/format-availability";
import { updateStatus } from "@/lib/update-appointment-status";

type AppointmentFilters = {
    interval: [string, string],
    status: {
        pending: boolean,
        finished: boolean,
        complete: boolean
    }
    setInterval: (position: 0 | 1, newDate: string) => void, // When "position" is 0, it updates the first parameter of the interval, or the second one, when it is 1.
    setStatus: (status: "pending" | "finished" | "completed", newBoolean: boolean) => void,
};

const year = new Date().getFullYear();
const fullDays = [...currentWeekList, ...nextWeekList];

const firstDefault = lessThanTen(fullDays[0].dayNum.number) + "/" + lessThanTen(fullDays[0].dayNum.month) + "/" + year;
const secondDefault = lessThanTen(fullDays[11].dayNum.number) + "/" + lessThanTen(fullDays[11].dayNum.month) + "/" + year;

export const useAppointmentFilters = create<AppointmentFilters>()((set) => ({
    interval: [firstDefault, secondDefault],
    status: {
        pending: true,
        finished: true,
        complete: true
    },
    setInterval: (position: 0 | 1, newDate: string) => set({
        // Update the interval array in state.
    }),
    setStatus: (statusToChange: "pending" | "finished" | "completed", newBoolean: boolean) => set({
        // Update the status object in state.
    })
}
))