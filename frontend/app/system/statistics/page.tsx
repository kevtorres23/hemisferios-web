"use client";

import { useState, useId, useEffect } from "react";
import { Calendar } from "lucide-react";
import SystemLayout from "@/components/system/SystemLayout";
import PageTitle from "@/components/system/PageTitle";
import StatisticCard from "@/components/system/statistics/StatisticCard";
import CircleChartCard from "@/components/system/statistics/CircleChartCard";
import RelevantNumbersCard from "@/components/system/statistics/RelevantNumbers";
import MostFrequentPatients from "@/components/system/statistics/MostFrequentPatients";
import BarChartCard from "@/components/system/statistics/BarChartCard";
import { getAppointmentsOfMonth } from "@/lib/statistics/get-appointments";
import LoadingState from "@/components/system/LoadingState";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { AppointmentType } from "@/utils/types";

function Statistics() {
    const date = new Date();

    const id = useId();
    const [displayedMonth, setDisplayedMonth] = useState((date.getMonth() + 1).toString());
    const [monthNumber, setMonthNumber] = useState(date.getMonth() + 1);
    const [pendingCount, setPendingCount] = useState(0);
    const [finishedCount, setFinishedCount] = useState(0);
    const [cancelledCount, setCancelledCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        getAppointmentsOfMonth(monthNumber).then((result) => {
            let pendings = 0;
            let finished = 0;
            let cancelled = 0;

            if (!result) {
                return;
            };

            setTotalCount(result.length);

            result.forEach((appointment: AppointmentType) => {
                if (appointment.status === "pending") {
                    pendings += 1;
                } else if (appointment.status === "finished") {
                    finished += 1;
                } else {
                    cancelled += 1;
                };
            });

            setPendingCount(pendings);
            setFinishedCount(finished);
            setCancelledCount(cancelled);

        }).catch((error) => {
            console.log("An error ocurred while fetching the appointments", error);
        }).finally(() => setIsLoading(false));

    }, []);

    const recordMonths = [" ", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    return (
        <SystemLayout sidebarPage="statistics">

            <div className="header flex sm:flex-row flex-col justify-between items-start sm:gap-10 gap-6 w-full">
                <PageTitle title="Estadísticas" desc="Obten un resumen visual del aspecto administrativo y logístico del centro." />

                <Select value={displayedMonth} onValueChange={(val) => setDisplayedMonth(val)}>
                    <SelectTrigger id={id} className={`w-auto bg-white sm:text-sm text-base cursor-pointer py-5 px-3`}>
                        <Calendar size={16} className="text-slate-900" />
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-sm z-999" sideOffset={5} position="popper">
                        <SelectGroup className="h-80 overflow-y-scroll">
                            <SelectLabel className="text-sm">Mes del registro:</SelectLabel>
                            {/* Map the available record months */}
                            {recordMonths.map((item, id) => {
                                return id === 0 ? "" : ( // Skip the first item of the record list, which is only a placeholder.
                                    <SelectItem className="text-sm" key={id} value={id.toString()}>{item}
                                        <p className="font-semibold text-slate-800 -ml-1">{id === date.getMonth() + 1 ? "(mes actual)" : ""}</p>
                                    </SelectItem>
                                );
                            })};
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {isLoading && <LoadingState message="Cargando estadísticas..." />}

            {!isLoading && (
                <>
                    <div className="w-full bg-white rounded-lg border border-slate-200 flex flex-col gap-4 p-6">
                        <p className="font-semibold text-slate-800 text-lg">Estadísticas de citas</p>

                        <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                            <StatisticCard type="totals" number={totalCount} percentage={12.5} />
                            <StatisticCard type="completed" number={finishedCount} percentage={25} />
                            <StatisticCard type="pending" number={pendingCount} percentage={16} />
                            <StatisticCard type="cancelled" number={cancelledCount} percentage={-3.5} />
                        </div>
                    </div>

                    <div className="second-card-row gap-6 w-full flex lg:flex-row flex-col">
                        <CircleChartCard total={totalCount} pending={pendingCount} finished={finishedCount} cancelled={cancelledCount} />

                        <RelevantNumbersCard />
                    </div>

                    <div className="third-card-row gap-6 w-full flex lg:flex-row flex-col">
                        <MostFrequentPatients />

                        <BarChartCard />
                    </div>
                </>
            )}
        </ SystemLayout>
    );
};

export default Statistics;