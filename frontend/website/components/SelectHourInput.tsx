import { useId } from "react";
import { Clock4 } from "lucide-react";
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
} from '@/components/ui/select'

type SelectProps = {
    label: string;
    value: string;
    onInputChange: (val: string) => void;
    items: string[] | undefined;
    activeValidation: boolean;
    selectType: "date" | "hour";
};

function SelectHourInput(props: SelectProps) {
    const id = useId();
    return (
        <div className='w-full space-y-2'>
            <Label className="text-slate-500 font-normal sm:text-sm text-base" htmlFor={id}>{props.label} <span className="text-red-500 text-lg font-semibold">*</span></Label>
            <Select value={props.value} onValueChange={(val) => props.onInputChange(val)}>
                <SelectTrigger id={id} className={`w-full bg-white sm:text-sm text-base py-2 px-3 ${props.activeValidation ? "border border-red-500" : ""}`}>
                    <SelectValue className="" placeholder={
                        <div className="flex flex-row gap-2 items-center">
                            <Clock4 size={16} />
                            <p className="sm:text-sm text-base">Selecciona una hora</p>
                        </div>
                    } />
                </SelectTrigger>
                <SelectContent className="bg-white text-sm" sideOffset={5} position="popper">
                    <SelectGroup className="h-80 overflow-y-scroll">
                        <SelectLabel className="text-sm">Hora de la cita</SelectLabel>
                        {/* Map the available dates from the database*/}
                        {props.items?.map((item, id) =>
                            <SelectItem className="text-sm" key={id} value={item}>{item}</SelectItem>
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectHourInput;
