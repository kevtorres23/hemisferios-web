type SectionProps = {
    children: React.ReactNode;
    title: string;
    type: "values" | "advantages";
}

function ValuesAndAdvantages(props: SectionProps) {
    return (
        <section className={`w-full ${props.type === "values" ? "bg-teal-500" : "bg-sky-500"} lg:py-16 py-12 lg:px-20 md:px-14 px-8 flex flex-col lg:gap-12 gap-8 md:items-center sm:items-start items-center justify-center`}>
            <h1 className="md:text-4xl text-3xl text-white font-semibold tracking-tighter text-center">{props.title}</h1>

            <div className="flex md:flex-row flex-col lg:gap-24 sm:gap-12 gap-8 items-start md:justify-center justify-start">
                {props.children}
            </div>
        </section>
    )
};

export default ValuesAndAdvantages;