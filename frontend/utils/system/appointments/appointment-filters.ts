// Set of functions that are used to filter the appointments.

import { AppointmentType } from "@/utils/types";
import { useAppointmentFilters } from "./filter-store";

type Status = {
    pending: boolean,
    finished: boolean,
    cancelled: boolean
};

type FilterStore = {
    interval: [string, string],
    statusObject: Status,
    updateInterval: (newIntervalArray: [string, string]) => void, // When "position" is 0, it updates the first parameter of the interval, or the second one, when it is 1.
    updateStatus: (statusObject: Status) => void,
};

const interval = useAppointmentFilters((state: FilterStore) => state.interval);
const checkedStatus = useAppointmentFilters((state: FilterStore) => state.statusObject);

const sampleFilter = [
    {
        "_id": "69a33065b1496ba4f8408898",
        "status": "cancelled",
        "patientName": "Kevin",
        "fatherSurname": "Torres",
        "motherSurname": "Urbinax",
        "phoneNumber": "6181889026",
        "date": "06/03/2026",
        "hour": "12:00",
        "cancellationComment": "El paciente canceló.",
        "createdAt": "2026-02-28T18:13:57.241Z",
        "updatedAt": "2026-03-01T02:43:11.203Z",
        "__v": 0
    },
    {
        "_id": "69a32ff3b1496ba4f840888f",
        "status": "pending",
        "patientName": "Arlet",
        "fatherSurname": "Torres",
        "motherSurname": "Urbina",
        "phoneNumber": "6181889026",
        "date": "04/03/2026",
        "hour": "12:00",
        "cancellationComment": "placeholder",
        "createdAt": "2026-02-28T18:12:03.605Z",
        "updatedAt": "2026-02-28T20:05:02.510Z",
        "__v": 0
    }
];

/* function intervalFilter(array: AppointmentType[]) {
    array.filter((appointment) => {
        appointment.date >= ... // Lógica aquí.
    })
} */

// Creo que podríamos aplicar primero una función. Después, al nuevo array, le aplicamos la siguiente función de filtrado.
// Y así hasta usar todas las funciones de filtrado.

