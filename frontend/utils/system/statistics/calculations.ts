/**
 * Calculates the percentage of a given amount based on a given total.
 * @param total The total of what the percentage is being calculated of.
 * @param amount The specific amount or portion of the total from which the percentage will be calculated.
 * @returns A string representing the percentage fixed to one decimal.
 */

const statusPercentage = (total: number, amount: number) => ((amount * 100) / total).toFixed(1);

export { statusPercentage };