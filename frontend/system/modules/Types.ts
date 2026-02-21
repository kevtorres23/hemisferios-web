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
};

type ModalProps = {
    isVisible: boolean;
    onClose: () => void;
    onSave: () => void;
};

export type { AppointmentType, TagType, ModalProps };