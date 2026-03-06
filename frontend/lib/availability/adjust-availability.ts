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

// Base array that contains the days written in the format of the availability's database model.
const days = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

/** Checks the currently established disponibility and removes an hour from a specific day,
 *  if there are two appointments at the same hour registered in the database.
 */

async function adjustAvailability(daySelected: string, hourSelected: string,) {
    try {
        // Fetch the availability from the database.
        const res = await api.get("/availability");
        const availability: AvailabilityContent[] = res.data;

        // Format the availability to have access to the written date, database date and hours of each day.
        const formattedAvailability: DayFormat[][] = formatAvailability(availability);
        let adjustedAvailability = availability;

        // We'll iterate over both objects of the availability, the current week one and the next week one.
        formattedAvailability.forEach((week: DayFormat[], weekId) => {
            week.forEach((day, dayId) => {
                // Checks if the date and hour of the day that is being iterated match the given date and hour as arguments.
                if ((day.databaseDate === daySelected) && (day.hours.includes(hourSelected))) {
                    // When it finds a match, build the location of the object's key in the database of that match to remove it.
                    const lowerCaseDay = days[dayId];
                    // The updated match will be equal to all the hours it has, except for the hour passed as argument (we filter them).
                    adjustedAvailability[weekId][lowerCaseDay as keyof AvailabilityContent] = day.hours.filter((hour) => hour != hourSelected);
                    if (weekId === 0) {
                        api.put("/availability/69a23c8f198727d79195f3f9", adjustedAvailability[weekId]); // Update the first object (current week one).
                    } else {
                        api.put("/availability/69a23cb0198727d79195f3fd", adjustedAvailability[weekId]); // Update the second object (next week one).
                    }
                };
            });
        });

    } catch (error) {
        console.log("Error while fetching availability:", error)
    };
};

export default adjustAvailability;