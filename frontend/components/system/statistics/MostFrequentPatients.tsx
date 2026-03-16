import { useEffect, useState } from "react";
import { ClipboardClock } from "lucide-react";
import api from "@/lib/axios";
import { PatientType } from "@/utils/types";

interface FrequencyCard {
    name: string;
    appointmentNum: number;
};

function FrequentPatientCard(props: FrequencyCard) {
    return (
        <div className="w-full flex flex-col gap-2 p-3 rounded-lg border border-slate-200 bg-white">
            <p className="text-sm font-medium text-slate-900">{props.name}</p>

            <div className="flex flex-row gap-1.5 items-center">
                <div className="icon flex p-1 rounded-sm bg-indigo-50">
                    <ClipboardClock size={16} className="text-indigo-500" />
                </div>

                <p className="text-sm text-slate-500 font-normal">
                    <span className="text-indigo-500 font-medium">{props.appointmentNum} </span>
                    citas al mes
                </p>
            </div>
        </div>
    );
};

export default function MostFrequentPatients({ month }: { month: number }) {
    const [patientList, setPatientList] = useState<{ name: string, visits: number }[]>([]);

    useEffect(() => {
        const getPatients = async () => {
            const res = await api.get("/patients");
            const patients: PatientType[] = res.data;

            const mostFrequent: { name: string, visits: number }[] = [];
            let fourCounter = 0;

            patients.forEach((patient) => {
                let patientVisits = 0;

                patient.visitRegistry.forEach((visit) => {
                    let visitDate = new Date(visit.date);
                    if (visitDate.getMonth() + 1 === month) {
                        patientVisits += 1;
                    }
                });

                if (fourCounter <= 4) {
                    mostFrequent.push({
                        name: patient.name + " " + patient.fatherSurname,
                        visits: patientVisits,
                    });

                    fourCounter += 1;

                } else {
                    console.log(mostFrequent);
                    setPatientList(mostFrequent);
                    return;
                };

            });

            setPatientList(mostFrequent);
        };

        getPatients();
    }, []);

    return (
        <div className="lg:w-1/2 w-full bg-white rounded-lg border border-slate-200 flex flex-col gap-5 p-6">
            <p className="font-semibold text-slate-800 text-lg">Pacientes más frecuentes</p>

            <div className="w-full grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 grid-cols-1 justify-start items-center gap-5">
                {patientList.sort((a, b) => (b.visits - a.visits)).map((patient) => <FrequentPatientCard name={patient.name} appointmentNum={patient.visits}/>)}
            </div>
        </div>
    );
};