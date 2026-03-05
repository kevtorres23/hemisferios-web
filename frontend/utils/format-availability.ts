import { dateFormatter } from "./system/appointments/appointment-formatter";
import { currentWeekList, nextWeekList } from "./system/calendar/calendar-variables";
import { DayFormat } from "./types";

const date = new Date();
const year = date.getFullYear();
const today = date.getDay() - 1; // Minus one because we won't count Sunday for the center's availability.

const days = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

type AvailabilityContent = {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
};

// Small function that adds a 0 to the left of the number if it is less than 10.
function lessThanTen(num: number) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
};

function formatAvailability(availability: AvailabilityContent[]) {
    // Initialization of lists where we'll save the formatted availability.
    const currentAvailability: DayFormat[] = [];
    const nextAvailability: DayFormat[] = [];

    const currentIterator = availability[0]; // The index 0 of availability always represents the current week availability.
    const nextIterator = availability[1]; // On the other hand, the index 1 always represents the next week availability.

    const formattedAvailability: DayFormat[][] = []; // The first brackets access whether the current week availability (when 0), or for the next one (when 1).

    for (let i = 0; i < days.length; i++) {

        let danishDateCurrent;
        let writtenFormatCurrent;

        let danishDateNext = lessThanTen(nextWeekList[i].dayNum.number) + "/" + lessThanTen(nextWeekList[i].dayNum.month) + "/" + year;
        let writtenFormatNext = dateFormatter(danishDateNext);

        // For the current week, availability only will be shown from tomorrow on.
        if (i > today) {
            // Create a string with a format that the dateFormatter function can read: DD/MM/YY.
            // + 1 is added to the month to match the JavaScript month format, which sets January to be 0.
            danishDateCurrent = lessThanTen(currentWeekList[i].dayNum.number) + "/" + lessThanTen(currentWeekList[i].dayNum.month) + "/" + year;
            writtenFormatCurrent = dateFormatter(danishDateCurrent);

            currentAvailability.push(
                {
                    writtenDate: writtenFormatCurrent,
                    databaseDate: danishDateCurrent,
                    hours: currentIterator[days[i] as keyof AvailabilityContent], // Acess the list of hours of the day in the currentIterator.
                }
            );
        };

        nextAvailability.push(
            {
                writtenDate: writtenFormatNext,
                databaseDate: danishDateNext,
                hours: nextIterator[days[i] as keyof AvailabilityContent],
            }
        );
    };

    formattedAvailability.push(currentAvailability, nextAvailability);

    return formattedAvailability;
};

export {formatAvailability, lessThanTen};