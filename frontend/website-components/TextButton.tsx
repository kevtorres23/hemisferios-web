type TextBtnProp = {
    text: string;
}

function TextButton(props: TextBtnProp) {
    return(
        <button className="text-base text-indigo-500 font-medium hover:text-indigo-300 tracking-tighter cursor-pointer">
            {props.text}
        </button>
    )
}

export default TextButton;