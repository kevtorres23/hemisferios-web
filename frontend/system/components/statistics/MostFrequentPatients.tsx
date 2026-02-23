import { ClipboardClock } from "lucide-react";

interface FrequencyCard {
    name: string;
    lastName: string;
    appointmentNum: number;
};

function FrequentPatientCard(props: FrequencyCard) {
    return (
        <div className="w-full flex flex-col gap-2 p-3 rounded-lg border border-slate-200 bg-white">
            <p className="text-sm font-medium text-slate-900">{props.name} {props.lastName}</p>

            <div className="flex flex-row gap-1.5 items-center">
                <div className="icon flex p-1 rounded-sm bg-indigo-50">
                    <ClipboardClock size={16} className="text-indigo-500"/>
                </div>

                <p className="text-sm text-slate-500 font-normal">
                    <span className="text-indigo-500 font-medium">{props.appointmentNum} </span>
                    citas al mes
                </p>
            </div>
        </div>
    );
};

export default function MostFrequentPatients() {
    return (
        <div className="lg:w-1/2 w-full bg-white rounded-lg border border-slate-200 flex flex-col gap-5 p-6">
            <p className="font-semibold text-slate-800 text-lg">Pacientes más frecuentes</p>

            <div className="w-full grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 grid-cols-1 justify-start items-center gap-5">
                <FrequentPatientCard name="Mariano" lastName="Casas" appointmentNum={6}/>
                <FrequentPatientCard name="Mariano" lastName="Casas" appointmentNum={6}/>
                <FrequentPatientCard name="Mariano" lastName="Casas" appointmentNum={6}/>
                <FrequentPatientCard name="Mariano" lastName="Casas" appointmentNum={6}/>
            </div>
        </div>
    );
};