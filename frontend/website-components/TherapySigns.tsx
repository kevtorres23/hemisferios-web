type SignsProps = {
    bgColor: string;
    children: React.ReactNode;
}

export default function TherapySigns(props: SignsProps) {
    return (
        <div className={`flex lg:w-2/3 w-full flex-col gap-8 lg:px-20 md:px-16 sm:px-8 px-6 lg:py-24 md:py-20 sm:py-16 py-10 ${props.bgColor} rounded-2xl items-center`}>
            <h1 className="text-white md:text-3xl sm:text-2xl text-xl font-semibold tracking-tighter text-center">Se recomienda tomarla cuando:</h1>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {props.children}
            </div>
        </div>
    )
};