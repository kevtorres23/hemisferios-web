type CardProps = {
    isIndigo: boolean;
    planType: string;
    price: string;
    description: string;
}

function PriceCard(props: CardProps) {
    return (
        <div className={`flex flex-col md:gap-3 gap-4 items-start w-full md:p-6 p-5 rounded-xl ${props.isIndigo ? "bg-indigo-500" : "bg-white border-2 border-indigo-500"}`}>
            <div className={`tag ${props.isIndigo ? "bg-white text-black" : "bg-indigo-100 text-indigo-500"} rounded-full px-3 py-1.5`}>
                <p className="text-xs font-semibold">{props.planType}</p>
            </div>

            <h1 className={`price text-5xl ${props.isIndigo ? "text-white" : "text-slate-900"} font-medium tracking-tighter`}>${props.price}</h1>

            <p className={`description text-base ${props.isIndigo ? "text-white" : "text-slate-600"} font-normal`}>{props.description}</p>
        </div>
    )
};

export default PriceCard;