import { currentWeekList, nextWeekList } from "./system/calendar/calendar-variables";
import { format } from "date-fns";
import { DayFormat } from "./types";
import { es } from "date-fns/locale";

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

/**
 * Adds a '0' to the left of a number if it is less than 10, converting it into a string in the process.
 * 
 * E.g. 8 -> 08
 * @param num 
 * @returns A string representing the transformed passed number.
 */

function lessThanTen(num: number) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
};

/**
 * Obtains the prose-written date, database-format date, and list of hours of each item in an array of availability.
 * @param availability 
 * @returns Two arrays, where each store the objects for the current and next weeks' availability, from Monday to Saturday (length 6).
 */

function formatAvailability(availability: AvailabilityContent[]) {
    // Initialization of lists where we'll save the formatted availability.
    const currentAvailability: DayFormat[] = [];
    const nextAvailability: DayFormat[] = [];

    console.log(currentWeekList);

    const currentIterator = availability[0]; // The index 0 of availability always represents the current week availability.
    const nextIterator = availability[1]; // On the other hand, the index 1 always represents the next week availability.

    const formattedAvailability: DayFormat[][] = []; // The first brackets access whether the current week availability (when 0), or for the next one (when 1).

    for (let i = 0; i < days.length; i++) {

        // CURRENT WEEK'S AVAILABILITY ITEM. 
        let danishDateCurrent;
        let writtenFormatCurrent;
        let iterationDateCurrent = new Date(year, currentWeekList[i].dayNum.month - 1, currentWeekList[i].dayNum.number);
        console.log("iteracion del item current:", iterationDateCurrent);

        // For the current week, availability only will be shown from tomorrow on (we skip today).
        if (i > today) {
            danishDateCurrent = format(iterationDateCurrent, "yyyy-MM-dd");
            writtenFormatCurrent = format(iterationDateCurrent, "PPP", { locale: es });

            currentAvailability.push(
                {
                    writtenDate: writtenFormatCurrent,
                    databaseDate: danishDateCurrent,
                    hours: currentIterator[days[i] as keyof AvailabilityContent], // Acess the list of hours of the day in the currentIterator.
                }
            );
        };

        // NEXT WEEK'S AVAILABILITY ITEM. 
        let iterationDateNext = new Date(year, nextWeekList[i].dayNum.month - 1, nextWeekList[i].dayNum.number);
        // Build a 'yyyy-MM-dd' date.
        let danishDateNext = format(iterationDateNext, "yyyy-MM-dd");
        // Build a prose-written date, like '10 de febrero de 2026'.
        let writtenFormatNext = format(iterationDateNext, "PPP", { locale: es });

        // For the next week, there are no day skips.
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

export { formatAvailability, lessThanTen };