type buttonProps = {
    text: string;
    onClick?: () => void;
    icon?: React.ReactNode;
}

function CancelButton(props: buttonProps) {
    return (
        <button onClick={props.onClick} className="bg-slate-200 text-slate-500 tracking-tight flex flex-row items-center justify-center gap-2 text-base px-4 py-2 rounded-lg cursor-pointer font-normal hover:bg-slate-300">
            {props.icon}

            <p className="text-sm">{props.text}</p>
        </button>
    );
};

export default CancelButton;