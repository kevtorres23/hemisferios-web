import { create } from "zustand";

type Appointment = {
    patientName: string;
    motherSurname: string;
    fatherSurname: string;
    phoneNumber: string;
    date: string;
    hour: string;
    timestamp: Date;
}

export const useAppointmentStore = create((set) => ({
    createdAppointment: {},
    saveAppointment: (appointmentObject: Appointment) => set({
        createdAppointment: {
            patientName: appointmentObject.patientName,
            motherSurname: appointmentObject.motherSurname,
            fatherSurname: appointmentObject.fatherSurname,
            phoneNumber: appointmentObject.phoneNumber,
            date: appointmentObject.date,
            hour: appointmentObject.hour,
            timestamp: appointmentObject.timestamp,
        }
    }),
}))