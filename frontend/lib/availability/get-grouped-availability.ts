// A grouped item looks like this:
// lunes: [ { value: 10:00, label: 10:00 a.m.}, {value: 11:00, label: 11:00 a.m }, rest of grouped hours... ]

import api from "../axios";
import type { Option } from '@/components/ui/multi-select';
import { hourFormatter } from "@/utils/system/appointments/appointment-formatter";

type AvailabilityContent = {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
};

const days = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

/** 
 * An availability group contains both the database's and frontend's values of the hours, as it follows:
 * { value: string, label: string }
 * Where 'value' corresponds to the database's value, and 'label' to the frontend's one.
 * @returns An array containing two subarrays, one for the current week's grouped available hours, and other for the next week's.
 * @returns Example: `[[lunes: { value: 10:00, label: 10:00 a.m}, martes: ...], [lunes: { value: 10:00, label: 10:00 a.m}, martes: ...]]`
 * */

async function getAvailabilityByGropus() {
    // Fetch the availability and save it in a variable.
    const res = await api.get("/availability");
    const availability: AvailabilityContent[] = res.data;

    // Initialization of arrays that save both the current and next weeks' availability.
    const currentAvailabilityGroup: Option[][] = []; // This type represents a list of a list of hours.
    const nextAvailabilityGroup: Option[][] = [];

    const currentIterator = availability[0]; // The first object of the availability in the databse always represents the current week.
    const nextIterator = availability[1]; // Therefore, the second one represents the next week.

    // FIRST LOOP: Iterates over each one of the two availability lists (the current and next week ones).
    for (let i = 0; i < days.length; i++) {
        const hourCarrierCurrent: Option[] = [];
        const hourCarrierNext: Option[] = []
        // SECOND LOOP: Iterates over each day's array of the availability list (from "lunes" to "sabado").
        currentIterator[days[i] as keyof AvailabilityContent].forEach((hour) => {
            hourCarrierCurrent.push({
                value: hour,
                label: hourFormatter(hour)
            });
        })

        nextIterator[days[i] as keyof AvailabilityContent].forEach((hour) => {
            hourCarrierNext.push({
                value: hour,
                label: hourFormatter(hour)
            });
        });

        currentAvailabilityGroup.push(hourCarrierCurrent);
        nextAvailabilityGroup.push(hourCarrierNext);
    };
    const groupList = [...currentAvailabilityGroup, ...nextAvailabilityGroup];

    return groupList;
};

export default getAvailabilityByGropus;