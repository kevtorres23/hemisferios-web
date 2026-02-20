// This type of modals can be used for CRUD forms. 

import NormalButton from "@/website/components/NormalButton";
import CancelButton from "../CancelButton";

type ModalProps = {
    isVisible: boolean,
    title: string,
    children?: React.ReactNode;
    btnType?: "button" | "submit";
    btnForm?: string;
    confirmationBtnText: string;
    onSave: () => void, // Function that will be triggered when the modal prompt is saved or accepted.
    onClose: () => void // Function to close the modal.
}

function MediumModal(props: ModalProps) {
    return (
        <div className={`dark-background ${props.isVisible ? "absolute" : "hidden"} z-999 w-screen h-screen top-0 left-0 bg-[rgb(0,0,0,0.25)] flex items-center justify-center`}>
            <div className="modal-window fixed flex flex-col bg-white sm:h-auto h-full sm:rounded-lg rounded-none p-6 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] gap-5 max-w-3xl">
                <h1 className="text-xl tracking-tight font-semibold text-slate-800">{props.title}</h1>

                {/* Handle other operations */}
                {props.children}

                <div className="buttons flex sm:flex-row flex-col w-full gap-4 items-center justify-end">
                    <div className="flex flex-col w-full">
                        <CancelButton onClick={props.onClose} text="Cancelar" />
                    </div>

                    <div className="flex flex-col w-full">
                        <NormalButton type={props.btnType} onClick={props.onSave} text={props.confirmationBtnText} formId={props.btnForm} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MediumModal;