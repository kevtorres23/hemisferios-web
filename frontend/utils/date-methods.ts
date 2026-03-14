import { format } from "date-fns";
import { es } from "date-fns/locale";

/**
 * Transforms a formatted date in the *yyyy-MM-dd* form, into a new Date object.
 * @param date
 * Returns a Date object with the string date's values.
 */

function stringToDate(date: string) {
    console.log("fecha recibida:", date)
    const year = date[0] + date[1] + date[2] + date[3]; // The first four characters of the 'yyyy-MM-dd' date correspond to the year.
    const month = date[5] + date[6]; // Fifth and sixth characters of the 'yyyy-MM-dd' date correspond to the month.
    const day = date[8] + date[9]; // Finally, eight and ninth characters of the 'yyyy-MM-dd' date correspond to the day.

    return new Date(Number(year), Number(month), Number(day));
};

/**
 * Transforms a formatted date in the *yyyy-MM-dd* form, into a normally written one - e.g. 16 de febrero de 2026.
 * @param date
 * Returns a string representing the date written in a normally written format.
 */

function formattedToWrittenDate(date: string) {
    const newDate = stringToDate(date);
    const formattedDate = format(newDate, "PPP", { locale: es });

    return formattedDate
};

export { stringToDate, formattedToWrittenDate };