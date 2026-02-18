type ButtonProps = {
    text?: string,
    icon?: React.ReactNode;
    isIndigo: boolean;
    onClick?: () => void;
}

function WhiteIconButton(props: ButtonProps) {
    return (
        <button onClick={props.onClick} className={`bg-white font-normal ${props.isIndigo ? "text-indigo-500" : "text-slate-800"} border border-slate-200 hover:bg-slate-200 px-3 py-2 flex flex-row items-center justify-center gap-1.5 rounded-md cursor-pointer`}>
            {props.icon}
            <p className="text-sm">{props.text}</p>
        </button>
    );
};

export default WhiteIconButton;