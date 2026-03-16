import dynamic from "next/dynamic";
import { statusPercentage } from "@/utils/system/statistics/calculations";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface LabelProps {
    name: string;
    percentage: string;
    dotColor: string;
};

function PercentageLabel(props: LabelProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-1.5 items-center">
                <div className={`w-2 h-2 rounded-[50%] ${props.dotColor}`}></div>
                <p className="text-slate-500 text-sm">{props.name}</p>
            </div>

            <p className="text-2xl font-medium text-slate-900">{props.percentage}%</p>
        </div>
    )
};

type ChartPercentages = {
    total: number,
    pending: number,
    finished: number,
    cancelled: number,
};

export default function CircleChartCard(props: ChartPercentages) {

    const chartConfig = {
        type: "pie",
        width: 150,
        height: 150,
        series: [props.finished, props.pending, props.cancelled], // Completed, pending, and cancelled, respectively.
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            labels: ["Completadas", "Pendientes", "Canceladas"],
            dataLabels: {
                enabled: false,
            },
            colors: ["#22C55E", "#EAB308", "#F43F5E"],
            legend: {
                show: false,
            },
        },
    };

    return (
        <div className="w-full bg-white rounded-lg border border-slate-200 flex flex-col gap-6 p-6">
            <p className="font-semibold text-slate-800 text-lg">Porcentajes por estatus</p>

            <div className="w-full flex xl:flex-row lg:flex-col sm:flex-row flex-col lg:justify-center justify-between items-center xl:gap-12 lg:gap-6 sm:gap-4 gap-6">
                <Chart {...chartConfig} />

                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-8">
                        <PercentageLabel name="Completadas" percentage={statusPercentage(props.total, props.finished)} dotColor="bg-green-500" />

                        <PercentageLabel name="Pendientes" percentage={statusPercentage(props.total, props.pending)} dotColor="bg-yellow-500" />
                    </div>

                    <PercentageLabel name="Canceladas" percentage={statusPercentage(props.total, props.cancelled)} dotColor="bg-red-500" />
                </div>
            </div>
        </div>
    );
};