// Checks if an appointment has passed its established date and hour based on a live clock.

import { hourFormatter } from "./appointment-formatter";
import { dateFormatter } from "./appointment-formatter";
import { lessThanTen } from "@/utils/format-availability";

function isExpired(date: string, hour: string) {
    const currentDate = new Date();
    const liveHour = () => currentDate.getHours(); // Gets the current hour every second that passes.
    setInterval(liveHour, 1000);

    const today = currentDate.getDate() + "/" + lessThanTen(currentDate.getMonth()) + "/" + currentDate.getFullYear();
    const currentHour = lessThanTen(liveHour()) + ":00";

    return (date === today) && hour === currentHour;
};

export default isExpired;