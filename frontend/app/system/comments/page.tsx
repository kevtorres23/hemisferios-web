"use client";

import { useEffect } from "react";
import SystemLayout from "@/system/components/SystemLayout";
import { RemoveCommentModal, SeeCommentModal } from "@/system/components/modals/CommentActions";
import { CircleDotDashed, BookCheck } from "lucide-react";
import EmptyState from "@/system/components/EmptyState";
import commentsEmpty from "../../../public/comments-empty.png";
import PageTitle from "@/system/components/PageTitle";
import { useState, createContext } from "react";
import IconButton from "@/system/components/IconButton";
import SuccessModal from "@/system/components/modals/SuccessModal";
import { CommentType } from "@/lib/Types";
import { pageSeparator } from "@/system/modules/PageSeparator";
import CommentGrid from "@/system/components/comments/CommentGrid";

export const CardActionContext = createContext<(action: string) => void>(() => "");

type CommentDataset = CommentType[];

function Comments() {
    const [successfulAction, setSuccessfulAction] = useState("");

    // Modal variables.
    const [cardAction, setCardAction] = useState("");
    const [modalName, setModalName] = useState("");
    const [modalLastName, setModalLastName] = useState("");
    const [modalDate, setModalDate] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [view, setView] = useState<"seen" | "unseen">("unseen");
    const [success, setSuccess] = useState(false);

    const data: CommentDataset = [
        {
            "name": "Kevin",
            "lastName": "Torres",
            "phoneNumber": "6181889026",
            "date": "20 de febrero, 2026",
            "email": "kevintu236@gmail.com",
            "message": "¡Hola! Este es mi primer comentario. Los quiero mucho Hemisferios <3",
            "status": "seen",
        },
    ];

    let commentPages = pageSeparator(data);

    function showSuccessModal(successMsg: string) {
        setSuccess(true);
        setSuccessfulAction(successMsg)
        setTimeout(() => setSuccess(false), 3000);
    };

    function onActionSelected(action: string) {
        setCardAction(action);
    };

    function seeUnseen() {
        setView("unseen");
    };

    function seeSeen() {
        setView("seen");
    };

    function removeComment() {
        // DELETE axios controller.
        setCardAction("");
        showSuccessModal("Comentario eliminado correctamente.");
    };

    return (
        <SystemLayout sidebarPage="comments" isAnyModal={cardAction === "remove" || cardAction === "see"}
            modals={
                <>
                    <RemoveCommentModal onSave={removeComment} isVisible={cardAction === "remove"} onClose={() => setCardAction("")} />
                    <SeeCommentModal
                        name={modalName}
                        lastName={modalLastName}
                        date={modalDate}
                        message={modalMessage}
                        isVisible={cardAction === "see"}
                        onClose={() => setCardAction("")}
                    />
                </>
            }
        >

            <div className="header flex sm:flex-row flex-col justify-between items-start sm:gap-10 gap-6 w-full">
                <PageTitle title="Comentarios" desc="Consulta los comentarios enviados por los usuarios en el formulario de contacto." />

                <div className="flex sm:flex-row flex-col gap-3 sm:items-center sm:justify-center">
                    <IconButton onClick={seeUnseen} isActive={view === "unseen"} icon={<CircleDotDashed size={18} />} text="No leídos" />
                    <IconButton onClick={seeSeen} isActive={view === "seen"} icon={<BookCheck size={18} />} text="Leídos" />
                </div>
            </div>

            <SuccessModal isVisible={success} text={successfulAction} />

            <SuccessModal isVisible={cardAction === "mark-read"} text="Comentario marcado como leído correctamente." />

            {(data.length === 0) ? (
                <EmptyState
                    header="¡No hay comentarios aún!"
                    desc="Nuevos comentarios aparecerán aquí cuando sean enviados por una persona en la página web."
                    image={commentsEmpty}
                />
            ) : (view === "seen") ? (
                <CardActionContext.Provider value={onActionSelected}>
                    <CommentGrid view="seen" data={commentPages} onSearchChange={() => ""} />
                </CardActionContext.Provider>
            ) : (
                <CardActionContext.Provider value={onActionSelected}>
                    <CommentGrid view="unseen" data={commentPages} onSearchChange={() => ""} />
                </CardActionContext.Provider>
            )}
        </ SystemLayout>
    );
};

export default Comments;