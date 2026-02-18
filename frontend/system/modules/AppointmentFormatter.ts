// Defining month types.
type MonthNumbers = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";
type MonthNames = "enero" | "febrero" | "marzo" | "abril" | "mayo" | "junio" | "julio" | "agosto" | "septiembre" | "octubre" | "noviembre" | "diciembre";

// Defining hour types.
type MilitarFormat = "08:00" | "09:00" | "10:00" | "11:00" | "12:00" | "13:00" | "14:00" | "15:00" | "16:00" | "17:00" | "18:00" | "19:00" | "20:00";
type TwelveFormat = "08:00 a.m." | "09:00 a.m." | "10:00 a.m." | "11:00 a.m." | "12:00 p.m." | "01:00 p.m." | "02:00 p.m." | "03:00 p.m." | "04:00 p.m." | "05:00 p.m." | "06:00 p.m." | "07:00 p.m." | "08:00 p.m.";

function dateFormatter(date: string) {
    let day = "";
    let month = "";
    let formattedMonth = "";
    let year = "";

    const months: Record<MonthNumbers, MonthNames> = {
        "01": "enero",
        "02": "febrero",
        "03": "marzo",
        "04": "abril",
        "05": "mayo",
        "06": "junio",
        "07": "julio",
        "08": "agosto",
        "09": "septiembre",
        "10": "octubre",
        "11": "noviembre",
        "12": "diciembre"
    };

    // The date value of an appointment, from the database follows the following format: "DD/MM/YY".
    // Therefore, we can access the indexes of those values to convert this date format to a written one.

    day = date[0] + date[1]; // First two characters of the DD/MM/YY format.
    month = date[3] + date[4]; // Skipping the index "2", since it would be a "/".
    formattedMonth = months[month as keyof Record<MonthNumbers, MonthNames>]; // Accessing the 'months' object's key that has the value of the 'month' variable.
    year = date[6] + date[7] + date[8] + date[9];

    return day + " de " + formattedMonth + " de " + year;
};

function hourFormatter(hour: string) {
    const hours: Record<MilitarFormat, TwelveFormat> = {
        "08:00": "08:00 a.m.",
        "09:00": "09:00 a.m.",
        "10:00": "10:00 a.m.",
        "11:00": "11:00 a.m.",
        "12:00": "12:00 p.m.",
        "13:00": "01:00 p.m.",
        "14:00": "02:00 p.m.",
        "15:00": "03:00 p.m.",
        "16:00": "04:00 p.m.",
        "17:00": "05:00 p.m.",
        "18:00": "06:00 p.m.",
        "19:00": "07:00 p.m.",
        "20:00": "08:00 p.m."
    };

    return hours[hour as keyof Record<MilitarFormat, TwelveFormat>]
};

export { dateFormatter, hourFormatter };