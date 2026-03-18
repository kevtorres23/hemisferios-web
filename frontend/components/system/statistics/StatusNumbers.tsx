import StatisticCard from "./StatisticCard"
import { useEffect, useState } from "react";
import { AppointmentType } from "@/utils/types";
import { getAppointmentsByRange } from "@/lib/statistics/get-appointments";
import { comparativePercentages } from "@/utils/system/statistics/calculations";

type CardProps = {
    displayedMonth: number,
    totalCount: number,
    finishedCount: number,
    pendingCount: number,
    cancelledCount: number,
};

export default function StatusNumbers(props: CardProps) {
    const [prevTotal, setPrevTotal] = useState(0);
    const [prevPending, setPrevPending] = useState(0);
    const [prevFinished, setPrevFinished] = useState(0);
    const [prevCancelled, setPrevCancelled] = useState(0);

    useEffect(() => {
        getAppointmentsByRange(props.displayedMonth - 1, props.displayedMonth - 1).then((result) => {
            let pendings = 0;
            let finished = 0;
            let cancelled = 0;

            if (!result) {
                return;
            };

            setPrevTotal(result.length);

            result.forEach((appointment: AppointmentType) => {
                if (appointment.status === "pending") {
                    pendings += 1;
                } else if (appointment.status === "finished") {
                    finished += 1;
                } else {
                    cancelled += 1;
                };
            });

            setPrevPending(pendings);
            setPrevFinished(finished);
            setPrevCancelled(cancelled);
        }).catch((error) => {
            console.log(error);
        });

    }, [props.displayedMonth]);

    return (
        <div className="w-full bg-white rounded-lg border border-slate-200 flex flex-col gap-4 p-6">
            <p className="font-semibold text-slate-800 text-lg">Estadísticas de citas</p>

            <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                <StatisticCard type="totals" number={props.totalCount} percentage={comparativePercentages(prevTotal, props.totalCount)} />
                <StatisticCard type="completed" number={props.finishedCount} percentage={comparativePercentages(prevFinished, props.finishedCount)} />
                <StatisticCard type="pending" number={props.pendingCount} percentage={comparativePercentages(prevPending, props.pendingCount)}/>
                <StatisticCard type="cancelled" number={props.cancelledCount} percentage={comparativePercentages(prevCancelled, props.cancelledCount)} />
            </div>
        </div>
    )
};