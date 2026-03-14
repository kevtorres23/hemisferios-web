"use client";

import { useState, useId } from "react";
import { Calendar } from "lucide-react";
import SystemLayout from "@/components/system/SystemLayout";
import PageTitle from "@/components/system/PageTitle";
import StatisticCard from "@/components/system/statistics/StatisticCard";
import CircleChartCard from "@/components/system/statistics/CircleChartCard";
import RelevantNumbersCard from "@/components/system/statistics/RelevantNumbers";
import MostFrequentPatients from "@/components/system/statistics/MostFrequentPatients";
import BarChartCard from "@/components/system/statistics/BarChartCard";
import { getstatusCount } from "@/lib/statistics/get-appointments-status";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

function Statistics() {
    const id = useId();
    const [displayedMonth, setDisplayedMonth] = useState("Febrero");
    const [pendingCount, setPendingCount] = useState(0);
    const [finishedCount, setFinishedCount] = useState(0);
    const [cancelledCount, setCancelledCount] = useState(0);

    // Implementar los filtros aquí.

    const recordMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    return (
        <SystemLayout sidebarPage="statistics">

            <div className="header flex sm:flex-row flex-col justify-between items-start sm:gap-10 gap-6 w-full">
                <PageTitle title="Estadísticas" desc="Obten un resumen visual del aspecto administrativo y logístico del centro." />

                <Select defaultValue="01" value={displayedMonth} onValueChange={(val) => setDisplayedMonth(val)}>
                    <SelectTrigger id={id} className={`w-auto bg-white sm:text-sm text-base cursor-pointer py-5 px-3`}>
                        <Calendar size={16} className="text-slate-900" />
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-sm z-999" sideOffset={5} position="popper">
                        <SelectGroup className="h-80 overflow-y-scroll">
                            <SelectLabel className="text-sm">Mes del registro:</SelectLabel>
                            {/* Map the available record months */}
                            {recordMonths.map((item, id) =>
                                <SelectItem className="text-sm" key={id} value={item}>{item}</SelectItem>
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="w-full bg-white rounded-lg border border-slate-200 flex flex-col gap-4 p-6">
                <p className="font-semibold text-slate-800 text-lg">Estadísticas de citas</p>

                <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                    <StatisticCard type="totals" number={128} percentage={12.5} />
                    <StatisticCard type="completed" number={64} percentage={25} />
                    <StatisticCard type="pending" number={52} percentage={16} />
                    <StatisticCard type="cancelled" number={12} percentage={-3.5} />
                </div>
            </div>

            <div className="second-card-row gap-6 w-full flex lg:flex-row flex-col">
                <CircleChartCard />

                <RelevantNumbersCard />
            </div>

            <div className="third-card-row gap-6 w-full flex lg:flex-row flex-col">
                <MostFrequentPatients />

                <BarChartCard />
            </div>
        </ SystemLayout>
    );
};

export default Statistics;