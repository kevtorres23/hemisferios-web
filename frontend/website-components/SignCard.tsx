import { CircleCheck } from "lucide-react"

function SignCard({content}: {content: string}) {
    return(
        <div className="flex flex-row gap-2 items-start justify-start text-slate-950 bg-white sm:p-4 p-3 rounded-xl h-auto">
            <CircleCheck size={24}/>
            <p className="sm:text-base text-sm font-normal">{content}</p>
        </div>
    )
}

export default SignCard;