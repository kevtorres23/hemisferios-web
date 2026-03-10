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

type SelectProps = {
    label: string;
    value: string;
    onInputChange: (val: string) => void;
    activeValidation: boolean;
}

function SelectModality(props: SelectProps) {
    const id = useId();

    return (
        <div className='w-full space-y-2'>
            <Label className="text-slate-500 font-normal sm:text-sm text-base" htmlFor={id}>{props.label} <span className="text-red-500 text-lg font-semibold">*</span></Label>
            <Select value={props.value} onValueChange={(val) => props.onInputChange(val)}>
                <SelectTrigger id={id} className={`w-full bg-white sm:text-sm text-base cursor-pointer py-5 px-3 ${props.activeValidation ? "border border-red-500" : ""}`}>
                    <SelectValue className="" placeholder={
                        <div className="flex flex-row gap-2 items-center">
                            <Calendar size={16} />
                            <p className="sm:text-sm text-base">Selecciona una opción</p>
                        </div>
                    } />
                </SelectTrigger>
                <SelectContent className="bg-white z-999" sideOffset={5} position="popper">
                    <SelectGroup>
                        <SelectItem className="text-sm" key={1} value="cash">Pago en efectivo</SelectItem>
                        <SelectItem className="text-sm" key={2} value="card">Pago con tarjeta</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

function SelectFrequency(props: SelectProps) {
    const id = useId() + 1;
    return (
        <div className='w-full space-y-2'>
            <Label className="text-slate-500 font-normal sm:text-sm text-base" htmlFor={id}>{props.label} <span className="text-red-500 text-lg font-semibold">*</span></Label>
            <Select value={props.value} onValueChange={(val) => props.onInputChange(val)}>
                <SelectTrigger id={id} className={`w-full bg-white sm:text-sm text-base cursor-pointer py-5 px-3 ${props.activeValidation ? "border border-red-500" : ""}`}>
                    <SelectValue className="" placeholder={
                        <div className="flex flex-row gap-2 items-center">
                            <Calendar size={16} />
                            <p className="sm:text-sm text-base">Seleccion una opción</p>
                        </div>
                    } />
                </SelectTrigger>
                <SelectContent className="bg-white z-999" sideOffset={5} position="popper">
                    <SelectGroup>
                        <SelectItem className="text-sm" key={1} value="weekly">Semanal</SelectItem>
                        <SelectItem className="text-sm" key={2} value="monthly">Mensual</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export { SelectModality, SelectFrequency };