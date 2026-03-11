import { lessThanTen } from "@/utils/format-availability";
import { getDaysInMonth } from "../calendar/calendar-methods";
import { compareAsc } from "date-fns";

/**
 * Calculates the next payment's date for a patient right after its starting date in the center.
 * @param frequency Represents the frequency type of the patient. It can be **weekly** or **monthly**.
 * @param startingDate Represents the date that the patient started attending the center, written in a **DD/MM/YYYY** format.
 * @returns A *DD/MM/YYY* string representing the patient's next date.
 */

function calculateNextPayment(frequency: string, startingDate: string) {
    const day = startingDate[0] + startingDate[1];
    const month = startingDate[3] + startingDate[4];
    const year = startingDate[6] + startingDate[7] + startingDate[8] + startingDate[9];

    const daysInMonth = getDaysInMonth(Number(year), Number(month));
    let nextPaymentDate;

    if (frequency === "weekly") {
        // Date variables for the 'weekly' frequency type.
        let newDay = Number(day) + 7;
        let newMonth = Number(month);
        let newYear = Number(year);

        if (newDay > daysInMonth) {
            newDay -= daysInMonth; // The difference of the days that exceeded the month's limit.
            newMonth += 1;
        };

        // Handle exceeding the month indexes (a new year).
        if (newMonth > 12) {
            newMonth = 1;
            newYear += 1;
        };

        nextPaymentDate = lessThanTen(newDay) + "/" + lessThanTen(newMonth) + "/" + lessThanTen(newYear);

    } else {
        // Date variables for the 'monthly' frequency type.
        let newMonth = Number(month);
        let newYear = Number(year);

        newMonth += 1;

        // Handle exceeding the month indexes (a new year).
        if (newMonth > 12) {
            newMonth = 1;
            newYear += 1;
        };

        nextPaymentDate = lessThanTen(Number(day)) + "/" + lessThanTen(newMonth) + "/" + lessThanTen(newYear);
    };

    return nextPaymentDate;
};

/**
 * Calculates the next payment date of a patient based on the current date.
 * @param frequency Represents the frequency type of the patient. It can be **weekly** or **monthly**.
 * @param date Represents the date from which the next payment calculations will be done, written in a **DD/MM/YYYY** format.
 * @returns A string representing the next payment date, written in a *DD/MM/YYYY* format.
 */

function establishPaymentDate(frequency: string, date: string) {
    const currentDate = new Date();

    // Calcuate the nearest payment date from the date parameter.
    let nextPaymentDate = calculateNextPayment(frequency, date);

    switch (frequency) {
        case "weekly":
            // Condition 1: The next payment day must be greater or equal than today.
            // Condition 2: The next payment month must be greater or equal than the current month.
            if (compareAsc(currentDate, date) != 1) {
                return nextPaymentDate;
            } else {
                establishPaymentDate(frequency, nextPaymentDate); // If the condition is not met, we recall the function with the newly calculated date, until the conditions are met.
            };
        case "monthly":
            // Condition 1: The next payment day must be  equal than the day of the date passed as argument.
            // Condition 2: The next payment month must be greater than the current month.
            if (compareAsc(currentDate, date) != 1) {
                return nextPaymentDate;
            } else {
                establishPaymentDate(frequency, nextPaymentDate); // If the condition is not met, we recall the function with the newly calculated date, until the conditions are met.
            };
    };
};

export { calculateNextPayment, establishPaymentDate };