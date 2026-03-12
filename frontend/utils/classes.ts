import { PatientHistory } from "./types";

class ContactMessage {
    // Defining the class initializers.
    name: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    message: string;

    // Defining the constructor.
    constructor(name: string, lastName: string, phoneNumber: string, email: string, message: string) {
        this.name = name;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.message = message;
    };
};

class Appointment {
    // Class initializers.
    status: string;
    patientName: string;
    fatherSurname: string;
    motherSurname: string;
    phoneNumber: string;
    date: string;
    hour: string;
    timestamp: Date;

    // Defining the constructor.
    constructor(status: string, patientName: string, fatherSurname: string, motherSurname: string, phoneNumber: string, date: string, hour: string, timestamp: Date) {
        this.status = status;
        this.patientName = patientName;
        this.fatherSurname = fatherSurname;
        this.motherSurname = motherSurname;
        this.phoneNumber = phoneNumber;
        this.date = date;
        this.hour = hour;
        this.timestamp = timestamp;
    };
};

class AppointmentInput {
    value: string;
    isValidationActive: boolean;
    validationMsg: string;

    constructor(value: string, isValidationActive: boolean, validationMsg: string) {
        this.value = value;
        this.isValidationActive = isValidationActive;
        this.validationMsg = validationMsg;
    };
};

class Patient {
    name: string;
    fatherSurname: string;
    motherSurname: string;
    adultName: string;
    contactNumber: string;
    startingDate: string;
    paymentFrequency: string;
    paymentModality: string;

    constructor(name: string, fatherSurname: string, motherSurname: string, adultName: string, contactNumber: string, startingDate: string, paymentFrequency: string, paymentModality: string) {
        this.name = name;
        this.fatherSurname = fatherSurname;
        this.motherSurname = motherSurname;
        this.adultName = adultName;
        this.contactNumber = contactNumber;
        this.startingDate = startingDate;
        this.paymentFrequency = paymentFrequency;
        this.paymentModality = paymentModality;
    };
};

interface ScheduleItem {
    patient: string;
    hour: string;
    day: string;
};

class Therapist {
    name: string;
    lastName: string;
    startingDate: string;
    contactNumber: string;
    schedule: ScheduleItem[] | undefined;

    constructor(name: string, lastName: string, startingDate: string, contactNumber: string, schedule?: ScheduleItem[]) {
        this.name = name;
        this.lastName = lastName;
        this.startingDate = startingDate;
        this.contactNumber = contactNumber;
        this.schedule = schedule;
    }
};

class ScheduleItemClass {
    patientName: string;
    patientLastName: string;
    hour: string;
    day: string;

    constructor(patientName: string, patientLastName: string, hour: string, day: string) {
        this.patientName = patientName;
        this.patientLastName = patientLastName;
        this.hour = hour;
        this.day = day;
    };
};

export { ContactMessage, Appointment, AppointmentInput, Patient, Therapist, ScheduleItemClass };