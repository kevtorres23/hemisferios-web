import { lessThanTen } from "@/utils/format-availability";
import { getDaysInMonth } from "../calendar/calendar-methods";

function calculateNextPayment(frequency: string, startingDate: string) {
    const day = startingDate[0] + startingDate[1];
    const month = startingDate[3] + startingDate[4];
    const year = startingDate[6] + startingDate[7] + startingDate[8] + startingDate[9];

    const daysInMonth = getDaysInMonth(Number(year), Number(month));
    let nextPaymentDate;

    if (frequency === "weekly") {
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

        nextPaymentDate = lessThanTen(newDay) + "/" + lessThanTen(newMonth) + lessThanTen(newYear);

    } else {
        let newMonth = Number(month);
        let newYear = Number(year);

        newMonth += 1;

        // Handle exceeding the month indexes (a new year).
        if (newMonth > 12) {
            newMonth = 1;
            newYear += 1;
        };

        nextPaymentDate = lessThanTen(Number(day)) + "/" + lessThanTen(newMonth) + lessThanTen(newYear);
    };

    return nextPaymentDate;
};

export default calculateNextPayment;