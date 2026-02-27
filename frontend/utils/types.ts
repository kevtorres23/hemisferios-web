interface AppointmentType {
    _id: number;
    status: string;
    patientName: string;
    fatherSurname: string;
    motherSurname: string;
    phoneNumber: string;
    date: string;
    hour: string;
    timestamp?: string;
};

interface PatientHistory {
    date: string;
    hour: string;
}

interface PatientType {
    name: string;
    fatherSurname: string;
    motherSurname: string;
    adultName: string;
    contactNumber: string;
    startingDate: string;
    paymentFrequency: string;
    paymentModality: string;
    appointmentHistory: PatientHistory[];
};

interface TherapistSchedule {
    patient: string;
    hour: string;
    day: string;
};

interface TherapistType {
    name: string;
    lastName: string;
    startingDate: string;
    contactNumber: string;
    schedule: TherapistSchedule[];
};

type CommentType = {
    name: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    message: string;
    status: string; // It can be seen or unseen.
    date: string;
};

type TagType = {
    name: string;
    color: string;
    textColor: string;
    bgColor: string;
    borderColor: string;
};

type ModalProps = {
    isVisible: boolean;
    onClose: () => void;
    onSave: () => void;
};

interface UpdateModalProps extends ModalProps {
    updateElementId: number;
};

export type {
    AppointmentType,
    TagType,
    ModalProps,
    UpdateModalProps,
    PatientType,
    TherapistType,
    PatientHistory,
    CommentType
};