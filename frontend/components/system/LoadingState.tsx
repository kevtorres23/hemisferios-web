import { Spinner } from "@/components/ui/spinner"

function LoadingState({ message }: { message: string }) {
    return (
        <div className="w-full h-full flex items-center justify-center flex-row gap-2">
            <Spinner className="size-4" />
            <p className="text-xl font-semibold text-slate-800">{message}</p>
        </div>
    )
};

export default LoadingState;