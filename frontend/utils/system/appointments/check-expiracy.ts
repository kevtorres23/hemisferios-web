import { lessThanTen } from "@/utils/format-availability";

/**
 * Checks if an appointment has passed its established date and hour based on a live clock.
 * @param date 
 * @param hour 
 * @returns A boolean indicating whether the appointment has expired or not.
 */

function isExpired(date: string, hour: string) {
    const currentDate = new Date();

    // Get the current hour every second that passes.
    const liveHour = () => currentDate.getHours();
    setInterval(liveHour, 1000);

    // Build the date as it is stored in the database (MM/DD/YYY).
    const today = lessThanTen(currentDate.getDate()) + "/" + lessThanTen(currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();

    // Build the hour as it is stored in the database.
    const currentHour = liveHour();

    // Converts the first two characters of an hour string (passed in a 24-hour format) into a number.
    const comparativeHour = Number(hour[0] + hour[1]);

    return (date === today) && currentHour >= comparativeHour;
};

export default isExpired;