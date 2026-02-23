import { PieChart } from '@mui/x-charts/PieChart';

export function Pie() {
    return (
        <PieChart
            series={[
                {
                    data: [
                        { id: 0, value: 10, label: 'series A' },
                        { id: 1, value: 15, label: 'series B' },
                        { id: 2, value: 20, label: 'series C' },
                    ],
                },
            ]}
            width={200}
            height={200}
        />
    );
}

export default function CircleChartCard() {
    return (
        <div className="w-full bg-white rounded-lg border border-slate-200 flex flex-col gap-4 p-6">
            <p className="font-medium text-slate-800 text-lg">Porcentajes por estatus</p>
            
            <Pie />
        </div>
    );
};