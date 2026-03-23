import { lessThanTen } from "@/utils/format-availability";

const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate(); // Calculate the number of days in a given month.

/**
 * Obtains the first and last day of a given month.
 * @returns An array containing the first and last day of the month passed as argument.
 */

function monthLimits(year: number, month: number) {
    return {
        first: "01",
        last: lessThanTen(getDaysInMonth(year, month)).toString(),
    };
};

export default monthLimits;