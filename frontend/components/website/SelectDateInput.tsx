import { useId } from "react";
import { Calendar } from "lucide-react";
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { DayFormat } from "@/utils/types";

type WeekDayObject = {
    writtenDate: string,
    formattedDate: string,
    databaseId: string,
}

type SelectProps = {
    label: string;
    value: string;
    onInputChange: (val: string) => void;
    items: DayFormat[][] | undefined;
    activeValidation: boolean;
    selectType: "date" | "hour";
}

function SelectDateInput(props: SelectProps) {
    const id = useId();

    return (
        <div className='w-full space-y-2'>
            <Label className="text-slate-500 font-normal sm:text-sm text-base" htmlFor={id}>{props.label} <span className="text-red-500 text-lg font-semibold">*</span></Label>
            <Select value={props.value} onValueChange={(val) => props.onInputChange(val)}>
                <SelectTrigger id={id} className={`w-full bg-white sm:text-sm text-base cursor-pointer py-5 px-3 ${props.activeValidation ? "border border-red-500" : ""}`}>
                    <SelectValue className="" placeholder={
                        <div className="flex flex-row gap-2 items-center">
                            <Calendar size={16} />
                            <p className="sm:text-sm text-base">Selecciona una fecha</p>
                        </div>
                    } />
                </SelectTrigger>
                <SelectContent className="bg-white z-999" sideOffset={5} position="popper">
                    {props.items === undefined ? (
                        <SelectGroup>
                            <SelectLabel>No hay disponibilidad</SelectLabel>
                        </SelectGroup>
                    ) : (
                        <>
                            <SelectGroup>
                                <SelectLabel>Esta semana</SelectLabel>
                                {props.items[0].map((day, id) =>
                                    <SelectItem className="text-sm" key={id} value={day.databaseDate}>{day.writtenDate}</SelectItem>
                                )}
                            </SelectGroup>
                            <SelectSeparator />
                            <SelectGroup>
                                <SelectLabel>Próxima semana</SelectLabel>
                                {props.items[1].map((day, id) =>
                                    <SelectItem className="text-sm" key={id} value={day.databaseDate}>{day.writtenDate}</SelectItem>
                                )}
                            </SelectGroup>
                        </>
                    )}
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectDateInput;