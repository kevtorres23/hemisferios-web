type BoxProps = {
    title: string,
    desc: string,
    icon: React.ReactElement;
}

function ValueBox(props: BoxProps) {
    return (
        <div className="flex flex-row gap-3 items-start">
            <div className="p-2.5 rounded-lg text-white bg-[rgb(0,0,0,0.15)]">
                {props.icon}
            </div>

            <div className="flex flex-col gap-1]">
                <h1 className="md:text-xl text-lg font-medium tracking-tight text-white">{props.title}</h1>

                <p className="sm:text-base text-sm font-normal text-[rgb(255,255,255,0.9)]">{props.desc}</p>
            </div>
        </div>
    )
}

export default ValueBox;