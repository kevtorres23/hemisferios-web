type buttonProps = {
    text: string;
    onClick?: () => void;
    formId?: string; // For when the button is used to manage form submissions.
    type?: "button" | "submit";
}

function NormalButton(props: buttonProps) {
    return(
        <button form={props.formId} type={props.type ? "submit" : "button"} onClick={props.onClick} className="bg-indigo-500 text-white tracking-tight text-base px-4 py-2 rounded-lg cursor-pointer font-normal hover:bg-indigo-400">
            {props.text}
        </button>
    )
}

export default NormalButton;