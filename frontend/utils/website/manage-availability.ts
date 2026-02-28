import { dateFormatter } from "../system/appointment-formatter";
import { currentWeekList, nextWeekList } from "../system/calendar/calendar-variables-generation";
import { DayFormat } from "../types";

const date = new Date();
const year = date.getFullYear();

type AvailabilityContent = {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
};

function manageAvailability(availability: AvailabilityContent[]) {
    const currentAvailability: DayFormat[] = [];
    const nextAvailability: DayFormat[] = [];

    console.log("current:", currentWeekList);
    console.log("next:", nextWeekList);

    const currentIterator = availability[0];
    const nextIterator = availability[1];

    const formattedAvailability: DayFormat[][] = []; // The first brackets access for whether the current week availability (when 0), or for the next one (when 1).

    for (const day in currentIterator) {
        let id = 0;

        // Create a string with a format that the dateFormatter function can read: DD/MM/YY.
        let danishDateCurrent = + currentWeekList[id].dayNum.number + "/" + currentWeekList[id].dayNum.month + "/" + year;
        let danishDateNext = + nextWeekList[id].dayNum.number + "/" + nextWeekList[id].dayNum.month + "/" + year;

        let writtenFormatCurrent = dateFormatter(danishDateCurrent);
        let writtenFormatNext = dateFormatter(danishDateNext);

        currentAvailability.push(
            {
                writtenDate: writtenFormatCurrent,
                databaseDate: danishDateCurrent,
                hours: currentIterator[day as keyof AvailabilityContent], // Acess the list of hours of the day in the currentIterator.
            }
        );

        nextAvailability.push(
            {
                writtenDate: writtenFormatNext,
                databaseDate: danishDateNext,
                hours: nextIterator[day as keyof AvailabilityContent],
            }
        );

        id++;
    };

    formattedAvailability.push(currentAvailability, nextAvailability);

    return formattedAvailability;
};

export default manageAvailability;