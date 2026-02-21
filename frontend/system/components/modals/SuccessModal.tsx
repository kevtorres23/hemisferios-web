import { CheckCircle } from "lucide-react"

type ModalProps = {
    text: string;
    isVisible: boolean;
};

function SuccessModal(props: ModalProps) {
    return (
        <div className={`modal-body bg-green-500 ${props.isVisible ? "fixed opacity-100 top-25 sm:right-10 sm:w-auto w-full" : "fixed top-25 sm:right-10 opacity-0 sm:w-auto w-full"} flex items-center justify-center flex-row gap-2 rounded-lg px-3 py-2 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] transition-opacity ease-in duration-200`}>
            <CheckCircle size={16} color="white" strokeWidth={2.5}/>
            <p className="text-white text-base font-medium">{props.text}</p>
        </div>
    );
};

export default SuccessModal;