// This type of modals can be used for CRUD forms. 

"use client";

import NormalButton from "@/components/website/NormalButton";
import CancelButton from "../CancelButton";
import { MessageCircleMore } from "lucide-react";

type ModalProps = {
    isVisible: boolean,
    title: string,
    desc: string;
    textMessage?: React.ReactNode;
    buttonText: string;
    onClose: () => void // Function to close the modal.
}

function TextMessageModal(props: ModalProps) {
    return (
        <div className={`dark-background ${props.isVisible ? "absolute" : "hidden"} z-999 w-full h-screen top-0 left-0 bg-[rgb(0,0,0,0.25)] flex items-center justify-center`}>
            <div className="modal-window fixed flex flex-col bg-white sm:max-h-10/12 no-scrollbar overflow-y-scroll sm:h-auto h-full sm:rounded-lg rounded-none p-6 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] gap-5 max-w-xl w-full">

                <div className="flex flex-row gap-2 text-slate-900 items-center">
                    <MessageCircleMore size={18} />

                    <h1 className="text-xl tracking-tight font-semibold">{props.title}</h1>
                </div>

                <p className="text-sm text-slate-500">
                    {props.desc}
                </p>

                <div className="w-full min-h-25 h-auto border border-slate-200 bg-slate-100 rounded-md p-4">
                    <p className="text-slate-800 text-wrap w-full text-sm"></p>
                </div>

                <div className="flex self-end">
                    <NormalButton type="button" onClick={props.onClose} text={props.buttonText} />
                </div>
            </div>
        </div>
    );
};

export default TextMessageModal;