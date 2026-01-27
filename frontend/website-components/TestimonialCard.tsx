import Image, { StaticImageData } from "next/image";

type TestimonialProps = {
    personName: string;
    text: string;
    picture: StaticImageData;
}

function TestimonialCard(props: TestimonialProps) {
    return (
        <div className="bg-white p-5 flex flex-col gap-2 border border-slate-200 rounded-xl">
            <div className="relative w-24 h-24">
                <Image src={props.picture} alt="" objectFit="cover" fill={true} className="rounded-[50%]"/>
            </div>

            <h2 className="text-lg font-medium tracking-tight text-slate-900">{props.personName}</h2>

            <p className="text-base font-normal tracking-tight text-slate-600">{props.text}</p>
        </div>
    )
}

export default TestimonialCard;