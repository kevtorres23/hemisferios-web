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
    type: "text" | "tel" | "email" | "comment";
    textValue?: string;
    onInputChange: (e: any) => void;
}

function Input(props: InputProps) {
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
                <label className="label gap-2 flex flex-col w-full">
                    <div className="flex flex-row gap-2">
                        <p className="text-slate-500 text-sm m-0 p-0">
                            {props.label} <span className="text-red-500 text-lg font-semibold">*</span>
                        </p>
                    </div>

                    <textarea value={props.textValue} rows={4} onChange={props.onInputChange} className="w-full py-2 px-3 min-h-24 h-auto bg-white border border-slate-200 rounded-md text-sm font-normal slate-800" />
                </label>
            );
            break;
    }
}

export default Input;