type buttonProps = {
    text: string;
}

function NormalButton(props: buttonProps) {
    return(
        <div className="bg-indigo-500 text-white text-base px-4 py-2 rounded-lg cursor-pointer font-normal hover:bg-indigo-400">
            {props.text}
        </div>
    )
}

export default NormalButton;