type buttonProps = {
    text: string;
    icon: React.ReactElement;
}

function IconButton(props: buttonProps) {
    return (
        <button className="bg-indigo-500 text-white tracking-tight text-base px-4 py-2 flex flex-row items-center justify-center gap-2 rounded-lg cursor-pointer font-normal hover:bg-indigo-400">
            {props.text}
            {props.icon}
        </button>
    )
}

export default IconButton;