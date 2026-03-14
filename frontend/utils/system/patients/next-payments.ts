import { lessThanTen } from "@/utils/format-availability";
import { addDays, addMonths, compareAsc } from "date-fns";

/**
 * Calculates the next payment's date for a patient right after its starting date in the center.
 * @param frequency Represents the frequency type of the patient. It can be **weekly** or **monthly**.
 * @param startingDate Represents the date that the patient started attending the center, written in a **yyyy-MM-dd** format.
 * @returns A *yyyy-MM-dd* string representing the patient's next date.
 */

function calculateNextPayment(frequency: string, startingDate: string) {
    // Separating the 'yyyy-MM-dd' string into its day, month, and year values.
    const day = startingDate[8] + startingDate[9];
    const month = startingDate[5] + startingDate[6];
    const year = startingDate[0] + startingDate[1] + startingDate[2] + startingDate[3];

    const builtDate = new Date(Number(year), Number(month), Number(day)); // Building a new date with the previously separated values.
    let newDate; // Stores the new date values.
    let nextPaymentDate; // Stores a new yyyy-MM-dd string.

    if (frequency === "weekly") {
        newDate = addDays(builtDate, 7); // We add seven days to the built date to get the next payment date when it is weekly.
    } else {
        newDate = addMonths(builtDate, 1); // We add 1 month to the built date to get the next payment date when it is monthly.
    };

    nextPaymentDate =  newDate.getFullYear() + "-" + lessThanTen(newDate.getMonth()) + "-" + lessThanTen(newDate.getDate());
    return nextPaymentDate;
};

/**
 * Calculates the next payment date of a patient based on the current date.
 * @param frequency Represents the frequency type of the patient. It can be **weekly** or **monthly**.
 * @param date Represents the date from which the next payment calculations will be done, written in a **yyyy-MM-dd** format.
 * @returns A string representing the next payment date, written in a *yyyy-MM-dd* format.
 */

function establishPaymentDate(frequency: string, date: string) {
    const currentDate = new Date(); // We create a new current date.

    // Calcuate the nearest payment date from the date parameter.
    let nextPaymentDate = calculateNextPayment(frequency, date);

    // The result '1' of this submodule means the first date is before the second one - meaning the next payment date should be further than today.
    if (compareAsc(currentDate, date) != 1) {
        return nextPaymentDate;
    } else {
        establishPaymentDate(frequency, nextPaymentDate); // If the condition is not met, we recall the function with the newly calculated date, until the conditions are met.
    };
};

export { calculateNextPayment, establishPaymentDate };