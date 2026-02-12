import { CircleAlert } from "lucide-react";

function InputWarning({message}: {message: string}) {
    return (
        <div className="flex flex-row gap-1 items-start">
            <CircleAlert size={14} className="text-red-500" />
            <p className="text-xs font-medium text-red-500">{message}</p>
        </div>
    )
}

export default InputWarning;