type CardProps = {
    title: string,
    description: string,
    iconBgColor: string,
    icon: React.ReactElement;
}

function TechniqueCard(props: CardProps) {
    return (
        <div className="bg-white flex flex-col gap-3 rounded-xl p-6">
            <div className={`flex items-center justify-center p-2 ${props.iconBgColor} self-start rounded-lg`}>
                {props.icon}
            </div>

            <h1 className="sm:text-xl text-lg text-slate-900 tracking-tighter font-semibold">
                {props.title}
            </h1>

            <p className="sm:text-base text-sm text-slate-600 font-normal">{props.description}</p>
        </div>
    )
}

export default TechniqueCard;