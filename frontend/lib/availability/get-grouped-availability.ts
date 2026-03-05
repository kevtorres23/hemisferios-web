import api from "../axios";
import type { Option } from '@/components/ui/multi-select';
import { hourFormatter } from "@/utils/system/appointments/appointment-formatter";

interface AvailabilityOption {
    value: string,
    label: string,
};

type AvailabilityContent = {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
};

const days = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

async function getAvailabilityByGropus() {
    const res = await api.get("/availability");
    const availability: AvailabilityContent[] = res.data;

    const currentAvailabilityGroup: Option[][] = []; // A list of a list of hours.
    const nextAvailabilityGroup: Option[][] = [];

    const currentIterator = availability[0];
    const nextIterator = availability[1];

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

    console.log(currentAvailabilityGroup, nextAvailabilityGroup);

    const groupList = [...currentAvailabilityGroup, ...nextAvailabilityGroup];

    return groupList;
};

export default getAvailabilityByGropus;