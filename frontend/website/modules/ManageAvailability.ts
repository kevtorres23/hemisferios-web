type AvailabilityContent = {
    weekStart: string;
    weekFinish: string;
    monday: [string];
    tuesday: [string];
    wednesday: [string];
    thursday: [string];
    friday: [string];
    saturday: [string];
};

type WeekDaysNum = "0" | "1" | "2" | "3" | "4" | "5" | "6"; // Numbers of the week days, where Sunday is 0.
type WeekDaysName = "Domingo" | "Lunes" | "Martes" | "Miercoles" | "Jueves" | "Viernes" | "Sabado"; // Names of the week days.

type WeekDayType = Record<WeekDaysNum, WeekDaysName>; // With Record, we limit and pair the week day's numbers to their corresponding names.

const weekDays: WeekDayType = {
    "0": "Domingo",
    "1": "Lunes",
    "2": "Martes",
    "3": "Miercoles",
    "4": "Jueves",
    "5": "Viernes",
    "6": "Sabado"
};

type MonthNum = "00" | "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11"; // Numbers of the months, where January is 0.
type MonthName = "enero" | "febrero" | "marzo" | "abril" | "mayo" | "junio" | "julio" | "agosto" | "septiembre" | "octubre" | "noviembre" | "diciembre"; // Names of the months.
type MonthType = Record<MonthNum, MonthName>; // With Record, we limit and pair the month's numbers to their corresponding names.

const months: MonthType = {
    "00": "enero",
    "01": "febrero",
    "02": "marzo",
    "03": "abril",
    "04": "mayo",
    "05": "junio",
    "06": "julio",
    "07": "agosto",
    "08": "septiembre",
    "09": "octubre",
    "10": "noviembre",
    "11": "diciembre"
}

type Availability = AvailabilityContent[];

function manageAvailability(availability: Availability) {
    // Current variables.
    const current = new Date(); // Get the current date.
    let tomorrow = current.getDay() + 1; // Get tomorrow's day number.
    const currentWeekStart = availability[0].weekStart[0] + availability[0].weekStart[1]; // Accessing the first two characters of the "weekStart" string to get the day number.
    const currentWeekMonth = availability[0].weekStart[3] + availability[0].weekStart[4]; // Accessing the last two characters of the "weekStart" string to get the month number.
    const daysCurrentWeek = [];

    // Upcoming variables.
    let nextWeekDay = 1; // Next week's Monday.
    const nextWeekStart = availability[1].weekStart[0] + availability[1].weekStart[1];
    const nextWeekMonth = availability[1].weekStart[3] + availability[1].weekStart[4];
    const daysNextWeek = [];

    while (tomorrow <= 6) {
        // Get today's day name and calculate today's month number by summing the value of tomorrow to the value of the start of the week.
        // Therefore, the expression within the 'push()' would be equal to Wednesday 11 (which is today), then Thursday 12, then Friday 13, and Saturday 14.
        let currentWeekDayName = weekDays[tomorrow.toString() as keyof WeekDayType];
        let currentWeekMonthDay = Number(currentWeekStart) + (tomorrow - 1);
        let currentWeekMonthName = months[currentWeekMonth as keyof MonthType];

        const currentWeekDayObj = {
            writtenDate: currentWeekDayName + " " + currentWeekMonthDay + " de " + currentWeekMonthName,
            databaseId: "c" + weekDays[tomorrow.toString() as keyof WeekDayType].toLowerCase(), // "c" for "current": to identify it in the database.
            formattedDate: currentWeekMonthDay + "/" + currentWeekMonth,
        }

        daysCurrentWeek.push(currentWeekDayObj);

        tomorrow += 1;
    };

    while (nextWeekDay <= 6) {
        // This loop uses the same logic as the the previous one, but with the upcoming variables.
        let nextWeekDayName = weekDays[nextWeekDay.toString() as keyof WeekDayType];
        let nextWeekMonthDay = Number(nextWeekStart) + (nextWeekDay - 1);
        let nextWeekMonthName = months[nextWeekMonth as keyof MonthType];

        const nextWeekDayObj = {
            writtenDate: nextWeekDayName + " " + nextWeekMonthDay + " de " + nextWeekMonthName,
            databaseId: "n" + weekDays[nextWeekDay.toString() as keyof WeekDayType].toLowerCase(), // "n" for "next", to identify it in the database.
            formattedDate: nextWeekMonthDay + "/" + nextWeekMonth + "/" + current.getFullYear(),
        }

        daysNextWeek.push(nextWeekDayObj);

        nextWeekDay += 1;
    };

    const dayItems = {
        currentWeekList: [...daysCurrentWeek],
        nextWeekList: [...daysNextWeek]
    };

    return dayItems;
}

export default manageAvailability;