import { useId } from "react";
import OptionCheckbox from "../OptionCheckbox";
import { CreditCard, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Funnel } from "lucide-react";

type FilterProps = {
    onCashChange: (value: boolean) => void;
    onCardChange: (value: boolean) => void;
    onWeeklyChange: (value: boolean) => void;
    onMonthlyChange: (value: boolean) => void;
    onSessionChange: (value: boolean) => void;
};

function FilterDropdown(props: FilterProps) {
    const [cashChecked, setCashChecked] = useState(true);
    const [cardChecked, setCardChecked] = useState(true);
    const [monthlyChecked, setMonthlyChecked] = useState(true);
    const [weeklyChecked, setWeeklyChecked] = useState(true);
    const [sessionChecked, setSessionChecked] = useState(true);

    function onCashChecked() {
        setCashChecked(!cashChecked);
        props.onCashChange(!cashChecked);
    };

    function onCardChecked() {
        setCardChecked(!cardChecked);
        props.onCardChange(!cardChecked);
    };

    function onWeeklyChecked() {
        setWeeklyChecked(!weeklyChecked);
        props.onWeeklyChange(!weeklyChecked);
    }

    function onMonthlyChecked() {
        setMonthlyChecked(!monthlyChecked);
        props.onMonthlyChange(!monthlyChecked);
    };

    function onSessionChecked() {
        setSessionChecked(!sessionChecked);
        props.onSessionChange(!sessionChecked);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="" variant="outline">
                    <Funnel size={14} />
                    Filtros
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className={`w-auto flex flex-col max-h-90 items-center justify-center`}>
                <>
                    {/* Tipo de pago: */}
                    <DropdownMenuGroup className="flex flex-col gap-4 p-2.5 w-full">
                        <DropdownMenuLabel className="text-slate-600 font-medium p-0">Por modalidad:</DropdownMenuLabel>
                        <div className="option-row flex flex-col gap-4 w-full">
                            <OptionCheckbox checked={cashChecked} onCheckedChange={onCashChecked} item={
                                <div className="flex flex-row items-center gap-1.5 text-slate-800">
                                    <Banknote size={20} />
                                    <p className="font-normal text-nowrap">Efectivo</p>
                                </div>
                            } />
                            <OptionCheckbox checked={cardChecked} onCheckedChange={onCardChecked} item={
                                <div className="flex flex-row items-center gap-1.5 text-slate-800">
                                    <CreditCard size={20} />
                                    <p className="font-normal text-nowrap">Tarjeta</p>
                                </div>
                            } />
                        </div>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="w-full border border-slate-200" />

                    <DropdownMenuGroup className="flex flex-col gap-4 p-2.5 w-full">
                        <DropdownMenuLabel className="text-slate-600 font-medium p-0">Por frecuencia:</DropdownMenuLabel>
                        <div className="option-row flex flex-col gap-4 w-full">
                            <OptionCheckbox checked={weeklyChecked} onCheckedChange={onWeeklyChecked} item={<p className="font-normal text-slate-800 text-nowrap">Semanal</p>} />
                            <OptionCheckbox checked={monthlyChecked} onCheckedChange={onMonthlyChecked} item={<p className="font-normal text-slate-800 text-nowrap">Mensual</p>} />
                            <OptionCheckbox checked={sessionChecked} onCheckedChange={onSessionChecked} item={<p className="font-normal text-slate-800 text-nowrap">Por sesión</p>} />
                        </div>
                    </DropdownMenuGroup>

                </>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default FilterDropdown;