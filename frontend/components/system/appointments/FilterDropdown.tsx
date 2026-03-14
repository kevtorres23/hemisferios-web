import { useId } from "react";
import { Label } from "@/components/ui/label";
import { currentWeekList, nextWeekList } from "@/utils/system/calendar/calendar-variables";
import { format } from "date-fns";
import AppointmentTag from "./AppointmentTag";
import OptionCheckbox from "../OptionCheckbox";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useAppointmentFilters } from "@/utils/system/appointments/filter-store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Funnel } from "lucide-react";
import { es } from "date-fns/locale";

type FilterProps = {
    view: "cards" | "calendar";
    intervalValue?: string;
    onIntervalChange: (val: string) => void;
};

type Status = {
    pending: boolean,
    finished: boolean,
    cancelled: boolean
};

type FilterStore = {
    interval: [string, string],
    statusObject: Status,
    updateInterval: (newIntervalArray: [string, string]) => void,
    updateStatus: (statusObject: Status) => void,
};

const fullDays = [...currentWeekList, ...nextWeekList];
const year = new Date().getFullYear();

const firstDefault = format(new Date(year, fullDays[0].dayNum.month - 1, fullDays[0].dayNum.number), "yyyy-MM-dd");
console.log("firstDefault:", firstDefault);

const secondDefault = format(new Date(year, fullDays[11].dayNum.month - 1, fullDays[11].dayNum.number), "yyyy-MM-dd");

function FilterDropdown(props: FilterProps) {
    const [pendingChecked, setPendingChecked] = useState(true);
    const [finishedChecked, setFinishedChecked] = useState(true);
    const [cancelledChecked, setCancelledChecked] = useState(true);
    const [intervalFirst, setIntervalFirst] = useState(firstDefault);
    const [intervalSecond, setIntervalSecond] = useState(secondDefault)
    const id = useId();

    // Store variables (Zustand).
    const updateInterval = useAppointmentFilters((state: FilterStore) => state.updateInterval);
    const updateStatus = useAppointmentFilters((state: FilterStore) => state.updateStatus);

    function onFirstIntervalChange(val: string) {
        setIntervalFirst(val);
        updateInterval([val, intervalSecond]);
    };

    function onSecondIntervalChange(val: string) {
        setIntervalSecond(val);
        updateInterval([intervalFirst, val]);
    };

    function onPendingChange() {
        setPendingChecked(!pendingChecked);

        const updatedObject = {
            pending: !pendingChecked,
            finished: finishedChecked,
            cancelled: cancelledChecked
        };

        updateStatus(updatedObject);
    };

    function onFinishedChange() {
        setFinishedChecked(!finishedChecked);

        const updatedObject = {
            pending: pendingChecked,
            finished: !finishedChecked,
            cancelled: cancelledChecked
        };

        updateStatus(updatedObject);
    };

    function onCancelledChange() {
        setCancelledChecked(!cancelledChecked);

        const updatedObject = {
            pending: pendingChecked,
            finished: finishedChecked,
            cancelled: !cancelledChecked
        };

        updateStatus(updatedObject);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="" variant="outline">
                    <Funnel size={14} />
                    Filtros
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className={`${props.view === "cards" ? "w-60" : "w-40"} flex flex-col max-h-90`}>

                {props.view === "cards" && (
                    <>
                        {/* Intervalo */}
                        <DropdownMenuGroup className="flex flex-col gap-4 p-2.5">
                            <DropdownMenuLabel className="text-slate-600 font-medium p-0">Intervalo:</DropdownMenuLabel>
                            <RadioGroup value={props.intervalValue} onValueChange={(val: string) => props.onIntervalChange(val)} defaultValue="comfortable" className="px-2 w-full flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="two-weeks" id="two-weeks" />
                                    <Label className="font-normal" htmlFor="two-weeks">Dos semanas</Label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="custom" id="custom" />
                                    <Label className="font-normal" htmlFor="custom">Personalizado</Label>
                                </div>

                                <div className="date-selector w-full flex flex-col gap-3">
                                    <div className='w-full space-y-2'>
                                        <Label className="text-xs text-slate-600" htmlFor={id}>Del:</Label>
                                        <Select value={props.intervalValue != "custom" ? firstDefault : intervalFirst} onValueChange={(val: string) => onFirstIntervalChange(val)} defaultValue={firstDefault} disabled={props.intervalValue != "custom"}>
                                            <SelectTrigger id={id} className='w-full'>
                                                <SelectValue placeholder='Seleccioa un día' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup className="max-h-60 overflow-y-scroll">
                                                    <SelectLabel>Del:</SelectLabel>
                                                    {fullDays.map((day) => {
                                                        let date = new Date(year, day.dayNum.month - 1, day.dayNum.number);
                                                        let formattedDay = format(date, "PP", { locale: es });
                                                        let databaseDate = format(date, "yyyy-MM-dd");
                                                        return (
                                                            <SelectItem value={databaseDate}>{formattedDay}</SelectItem>
                                                        )
                                                    })}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className='w-full space-y-2'>
                                        <Label className="text-xs text-slate-600" htmlFor={id}>Al:</Label>
                                        <Select value={props.intervalValue != "custom" ? secondDefault : intervalSecond} onValueChange={(val: string) => onSecondIntervalChange(val)} defaultValue={secondDefault} disabled={props.intervalValue != "custom"}>
                                            <SelectTrigger id={id} className='w-full'>
                                                <SelectValue placeholder='Selecciona un día' />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectGroup className="max-h-45 overflow-y-scroll no-scrollbar">
                                                    <SelectLabel>Al:</SelectLabel>
                                                    {fullDays.map((day, id) => {
                                                        let date = new Date(year, day.dayNum.month - 1, day.dayNum.number);
                                                        let formattedDay = format(date, "PP", { locale: es });
                                                        let databaseDate = format(date, "yyyy-MM-dd");
                                                        return (
                                                            // For the second parameter of the interval, we'll skip the first day of the two-week range.
                                                            id === 0 ? "" : <SelectItem value={databaseDate}>{formattedDay}</SelectItem>
                                                        )
                                                    })}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </RadioGroup>
                        </DropdownMenuGroup>
                    </>
                )}

                {props.view === "cards" && (
                    <DropdownMenuSeparator className="w-full border border-slate-200" />
                )}

                {/* Estado */}
                <DropdownMenuGroup className="flex flex-col gap-4 p-2.5">
                    <DropdownMenuLabel className="text-slate-600 font-medium p-0">Estado(s):</DropdownMenuLabel>
                    <div className="option-row flex flex-col gap-2">
                        <OptionCheckbox checked={pendingChecked} onCheckedChange={onPendingChange} item={<AppointmentTag type="pending" />} />
                        <OptionCheckbox checked={finishedChecked} onCheckedChange={onFinishedChange} item={<AppointmentTag type="finished" />} />
                        <OptionCheckbox checked={cancelledChecked} onCheckedChange={onCancelledChange} item={<AppointmentTag type="cancelled" />} />
                    </div>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default FilterDropdown;