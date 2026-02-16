type AppointmentType = {
    status: string;
    patientName: string;
    fatherSurname: string;
    motherSurname: string;
    phoneNumber: string;
    date: string;
    hour: string;
    timestamp: string;
};

type TagType = {
    name: string;
    color: string;
    textColor: string;
    bgColor: string;
    borderColor: string;
}

export type { AppointmentType, TagType };