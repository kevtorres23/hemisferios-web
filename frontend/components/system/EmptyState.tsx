import Image, { StaticImageData } from "next/image"

type EmptyProps = {
    header: string;
    desc: string;
    image: StaticImageData;
}

function EmptyState(props: EmptyProps) {
    return (
        <div className="empty-state flex flex-col w-full h-full items-center justify-center gap-4">
            <div className="message flex flex-col max-w-xl text-center items-center justify-center gap-4">
                <h1 className="text-3xl font-semibold tracking-tighter text-slate-900">{props.header}</h1>
                <p className="text-slate-500 font-normal text-base max-w-xl text-center">{props.desc}</p>
            </div>
            <Image src={props.image} alt="" className="md:w-70 w-60" />
        </div>
    );
};

export default EmptyState;