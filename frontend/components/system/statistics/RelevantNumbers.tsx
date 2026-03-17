import { useState, useEffect } from "react";
import { getAllPatients } from "@/lib/statistics/get-patients";
import { establishPaymentDate } from "@/utils/system/patients/next-payments";
import { stringToDate } from "@/utils/date-methods";
import { compareAsc, isWithinInterval } from "date-fns";
import { getDaysInMonth } from "@/utils/system/calendar/get-days-month";

function RelevantNumbersCard({ month, onFinished }: { month: string, onFinished: () => void }) {
    const [income, setIncome] = useState<number>();
    const [newPatients, setNewPatients] = useState(9);

    useEffect(() => {
        getAllPatients().then((result) => {
            let calculatedIncome = 0;
            let createdPatients = 0;

            result.forEach((patient) => {
                let paymentDate = establishPaymentDate(patient.paymentModality, patient.startingDate);
                let currentDate = new Date();
                let daysInPassedMonth = getDaysInMonth(currentDate.getFullYear(), Number(month));
                const year = currentDate.getFullYear();

                if (Number(month) === currentDate.getMonth() + 1) {
                    if (paymentDate && compareAsc(stringToDate(paymentDate), currentDate) === 1) {
                        calculatedIncome += 250;
                    };
                } else {
                    if (paymentDate && compareAsc(stringToDate(paymentDate), new Date(year, Number(month), daysInPassedMonth)) === 1) {
                        calculatedIncome += 250;
                    };
                }

                let creationMonth = patient.createdAt[5] + patient.createdAt[6];

                if (Number(creationMonth) === currentDate.getMonth() + 1) {
                    createdPatients += 1;
                }
            });

            setIncome(calculatedIncome);
            setNewPatients(createdPatients);
        }).catch((error) => {
            console.log("An error just ocurred:", error);
        }).finally(() => onFinished());

    }, []);

    return (
        <div className="w-full bg-white rounded-lg border border-slate-200 flex flex-col gap-4 p-6">
            <p className="font-semibold text-slate-800 text-lg">Cifras nuevas</p>

            <div className="w-full flex xl:flex-row flex-col justify-start items-center gap-6 h-full">
                <div className="w-full flex flex-col bg-white border border-slate-200 p-4 gap-3 rounded-md h-full justify-center">
                    <p className="text-base font-medium">Ingresos aproximados</p>

                    <h1 className="text-3xl font-medium text-indigo-500">${income ? income : "..."}</h1>

                    <p className="text-sm w-full text-wrap text-slate-500 font-normal">Calculados en base a los pagos de los pacientes.</p>
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