"use client";

import { useEffect } from "react";
import { filterCommentsByStatus } from "@/utils/system/comments/comment-filters";
import toast, { Toaster } from 'react-hot-toast';
import SystemLayout from "@/components/system/SystemLayout";
import { RemoveCommentModal, SeeCommentModal } from "@/components/system/modals/CommentActions";
import { CircleDotDashed, BookCheck } from "lucide-react";
import EmptyState from "@/components/system/EmptyState";
import commentsEmpty from "../../../public/comments-empty.png";
import PageTitle from "@/components/system/PageTitle";
import { useState, createContext } from "react";
import IconButton from "@/components/system/IconButton";
import { CommentType } from "@/utils/types";
import CommentGrid from "@/components/system/comments/CommentGrid";
import api from "@/lib/axios";
import { getCommentById, updateCommentStatus } from "@/lib/comments/update-comment-status";
import LoadingState from "@/components/system/LoadingState";

export const CardActionContext = createContext<(action: string, id: string) => void>(() => "");

function Comments() {

    // Modal variables.
    const [cardAction, setCardAction] = useState("");
    const [modalName, setModalName] = useState("");
    const [modalLastName, setModalLastName] = useState("");
    const [modalDate, setModalDate] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [seenComments, setSeenComments] = useState<CommentType[]>([]);
    const [unseenComments, setUnseenComments] = useState<CommentType[]>([]);
    const [view, setView] = useState<"seen" | "unseen">("unseen");
    const [commentId, setCommentId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllMessages = async () => {
            try {
                const res = await api.get("/messages");
                setSeenComments(filterCommentsByStatus(res.data, "seen"));
                setUnseenComments(filterCommentsByStatus(res.data, "unseen"));
            } catch (error) {
                console.log("Error while fetching the messages:", error);
            } finally {
                setIsLoading(false);
            };
        };

        if (cardAction === "mark-read") {
            toast.promise(
                updateCommentStatus(commentId, "seen").then((result) => {
                    if (result === undefined) {
                        return;
                    };

                    setSeenComments(filterCommentsByStatus(result, "seen"));
                    setUnseenComments(filterCommentsByStatus(result, "unseen"));
                }), {
                loading: "Actualizando estatus...",
                success: <p>¡Comentario marcado como <b>leído</b>!</p>,
                error: "Hubo un error al actualizar el comentario. Inténtalo nuevamente"
            }, { duration: 2000 });

            fetchAllMessages();
        };

        fetchAllMessages();

    }, [cardAction]);

    function showSuccessModal(successMsg: string) {
        toast.success(<p className="font-medium">{successMsg}</p>, { duration: 2000 });
    };

    function onActionSelected(action: string, id: string) {
        if (action === "see") {
            getCommentById(id).then((result) => {
                if (result === undefined) {
                    return;
                };

                console.log("Resultadooo:", result.message);

                setModalName(result.name);
                setModalLastName(result.lastName);
                setModalDate(result.createdAt);
                setModalMessage(result.message);

            }).catch((error) => console.log("An error ocurred while fetching the comment's data:", error
            )).finally(() => setCardAction("see"));

        } else {
            setCardAction(action);
            setCommentId(id);
        }
    };

    function seeUnseen() {
        setView("unseen");
    };

    function seeSeen() {
        setView("seen");
    };

    function removeComment() {
        api.delete("/messages/" + commentId);
        setCardAction("");
        setSeenComments((prev: CommentType[]) => prev.filter((comment) => comment._id != commentId));
        setUnseenComments((prev: CommentType[]) => prev.filter((comment) => comment._id != commentId));
        showSuccessModal("Comentario eliminado correctamente.");
    };

    return (
        <SystemLayout sidebarPage="comments" isAnyModal={cardAction === "remove" || cardAction === "see"}
            modals={
                <>
                    {cardAction === "remove" && (
                        <RemoveCommentModal onSave={removeComment} isVisible={cardAction === "remove"} onClose={() => setCardAction("")} />
                    )}

                    {cardAction === "see" && (
                        <SeeCommentModal
                            name={modalName}
                            lastName={modalLastName}
                            date={modalDate}
                            message={modalMessage}
                            isVisible={cardAction === "see"}
                            onClose={() => setCardAction("")}
                        />
                    )}
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

            <Toaster />

            {isLoading && <LoadingState message="Cargando comentarios..." />}

            {!isLoading && view === "unseen" && unseenComments.length === 0 && (
                <EmptyState
                    header="¡No hay comentarios aún!"
                    desc="Nuevos comentarios aparecerán aquí cuando sean enviados por una persona en la página web."
                    image={commentsEmpty}
                />
            )}

            {!isLoading && view === "seen" && seenComments.length === 0 && (
                <EmptyState
                    header="¡No hay comentarios aún!"
                    desc="Nuevos comentarios aparecerán aquí cuando sean marcados como leídos."
                    image={commentsEmpty}
                />
            )}

            {!isLoading && view === "unseen" && unseenComments.length > 0 && (
                <CardActionContext.Provider value={onActionSelected}>
                    <CommentGrid view="unseen" data={unseenComments} onSearchChange={() => ""} />
                </CardActionContext.Provider>
            )}

            {!isLoading && view === "seen" && seenComments.length > 0 && (
                <CardActionContext.Provider value={onActionSelected}>
                    <CommentGrid view="seen" data={seenComments} onSearchChange={() => ""} />
                </CardActionContext.Provider>
            )}
        </ SystemLayout>
    );
};

export default Comments;