type buttonProps = {
    text: string;
}

function WhiteButton(props: buttonProps) {
    return(
        <div className="bg-white text-slate-950 tracking-tight text-base font-medium px-4 py-2 rounded-lg cursor-pointer hover:text-indigo-800">
            {props.text}
        </div>
    )
}

export default WhiteButton;