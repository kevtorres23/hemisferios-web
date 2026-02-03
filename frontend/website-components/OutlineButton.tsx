type buttonProps = {
    text: string;
    onClick?: () => void;
}

function OutlineButton(props: buttonProps) {
    return(
        <button onClick={props.onClick} className="bg-white text-indigo-500 tracking-tight text-base px-4 py-2 rounded-lg cursor-pointer font-normal border border-indigo-500 hover:bg-indigo-100">
            {props.text}
        </button>
    )
}

export default OutlineButton;