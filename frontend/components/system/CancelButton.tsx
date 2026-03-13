type buttonProps = {
    text: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    isNormal?: boolean;
}

function CancelButton(props: buttonProps) {
    return (
        <button onClick={props.onClick} className="bg-slate-200 text-slate-500 tracking-tight flex flex-row items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer font-normal hover:bg-slate-300">
            {props.icon}

            <p className={`${props.isNormal ? "text-sm" : "text-base"}`}>{props.text}</p>
        </button>
    );
};

export default CancelButton;