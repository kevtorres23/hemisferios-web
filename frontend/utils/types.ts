import type { Option } from "@/components/ui/multi-select";

interface AppointmentType {
    _id: string;
    status: string;
    patientName: string;
    fatherSurname: string;
    motherSurname: string;
    phoneNumber: string;
    date: string;
    hour: string;
    timestamp?: string;
    cancellationComment?: string;
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

interface ActionModalProps extends ModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: () => void;
    updateElementId: string;
};

interface UpdateStatusModal {
    isVisible: boolean;
    onClose: () => void;
    onSave: () => void;
}

type DayFormat = {
    writtenDate: string;
    databaseDate: string;
    hours: string[];
};

type Availability = {
    lunes: (string | number)[],
    martes: (string | number)[],
    miercoles: (string | number)[],
    jueves: (string | number)[],
    viernes: (string | number)[],
    sabado:(string | number)[],
};

export type {
    AppointmentType,
    TagType,
    ModalProps,
    ActionModalProps,
    UpdateStatusModal,
    PatientType,
    TherapistType,
    PatientHistory,
    CommentType,
    DayFormat,
    Availability
};