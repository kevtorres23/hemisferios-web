type PatientModality = "cash" | "card" | "all";

type PatientFrequency = "monthly" | "weekly" | "all";

type MonthRegistry = {
    monthNum: string;
    monthName: string;
}

type HistoryRegistry = {
    months: MonthRegistry[],
    years: string[],
};

type Status = {
    pending: boolean,
    finished: boolean,
    cancelled: boolean
};

type HistoryStatus = {
    finished: boolean,
    cancelled: boolean
};

type FilterStore = {
    interval: [string, string],
    statusObject: Status,
    updateInterval: (newIntervalArray: [string, string]) => void, // When "position" is 0, it updates the first parameter of the interval, or the second one, when it is 1.
    updateStatus: (statusObject: Status) => void,
};

type HistoryFilterStore = {
    interval: [string, string],
    statusObject: HistoryStatus,
    updateInterval: (newIntervalArray: [string, string]) => void, // When "position" is 0, it updates the first parameter of the interval, or the second one, when it is 1.
    updateStatus: (statusObject: Status) => void,
};

export type { PatientModality, PatientFrequency, MonthRegistry, Status, HistoryRegistry, HistoryStatus, FilterStore, HistoryFilterStore };