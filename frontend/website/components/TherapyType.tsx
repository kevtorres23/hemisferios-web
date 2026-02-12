type TherapyProps = {
    children: React.ReactNode;
    secondRow?: boolean;
}

export default function TherapyType(props: TherapyProps) {
    return (
        <div className={`${props.secondRow ? "flex-col-reverse" : "flex-col" } w-full flex lg:flex-row gap-6`}>
            {props.children}
        </div>
    )
};