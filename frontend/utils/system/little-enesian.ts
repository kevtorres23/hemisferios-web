import { lessThanTen } from "../format-availability";

/**
 * Transforms a date into a little-enesian one (DD/MM/YYY).
 * @param date 
 * @returns A little-enesian string representing the transformed date.
 */

function littleEnesian(date: Date) {
    console.log(date);
    
    return lessThanTen(date.getDate()) + "/" + lessThanTen(date.getMonth() + 1) + "/" + date.getFullYear();
};

export default littleEnesian;