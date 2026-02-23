import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartConfig = {
    type: "bar",
    height: "auto",
    width: "100%",
    series: [
        {
            name: "Citas",
            data: [50, 40, 300, 320, 500, 350],
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

export default function BarChartCard() {
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