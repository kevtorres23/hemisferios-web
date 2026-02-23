type InputProps = {
    label: string;
    value: string;
    type: "text";
    onInputChange: (e: any) => void;
    activeValidation: boolean;
    grayBg?: boolean;
}

function Input(props: InputProps) {
    return (
        <label className="label gap-3 flex flex-col w-full">
            <div className="flex flex-row gap-2">
                <p className="text-slate-500 sm:text-sm text-base m-0 p-0">
                    {props.label} <span className="text-red-500 text-lg font-semibold">*</span>
                </p>
            </div>

            <input type={props.type} value={props.value} onChange={props.onInputChange} className={`w-full py-2 px-3 ${props.activeValidation ? "border-red-400" : "border-slate-200"} ${props.grayBg ? "bg-slate-50" : "bg-white"} border rounded-md sm:text-sm text-base font-normal slate-800`} />
        </label>
    );
}

export default Input;