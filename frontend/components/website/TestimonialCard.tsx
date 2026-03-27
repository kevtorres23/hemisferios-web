import { CircleUserRound } from "lucide-react";

type TestimonialProps = {
    personName: string;
    text: string;
    iconColor: string;
}

function TestimonialCard(props: TestimonialProps) {
    let iconBgClass;
    let iconColorClass;

    switch (props.iconColor) {
        case "orange":
            iconBgClass = "bg-orange-100";
            iconColorClass = "text-orange-500";
            break;
        case "pink":
            iconBgClass = "bg-pink-100";
            iconColorClass = "text-pink-500";
            break;
        case "sky":
            iconBgClass = "bg-sky-100";
            iconColorClass = "text-sky-500";
            break;
        case "green":
            iconBgClass = "bg-green-100";
            iconColorClass = "text-green-500";
            break;
    }

    console.log(iconBgClass);

    return (
        <div className="bg-white p-5 flex flex-col gap-2 border border-slate-200 rounded-xl items-start">
            <div className={`p-1.5 rounded-md ${iconBgClass}`}>
                <CircleUserRound size={24} className={iconColorClass} />
            </div>

            <h2 className="text-lg font-medium tracking-tight text-slate-900">{props.personName}</h2>

            <p className="text-sm/normal font-normal text-slate-500">{props.text}</p>
        </div>
    )
}

export default TestimonialCard;