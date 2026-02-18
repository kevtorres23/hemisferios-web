type buttonProps = {
    text: string;
    icon: React.ReactElement;
    isActive: boolean;
    onClick?: () => void;
}

function IconButton(props: buttonProps) {
    return (
        <button onClick={props.onClick} className={`${props.isActive ? "bg-indigo-500 text-white hover:bg-indigo-400" : "bg-white text-slate-800 hover:bg-slate-200 border border-slate-200"} text-base px-3 py-2 flex flex-row items-center justify-center gap-2 rounded-md cursor-pointer font-normal`}>
            {props.icon}
            <p className="sm:text-sm text-medium text-base">{props.text}</p>
        </button>
    )
}

export default IconButton;