type InputProps = {
    label: string;
    type: "text" | "tel" | "email" | "comment" | "number";
    textValue?: string;
    numValue?: number;
    activeValidation: boolean;
    placeholder?: string;
    grayBg?: boolean;
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
                        <p className="text-slate-500 sm:text-sm text-base m-0 p-0">
                            {props.label} <span className="text-red-500 text-lg font-semibold">*</span>
                        </p>
                    </div>

                    <input placeholder={props.placeholder} type={props.type} value={props.textValue} onChange={props.onInputChange} className={`w-full py-2 px-3 ${props.activeValidation ? "border-red-400" : "border-slate-200"} ${props.grayBg ? "bg-slate-50" : "bg-white"} border rounded-md sm:text-sm text-base font-normal slate-800`} />
                </label>
            );

        case "comment":
            return (
                <label className="label gap-2 flex flex-col w-full">
                    <div className="flex flex-row gap-2">
                        <p className="text-slate-500 sm:text-sm text-base m-0 p-0">
                            {props.label} <span className="text-red-500 text-lg font-semibold">*</span>
                        </p>
                    </div>

                    <textarea value={props.textValue} rows={4} onChange={props.onInputChange} className="w-full py-2 px-3 min-h-24 h-auto bg-white border border-slate-200 rounded-md text-sm font-normal slate-800" />
                </label>
            );
        case "number":
            return (
                <label className="label gap-2 flex flex-col w-full">
                    <div className="flex flex-row gap-2">
                        <p className="text-slate-500 sm:text-sm text-base m-0 p-0">
                            {props.label} <span className="text-red-500 text-lg font-semibold">*</span>
                        </p>
                    </div>

                    <input placeholder={props.placeholder} type="number" value={props.numValue} onChange={props.onInputChange} className={`w-full py-2 px-3 ${props.activeValidation ? "border-red-400" : "border-slate-200"} ${props.grayBg ? "bg-slate-50" : "bg-white"} border rounded-md sm:text-sm text-base font-normal slate-800`} />
                </label>
            )
    }
}

export default Input;