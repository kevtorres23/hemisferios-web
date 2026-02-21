"use client";
import SystemLayout from "@/system/components/SystemLayout";
import EmptyState from "@/system/components/EmptyState";
import { NewAppointmentModal } from "@/system/components/modals/AppointmentActions";
import AvailabilityModal from "@/system/components/modals/AvailabilityModal";
import SuccessModal from "@/system/components/modals/SuccessModal";
import PageTitle from "@/system/components/PageTitle";
import IconButton from "@/system/components/IconButton";
import AppointmentGrid from "@/system/components/appointments/AppointmentGrid";
import AppointmentCalendar from "@/system/components/appointments/AppointmentCalendar";
import WhiteIconButton from "@/system/components/WhiteIconButton";
import FilterBar from "@/system/components/FilterBar";
import { Plus, SquarePen } from "lucide-react";
import { useState } from "react";
import historyEmpty from "../../../public/history-empty.png";
import { AppointmentType } from "@/system/modules/Types";
import { pageSeparator } from "@/system/modules/PageSeparator";

type AppointmentDataset = AppointmentType[];

function HistoryDashboard() {
    const [view, setView] = useState("cards");
    const [searchValue, setSearchValue] = useState("");
    const [successAppointment, setSuccessAppointment] = useState(false);
    const [successAvailability, setSuccessAvailability] = useState(false);
    const [newAppointmentModal, setNewAppointmentModal] = useState(false);
    const [availabilityModal, setAvailabilityModal] = useState(false);

    const data: AppointmentDataset = [
        {
            status: "pending",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "09/02/2026",
            hour: "12:00",
            timestamp: "today"
        },
        {
            status: "finished",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "10/02/2026",
            hour: "15:00",
            timestamp: "today"
        },
        {
            status: "cancelled",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "13/02/2026",
            hour: "16:00",
            timestamp: "today"
        },
        {
            status: "pending",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "14/02/2026",
            hour: "15:00",
            timestamp: "today"
        },
        {
            status: "finished",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "15/02/2026",
            hour: "11:00",
            timestamp: "today"
        },
        {
            status: "cancelled",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "16/02/2026",
            hour: "12:00",
            timestamp: "today"
        },
        {
            status: "pending",
            patientName: "Kevin",
            fatherSurname: "Urbina",
            motherSurname: "Torres",
            phoneNumber: "6181889026",
            date: "16/02/2026",
            hour: "15:00",
            timestamp: "today"
        },
    ];

    function onSaveAppointment() {
        setNewAppointmentModal(false);
        setSuccessAppointment(true);
        setTimeout(() => setSuccessAppointment(false), 3000);
    };

    function onSaveAvailability() {
        setAvailabilityModal(false);
        setSuccessAvailability(true);
        setTimeout(() => setSuccessAvailability(false), 3000)
    };

    let appointmentPages = pageSeparator(data);

    function onViewChange(selectedView: string) {
        setView(selectedView);
    };

    return (
        <SystemLayout sidebarPage="history" isAnyModal={newAppointmentModal || availabilityModal}>

        </ SystemLayout>
    );
};

export default HistoryDashboard;