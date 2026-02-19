type DayProps = {
    dayName: string,
    dayNum: string,
    isActive: boolean,
    isLast: boolean,
};

type HourProps = {
    hour: string,
    isActive: string,
    isLast: boolean,
}

type SpaceProps = {
    content: React.ReactNode;
}

function CalendarDay(props: DayProps) {
    return (
        <div className={`max-w-40 bg-slate-100 border flex flex-row gap-1.5 border-slate-200 px-3 py-2 ${props.isLast ? "rounded-tr-lg" : "rounded-none"} ${props.isActive ? "text-indigo-500" : "text-slate-800"}`}>
            <p className="font-medium uppercase tracking-wide">{props.dayName}</p>
            <p className="font-medium uppercase tracking-wide">{props.dayNum}</p>
        </div>
    );
};

function CalendarHour(props: HourProps) {
    return (
        <div className={`max-w-16 bg-slate-100 border flex flex-row gap-1.5 border-slate-200 px-3 py-2 ${props.isLast ? "rounded-bl-lg" : "rounded-none"} ${props.isActive ? "text-indigo-500" : "text-slate-800"}`}>
            <p className="font-medium uppercase tracking-wide">{props.hour}</p>
        </div>
    );
};

function CalendarSpace(props: SpaceProps) {
    return (
        <div className={`max-w-16 h-full bg-white border flex flex-row gap-1.5 border-slate-200 px-3 py-2`}>
            {props.content}
        </div>
    );
};

export { CalendarDay, CalendarHour, CalendarSpace };