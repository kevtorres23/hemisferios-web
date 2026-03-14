// Defining hour types.
type MilitarFormat = "08:00" | "09:00" | "10:00" | "11:00" | "12:00" | "13:00" | "14:00" | "15:00" | "16:00" | "17:00" | "18:00" | "19:00" | "20:00";
type TwelveFormat = "08:00 a.m." | "09:00 a.m." | "10:00 a.m." | "11:00 a.m." | "12:00 p.m." | "01:00 p.m." | "02:00 p.m." | "03:00 p.m." | "04:00 p.m." | "05:00 p.m." | "06:00 p.m." | "07:00 p.m." | "08:00 p.m.";

/**
 * Transforms an hour written in the militar format into a twelve-hour one.
 * @param hour 
 * @returns An hour written in the twelve-hour format (e.g. *08:00 a.m.*).
 */

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

export { hourFormatter };