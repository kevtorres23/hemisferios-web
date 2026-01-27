type DefinitionProps= {
    therapyName: string;
    therapyDef: string;
    color: string;
    icon: React.ReactElement;
}

export default function TherapyDefinition(props: DefinitionProps) {
    return (
        <div className="flex flex-col lg:w-1/3 w-full col-span-1 gap-4 md:px-10 sm:px-8 px-6 lg:py-24 md:py-20 sm:py-16 py-10 bg-indigo-50 border border-slate-200 rounded-2xl">
            <div className={`${props.color} p-2.5 rounded-lg text-white self-start`}>
                {props.icon}
            </div>

            <h1 className="md:text-3xl text-xl font-medium text-slate-900 tracking-tight">{props.therapyName}</h1>

            <p className="md:text-base text-sm font-normal text-slate-600">{props.therapyDef}</p>
        </div>
    )
};