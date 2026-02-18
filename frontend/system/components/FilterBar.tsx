import SolidIconButton from "./SolidIconButton";
import OutlineIconButton from "./OutlineIconButton";
import { SquareChartGantt, CalendarDays } from "lucide-react";
import { useState } from "react";

type BarProps = {
    firstElement: React.ReactNode;
}

function FilterBar(props: BarProps) {
    const [activeView, setActiveView] = useState("cards");
    
    return (
        <div className="w-full bg-white border border-slate-200 px-4 py-3 rounded-lg items-center flex sm:flex-row flex-col justify-between gap-4">
            {props.firstElement}

            <div className="flex sm:flex-row flex-col gap-3 sm:items-center sm:justify-center sm:w-auto w-full">
                <p className="text-sm font-medium text-slate-500">Vista:</p>
                <SolidIconButton isActive={activeView === "cards"} icon={<SquareChartGantt size={18} />} text="Tarjetas" />
                <SolidIconButton isActive={activeView === "calendar"} icon={<CalendarDays size={18} />} text="Calendario" />
            </div>
        </div>
    );
};

export default FilterBar;