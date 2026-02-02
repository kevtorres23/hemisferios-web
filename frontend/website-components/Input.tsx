import { useId } from "react";
import { Label } from '@/components/ui/label';
import { Calendar, Clock4 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

type InputProps = {
    label: string;
    type: "text" | "tel" | "email" | "comment" | "date" | "hour";
    textValue?: string;
    onInputChange: (e: any) => void;
}

function Input(props: InputProps) {
    const dateId = useId();
    const hourId = useId();

    switch (props.type) {
        case "text":
        case "tel":
        case "email":
            return (
                <label className="label gap-3 flex flex-col w-full">
                    <div className="flex flex-row gap-2">
                        <p className="text-slate-500 text-sm m-0 p-0">
                            {props.label} <span className="text-red-500 text-lg font-semibold">*</span>
                        </p>
                    </div>

                    <input type={props.type} value={props.textValue} onChange={props.onInputChange} className="w-full py-2 px-3 bg-white border border-slate-200 rounded-md text-sm font-normal slate-800" />
                </label>
            );

        case "comment":
            return (
                <label className="label gap-3 flex flex-col w-full">
                    <div className="flex flex-row gap-2">
                        <p className="text-slate-500 text-sm m-0 p-0">
                            {props.label} <span className="text-red-500 text-lg font-semibold">*</span>
                        </p>
                    </div>

                    <textarea value={props.textValue} rows={4} onChange={props.onInputChange} className="w-full py-2 px-3 min-h-24 h-auto bg-white border border-slate-200 rounded-md text-sm font-normal slate-800" />
                </label>
            );

        case "date":
            return (
                <div className='w-full space-y-2'>
                    <Label className="text-slate-500 font-normal" htmlFor={dateId}>{props.label} <span className="text-red-500 text-lg font-semibold">*</span></Label>
                    <Select value={props.textValue} onValueChange={(val) => props.onInputChange(val)}>
                        <SelectTrigger id={dateId} className='w-full bg-white py-2 px-3'>
                            <SelectValue placeholder={
                                <div className="flex flex-row gap-2 items-center">
                                    <Calendar size={16} />
                                    <p>Selecciona un día</p>
                                </div>
                            } />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            <SelectGroup>
                                <SelectLabel>Fecha de la cita</SelectLabel>
                                {/* Map the available dates from the database*/}
                                <SelectItem value='apple'>Apple</SelectItem>
                                <SelectItem value='banana'>Banana</SelectItem>
                                <SelectItem value='blueberry'>Blueberry</SelectItem>
                                <SelectItem value='grapes'>Grapes</SelectItem>
                                <SelectItem value='pineapple'>Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            )

        case "hour":
            return (
                <div className='w-full space-y-2'>
                    <Label className="text-slate-500 font-normal" htmlFor={hourId}>{props.label} <span className="text-red-500 text-lg font-semibold">*</span></Label>
                    <Select value={props.textValue} onValueChange={(val) => props.onInputChange(val)}>
                        <SelectTrigger id={hourId} className='w-full bg-white py-2 px-3'>
                            <SelectValue placeholder={
                                <div className="flex flex-row gap-2 items-center">
                                    <Clock4 size={16} />
                                    <p>Selecciona un día</p>
                                </div>
                            } />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            <SelectGroup>
                                <SelectLabel>Hora de la cita</SelectLabel>
                                {/* Map the available hours from the database*/}
                                <SelectItem value='apple'>Apple</SelectItem>
                                <SelectItem value='banana'>Banana</SelectItem>
                                <SelectItem value='blueberry'>Blueberry</SelectItem>
                                <SelectItem value='grapes'>Grapes</SelectItem>
                                <SelectItem value='pineapple'>Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            )
            break;
    }
}

export default Input;