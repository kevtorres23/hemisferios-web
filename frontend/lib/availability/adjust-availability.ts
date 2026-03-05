// Checks the currently established disponibility and removes an hour from a specific day if there are two appointments at the same hour.

import api from "../axios";
import { formatAvailability } from "@/utils/format-availability";
import { DayFormat } from "@/utils/types";

type AvailabilityContent = {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
};

const days = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

async function adjustAvailability(daySelected: string, hourSelected: string, ) {
    try {
        const res = await api.get("/availability");
        const availability: AvailabilityContent[] = res.data;
        const formattedAvailability: DayFormat[][] = formatAvailability(availability);
        let adjustedAvailability = availability;

        formattedAvailability.forEach((dayList: DayFormat[], weekId) => {
            dayList.forEach((day, dayId) => {
                if ((day.databaseDate === daySelected) && (day.hours.includes(hourSelected))) {
                    const lowerCaseDay = days[dayId];
                    // Remove the hour from the hour array of the selected day.
                    adjustedAvailability[weekId][lowerCaseDay as keyof AvailabilityContent] = day.hours.filter((hour) => hour != hourSelected);
                    if (weekId === 0) {
                        api.put("/availability/69a23c8f198727d79195f3f9", adjustedAvailability[weekId]);
                    } else {
                        api.put("/availability/69a23cb0198727d79195f3fd", adjustedAvailability[weekId]);
                    }
                };
            });
        });

    } catch (error) {
        console.log("Error while fetching availability:", error)
    };
};

export default adjustAvailability;