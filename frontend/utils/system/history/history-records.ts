/**
 * Calculates the months that have passed since the system started functioning.
 * @returns An array containing the month names that have passed.
 */

import { lessThanTen } from "@/utils/format-availability";

function calculateMonthRegistries(selectedYear: number) {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    let monthRegistries = [{monthName: "Marzo", monthNum: "03"}];
    const lastMonthElem = monthRegistries.length - 1;

    if (selectedYear != currentYear) {
        monthRegistries = monthNames.map((month, id) => {
            return {
                monthName: month,
                monthNum: lessThanTen(id + 1).toString(),
            };
        });
    };

    if (currentMonth > monthNames.indexOf(monthRegistries[lastMonthElem].monthName) + 1) {
        monthRegistries.push({
            monthName: monthNames[currentMonth],
            monthNum: lessThanTen(currentMonth).toString(),
        });
    };

    return monthRegistries;
};

/**
 * Calculates the years that have passed since the system started functioning.
 * @returns An array containing the month names that have passed.
 */

function calculateYearRegistries() {
    const yearRegistries = [2026];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const lastYearElem = yearRegistries.length - 1;

    if (currentYear > yearRegistries[lastYearElem]) {
        yearRegistries.push(currentYear);
    };

    return yearRegistries;
};

export { calculateMonthRegistries, calculateYearRegistries }