type ChannelProps = {
    color: string;
    icon: React.ReactNode;
    name: string;
    description: string;
}

function ContactChannel(props: ChannelProps) {
    return (
        <div className="bg-white rounded-lg border border-slate-200 flex flex-col items-start justify-start gap-4 w-full p-4">
            <div className={`flex items-center justify-center rounded-lg p-2 ${props.color}`}>
                {props.icon}
            </div>

            <div className="flex flex-col gap-1">
                <h1 className="sm:text-lg text-base font-medium text-slate-900 tracking-tight">{props.name}</h1>

                <p className="sm:text-base text-sm font-normal text-slate-500 break-all">{props.description}</p>
            </div>
        </div>
    )
}

export default ContactChannel;