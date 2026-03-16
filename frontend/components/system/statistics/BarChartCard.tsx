import { getAppointmentsByRange } from "@/lib/statistics/get-appointments";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function BarChartCard() {
    const [month1, setMonth1] = useState(0);
    const [month2, setMonth2] = useState(0);
    const [month3, setMonth3] = useState(0);
    const [month4, setMonth4] = useState(0);
    const [month5, setMonth5] = useState(0);
    const [month6, setMonth6] = useState(0);
    const [monthNums, setMonthNums] = useState<number[]>([]);

    useEffect(() => {
        const date = new Date();

        const difference = date.getMonth() + 1 - 6;
        let iteratorStart;

        if (difference < 0) {
            iteratorStart = 1;
        } else {
            iteratorStart = difference + 1;
        };

        const monthArray: number[] = [];

        for (let i = iteratorStart; i < iteratorStart + 6; i++) {
            monthArray.push(i);
        };

        setMonthNums(monthArray)

        getAppointmentsByRange(monthArray[0], monthArray[0]).then((result) => {
            setMonth1(result ? result.length : 0);
        }).catch((error) => console.log("An error ocurred:", error));

        getAppointmentsByRange(monthArray[1], monthArray[1]).then((result) => {
            setMonth2(result ? result.length : 0);
        }).catch((error) => console.log("An error ocurred:", error));

        getAppointmentsByRange(monthArray[2], monthArray[2]).then((result) => {
            setMonth3(result ? result.length : 0);
        }).catch((error) => console.log("An error ocurred:", error));

        getAppointmentsByRange(monthArray[3], monthArray[3]).then((result) => {
            setMonth4(result ? result.length : 0);
        }).catch((error) => console.log("An error ocurred:", error));

        getAppointmentsByRange(monthArray[4], monthArray[4]).then((result) => {
            setMonth5(result ? result.length : 0);
        }).catch((error) => console.log("An error ocurred:", error));

        getAppointmentsByRange(monthArray[5], monthArray[5]).then((result) => {
            setMonth6(result ? result.length : 0);
        }).catch((error) => console.log("An error ocurred:", error));

    }, []);

    const chartConfig = {
        type: "bar",
        height: "auto",
        width: "100%",
        series: [
            {
                name: "Citas",
                data: [month1, month2, month3, month4, month5, month6],
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#6366F1"],
            plotOptions: {
                bar: {
                    columnWidth: "40%",
                    borderRadius: 2,
                },
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: [
                    "Ene",
                    "Feb",
                    "Mar",
                    "Abr",
                    "May",
                    "Jun",
                ],
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    };

    function obtainTotal() {
        var sumTotal = 0;
        var chartData = chartConfig.series[0].data;

        // Obtain the total amount of appointments form the chart's values.
        for (let i = 0; i < chartData.length; i++) {
            sumTotal += chartData[i];
        };

        return sumTotal;
    };

    const total = obtainTotal();

    return (
        <div className="lg:w-1/2 w-full bg-white rounded-lg border border-slate-200 flex flex-col gap-4 p-6 items-start justify-center">
            <p className="font-semibold text-slate-800 text-lg">Cantidad de citas por mes</p>

            <div className="w-full flex xl:flex-row lg:flex-col sm:flex-row flex-col xl:items-center items-start justify-center xl:gap-0 gap-4">
                <div className="written-data flex flex-col gap-2">
                    <p className="text-sm font-normal text-slate-500">Citas totales:</p>

                    <p className="text-5xl font-medium text-slate-900 tracking-tight">{total}</p>

                    <p className="text-sm font-normal text-slate-500 text-wrap">Registradas en los últimos seis meses.</p>
                </div>

                <Chart {...chartConfig} />
            </div>

        </div>
    );
};