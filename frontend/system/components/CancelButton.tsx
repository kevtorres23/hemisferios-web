type buttonProps = {
    text: string;
    onClick?: () => void;
}

function CancelButton(props: buttonProps) {
    return(
        <button onClick={props.onClick} className="bg-slate-200 text-slate-500 tracking-tight text-base px-4 py-2 rounded-lg cursor-pointer font-normal hover:bg-slate-300">
            {props.text}
        </button>
    )
}

export default CancelButton;