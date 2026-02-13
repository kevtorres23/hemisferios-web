type PageProps = {
    title: string;
    desc: string;
};

function PageTitle(props: PageProps) {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tighter text-slate-950">
                {props.title}
            </h1>

            <p className="text-base font-normal text-slate-500">
                {props.desc}
            </p>
        </div>      
    );
};

export default PageTitle;