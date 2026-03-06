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
    const today = currentDate.getDate() + "/" + lessThanTen(currentDate.getMonth()) + "/" + currentDate.getFullYear();

    // Build the hour as it is stored in the database.
    const currentHour = lessThanTen(liveHour()) + ":00";

    return (date === today) && hour === currentHour;
};

export default isExpired;