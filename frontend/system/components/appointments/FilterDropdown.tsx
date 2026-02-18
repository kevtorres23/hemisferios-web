import { Button } from "@/components/ui/button";
import IconButton from "../IconButton";
import { useId } from "react";
import { Label } from "@/components/ui/label";
import { CalendarArrowUp, CalendarArrowDown } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
    intervalValue: string;
    onIntervalChange: (val: string) => void;
}

function FilterDropdown(props: FilterProps) {
    const [orderFilter, setOrderFilter] = useState(true); // True for most recent - False for least recent.
    const [finishedChecked, setFinishedChecked] = useState(true);
    const [pendingChecked, setPendingChecked] = useState(true);
    const [cancelledChecked, setCancelledChecked] = useState(true);
    const id = useId();

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
                    <DropdownMenuLabel className="text-slate-600 font-normal p-0">Intervalo:</DropdownMenuLabel>
                    <RadioGroup value={props.intervalValue} onValueChange={(val: string) => props.onIntervalChange(val)} defaultValue="comfortable" className="px-2 w-full flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="two-weeks" id="two-weeks" />
                            <Label className="font-normal" htmlFor="two-weeks">Dos semanas</Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="custom" id="custom" />
                            <Label className="font-normal" htmlFor="custom">Personalizado</Label>
                        </div>

                        <div className="date-selector w-full flex flex-row gap-3">
                            <div className='w-full space-y-2'>
                                <Label className="text-xs text-slate-600" htmlFor={id}>Del:</Label>
                                <Select defaultValue='apple' disabled={props.intervalValue != "custom"}>
                                    <SelectTrigger id={id} className='w-full'>
                                        <SelectValue placeholder='Select a fruit' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
                                            <SelectItem value='apple'>Apple</SelectItem>
                                            <SelectItem value='banana'>Banana</SelectItem>
                                            <SelectItem value='blueberry'>Blueberry</SelectItem>
                                            <SelectItem value='grapes'>Grapes</SelectItem>
                                            <SelectItem value='pineapple'>Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className='w-full space-y-2'>
                                <Label className="text-xs text-slate-600" htmlFor={id}>Al:</Label>
                                <Select defaultValue='apple' disabled={props.intervalValue != "custom"}>
                                    <SelectTrigger id={id} className='w-full'>
                                        <SelectValue placeholder='Select a fruit' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
                                            <SelectItem value='apple'>Apple</SelectItem>
                                            <SelectItem value='banana'>Banana</SelectItem>
                                            <SelectItem value='blueberry'>Blueberry</SelectItem>
                                            <SelectItem value='grapes'>Grapes</SelectItem>
                                            <SelectItem value='pineapple'>Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </RadioGroup>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* Orden */}
                <DropdownMenuGroup className="flex flex-col gap-4 p-2.5">
                    <DropdownMenuLabel className="text-slate-600 font-normal p-0">Orden:</DropdownMenuLabel>

                    <IconButton
                        onClick={() => setOrderFilter(!orderFilter)}
                        icon={orderFilter === true ? <CalendarArrowUp size={16} /> : <CalendarArrowDown size={16} />}
                        text={orderFilter === true ? "Más recientes" : "Más lejanas"}
                        isActive={false}
                    />
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* Estado */}
                <DropdownMenuGroup className="flex flex-col gap-4 p-2.5">
                    <DropdownMenuLabel className="text-slate-600 font-normal p-0">Estado(s):</DropdownMenuLabel>
                    <div className="option-row flex flex-col gap-2">
                        <OptionCheckbox checked={pendingChecked} onCheckedChange={() => setPendingChecked(!pendingChecked)} item={<AppointmentTag type="pending" />} />
                        <OptionCheckbox checked={finishedChecked} onCheckedChange={() => setFinishedChecked(!finishedChecked)} item={<AppointmentTag type="finished" />} />
                        <OptionCheckbox checked={cancelledChecked} onCheckedChange={() => setCancelledChecked(!cancelledChecked)} item={<AppointmentTag type="cancelled" />} />
                    </div>
                </DropdownMenuGroup>


            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default FilterDropdown;