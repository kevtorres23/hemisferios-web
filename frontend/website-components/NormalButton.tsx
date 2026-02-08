type buttonProps = {
    text: string;
    onClick?: () => void;
}

function NormalButton(props: buttonProps) {
    return(
        <button onClick={props.onClick} className="bg-indigo-500 text-white tracking-tight text-base px-4 py-2 rounded-lg cursor-pointer font-normal hover:bg-indigo-400">
            {props.text}
        </button>
    )
}

export default NormalButton;