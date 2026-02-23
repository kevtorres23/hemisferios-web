import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartConfig = {
    type: "pie",
    width: 150,
    height: 150,
    series: [24, 120, 7], // Completed, pending, and cancelled, respectively.
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

function obtainPercentage(val: number) {
    const totalSum = chartConfig.series[0] + chartConfig.series[1] + chartConfig.series[2]; // The sum of all the values within the series array.
    const percentage = (val * 100) / totalSum
    return Math.ceil(percentage);
};

interface LabelProps {
    name: string;
    percentage: number;
    dotColor: string;
};

function PercentageLabel(props: LabelProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-1.5 items-center">
                <div className={`w-2 h-2 rounded-[50%] ${props.dotColor}`}></div>
                <p className="text-slate-500 text-sm">{props.name}</p>
            </div>

            <p className="text-3xl font-medium text-slate-900">{props.percentage}%</p>
        </div>
    )
};

export default function CircleChartCard() {
    return (
        <div className="w-full bg-white rounded-lg border border-slate-200 flex flex-col gap-6 p-6">
            <p className="font-semibold text-slate-800 text-lg">Porcentajes por estatus</p>

            <div className="w-full flex xl:flex-row lg:flex-col sm:flex-row flex-col lg:justify-center justify-between items-center xl:gap-12 lg:gap-6 sm:gap-4 gap-6">
                <Chart {...chartConfig} />

                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-10">
                        <PercentageLabel name="Completadas" percentage={obtainPercentage(chartConfig.series[0])} dotColor="bg-green-500" />

                        <PercentageLabel name="Pendientes" percentage={obtainPercentage(chartConfig.series[1])} dotColor="bg-yellow-500" />
                    </div>

                    <PercentageLabel name="Canceladas" percentage={obtainPercentage(chartConfig.series[2])} dotColor="bg-red-500" />
                </div>
            </div>
        </div>
    );
};