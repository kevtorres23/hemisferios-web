// This type of modals can be used to display short confirmation messages or allow small operations in the system.

import NormalButton from "@/website/components/NormalButton";
import CancelButton from "../CancelButton";

type ModalProps = {
    isVisible: boolean,
    title: string,
    message: string,
    children?: React.ReactNode;
    confirmationBtnText: string;
    onSave: () => void, // Function that will be triggered when the modal prompt is saved or accepted.
    onClose: () => void // Function to close the modal.
}

function SmallModal(props: ModalProps) {
    return (
        <div className={`dark-background ${props.isVisible ? "absolute" : "hidden"} z-999 w-full h-screen top-0 left-0 bg-[rgb(0,0,0,0.25)] flex items-center justify-center`}>
            <div className="modal-window flex flex-col bg-white rounded-lg p-6 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] gap-5">
                <div className="title-and-message flex flex-col gap-2">
                    <h1 className="text-xl tracking-tight font-semibold text-slate-800">{props.title}</h1>

                    {/* Handle confirmation messages */}
                    {!props.children && (
                        <p className="confirmation-message text-base font-normal text-slate-600">{props.message}</p>
                    )}

                </div>

                {/* Handle other small operations */}
                {props.children}

                <div className="buttons flex flex-row w-full gap-4 items-center justify-end">
                    <div className="flex flex-col w-full">
                        <NormalButton onClick={props.onSave} text={props.confirmationBtnText} />
                    </div>

                    <div className="flex flex-col w-full">
                        <CancelButton onClick={props.onClose} text="Cancelar" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SmallModal;