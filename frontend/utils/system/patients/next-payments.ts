import { lessThanTen } from "@/utils/format-availability";
import { addDays, addMonths, compareAsc } from "date-fns";

/**
 * Calculates the next payment's date for a patient right after its starting date in the center.
 * @param frequency Represents the frequency type of the patient. It can be **weekly** or **monthly**.
 * @param startingDate Represents the date that the patient started attending the center, written in a **DD/MM/YYYY** format.
 * @returns A *DD/MM/YYY* string representing the patient's next date.
 */

function calculateNextPayment(frequency: string, startingDate: string) {
    // Separating the 'DD/MM/YYYY' string into its day, month, and year values.
    const day = startingDate[0] + startingDate[1];
    const month = startingDate[3] + startingDate[4];
    const year = startingDate[6] + startingDate[7] + startingDate[8] + startingDate[9];

    const builtDate = new Date(Number(year), Number(month), Number(day)); // Building a new date with the previously separated values.
    let newDate; // Stores the new date values.
    let nextPaymentDate; // Stores a new DD/MM/YYY string.

    if (frequency === "weekly") {
        newDate = addDays(builtDate, 7); // We add seven days to the built date to get the next payment date when it is weekly.
    } else {
        newDate = addMonths(builtDate, 1); // We add 1 month to the built date to get the next payment date when it is monthly.
    };

    console.log(newDate);

    nextPaymentDate = lessThanTen(newDate.getDate()) + "/" + lessThanTen(newDate.getMonth()) + "/" + lessThanTen(newDate.getFullYear());
    return nextPaymentDate;
};

/**
 * Calculates the next payment date of a patient based on the current date.
 * @param frequency Represents the frequency type of the patient. It can be **weekly** or **monthly**.
 * @param date Represents the date from which the next payment calculations will be done, written in a **DD/MM/YYYY** format.
 * @returns A string representing the next payment date, written in a *DD/MM/YYYY* format.
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