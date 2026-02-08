type BadgeProps = {
    name: string;
}

function SectionBadge(props: BadgeProps) {
    return(
        <div className="px-3 py-1.5 bg-[rgb(91,102,241,0.13)] rounded-full">
            <p className="text-indigo-500 text-sm font-semibold">{props.name}</p>
        </div>
    )
}

export default SectionBadge;