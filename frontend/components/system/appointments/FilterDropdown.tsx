import IconButton from "../IconButton";
import { lessThanTen } from "@/utils/website/format-availability";
import { useId } from "react";
import { Label } from "@/components/ui/label";
import { CalendarArrowUp, CalendarArrowDown } from "lucide-react";
import { currentWeekList, nextWeekList } from "@/utils/system/calendar/calendar-variables-generation";
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
import { useState, useContext, useEffect } from "react";
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

type FilterProps = {
    intervalValue: string;
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

const months = ["ene.", "feb.", "mar.", "abr.", "mayo", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic."];
const fullDays = [...currentWeekList, ...nextWeekList];
const year = new Date().getFullYear();

const firstDefault = lessThanTen(fullDays[0].dayNum.number) + "/" + lessThanTen(fullDays[0].dayNum.month) + "/" + year;
const secondDefault = lessThanTen(fullDays[11].dayNum.number) + "/" + lessThanTen(fullDays[11].dayNum.month) + "/" + year;

function FilterDropdown(props: FilterProps) {
    const [orderFilter, setOrderFilter] = useState(true); // True for most recent - False for least recent.
    const [pendingChecked, setPendingChecked] = useState(true);
    const [finishedChecked, setFinishedChecked] = useState(true);
    const [cancelledChecked, setCancelledChecked] = useState(true);
    const [intervalFirst, setIntervalFirst] = useState(firstDefault);
    const [intervalSecond, setIntervalSecond] = useState(secondDefault)
    const id = useId();

    // Store variables (Zustand).
    const interval = useAppointmentFilters((state: FilterStore) => state.interval);
    const checkedStatus = useAppointmentFilters((state: FilterStore) => state.statusObject);
    const updateInterval = useAppointmentFilters((state: FilterStore) => state.updateInterval);
    const updateStatus = useAppointmentFilters((state: FilterStore) => state.updateStatus);

    function onFirstIntervalChange(val: string) {
        setIntervalFirst(val);
        updateInterval([intervalFirst, intervalSecond]);
    };

    function onSecondIntervalChange(val: string) {
        setIntervalSecond(val);
        updateInterval([intervalFirst, intervalSecond]);
    };

    function onPendingChange() {
        setPendingChecked(!pendingChecked);

        const updatedObject = {
            pending: pendingChecked,
            finished: finishedChecked,
            cancelled: cancelledChecked
        };

        updateStatus(updatedObject);
    };

    function onFinishedChange() {
        setFinishedChecked(!finishedChecked);

        const updatedObject = {
            pending: pendingChecked,
            finished: finishedChecked,
            cancelled: cancelledChecked
        };

        updateStatus(updatedObject);
    };

    function onCancelledChange() {
        setCancelledChecked(!cancelledChecked);

        const updatedObject = {
            pending: pendingChecked,
            finished: finishedChecked,
            cancelled: cancelledChecked
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

            <DropdownMenuContent className="w-60 flex flex-col max-h-90">

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
                                <Select value={intervalFirst} onValueChange={(val: string) => onFirstIntervalChange(val)} defaultValue={firstDefault} disabled={props.intervalValue != "custom"}>
                                    <SelectTrigger id={id} className='w-full'>
                                        <SelectValue placeholder='Select a fruit' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup className="max-h-60 overflow-y-scroll">
                                            <SelectLabel>Del:</SelectLabel>
                                            {fullDays.map((day) => {
                                                let formattedDay = lessThanTen(day.dayNum.number) + " de " + months[day.dayNum.month];
                                                let databaseDate = lessThanTen(day.dayNum.number) + "/" + lessThanTen(day.dayNum.month) + "/" + year;
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
                                <Select value={intervalSecond} onValueChange={(val: string) => onSecondIntervalChange(val)} defaultValue={secondDefault} disabled={props.intervalValue != "custom"}>
                                    <SelectTrigger id={id} className='w-full'>
                                        <SelectValue placeholder='Select a fruit' />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectGroup className="max-h-45 overflow-y-scroll no-scrollbar">
                                            <SelectLabel>Al:</SelectLabel>
                                            {fullDays.map((day) => {
                                                let formattedDay = lessThanTen(day.dayNum.number) + " de " + months[day.dayNum.month];
                                                let firstDay = lessThanTen(fullDays[0].dayNum.number) + "/" + lessThanTen(fullDays[0].dayNum.month) + "/" + year;
                                                let databaseDate = lessThanTen(day.dayNum.number) + "/" + lessThanTen(day.dayNum.month) + "/" + year;
                                                return (
                                                    // For the second parameter of the interval, we'll skip the first day of the two-week range.
                                                    databaseDate === firstDay ? "" : <SelectItem value={databaseDate}>{formattedDay}</SelectItem>
                                                )
                                            })}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </RadioGroup>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="w-full border border-slate-200" />

                {/* Orden
                <DropdownMenuGroup className="flex flex-col gap-4 p-2.5">
                    <DropdownMenuLabel className="text-slate-600 font-normal p-0">Orden:</DropdownMenuLabel>

                    <IconButton
                        onClick={() => setOrderFilter(!orderFilter)}
                        icon={orderFilter === true ? <CalendarArrowUp size={16} /> : <CalendarArrowDown size={16} />}
                        text={orderFilter === true ? "Más recientes" : "Más lejanas"}
                        isActive={false}
                    />
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="w-full border border-slate-200" />
                */}

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