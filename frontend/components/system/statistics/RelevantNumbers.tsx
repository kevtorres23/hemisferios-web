import { useState } from "react";

function RelevantNumbersCard() {
    const [income, setIncome] = useState(1240);
    const [newPatients, setNewPatients] = useState(9);

    return (
        <div className="w-full bg-white rounded-lg border border-slate-200 flex flex-col gap-4 p-6">
            <p className="font-semibold text-slate-800 text-lg">Cifras nuevas</p>

            <div className="w-full flex xl:flex-row flex-col justify-start items-center gap-6 h-full">
                <div className="w-full flex flex-col bg-white border border-slate-200 p-4 gap-3 rounded-md h-full justify-center">
                    <p className="text-base font-medium">Ingresos aproximados</p>

                    <h1 className="text-3xl font-medium text-indigo-500">${income}</h1>

                    <p className="text-sm w-full text-wrap text-slate-500 font-normal">Calculados en base a las citas completadas.</p>
                </div>

                <div className="w-full flex flex-col bg-white border border-slate-200 p-4 gap-3 h-full justify-center rounded-md">
                    <p className="text-base font-medium">Nuevos pacientes</p>

                    <h1 className="text-3xl font-medium text-indigo-500">+{newPatients}</h1>

                    <p className="text-sm w-full text-wrap text-slate-500 font-normal">Obtenidos en base a los últimos registros.</p>
                </div>
            </div>
        </div>
    );
};

export default RelevantNumbersCard;