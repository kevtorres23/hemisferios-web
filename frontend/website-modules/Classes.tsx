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
    }

    displayVideogame() {
        console.log(this.name, this.lastName, this.phoneNumber, this.email, this.message);
    }
}

class Appointment {
    // Class initializers.
    patientName: string;
    motherSurname: string;
    fatherSurname: string;
    phoneNumber: string;
    date: string;
    hour: string;
    creationDate: string;
    creationTime: string;

    // Defining the constructor.
    constructor(patientName: string, motherSurname: string, fatherSurname: string, phoneNumber: string, date: string, hour: string, creationDate: string, creationTime: string) {
        this.patientName = patientName;
        this.motherSurname = motherSurname;
        this.fatherSurname = fatherSurname;
        this.phoneNumber = phoneNumber;
        this.date = date;
        this.hour = hour;
        this.creationDate = creationDate;
        this.creationTime = creationTime;
    }
}

class AppointmentInput {
    value: string;
    isValidationActive: boolean;
    validationMsg: string;

    constructor(value: string, isValidationActive: boolean, validationMsg: string) {
        this.value = value;
        this.isValidationActive = isValidationActive;
        this.validationMsg = validationMsg;
    }
}

export { ContactMessage, Appointment, AppointmentInput };