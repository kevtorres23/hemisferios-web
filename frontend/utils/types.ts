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

interface PatientRegistry {
    date: string;
    hour: string;
    _id: string;
}

interface PatientType {
    _id: string;
    name: string;
    fatherSurname: string;
    motherSurname: string;
    adultName: string;
    contactNumber: string;
    startingDate: string;
    paymentFrequency: string;
    paymentModality: string;
    paymentAmount: number;
    visitRegistry: PatientRegistry[];
    createdAt: string;
};

interface ScheduleItem {
    patientName: string;
    patientLastName: string;
    hour: string;
    day: string;
    _id: string;
};

interface TherapistType {
    _id: string;
    name: string;
    lastName: string;
    startingDate: string;
    contactNumber: string;
    schedule: ScheduleItem[];
};

type CommentType = {
    _id: string;
    name: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    message: string;
    status: string; // It can be seen or unseen.
    createdAt: string;
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
    ScheduleItem,
    PatientRegistry,
    CommentType,
    DayFormat,
    Availability
};