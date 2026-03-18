import { format } from "date-fns";
import { es } from "date-fns/locale";

/**
 * Transforms a formatted date in the *yyyy-MM-dd* form, into a new Date object.
 * @param date
 * Returns a Date object with the string date's values.
 */

function stringToDate(date: string) {
    const year = date[0] + date[1] + date[2] + date[3]; // The first four characters of the 'yyyy-MM-dd' date correspond to the year.
    const month = date[5] + date[6]; // Fifth and sixth characters of the 'yyyy-MM-dd' date correspond to the month.
    const day = date[8] + date[9]; // Finally, eight and ninth characters of the 'yyyy-MM-dd' date correspond to the day.

    return new Date(Number(year), Number(month) - 1, Number(day));
};

function databaseToFormat(date: string) {
    const year = date[0] + date[1] + date[2] + date[3]; // The first four characters of the 'yyyy-MM-dd' date correspond to the year.
    const month = date[5] + date[6]; // Fifth and sixth characters of the 'yyyy-MM-dd' date correspond to the month.
    const day = date[8] + date[9]; // Finally, eight and ninth characters of the 'yyyy-MM-dd' date correspond to the day.

    return year + "-" + month + "-" + day;
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

/**
 * Transforms a prose-written date into an object containing its year, month, and day values.
 * @param date A prose-written date - e.g. 10 de febrero de 2026
 * @returns An object containing the year, month, and day values of the received date.
 */

function proseToDate(date: string) {
    type Months = "enero" | "febrero" | "marzo" | "abril" | "mayo" | "junio" | "julio" | "agosto" | "septiembre" | "octubre" | "noviembre" | "diciembre";
    const months: Record<Months, string> = {
        "enero": "01",
        "febrero": "02",
        "marzo": "03",
        "abril": "04",
        "mayo": "05",
        "junio": "06",
        "julio": "07",
        "agosto": "08",
        "septiembre": "09",
        "octubre": "10",
        "noviembre": "11",
        "diciembre": "12"
    }

    const separatedDate = date.split(" de ");

    return {
        day: Number(separatedDate[0]),
        month: Number(months[separatedDate[1] as keyof Record<Months, string>]),
        year: Number(separatedDate[2])
    };
};

export { stringToDate, formattedToWrittenDate, databaseToFormat, proseToDate };