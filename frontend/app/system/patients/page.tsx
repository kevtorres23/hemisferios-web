"use client";
import SystemLayout from "@/system/components/SystemLayout";
import { pageSeparator } from "@/system/modules/PageSeparator";
import IconButton from "@/system/components/IconButton";
import WhiteIconButton from "@/system/components/WhiteIconButton";
import { Plus, SquarePen } from "lucide-react";
import PageTitle from "@/system/components/PageTitle";
import { PatientType } from "@/system/modules/Types";
import PatientGrid from "@/system/components/patients/PatientGrid";

type PatientDataset = PatientType[];

function Patients() {

    const data: PatientDataset = [
        {
            "name": "Kevin",
            "fatherSurname": "Torres",
            "motherSurname": "Urbina",
            "adultName": "María Urbina",
            "contactNumber": "61818899026",
            "startingDate": "10-10-2026",
            "paymentFrequency": "mensual",
            "paymentModality": "tarjeta",
            "appointmentHistory": [
                {
                    "date": "10-10-2025",
                    "hour": "09:00",
                }
            ],
        }
    ];

    let patientPages = pageSeparator(data);

    return (
        <SystemLayout sidebarPage="patients">
            <div className="header flex sm:flex-row flex-col justify-between items-start sm:gap-10 gap-6 w-full">
                <PageTitle title="Registro de Pacientes" desc="Consulta un registro de los pacientes que están acudiendo actualmente al centro." />

                <div className="buttons flex lg:flex-row flex-col gap-3 lg:min-w-110 sm:w-auto w-full sm:items-center sm:justify-end">
                    <IconButton onClick={() => ""} isActive={true} icon={<Plus size={18} />} text="Registrar un paciente" />
                </div>
            </div>

            <PatientGrid data={patientPages} onSearchChange={() => ""} onActionSelected={() => ""}/>
        </ SystemLayout>
    );
};

export default Patients;