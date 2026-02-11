type TagProps = {
    text: string;
    positionStyle: string;
}

function BrainTag(props: TagProps) {
    return(
        <div className={`bg-white px-3 py-1.5 border-2 border-indigo-500 rounded-full text-slate-900 font-medium sm:text-base text-xs tracking-tighter sm:absolute sm:block ${props.positionStyle}`}>
            {props.text}
        </div>
    )
}

export default BrainTag;