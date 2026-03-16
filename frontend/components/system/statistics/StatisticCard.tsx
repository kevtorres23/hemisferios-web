import { ClipboardClock, CircleCheck, CircleDotDashed, CircleSlash, ArrowUpRight, ArrowDownRight, CircleEqual } from "lucide-react";

interface CardProps {
    type: "totals" | "completed" | "pending" | "cancelled";
    number: number;
    percentage: string;
};

type StatisticCardElems = {
    name: string;
    color: string;
    bgColor: string;
    icon: React.ReactNode;
};

type CardFeatures = {
    totals: StatisticCardElems;
    completed: StatisticCardElems;
    pending: StatisticCardElems;
    cancelled: StatisticCardElems;
};

const cardStyles: CardFeatures = {
    totals: {
        name: "Citas totales",
        icon: <ClipboardClock size={18} />,
        color: "text-blue-500",
        bgColor: "bg-[rgb(14,165,233,0.12)]"
    },
    completed: {
        name: "Citas completadas",
        icon: <CircleCheck size={18} />,
        color: "text-green-500",
        bgColor: "bg-[rgb(34,197,94,0.12)]"
    },
    pending: {
        name: "Citas pendientes",
        icon: <CircleDotDashed size={18} />,
        color: "text-yellow-500",
        bgColor: "bg-[rgb(234,179,8,0.12)]"
    },
    cancelled: {
        name: "Citas canceladas",
        icon: <CircleSlash size={18} />,
        color: "text-red-500",
        bgColor: "bg-[rgb(244,63,94,0.15)]"
    }

}

function StatisticCard(props: CardProps) {
    return (
        <div className="w-full flex flex-col gap-3 bg-white border border-slate-200 rounded-md items-start p-4">
            <div className="flex flex-row gap-2 items-center justify-center">
                <div className={`patient-badge p-1.5 rounded-md ${cardStyles[props.type].bgColor} ${cardStyles[props.type].color}`}>
                    {cardStyles[props.type].icon}
                </div>

                <p className="text-sm font-medium text-slate-500">
                    {cardStyles[props.type].name}
                </p>
            </div>

            <p className="text-4xl font-medium text-slate-900">{props.number}</p>

            <div className="w-full text-wrap flex flex-row items-center justify-start gap-1 text-indigo-500">
                {(Number(props.percentage) > 0) && (
                    <>
                        <ArrowUpRight size={16} />
                        <p className="text-sm font-medium">
                            <span className="text-green-500 font-semibold">+{props.percentage}% </span>
                            vs. mes pasado
                        </p>
                    </>
                )}

                {(Number(props.percentage) === 0) && (
                    <>
                        <CircleEqual size={16} className="text-slate-500" />
                        <p className="text-sm font-medium">
                            <span className="text-slate-500 font-medium">Igual que el mes pasado </span>
                        </p>
                    </>
                )}

                {(Number(props.percentage) < 0) && (
                    <>
                        <ArrowDownRight size={16} />
                        <p className="text-sm font-medium">
                            <span className="text-red-500 font-semibold">{props.percentage}% </span>
                            vs. mes pasado
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default StatisticCard;